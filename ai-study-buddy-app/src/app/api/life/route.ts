import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUsersCollection } from '@/lib/mongodb';
import { shouldResetLives } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ _id: userSession.id as any });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if we need to reset lives for a new day
    const today = new Date();
    const shouldReset = shouldResetLives(user.lastLifeReset);

    if (shouldReset) {
      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            livesToday: 5,
            lastLifeReset: today,
            isBlockedToday: false
          }
        }
      );

      return NextResponse.json({
        livesRemaining: 5,
        maxLives: 5,
        lastReset: today.toISOString().split('T')[0],
        dailyLivesLost: 0,
        isBlocked: false
      });
    }

    return NextResponse.json({
      livesRemaining: user.livesToday,
      maxLives: 5,
      lastReset: user.lastLifeReset.toISOString().split('T')[0],
      dailyLivesLost: 5 - user.livesToday,
      isBlocked: user.isBlockedToday
    });
  } catch (error) {
    console.error('Error fetching life system:', error);
    return NextResponse.json(
      { error: 'Failed to fetch life system' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userSession = await getUserFromRequest(request);
    if (!userSession) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const lifeData = await request.json();
    const users = await getUsersCollection();

    const updateData: any = {};
    if (lifeData.livesRemaining !== undefined) {
      updateData.livesToday = Math.max(0, Math.min(5, lifeData.livesRemaining));
    }
    if (lifeData.isBlocked !== undefined) {
      updateData.isBlockedToday = lifeData.isBlocked;
    }

    await users.updateOne(
      { _id: userSession.id as any },
      { $set: updateData }
    );

    const updatedUser = await users.findOne({ _id: userSession.id as any });

    return NextResponse.json({
      livesRemaining: updatedUser!.livesToday,
      maxLives: 5,
      lastReset: updatedUser!.lastLifeReset.toISOString().split('T')[0],
      dailyLivesLost: 5 - updatedUser!.livesToday,
      isBlocked: updatedUser!.isBlockedToday
    });
  } catch (error) {
    console.error('Error updating life system:', error);
    return NextResponse.json(
      { error: 'Failed to update life system' },
      { status: 500 }
    );
  }
}