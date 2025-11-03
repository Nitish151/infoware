import { v4 as uuidv4 } from 'uuid';
import { FormField, FieldType, Form, FieldOption } from './types';

// Default validation rules
export const defaultValidation = {
  required: false,
};

// Create a new field with default values
export const createField = (type: FieldType): FormField => {
  const baseField = {
    id: uuidv4(),
    type,
    label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    placeholder: '',
    helpText: '',
    validation: { ...defaultValidation },
  };

  // Add options for select, radio, checkbox
  if (type === 'select' || type === 'radio' || type === 'checkbox') {
    return {
      ...baseField,
      options: [
        createOption('Option 1'),
        createOption('Option 2'),
      ],
    };
  }

  return baseField;
};

// Create a new option for select/radio/checkbox
export const createOption = (label: string): FieldOption => ({
  id: uuidv4(),
  label,
  value: label.toLowerCase().replace(/\s+/g, '-'),
});

// Create a new empty form
export const createForm = (): Form => ({
  id: uuidv4(),
  title: 'Untitled Form',
  description: '',
  fields: [],
});

// Field type configurations for UI
export const fieldTypeConfig = {
  text: { label: 'Text Input', icon: 'Type' },
  textarea: { label: 'Text Area', icon: 'AlignLeft' },
  email: { label: 'Email', icon: 'Mail' },
  number: { label: 'Number', icon: 'Hash' },
  select: { label: 'Dropdown', icon: 'ChevronDown' },
  radio: { label: 'Radio Buttons', icon: 'Circle' },
  checkbox: { label: 'Checkboxes', icon: 'CheckSquare' },
} as const;
