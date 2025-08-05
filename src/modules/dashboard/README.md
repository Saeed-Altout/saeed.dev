# Dashboard Module

This module provides a complete dashboard for managing technologies and projects in your portfolio.

## Features

### Technologies Management

- ✅ Add new technologies with name, description, category, icon, and color
- ✅ View all technologies in a clean grid layout
- ✅ Edit existing technologies
- ✅ Delete technologies with confirmation
- ✅ Search technologies by name, category, or description
- ✅ Active/Inactive status management

### Projects Management

- ✅ Add new projects with comprehensive details
- ✅ View all projects in a card-based layout
- ✅ Edit existing projects
- ✅ Delete projects with confirmation
- ✅ Search projects by name, description, or technologies
- ✅ Active/Inactive and Featured status management
- ✅ Link projects to technologies
- ✅ Add features to projects
- ✅ GitHub and demo URL support

### Dashboard Overview

- ✅ Statistics cards showing total technologies and projects
- ✅ Quick action buttons for adding new items
- ✅ Recent activity feed
- ✅ Clean and modern UI design

## Architecture

### State Management

- Uses **Zustand** for state management with localStorage persistence
- Centralized store for technologies and projects
- Optimistic updates for better UX

### Data Structure

#### Technology

```typescript
type Technology = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
```

#### Project

```typescript
type Project = {
  id: string;
  name: string;
  description: string;
  logo: string;
  cover: string;
  github: string;
  demo: string;
  technologies: string[];
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};
```

### Components

#### Core Components

- `TechnologyForm` - Form for adding/editing technologies
- `TechnologyList` - Grid view of all technologies
- `ProjectForm` - Form for adding/editing projects
- `ProjectList` - Card view of all projects

#### Pages

- `DashboardPage` - Overview dashboard with stats and quick actions
- `TechnologiesPage` - Technologies management page
- `ProjectsPage` - Projects management page

### File Structure

```
dashboard/
├── components/
│   ├── technology-form.tsx
│   ├── technology-list.tsx
│   ├── project-form.tsx
│   └── project-list.tsx
├── pages/
│   ├── index.tsx
│   ├── technologies/
│   │   ├── index.tsx
│   │   └── new/
│   └── projects/
│       ├── index.tsx
│       └── new/
├── stores/
│   └── dashboard-store.ts
├── types/
│   └── index.ts
├── schemas/
│   └── index.ts
├── api/
│   └── index.ts
└── layout/
    └── index.tsx
```

## Usage

### Adding a Technology

1. Navigate to `/dashboard/technologies`
2. Click "Add Technology" button
3. Fill in the form with technology details
4. Click "Create Technology"

### Adding a Project

1. Navigate to `/dashboard/projects`
2. Click "Add Project" button
3. Fill in the form with project details
4. Select technologies from the dropdown
5. Add features as needed
6. Click "Create Project"

### Editing Items

1. Hover over any technology or project card
2. Click the edit icon (pencil)
3. Modify the details in the form
4. Click "Update" to save changes

### Deleting Items

1. Hover over any technology or project card
2. Click the delete icon (trash)
3. Confirm deletion in the dialog

## Technical Details

### Dependencies

- `zustand` - State management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@radix-ui/react-select` - Select component
- `@radix-ui/react-dialog` - Dialog component
- `@radix-ui/react-alert-dialog` - Alert dialog component
- `lucide-react` - Icons
- `sonner` - Toast notifications

### Styling

- Uses Tailwind CSS for styling
- Follows shadcn/ui design system
- Responsive design for mobile and desktop
- Clean, modern UI without card shadows or borders as requested

### Data Persistence

- Data is persisted in localStorage using Zustand's persist middleware
- Automatic data recovery on page reload
- No external API required (simulated for demo purposes)

## Future Enhancements

- [ ] Image upload for project logos and covers
- [ ] Technology icons library
- [ ] Project templates
- [ ] Bulk operations
- [ ] Export/import functionality
- [ ] Advanced filtering and sorting
- [ ] Project analytics
- [ ] Technology usage statistics
