import React, { createContext, useEffect, useState, useCallback } from 'react';

export type PlatformType = 'ios' | 'android' | 'mac' | 'windows' | 'linux' | 'other';
export type BrowserType = 'safari' | 'chrome' | 'edge' | 'firefox' | 'other';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PwaInstallContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  platform: PlatformType;
  browser: BrowserType;
  isMobile: boolean;
  isInstallModalOpen: boolean;
  openInstallModal: (preferredTab?: 'desktop' | 'mobile') => void;
  closeInstallModal: () => void;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'manual'>;
  isBannerDismissed: boolean;
  dismissBanner: (days?: number) => void;
  activeModalTab: 'desktop' | 'mobile';
  setActiveModalTab: (tab: 'desktop' | 'mobile') => void;
}

export const PwaInstallContext = createContext<PwaInstallContextType | undefined>(undefined);

const DISMISS_KEY = 'wellpath_pwa_banner_dismissed_until';

function getInitialInstalledState(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

function getDetectedPlatform(): PlatformType {
  if (typeof window === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  const isIosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
  const isAndroidDevice = /Android/i.test(ua);
  const isMacDevice = /Macintosh|MacIntel|MacPPC|Mac68K/.test(ua) && !isIosDevice;
  const isWindowsDevice = /Win32|Win64|Windows|WinCE/.test(ua);
  const isLinuxDevice = /Linux/.test(ua) && !isAndroidDevice;

  if (isIosDevice) return 'ios';
  if (isAndroidDevice) return 'android';
  if (isMacDevice) return 'mac';
  if (isWindowsDevice) return 'windows';
  if (isLinuxDevice) return 'linux';
  return 'other';
}

function getDetectedBrowser(): BrowserType {
  if (typeof window === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/Edg|EdgiOS|Edge/i.test(ua)) return 'edge';
  if (/Chrome|CriOS/i.test(ua)) return 'chrome';
  if (/Safari/i.test(ua) && !/Chrome|CriOS/i.test(ua)) return 'safari';
  if (/Firefox|FxiOS/i.test(ua)) return 'firefox';
  return 'other';
}

function getIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isIos = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
  const isAndroid = /Android/i.test(ua);
  return isIos || isAndroid || /Mobi|Android/i.test(ua);
}

function getInitialBannerDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil) {
      const expiry = parseInt(dismissedUntil, 10);
      if (Date.now() < expiry) {
        return true;
      }
      localStorage.removeItem(DISMISS_KEY);
      return false;
    }
  } catch {
    return false;
  }
  return false;
}

export const PwaInstallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(getInitialInstalledState);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [platform] = useState<PlatformType>(getDetectedPlatform);
  const [browser] = useState<BrowserType>(getDetectedBrowser);
  const [isMobile] = useState<boolean>(getIsMobile);
  const [activeModalTab, setActiveModalTab] = useState<'desktop' | 'mobile'>(() => (getIsMobile() ? 'mobile' : 'desktop'));
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(getInitialBannerDismissed);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstallModalOpen(false);
    };

    // Listen for display-mode change
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const openInstallModal = useCallback((preferredTab?: 'desktop' | 'mobile') => {
    if (preferredTab) {
      setActiveModalTab(preferredTab);
    } else {
      setActiveModalTab(isMobile ? 'mobile' : 'desktop');
    }
    setIsInstallModalOpen(true);
  }, [isMobile]);

  const closeInstallModal = useCallback(() => {
    setIsInstallModalOpen(false);
  }, []);

  const dismissBanner = useCallback((days: number = 7) => {
    setIsBannerDismissed(true);
    try {
      const expiry = Date.now() + days * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISS_KEY, expiry.toString());
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'manual'> => {
    if (!deferredPrompt) {
      // Not supported natively in this browser (e.g. iOS Safari, Mac Safari)
      openInstallModal();
      return 'manual';
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return 'accepted';
      }
      return 'dismissed';
    } catch (err) {
      console.warn('Error during PWA install prompt:', err);
      openInstallModal();
      return 'manual';
    }
  }, [deferredPrompt, openInstallModal]);

  const value: PwaInstallContextType = {
    isInstallable: !!deferredPrompt || isMobile || !isInstalled,
    isInstalled,
    platform,
    browser,
    isMobile,
    isInstallModalOpen,
    openInstallModal,
    closeInstallModal,
    promptInstall,
    isBannerDismissed,
    dismissBanner,
    activeModalTab,
    setActiveModalTab,
  };

  return (
    <PwaInstallContext.Provider value={value}>
      {children}
    </PwaInstallContext.Provider>
  );
};
