'use client';

import React from 'react';
import { FormField } from '@/lib/types';
import { 
  Type, AlignLeft, Mail, Hash, ChevronDown, Circle, CheckSquare,
  GripVertical, Trash2, Edit2, ArrowUp, ArrowDown 
} from 'lucide-react';

interface FieldCardProps {
  field: FormField;
  index: number;
  totalFields: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const iconMap = {
  text: Type,
  textarea: AlignLeft,
  email: Mail,
  number: Hash,
  select: ChevronDown,
  radio: Circle,
  checkbox: CheckSquare,
};

export const FieldCard: React.FC<FieldCardProps> = ({
  field,
  index,
  totalFields,
  isSelected,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const Icon = iconMap[field.type];

  return (
    <div
      onClick={onSelect}
      className={`
        relative p-4 mb-3 rounded-lg border-2 transition-all cursor-pointer
        hover:shadow-md
        ${isSelected 
          ? 'border-[var(--primary-color)] bg-blue-50 shadow-md' 
          : 'border-[var(--border-color)] bg-white hover:border-gray-400'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        <div className="flex-shrink-0 mt-1 text-gray-400 cursor-grab active:cursor-grabbing">
          <GripVertical size={20} />
        </div>

        {/* Field icon */}
        <div className="flex-shrink-0 mt-1" style={{ color: 'var(--primary-color)' }}>
          <Icon size={20} />
        </div>

        {/* Field content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-[var(--text-color)] mb-1">
            {field.label}
          </div>
          <div className="text-sm text-gray-500">
            {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
            {field.validation.required && (
              <span className="ml-2 text-[var(--error-color)]">* Required</span>
            )}
          </div>
          {field.placeholder && (
            <div className="text-xs text-gray-400 mt-1">
              Placeholder: {field.placeholder}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={index === 0}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move up"
          >
            <ArrowUp size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={index === totalFields - 1}
            className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Move down"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="p-1.5 rounded hover:bg-blue-100"
            style={{ color: 'var(--primary-color)' }}
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this field?')) {
                onDelete();
              }
            }}
            className="p-1.5 rounded hover:bg-red-100 text-[var(--error-color)]"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
