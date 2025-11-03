'use client';

import React, { useState, useEffect } from 'react';
import { Form, FormField, FieldType } from '@/lib/types';
import { createForm, createField } from '@/lib/formModel';
import { saveForm, loadForm, exportForm, importForm } from '@/lib/storage';
import { Toolbar } from '@/components/Toolbar';
import { FormCanvas } from '@/components/FormCanvas';
import { FieldEditor } from '@/components/FieldEditor';
import { FormRenderer } from '@/components/FormRenderer';
import { ThemePanel } from '@/components/ThemePanel';

export default function Home() {
  const [form, setForm] = useState<Form>(createForm());
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load form from localStorage on mount
  useEffect(() => {
    const savedForm = loadForm();
    if (savedForm) {
      setForm(savedForm);
    }
    setMounted(true);
  }, []);

  // Save form to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      saveForm(form);
    }
  }, [form, mounted]);

  const handleAddField = (type: FieldType) => {
    const newField = createField(type);
    setForm({
      ...form,
      fields: [...form.fields, newField],
    });
    setSelectedFieldId(newField.id);
  };

  const handleFieldUpdate = (updates: Partial<FormField>) => {
    if (!selectedFieldId) return;

    setForm({
      ...form,
      fields: form.fields.map((field) =>
        field.id === selectedFieldId ? { ...field, ...updates } : field
      ),
    });
  };

  const handleFieldDelete = (fieldId: string) => {
    setForm({
      ...form,
      fields: form.fields.filter((field) => field.id !== fieldId),
    });
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const handleFieldMove = (fieldId: string, direction: 'up' | 'down') => {
    const index = form.fields.findIndex((field) => field.id === fieldId);
    if (index === -1) return;

    const newFields = [...form.fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newFields.length) return;

    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];

    setForm({
      ...form,
      fields: newFields,
    });
  };

  const handleExport = () => {
    exportForm(form);
  };

  const handleImport = async () => {
    try {
      const importedForm = await importForm();
      setForm(importedForm);
      setSelectedFieldId(null);
      alert('Form imported successfully!');
    } catch (error) {
      alert('Failed to import form. Please check the file format.');
    }
  };

  const selectedField = selectedFieldId
    ? form.fields.find((field) => field.id === selectedFieldId) || null
    : null;

  if (!mounted) {
    return null; 
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
      <Toolbar
        mode={mode}
        onModeChange={setMode}
        onAddField={handleAddField}
        onExport={handleExport}
        onImport={handleImport}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Form title in edit mode */}
        {mode === 'edit' && (
          <div className="mb-6">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="text-3xl font-bold border-none outline-none bg-transparent text-[var(--text-color)] w-full mb-2"
              placeholder="Form Title"
              style={{ fontFamily: 'var(--font-family)' }}
            />
            <textarea
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="text-lg border-none outline-none bg-transparent text-gray-600 w-full resize-none"
              placeholder="Form description (optional)"
              rows={2}
              style={{ fontFamily: 'var(--font-family)' }}
            />
          </div>
        )}

        {/* Edit mode */}
        {mode === 'edit' && (
          <FormCanvas
            fields={form.fields}
            selectedFieldId={selectedFieldId}
            onFieldSelect={setSelectedFieldId}
            onFieldDelete={handleFieldDelete}
            onFieldMove={handleFieldMove}
          />
        )}

        {/* Preview mode */}
        {mode === 'preview' && (
          <FormRenderer
            fields={form.fields}
            formTitle={form.title}
            formDescription={form.description}
          />
        )}
      </div>

      {/* Field editor panel */}
      {mode === 'edit' && (
        <FieldEditor
          field={selectedField}
          onUpdate={handleFieldUpdate}
          onClose={() => setSelectedFieldId(null)}
        />
      )}

      {/* Theme panel */}
      <ThemePanel />
    </div>
  );
}
