import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  maxDisplayPills?: number;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
  maxDisplayPills = 2,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const minDesiredHeight = 240;
    const openUpward = spaceBelow < minDesiredHeight && spaceAbove > spaceBelow;

    const margin = 8;
    const width = Math.min(rect.width, viewportWidth - margin * 2);
    const left = Math.max(margin, Math.min(rect.left, viewportWidth - width - margin));

    if (openUpward) {
      const maxHeight = Math.min(360, Math.max(160, spaceAbove - margin * 2));
      setDropdownStyle({
        position: 'fixed',
        left: `${left}px`,
        bottom: `${viewportHeight - rect.top + 6}px`,
        width: `${width}px`,
        maxHeight: `${maxHeight}px`,
        zIndex: 9999,
      });
    } else {
      const maxHeight = Math.min(360, Math.max(160, spaceBelow - margin * 2));
      setDropdownStyle({
        position: 'fixed',
        left: `${left}px`,
        top: `${rect.bottom + 6}px`,
        width: `${width}px`,
        maxHeight: `${maxHeight}px`,
        zIndex: 9999,
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, selected, updatePosition]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const handleScrollOrResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setIsOpen(false);
          return;
        }
      }
      updatePosition();
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      resizeObserver.disconnect();
    };
  }, [isOpen, updatePosition]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleOption = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((item) => item !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const handleRemovePill = (e: React.MouseEvent, val: string) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== val));
  };

  const labelMap = React.useMemo(() => {
    const map = new Map<string, string>();
    options.forEach((opt) => map.set(opt.value, opt.label));
    return map;
  }, [options]);

  return (
    <div ref={containerRef} className={cn("relative flex-grow", className)}>
      {/* Trigger Button */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={cn(
          "w-full min-h-[48px] px-3.5 py-2.5 bg-background border border-border rounded-xl text-left flex items-center justify-between gap-2 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-ring font-medium select-none shadow-xs",
          isOpen && "ring-2 ring-ring border-transparent"
        )}
      >
        <div className="flex-1 overflow-hidden">
          {selected.length === 0 ? (
            <span className="text-muted-foreground font-medium text-sm sm:text-base">
              {placeholder}
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 py-0.5">
              {selected.slice(0, maxDisplayPills).map((val) => (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary-dark font-semibold text-xs px-2.5 py-1 rounded-lg border border-primary/20 animate-in"
                >
                  <span className="truncate max-w-[130px] sm:max-w-[170px]">
                    {labelMap.get(val) || val}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleRemovePill(e, val)}
                    className="text-primary-dark/70 hover:text-destructive transition-colors p-0.5 rounded-full hover:bg-black/5"
                    aria-label={`Remove ${labelMap.get(val) || val}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selected.length > maxDisplayPills && (
                <span className="inline-flex items-center text-xs font-bold text-primary-dark bg-primary/10 px-2 py-1 rounded-lg border border-primary/20">
                  +{selected.length - maxDisplayPills} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 shrink-0 text-muted-foreground">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="p-1 hover:text-foreground text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
              title="Clear all selections"
              aria-label="Clear all selections"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0",
              isOpen && "rotate-180 text-foreground"
            )}
          />
        </div>
      </div>

      {/* Popover Dropdown via Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-multiselectable="true"
            style={dropdownStyle}
            className="bg-surface border border-border rounded-xl shadow-2xl overflow-hidden py-1 animate-in divide-y divide-border/40 flex flex-col"
          >
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground shrink-0">
              <span className="font-semibold text-foreground">Select all that apply</span>
              {selected.length > 0 ? (
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-primary hover:text-primary-hover font-semibold transition-colors cursor-pointer"
                >
                  Clear all ({selected.length})
                </button>
              ) : (
                <span className="text-[11px] text-muted-foreground">Multiple selections allowed</span>
              )}
            </div>

            {/* Options List */}
            <div className="overflow-y-auto py-1 flex-1 min-h-0">
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      "px-3.5 py-2.5 flex items-center gap-3 transition-colors cursor-pointer select-none",
                      isSelected
                        ? "bg-primary/5 text-primary-dark font-medium"
                        : "text-foreground hover:bg-muted/60"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0",
                        isSelected
                          ? "bg-primary border-primary text-white"
                          : "border-border bg-background"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-sm flex-1">{option.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-3.5 py-2 bg-muted/20 flex items-center justify-between text-xs shrink-0">
              <span className="text-muted-foreground font-medium">
                {selected.length === 0
                  ? "No topics selected"
                  : `${selected.length} topic${selected.length > 1 ? 's' : ''} selected`}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
