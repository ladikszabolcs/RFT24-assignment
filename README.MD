# UniCourse - Learning Management System

A modern, responsive learning management system built with React, TypeScript, and Tailwind CSS.

![UniCourse Screenshot](https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200)

## Features

### Authentication & Authorization
- Secure login system
- Role-based access control (Student, Teacher, Admin)
- Protected routes based on user roles
- Persistent authentication state

### User Management (Admin)
- Create, edit, and manage user accounts
- Assign user roles (Student, Teacher, Admin)
- View all users in a responsive data table
- Bulk user management capabilities

### Lecture Management (Admin & Teacher)
- Create and manage weekly recurring lectures
- Set lecture details:
    - Title and description
    - Start and end times
    - Maximum student capacity
    - Day of the week
- View enrolled students
- Manage lecture schedules

### Student Features
- View available lectures in calendar view
- Enroll in/unenroll from lectures
- Track enrolled courses
- View lecture details and schedules

### Calendar System
- Weekly view of lectures
- Interactive calendar navigation
- Visual representation of lecture schedules
- Quick access to lecture details
- Responsive design for all screen sizes

### Internationalization (i18n)
- Multi-language support with:
    - English (en)
    - Hungarian (hu)
    - Estonian (et)
- Language detection
- Persistent language preference
- Easy language switching via dropdown

### Theme System
- Light/Dark mode support
- System preference detection
- Persistent theme preference
- Smooth theme transitions

### UI/UX Features
- Responsive design for all screen sizes
- Modern and clean interface
- Interactive components
- Loading states and animations
- Error handling and feedback
- Accessible design patterns
- Mobile-first approach

### Technical Features
- Built with React 18 and TypeScript
- State management with Zustand
- Form handling and validation
- API integration ready
- Responsive Tailwind CSS design
- React Query for data fetching
- Component-based architecture

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Calendar/       # Calendar-related components
│   ├── Lectures/       # Lecture-related components
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── store/              # Zustand store configurations
├── i18n/               # Internationalization setup
│   └── locales/        # Translation files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Future Enhancements

- [ ] API Integration
- [ ] Real-time notifications
- [ ] File upload for lecture materials
- [ ] Student attendance tracking
- [ ] Grading system
- [ ] Discussion forums
- [ ] Chat system
- [ ] Mobile app version
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Integration with external calendars

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Dev team

- Juszku Dorina - DV0PEQ
- Nagy Réka Zsuzsa - QUG6DT
- Ladik Szabolcs Viktor - LJFKD6

## License

This project is licensed under the MIT License - see the LICENSE file for details.