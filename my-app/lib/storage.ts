import { Form, Theme } from './types';

const FORM_STORAGE_KEY = 'form-builder-form';
const THEME_STORAGE_KEY = 'form-builder-theme';

// Default theme
export const defaultTheme: Theme = {
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderColor: '#d1d5db',
  errorColor: '#ef4444',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  baseFontSize: '16px',
  headingFontSize: '24px',
};

// Save form to localStorage
export const saveForm = (form: Form): void => {
  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
  } catch (error) {
    console.error('Failed to save form:', error);
  }
};

// Load form from localStorage
export const loadForm = (): Form | null => {
  try {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load form:', error);
    return null;
  }
};

// Export form as JSON file
export const exportForm = (form: Form): void => {
  const json = JSON.stringify(form, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `form-${form.id}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Import form from JSON file
export const importForm = (): Promise<Form> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const form = JSON.parse(event.target?.result as string);
          resolve(form);
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    };

    input.click();
  });
};

// Save theme to localStorage
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error('Failed to save theme:', error);
  }
};

// Load theme from localStorage
export const loadTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored ? { ...defaultTheme, ...JSON.parse(stored) } : defaultTheme;
  } catch (error) {
    console.error('Failed to load theme:', error);
    return defaultTheme;
  }
};
