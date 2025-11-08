# Student Planner

A minimalist React web application designed to help university students manage their tasks and reduce stress.

## Features

- **Minimalist Dashboard**: Shows only tasks due in the next 7 days to reduce overwhelm
- **Syllabus Parser**: Automatically extracts tasks from syllabus text using AI-powered parsing
- **Task Management**: Add, view, and delete tasks with priorities, weightage, and effort levels
- **Calendar View**: Visual calendar showing all tasks with date indicators
- **Dark/Light Mode**: Built-in theme switcher for comfortable viewing
- **Local Storage**: All data persists in your browser - no backend needed

## Tech Stack

- **React.js**: Frontend framework
- **Chakra UI**: Component library for consistent, accessible UI
- **react-calendar**: Calendar component
- **Local Storage**: Browser-based data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── App.js              # Root component with state management and local storage
├── Dashboard.js        # Main view with task filtering and sorting
├── Calendar.js         # Calendar view with task indicators
├── TaskCard.js         # Reusable task display component
├── TaskForm.js         # Modal for adding new tasks
├── SyllabusParser.js   # Modal for parsing syllabus text
├── CalendarStyles.css  # Custom calendar styling
└── index.js            # Application entry point
```

## Usage

### Adding Tasks Manually

1. Click "Add Task" on the Dashboard
2. Fill in the task details:
   - Title (required)
   - Due Date (required)
   - Due Time (required)
   - Category (optional)
   - Priority (Low/Medium/High)
   - Weightage (0-100%)
   - Effort (Low/Medium/High)
   - Schedule Type (School/Work)
3. Click "Save Task"

### Parsing Syllabus

1. Click "Parse Syllabus" on the Dashboard
2. Paste your syllabus text (example format):
   ```
   Assignment 1 is due on Nov 10
   Lab 2 due Nov 15
   Quiz 1 on Dec 1
   Project submission by Dec 20
   ```
3. Click "Parse Text"
4. Review and edit the parsed tasks:
   - Add category information
   - Adjust priority levels
   - Set weightage percentages
   - Configure effort estimates
5. Click "Add to Calendar" to save all tasks

### Viewing Tasks

- **Dashboard Tab**: Shows tasks due in the next 7 days
  - Sort by Due Date, Priority, or Weightage
  - Tasks display with color-coded priority badges
  - Delete tasks with the trash icon

- **Calendar Tab**: Visual month view
  - Blue dots indicate dates with tasks
  - Click any date to see tasks for that day
  - Navigate between months using arrows

### Dark/Light Mode

Click the moon/sun icon in the header to toggle between dark and light themes.

## Data Structure

Tasks are stored with the following structure:

```javascript
{
  id: string,           // Unique identifier
  title: string,        // Task name
  dueDate: string,      // YYYY-MM-DD format
  dueTime: string,      // 24-hour format (HH:MM)
  priority: string,     // "High", "Medium", or "Low"
  weightage: number,    // 0-100
  effort: string,       // "High", "Medium", or "Low"
  category: string,     // e.g., "ENPE 200"
  scheduleType: string  // "School" or "Work"
}
```

## Local Storage

All tasks are automatically saved to browser local storage under the key `studentPlannerTasks`. Data persists across browser sessions but is device-specific.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Browser Compatibility

Works on all modern browsers that support:
- ES6+ JavaScript
- Local Storage API
- CSS Grid and Flexbox

## License

MIT

## Credits

Built for a hackathon to help students reduce stress and manage their workload effectively.
