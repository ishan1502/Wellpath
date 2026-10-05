import React from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';
import { usePwaInstall } from '@/hooks/usePwaInstall';

export const InstallPromptBanner: React.FC = () => {
  const {
    isInstalled,
    isBannerDismissed,
    dismissBanner,
    openInstallModal,
    promptInstall,
    isMobile,
  } = usePwaInstall();

  // If already installed or dismissed, do not render
  if (isInstalled || isBannerDismissed) {
    return null;
  }

  const handleActionClick = async () => {
    // Attempt native prompt first, or open instructional modal
    const result = await promptInstall();
    if (result === 'accepted') {
      dismissBanner(30); // Don't show banner again for 30 days
    }
  };

  return (
    <aside 
      aria-label="Install WellPath application prompt"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-40 max-w-md animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-surface/95 backdrop-blur-md border border-primary/20 shadow-lg rounded-2xl p-4 flex items-center gap-3.5 text-foreground relative ring-1 ring-black/5">
        {/* Dismiss Button */}
        <button
          onClick={() => dismissBanner(7)}
          className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-surface-hover transition-colors"
          aria-label="Dismiss install banner"
        >
          <X className="w-4 h-4" />
        </button>

        {/* App Icon */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-primary-hover flex items-center justify-center shrink-0 shadow-sm border border-white/20">
          <img 
            src="/icons/icon-192x192.png" 
            alt="WellPath" 
            className="w-8 h-8 rounded-lg"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Text Details */}
        <div className="flex-1 pr-6 min-w-0">
          <div className="flex items-center gap-1.5">
            {isMobile ? (
              <Smartphone className="w-3.5 h-3.5 text-primary shrink-0" />
            ) : (
              <Monitor className="w-3.5 h-3.5 text-primary shrink-0" />
            )}
            <h4 className="text-xs font-bold text-foreground truncate">
              {isMobile ? 'Add WellPath to Home Screen' : 'Install WellPath on Desktop'}
            </h4>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
            {isMobile 
              ? 'Use like a mobile app with 1-tap access'
              : 'Add shortcut & use like WhatsApp Desktop'}
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          <button
            onClick={handleActionClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold shadow-xs hover:shadow transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isMobile ? 'Add' : 'Install'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
