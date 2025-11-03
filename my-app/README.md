# 🎨 Form Builder

A modern form builder application similar to JotForm. Create custom forms with live preview, validation, and theme customization.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployed

Click [https://infoware-weld.vercel.app/]

## ✨ Features

- **Edit Mode** - Add, edit, delete, and reorder form fields
- **Preview Mode** - Test forms with real-time validation
- **Theme Customization** - Customize colors, fonts, and typography
- **Auto-Save** - Forms persist automatically to localStorage
- **Export/Import** - Share forms as JSON files
- **Responsive** - Mobile-first design, works on all devices

### Field Types
Text • Textarea • Email • Number • Select • Radio • Checkbox

### Validations
Required • Min/Max Length • Min/Max Value • Email Format • Help Text

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first styling
- **React Hook Form** - Form validation
- **Lucide React** - Icons

## 📂 Project Structure

```
my-app/
├── app/
│   ├── page.tsx        # Main form builder
│   ├── layout.tsx      # Root layout with ThemeProvider
│   └── globals.css     # Global styles & theme variables
├── components/
│   ├── Toolbar.tsx     # Mode toggle & actions
│   ├── FormCanvas.tsx  # Edit mode field list
│   ├── FieldCard.tsx   # Individual field card
│   ├── FieldEditor.tsx # Field editing panel
│   ├── FormRenderer.tsx # Preview mode with validation
│   └── ThemePanel.tsx  # Theme customization
└── lib/
    ├── types.ts        # TypeScript type definitions
    ├── formModel.ts    # Factory functions
    ├── storage.ts      # localStorage & export/import
    └── themeContext.tsx # Theme state management
```

## 🎯 How to Use

**Edit Mode:**
- Click "Add Field" to add new fields
- Click any field card to edit its properties
- Use ↑↓ arrows to reorder fields
- Click 🗑️ to delete a field

**Preview Mode:**
- Toggle to "Preview" to test your form
- All validations are active in preview

**Theme Customization:**
- Click ✨ sparkle button (bottom-right) to open theme panel
- Customize colors and fonts
- Changes apply in real-time

**Export/Import:**
- Export: Download your form as JSON
- Import: Load a form from JSON file

## 📜 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Check code quality
```

---

**Built with ❤️**
