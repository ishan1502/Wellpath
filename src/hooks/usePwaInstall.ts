import { useContext } from 'react';
import { PwaInstallContext, type PwaInstallContextType } from '@/contexts/PwaInstallContext';

export const usePwaInstall = (): PwaInstallContextType => {
  const context = useContext(PwaInstallContext);
  if (!context) {
    throw new Error('usePwaInstall must be used within a PwaInstallProvider');
  }
  return context;
};

export type { PlatformType, BrowserType } from '@/contexts/PwaInstallContext';
