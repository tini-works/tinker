# Tailwind CSS v4 & DaisyUI v5 Migration Audit

## Current Setup (Before Migration)

### Dependencies

- **Tailwind CSS**: v3.3.5
- **DaisyUI**: v4.4.19
- **PostCSS**: v8.4.31
- **Autoprefixer**: v10.4.16
- **Vite**: v5.0.2
- **React**: v18.2.0

### Configuration Files

- `tailwind.config.js` - Traditional JS-based configuration
- `postcss.config.js` - Standard PostCSS setup with tailwindcss and autoprefixer
- `src/index.css` - Uses @tailwind directives with custom @layer rules

### DaisyUI Components Usage Audit

#### Buttons (btn classes)

- `btn` - Base button class (extensively used)
- `btn-ghost` - Ghost variant (MainLayout, LoginPage)
- `btn-primary` - Primary variant (most forms and actions)
- `btn-secondary` - Secondary variant (DashboardPage)
- `btn-accent` - Accent variant (DashboardPage)
- `btn-neutral` - Neutral variant (DashboardPage)
- `btn-outline` - Outline variant (multiple pages)
- `btn-error` - Error variant (InvoiceDetailPage)
- `btn-success` - Success variant (ApprovalPage)
- `btn-warning` - Warning variant (ApprovalPage)
- `btn-sm` - Small size modifier
- `btn-xs` - Extra small size modifier
- `btn-circle` - Circle variant (MainLayout)
- `btn-square` - Square variant (InvoiceListPage)
- `btn-block` - Block width (DashboardPage)

#### Cards (card classes)

- `card` - Base card class (extensively used)
- `card-body` - Card body container
- `card-title` - Card title styling
- `card-actions` - Card action area
- `bg-base-100` - Background color (used with cards)
- `shadow-xl` - Shadow utility (used with cards)

#### Alerts (alert classes)

- `alert` - Base alert class
- `alert-error` - Error variant (LoginPage, ApprovalPage)
- `alert-warning` - Warning variant (DashboardPage)
- `alert-info` - Info variant (DashboardPage)
- `alert-success` - Success variant (DashboardPage, PaymentRequestListPage)

#### Modals (modal classes)

- `modal-box` - Modal container (InvoiceDetailPage, ApprovalPage)
- `modal-action` - Modal action area

#### Layout & Navigation

- `join` and `join-item` - Join components for pagination
- `avatar` - Avatar component (MainLayout)

### Custom CSS Layers

```css
@layer base {
  :root {
    /* font and rendering settings */
  }
  body {
    /* basic body styles */
  }
}

@layer components {
  .app {
    @apply container mx-auto px-4 py-8;
  }
  .app-header {
    @apply mb-8;
  }
  h1 {
    @apply text-4xl font-bold;
  }
}
```

### Theme Configuration

- Themes: ['light', 'dark', 'corporate', 'business']
- Dark theme: 'dark'
- All DaisyUI features enabled (base, styled, utils, logs)

## Migration Targets

### Tailwind CSS v4 Changes

- Replace `@tailwind` directives with `@import "tailwindcss"`
- Migrate theme config to CSS using `@theme` directive
- Update PostCSS to use `@tailwindcss/postcss`

### DaisyUI v5 Changes

- Move plugin config to CSS using `@plugin "daisyui"`
- Update any deprecated classes (form-control, label-text, label-text-alt)
- Enhance accessibility with fieldset/legend structure where needed

## Risk Assessment

### High Risk Areas

- Form components that might use deprecated classes
- Custom @layer components integration with new CSS-first approach
- Build system compatibility with Vite

### Medium Risk Areas

- Theme switching functionality
- Modal implementations
- Complex card layouts

### Low Risk Areas

- Basic button and alert usage
- Simple card components
- Navigation elements

## Success Criteria

- All existing functionality preserved
- Build times improved (target: 3.5x faster)
- All themes working correctly
- No visual regressions
- All tests passing
