// Core form field types
export type FieldType = 'text' | 'textarea' | 'email' | 'number' | 'select' | 'radio' | 'checkbox';

// Validation rules for fields
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

// Option for select, radio, checkbox fields
export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

// Form field definition
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  validation: ValidationRule;
  options?: FieldOption[]; // For select, radio, checkbox
  defaultValue?: string | boolean;
}

// Complete form definition
export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

// Theme configuration
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  errorColor: string;
  fontFamily: string;
  baseFontSize: string;
  headingFontSize: string;
}

// Form builder mode
export type FormMode = 'edit' | 'preview';
