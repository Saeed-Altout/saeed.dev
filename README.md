# Saeed Al-Tout Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a comprehensive showcase of projects, experience, and blog content with authentication capabilities.

## 🚀 Features

### Core Features

- **Responsive Design**: Mobile-first approach with beautiful UI across all devices
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Modern UI**: Built with shadcn/ui components for consistent design
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing with dynamic routes

### Pages & Sections

- **Home**: Hero section with featured projects and introduction
- **About**: Personal information, skills, and values
- **Projects**: Portfolio with filtering by categories and search functionality
- **Project Details**: Individual project pages with detailed information
- **Experience**: Work history with timeline visualization
- **Blog**: Articles with filtering and search capabilities
- **Blog Details**: Individual blog posts with rich content
- **Contact**: Contact form with multiple communication options
- **Terms & Privacy**: Legal pages for compliance

### Authentication

- **Quick Access Dialog**: Modal-based login/signup for quick access
- **Full Auth Pages**: Complete authentication flow with dedicated pages
- **Social Login**: Google and Twitter integration (ready for implementation)
- **Form Validation**: Client-side validation with proper error handling

### Technical Features

- **Search & Filter**: Advanced filtering for projects and blogs
- **Category Management**: Organized content by categories
- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

### Frontend

- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icon library
- **React Router**: Client-side routing
- **React Hook Form**: Form management and validation

### UI Components

- **Radix UI**: Accessible component primitives
- **Framer Motion**: Smooth animations
- **Sonner**: Toast notifications
- **Next Themes**: Theme management

### Development Tools

- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── modules/
│   ├── auth/           # Authentication module
│   │   ├── components/ # Auth components
│   │   ├── pages/      # Auth pages
│   │   └── schemas/    # Validation schemas
│   └── website/        # Main website module
│       ├── components/ # Website components
│       │   ├── cards/  # Card components
│       │   ├── common/ # Common components
│       │   └── sections/ # Page sections
│       ├── layout/     # Layout components
│       └── pages/      # Page components
├── lib/                # Utility functions
└── constants/          # App constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saeed-dev
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Styling

The project uses Tailwind CSS with a custom design system. Colors, spacing, and typography can be customized in the `tailwind.config.js` file.

### Content

- **Projects**: Update project data in `src/modules/website/components/sections/projects-section.tsx`
- **Blog Posts**: Update blog data in `src/modules/website/components/sections/blogs-section.tsx`
- **Experience**: Update experience data in `src/modules/website/components/sections/experience-section.tsx`
- **Skills**: Update skills data in `src/modules/website/components/sections/skills-section.tsx`

### Configuration

- **Site Information**: Update site details in `src/constants/`
- **Navigation**: Modify navigation items in `src/modules/website/components/common/navbar.tsx`
- **Footer**: Update footer links in `src/modules/website/components/common/footer.tsx`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Saeed Al-Tout Portfolio
VITE_APP_DESCRIPTION=Full Stack Developer Portfolio
VITE_APP_URL=https://your-domain.com
```

### Authentication Setup

The authentication system is ready for backend integration. Update the auth handlers in:

- `src/modules/website/components/auth-dialog.tsx`
- `src/modules/auth/components/`

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus management

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Other Platforms

The project can be deployed to any static hosting platform that supports React applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Saeed Al-Tout**

- Email: saeed@flexify.dev
- Website: https://flexify.dev
- LinkedIn: [LinkedIn Profile]
- GitHub: [GitHub Profile]

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Radix UI](https://www.radix-ui.com/) for accessible components

---

Built with ❤️ by Saeed Al-Tout
