'use client';

import React from 'react';
import { FormField, FieldOption } from '@/lib/types';
import { createOption } from '@/lib/formModel';
import { X, Plus, Trash2 } from 'lucide-react';

interface FieldEditorProps {
  field: FormField | null;
  onUpdate: (updates: Partial<FormField>) => void;
  onClose: () => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  field,
  onUpdate,
  onClose,
}) => {
  if (!field) return null;

  const hasOptions = field.type === 'select' || field.type === 'radio' || field.type === 'checkbox';

  const updateOption = (optionId: string, updates: Partial<FieldOption>) => {
    const newOptions = field.options?.map((opt) =>
      opt.id === optionId ? { ...opt, ...updates } : opt
    );
    onUpdate({ options: newOptions });
  };

  const addOption = () => {
    const newOption = createOption(`Option ${(field.options?.length || 0) + 1}`);
    onUpdate({ options: [...(field.options || []), newOption] });
  };

  const deleteOption = (optionId: string) => {
    const newOptions = field.options?.filter((opt) => opt.id !== optionId);
    onUpdate({ options: newOptions });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-[var(--border-color)] shadow-xl z-30 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-[var(--border-color)] p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--text-color)]">Edit Field</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Field Type */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Field Type
          </label>
          <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm">
            {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
          </div>
        </div>

        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Label *
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            placeholder="Enter field label"
          />
        </div>

        {/* Placeholder */}
        {(field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'number') && (
          <div>
            <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              placeholder="Enter placeholder text"
            />
          </div>
        )}

        {/* Help Text */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
            Help Text
          </label>
          <textarea
            value={field.helpText || ''}
            onChange={(e) => onUpdate({ helpText: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            rows={2}
            placeholder="Additional help or instructions"
          />
        </div>

        {/* Validation - Required */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={field.validation.required || false}
              onChange={(e) =>
                onUpdate({
                  validation: { ...field.validation, required: e.target.checked },
                })
              }
              className="w-4 h-4 text-[var(--primary-color)] rounded focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <span className="text-sm font-medium text-[var(--text-color)]">Required field</span>
          </label>
        </div>

        {/* Validation - Min/Max Length for text fields */}
        {(field.type === 'text' || field.type === 'textarea') && (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Minimum Length
              </label>
              <input
                type="number"
                value={field.validation.minLength || ''}
                onChange={(e) =>
                  onUpdate({
                    validation: {
                      ...field.validation,
                      minLength: e.target.value ? parseInt(e.target.value) : undefined,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="No minimum"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Maximum Length
              </label>
              <input
                type="number"
                value={field.validation.maxLength || ''}
                onChange={(e) =>
                  onUpdate({
                    validation: {
                      ...field.validation,
                      maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="No maximum"
                min="0"
              />
            </div>
          </>
        )}

        {/* Validation - Min/Max for number fields */}
        {field.type === 'number' && (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Minimum Value
              </label>
              <input
                type="number"
                value={field.validation.min || ''}
                onChange={(e) =>
                  onUpdate({
                    validation: {
                      ...field.validation,
                      min: e.target.value ? parseFloat(e.target.value) : undefined,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="No minimum"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-1">
                Maximum Value
              </label>
              <input
                type="number"
                value={field.validation.max || ''}
                onChange={(e) =>
                  onUpdate({
                    validation: {
                      ...field.validation,
                      max: e.target.value ? parseFloat(e.target.value) : undefined,
                    },
                  })
                }
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="No maximum"
              />
            </div>
          </>
        )}

        {/* Options for select/radio/checkbox */}
        {hasOptions && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[var(--text-color)]">
                Options
              </label>
              <button
                onClick={addOption}
                className="px-3 py-1 text-sm rounded-lg border border-[var(--border-color)] hover:bg-gray-100 flex items-center gap-1"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={option.id} className="flex gap-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => updateOption(option.id, { 
                      label: e.target.value,
                      value: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    className="flex-1 px-3 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-sm"
                    placeholder={`Option ${index + 1}`}
                  />
                  {field.options && field.options.length > 1 && (
                    <button
                      onClick={() => deleteOption(option.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-[var(--error-color)]"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
