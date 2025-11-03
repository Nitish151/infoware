'use client';

import React from 'react';
import { FormField } from '@/lib/types';
import { FieldCard } from './FieldCard';

interface FormCanvasProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldDelete: (fieldId: string) => void;
  onFieldMove: (fieldId: string, direction: 'up' | 'down') => void;
}

export const FormCanvas: React.FC<FormCanvasProps> = ({
  fields,
  selectedFieldId,
  onFieldSelect,
  onFieldDelete,
  onFieldMove,
}) => {
  if (fields.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-[var(--border-color)] rounded-lg">
        <div className="text-center text-gray-400">
          <p className="text-lg mb-2">No fields yet</p>
          <p className="text-sm">Click "Add Field" to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {fields.map((field, index) => (
        <FieldCard
          key={field.id}
          field={field}
          index={index}
          totalFields={fields.length}
          isSelected={field.id === selectedFieldId}
          onSelect={() => onFieldSelect(field.id)}
          onDelete={() => onFieldDelete(field.id)}
          onMoveUp={() => onFieldMove(field.id, 'up')}
          onMoveDown={() => onFieldMove(field.id, 'down')}
        />
      ))}
    </div>
  );
};
