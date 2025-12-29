// Focus detection system for AI Study Buddy

export type FocusEventCallback = () => void;

export class FocusDetector {
  private onFocusLost: FocusEventCallback;
  private onFocusRegained: FocusEventCallback;
  private isActive: boolean = false;
  
  constructor(onFocusLost: FocusEventCallback, onFocusRegained: FocusEventCallback) {
    this.onFocusLost = onFocusLost;
    this.onFocusRegained = onFocusRegained;
  }
  
  start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    
    // Listen for visibility changes (tab switching)
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Listen for window focus changes (Alt+Tab)
    window.addEventListener('blur', this.handleWindowBlur);
    window.addEventListener('focus', this.handleWindowFocus);
  }
  
  stop(): void {
    if (!this.isActive) return;
    
    this.isActive = false;
    
    // Remove all event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
  }
  
  private handleVisibilityChange = (): void => {
    if (document.hidden) {
      // User switched away from tab
      this.onFocusLost();
    } else {
      // User returned to tab
      this.onFocusRegained();
    }
  };
  
  private handleWindowBlur = (): void => {
    // Window lost focus (Alt+Tab, clicking outside, etc.)
    if (!document.hidden) {
      // Only trigger if tab is still visible (not a tab switch)
      setTimeout(() => {
        if (!document.hasFocus()) {
          this.onFocusLost();
        }
      }, 100);
    }
  };
  
  private handleWindowFocus = (): void => {
    // Window regained focus
    if (!document.hidden) {
      this.onFocusRegained();
    }
  };
}

// Utility function to create a focus detector
export function createFocusDetector(
  onFocusLost: FocusEventCallback,
  onFocusRegained: FocusEventCallback
): FocusDetector {
  return new FocusDetector(onFocusLost, onFocusRegained);
}