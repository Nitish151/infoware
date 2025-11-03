'use client';

import React, { useState } from 'react';
import { FieldType } from '@/lib/types';
import { fieldTypeConfig } from '@/lib/formModel';
import { Plus, Eye, Edit3, Download, Upload } from 'lucide-react';

interface ToolbarProps {
  mode: 'edit' | 'preview';
  onModeChange: (mode: 'edit' | 'preview') => void;
  onAddField: (type: FieldType) => void;
  onExport: () => void;
  onImport: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  mode,
  onModeChange,
  onAddField,
  onExport,
  onImport,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-white to-gray-50 border-b-2 border-[var(--primary-color)]/20 shadow-md backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 max-w-7xl mx-auto">
        {/* Mode toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => onModeChange('edit')}
            className={`
              px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2
              ${mode === 'edit'
                ? 'bg-[var(--primary-color)] text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }
            `}
          >
            <Edit3 size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => onModeChange('preview')}
            className={`
              px-5 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2
              ${mode === 'preview'
                ? 'bg-[var(--primary-color)] text-white shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }
            `}
          >
            <Eye size={18} />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Actions */}
        {mode === 'edit' && (
          <div className="flex gap-3 flex-wrap">
            {/* Add field dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="px-5 py-2.5 rounded-xl font-semibold text-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105"
                style={{ 
                  background: `linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)` 
                }}
              >
                <Plus size={20} />
                <span>Add Field</span>
              </button>

              {showAddMenu && (
                <div className="absolute top-full mt-2 right-0 w-60 bg-white border-2 border-[var(--primary-color)]/20 rounded-xl shadow-2xl py-2 z-20 animate-slide-in">
                  {Object.entries(fieldTypeConfig).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => {
                        onAddField(type as FieldType);
                        setShowAddMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 flex items-center gap-3 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold text-[var(--primary-color)]">{type.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-[var(--primary-color)]">{config.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export/Import */}
            <button
              onClick={onImport}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 hover:border-[var(--primary-color)] bg-white hover:bg-blue-50 flex items-center gap-2 transition-all font-semibold text-gray-700 hover:text-[var(--primary-color)] shadow-sm hover:shadow-md"
              title="Import form"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button
              onClick={onExport}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 hover:border-[var(--primary-color)] bg-white hover:bg-blue-50 flex items-center gap-2 transition-all font-semibold text-gray-700 hover:text-[var(--primary-color)] shadow-sm hover:shadow-md"
              title="Export form"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showAddMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowAddMenu(false)}
        />
      )}
    </div>
  );
};
