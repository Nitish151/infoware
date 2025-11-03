'use client';

import React, { useState } from 'react';
import { useTheme } from '@/lib/themeContext';
import { Palette, X, RotateCcw, Sparkles } from 'lucide-react';

export const ThemePanel: React.FC = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const fontFamilies = [
    { label: 'System Default', value: 'system-ui, -apple-system, sans-serif' },
    { label: 'Inter', value: 'Inter, sans-serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' },
    { label: 'Open Sans', value: '"Open Sans", sans-serif' },
    { label: 'Montserrat', value: 'Montserrat, sans-serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
  ];

  return (
    <>
      {/* Theme toggle button - Enhanced */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white z-40 hover:scale-110 hover:shadow-xl transition-all duration-200 group"
        style={{ backgroundColor: 'var(--primary-color)' }}
        title="Customize Theme"
      >
        <Palette size={28} className="group-hover:rotate-12 transition-transform duration-200" />
      </button>

      {/* Theme panel - Enhanced */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-gradient-to-b from-white to-gray-50 border-l-2 border-[var(--primary-color)] shadow-2xl z-50 overflow-y-auto animate-slide-in">
          {/* Header with gradient */}
          <div className="sticky top-0 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg z-10">
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles size={24} className="animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold">Theme Studio</h3>
                  <p className="text-xs text-white/80">Customize your experience</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetTheme}
                  className="p-2.5 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all"
                  title="Reset to default"
                >
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Colors Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full"></div>
                <h4 className="text-lg font-bold text-[var(--text-color)]">Color Palette</h4>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }}></span>
                    Primary Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[var(--primary-color)] transition-colors"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondaryColor }}></span>
                    Secondary Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[var(--primary-color)] transition-colors"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.backgroundColor }}></span>
                    Background Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[var(--primary-color)] transition-colors"
                    />
                    <input
                      type="text"
                      value={theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.textColor }}></span>
                    Text Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[var(--primary-color)] transition-colors"
                    />
                    <input
                      type="text"
                      value={theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.borderColor }}></span>
                    Border Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={theme.borderColor}
                      onChange={(e) => updateTheme({ borderColor: e.target.value })}
                      className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[var(--primary-color)] transition-colors"
                    />
                    <input
                      type="text"
                      value={theme.borderColor}
                      onChange={(e) => updateTheme({ borderColor: e.target.value })}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.errorColor }}></span>
                    Error Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={theme.errorColor}
                      onChange={(e) => updateTheme({ errorColor: e.target.value })}
                      className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-[var(--primary-color)] transition-colors"
                    />
                    <input
                      type="text"
                      value={theme.errorColor}
                      onChange={(e) => updateTheme({ errorColor: e.target.value })}
                      className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-[var(--primary-color)] focus:outline-none transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full"></div>
                <h4 className="text-lg font-bold text-[var(--text-color)]">Typography</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={theme.fontFamily}
                    onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium focus:border-[var(--primary-color)] focus:outline-none transition-colors cursor-pointer hover:border-gray-300"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Base Font Size
                  </label>
                  <select
                    value={theme.baseFontSize}
                    onChange={(e) => updateTheme({ baseFontSize: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium focus:border-[var(--primary-color)] focus:outline-none transition-colors cursor-pointer hover:border-gray-300"
                  >
                    <option value="14px">Small (14px)</option>
                    <option value="16px">Medium (16px)</option>
                    <option value="18px">Large (18px)</option>
                    <option value="20px">Extra Large (20px)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Heading Font Size
                  </label>
                  <select
                    value={theme.headingFontSize}
                    onChange={(e) => updateTheme({ headingFontSize: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium focus:border-[var(--primary-color)] focus:outline-none transition-colors cursor-pointer hover:border-gray-300"
                  >
                    <option value="20px">Small (20px)</option>
                    <option value="24px">Medium (24px)</option>
                    <option value="28px">Large (28px)</option>
                    <option value="32px">Extra Large (32px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full"></div>
                <h4 className="text-lg font-bold text-[var(--text-color)]">Live Preview</h4>
              </div>
              
              <div 
                className="p-6 rounded-xl border-2 shadow-inner"
                style={{ 
                  borderColor: theme.borderColor,
                  backgroundColor: theme.backgroundColor,
                }}
              >
                <h3 
                  className="font-bold mb-3"
                  style={{ 
                    color: theme.textColor,
                    fontSize: theme.headingFontSize,
                    fontFamily: theme.fontFamily,
                  }}
                >
                  Sample Heading
                </h3>
                <p 
                  style={{ 
                    color: theme.textColor,
                    fontSize: theme.baseFontSize,
                    fontFamily: theme.fontFamily,
                  }}
                  className="mb-4 leading-relaxed"
                >
                  This is sample text to preview your theme settings. You can see how your colors and typography choices look together.
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom spacing */}
            <div className="h-4"></div>
          </div>
        </div>
      )}
 
    </>
  );
};
