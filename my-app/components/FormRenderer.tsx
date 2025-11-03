'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '@/lib/types';
import { CheckCircle } from 'lucide-react';

interface FormRendererProps {
  fields: FormField[];
  formTitle: string;
  formDescription?: string;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  formTitle,
  formDescription,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully! Check console for data.');
  };

  if (fields.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-[var(--border-color)] rounded-lg">
        <div className="text-center text-gray-400">
          <p className="text-lg">No fields in preview</p>
          <p className="text-sm mt-1">Add fields in edit mode</p>
        </div>
      </div>
    );
  }

  if (isSubmitSuccessful) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg border border-[var(--border-color)]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-color)] mb-2">
            Form Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Your form has been submitted successfully.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2 rounded-lg font-medium text-white"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Form header */}
        <div className="bg-white p-6 rounded-lg border border-[var(--border-color)]">
          <h2 
            className="font-bold text-[var(--text-color)] mb-2"
            style={{ fontSize: 'var(--heading-font-size)' }}
          >
            {formTitle}
          </h2>
          {formDescription && (
            <p className="text-gray-600">{formDescription}</p>
          )}
        </div>

        {/* Form fields */}
        <div className="bg-white p-6 rounded-lg border border-[var(--border-color)] space-y-6">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-[var(--text-color)] mb-2">
                {field.label}
                {field.validation.required && (
                  <span className="text-[var(--error-color)] ml-1">*</span>
                )}
              </label>

              {field.helpText && (
                <p className="text-sm text-gray-500 mb-2">{field.helpText}</p>
              )}

              {/* Text input */}
              {field.type === 'text' && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  {...register(field.id, {
                    required: field.validation.required ? 'This field is required' : false,
                    minLength: field.validation.minLength
                      ? {
                          value: field.validation.minLength,
                          message: `Minimum ${field.validation.minLength} characters`,
                        }
                      : undefined,
                    maxLength: field.validation.maxLength
                      ? {
                          value: field.validation.maxLength,
                          message: `Maximum ${field.validation.maxLength} characters`,
                        }
                      : undefined,
                  })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              )}

              {/* Email input */}
              {field.type === 'email' && (
                <input
                  type="email"
                  placeholder={field.placeholder}
                  {...register(field.id, {
                    required: field.validation.required ? 'This field is required' : false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              )}

              {/* Number input */}
              {field.type === 'number' && (
                <input
                  type="number"
                  placeholder={field.placeholder}
                  {...register(field.id, {
                    required: field.validation.required ? 'This field is required' : false,
                    min: field.validation.min
                      ? {
                          value: field.validation.min,
                          message: `Minimum value is ${field.validation.min}`,
                        }
                      : undefined,
                    max: field.validation.max
                      ? {
                          value: field.validation.max,
                          message: `Maximum value is ${field.validation.max}`,
                        }
                      : undefined,
                  })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              )}

              {/* Textarea */}
              {field.type === 'textarea' && (
                <textarea
                  placeholder={field.placeholder}
                  rows={4}
                  {...register(field.id, {
                    required: field.validation.required ? 'This field is required' : false,
                    minLength: field.validation.minLength
                      ? {
                          value: field.validation.minLength,
                          message: `Minimum ${field.validation.minLength} characters`,
                        }
                      : undefined,
                    maxLength: field.validation.maxLength
                      ? {
                          value: field.validation.maxLength,
                          message: `Maximum ${field.validation.maxLength} characters`,
                        }
                      : undefined,
                  })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
              )}

              {/* Select dropdown */}
              {field.type === 'select' && (
                <select
                  {...register(field.id, {
                    required: field.validation.required ? 'This field is required' : false,
                  })}
                  className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Radio buttons */}
              {field.type === 'radio' && (
                <div className="space-y-2">
                  {field.options?.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        {...register(field.id, {
                          required: field.validation.required ? 'This field is required' : false,
                        })}
                        className="w-4 h-4 text-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Checkboxes */}
              {field.type === 'checkbox' && (
                <div className="space-y-2">
                  {field.options?.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={option.value}
                        {...register(field.id, {
                          required: field.validation.required ? 'Select at least one option' : false,
                        })}
                        className="w-4 h-4 text-[var(--primary-color)] rounded focus:ring-2 focus:ring-[var(--primary-color)]"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Error message */}
              {errors[field.id] && (
                <p className="text-sm text-[var(--error-color)] mt-1">
                  {errors[field.id]?.message as string}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};