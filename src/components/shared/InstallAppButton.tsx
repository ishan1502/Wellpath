import React from 'react';
import { Download, Smartphone, Monitor } from 'lucide-react';
import { usePwaInstall } from '@/hooks/usePwaInstall';

interface InstallAppButtonProps {
  variant?: 'header' | 'sidebar' | 'mobileMenu' | 'compact' | 'ghost';
  className?: string;
  showIfInstalled?: boolean;
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({
  variant = 'header',
  className = '',
  showIfInstalled = false,
}) => {
  const { isInstalled, isMobile, openInstallModal, promptInstall } = usePwaInstall();

  // If already installed and showIfInstalled is false, don't show the button
  if (isInstalled && !showIfInstalled) {
    return null;
  }

  const handleClick = async () => {
    // Try native prompt first, opens modal if manual steps are needed
    await promptInstall();
  };

  const label = isMobile ? 'Add to Home Screen' : 'Install App';
  const shortLabel = isMobile ? 'App' : 'Install App';

  if (variant === 'header') {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-muted/60 hover:bg-primary-muted border border-primary/20 hover:border-primary/30 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 ${className}`}
        title={isMobile ? 'Add WellPath to your phone Home Screen' : 'Install WellPath Desktop shortcut (like WhatsApp)'}
      >
        {isMobile ? <Smartphone className="w-3.5 h-3.5 text-primary" /> : <Monitor className="w-3.5 h-3.5 text-primary" />}
        <span>{shortLabel}</span>
      </button>
    );
  }

  if (variant === 'sidebar') {
    return (
      <button
        onClick={() => openInstallModal()}
        className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-lg text-primary hover:bg-primary-muted transition-all duration-200 border border-primary/10 ${className}`}
      >
        {isMobile ? (
          <Smartphone className="mr-3 h-5 w-5 text-primary" />
        ) : (
          <Monitor className="mr-3 h-5 w-5 text-primary" />
        )}
        <span className="truncate">{label}</span>
      </button>
    );
  }

  if (variant === 'mobileMenu') {
    return (
      <button
        onClick={() => openInstallModal()}
        className={`flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm font-medium text-primary hover:bg-primary-muted rounded-xl transition-colors ${className}`}
      >
        <Smartphone className="w-4 h-4 text-primary" />
        <span>{label}</span>
      </button>
    );
  }

  if (variant === 'ghost') {
    return (
      <button
        onClick={() => openInstallModal()}
        className={`flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline ${className}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-surface border border-border hover:bg-surface-hover transition-colors ${className}`}
    >
      <Download className="w-4 h-4 text-primary" />
      <span>{label}</span>
    </button>
  );
};
