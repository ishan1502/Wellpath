import React from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Monitor, 
  Share, 
  PlusSquare, 
  MoreVertical, 
  CheckCircle2, 
  Zap, 
  Bell, 
  ShieldCheck, 
  Laptop
} from 'lucide-react';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { Button } from '@/components/ui/Button';

export const InstallAppModal: React.FC = () => {
  const {
    isInstallModalOpen,
    closeInstallModal,
    promptInstall,
    isInstalled,
    platform,
    browser,
    isMobile,
    activeModalTab,
    setActiveModalTab,
  } = usePwaInstall();

  if (!isInstallModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-surface rounded-2xl shadow-xl max-w-lg w-full overflow-hidden border border-border animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-emerald-600 text-white p-6 relative">
          <button
            onClick={closeInstallModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
              <img 
                src="/icons/icon-192x192.png" 
                alt="WellPath App" 
                className="w-9 h-9 rounded-lg shadow-sm"
                onError={(e) => {
                  // Fallback if image fails to render
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">Install WellPath</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                  Web App
                </span>
              </div>
              <p className="text-emerald-100 text-xs mt-0.5">
                Use like WhatsApp Desktop or mobile app — fast, private & ad-free
              </p>
            </div>
          </div>

          {/* Device Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4 border border-white/10">
            <button
              onClick={() => setActiveModalTab('desktop')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeModalTab === 'desktop'
                  ? 'bg-surface text-primary-dark shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop Shortcut</span>
              {!isMobile && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>
            <button
              onClick={() => setActiveModalTab('mobile')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                activeModalTab === 'mobile'
                  ? 'bg-surface text-primary-dark shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Phone Home Screen</span>
              {isMobile && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status check if already installed */}
          {isInstalled && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">App Already Installed!</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  WellPath is installed in standalone mode. You can launch it anytime from your desktop shortcut, dock, or phone home screen.
                </p>
              </div>
            </div>
          )}

          {/* DESKTOP TAB */}
          {activeModalTab === 'desktop' && (
            <div className="space-y-5">
              <div className="bg-background rounded-xl p-4 border border-border">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                  <Laptop className="w-4 h-4 text-primary" />
                  Desktop App Experience (like WhatsApp Web)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Installing WellPath creates a desktop shortcut and lets you run it as an independent desktop window without URL bars or browser clutter.
                </p>

                <div className="grid grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                    <Zap className="w-3.5 h-3.5 text-primary" /> Instant 1-click launch
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                    <Bell className="w-3.5 h-3.5 text-primary" /> Appointment alerts
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Encrypted & secure
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                    <Monitor className="w-3.5 h-3.5 text-primary" /> Clean standalone window
                  </div>
                </div>
              </div>

              {/* Install Action or Specific Browser Guide */}
              <div className="space-y-3">
                <Button
                  onClick={async () => {
                    const result = await promptInstall();
                    if (result === 'accepted') {
                      closeInstallModal();
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold shadow-sm hover:shadow"
                >
                  <Download className="w-4 h-4" />
                  Install WellPath on Desktop
                </Button>

                {/* Browser Specific Instructions */}
                <div className="bg-surface-hover rounded-xl p-4 border border-border text-xs space-y-3 text-muted-foreground">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <span>💡 Browser-specific shortcuts:</span>
                  </p>

                  {platform === 'mac' && browser === 'safari' ? (
                    <div className="space-y-2">
                      <p className="font-medium text-primary-dark">On Safari (macOS Sonoma or later):</p>
                      <ol className="list-decimal list-inside space-y-1.5 pl-1">
                        <li>Click <span className="font-semibold text-foreground">File</span> in the Mac top menu bar</li>
                        <li>Select <span className="font-semibold text-foreground">"Add to Dock..."</span></li>
                        <li>Click <span className="font-semibold text-foreground">Add</span> to get WellPath on your Mac Dock</li>
                      </ol>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium text-primary-dark">On Google Chrome, Microsoft Edge & Brave:</p>
                      <ol className="list-decimal list-inside space-y-1.5 pl-1">
                        <li>Look at your browser's address bar (near the bookmark star)</li>
                        <li>Click the <span className="font-semibold text-foreground">Install App</span> icon (<Download className="w-3 h-3 inline mx-0.5 text-primary" /> or <Monitor className="w-3 h-3 inline mx-0.5 text-primary" />)</li>
                        <li>Click <span className="font-semibold text-foreground">Install</span> to create a Desktop shortcut & taskbar icon</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MOBILE TAB */}
          {activeModalTab === 'mobile' && (
            <div className="space-y-5">
              <div className="bg-background rounded-xl p-4 border border-border">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  Mobile Web App on Your Home Screen
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Add WellPath to your home screen to use it in full-screen mode like a native App Store or Play Store app.
                </p>
              </div>

              {/* iOS Instructions */}
              {(platform === 'ios' || (!platform && isMobile)) ? (
                <div className="bg-surface rounded-xl border-2 border-primary/20 p-4 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" /> iPhone & iPad (Safari)
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">3 Quick Steps</span>
                  </div>

                  <div className="space-y-3.5 text-xs text-foreground">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-muted text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Tap the Share button</p>
                        <p className="text-muted-foreground text-[11px] mt-0.5 flex items-center gap-1 flex-wrap">
                          At the bottom of your Safari screen, tap
                          <span className="inline-flex items-center gap-1 bg-surface-hover border border-border px-1.5 py-0.5 rounded text-blue-600 font-semibold">
                            <Share className="w-3 h-3 text-blue-500" /> Share
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-muted text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Select "Add to Home Screen"</p>
                        <p className="text-muted-foreground text-[11px] mt-0.5 flex items-center gap-1 flex-wrap">
                          Scroll down in the share sheet and tap
                          <span className="inline-flex items-center gap-1 bg-surface-hover border border-border px-1.5 py-0.5 rounded font-semibold text-foreground">
                            <PlusSquare className="w-3 h-3 text-gray-700" /> Add to Home Screen
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-muted text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Tap "Add" in top-right</p>
                        <p className="text-muted-foreground text-[11px] mt-0.5">
                          Tap <span className="font-semibold text-primary">Add</span>. The WellPath icon will appear on your Home Screen!
                        </p>
                      </div>
                    </div>
                  </div>

                  {browser !== 'safari' && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2">
                      💡 <strong>Tip:</strong> If you are using Chrome on iPhone, open this website in <strong>Safari</strong> for the smoothest Add to Home Screen experience.
                    </div>
                  )}
                </div>
              ) : (
                /* Android Instructions */
                <div className="space-y-3">
                  <Button
                    onClick={async () => {
                      const result = await promptInstall();
                      if (result === 'accepted') {
                        closeInstallModal();
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Add to Android Home Screen
                  </Button>

                  <div className="bg-surface rounded-xl border border-border p-4 space-y-3 text-xs">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <span>Manual Android instructions:</span>
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-1">
                      <li>
                        Tap the three dots menu (<MoreVertical className="w-3 h-3 inline text-foreground" />) in Chrome
                      </li>
                      <li>
                        Tap <span className="font-semibold text-foreground">"Install app"</span> or <span className="font-semibold text-foreground">"Add to Home screen"</span>
                      </li>
                      <li>
                        Tap <span className="font-semibold text-primary">Install</span> to confirm
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-background border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-primary" />
            No app store download required
          </span>
          <button
            onClick={closeInstallModal}
            className="px-4 py-2 text-primary font-semibold hover:bg-primary-muted/50 rounded-lg transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
