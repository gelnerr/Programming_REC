# Student Planner - Comprehensive Test Cases

**Created with help of Claude AI**

## 1. DASHBOARD/TASKS PAGE

### 1.1 View Mode Toggle
- **TC-001**: Click "Today" button - should show only tasks due today
- **TC-002**: Click "This Week" button - should show tasks due within next 7 days
- **TC-003**: Click "All Tasks" button - should show all tasks regardless of date
- **TC-004**: Default view on load - should be "This Week"

### 1.2 Task Display
- **TC-005**: Incomplete tasks should be shown in "Incomplete Tasks" section
- **TC-006**: Completed tasks should be shown in "Completed Tasks" section
- **TC-007**: Tasks should display: title, due date, due time, priority badge, weightage, category
- **TC-008**: Completed tasks should have strikethrough text and reduced opacity

### 1.3 Sorting
- **TC-009**: Sort by Due Date - tasks should be ordered by date then time
- **TC-010**: Sort by Priority - High > Medium > Low
- **TC-011**: Sort by Weightage - highest percentage first

### 1.4 Task Completion
- **TC-012**: Check task checkbox - task moves to completed section
- **TC-013**: Uncheck completed task - task moves back to incomplete section
- **TC-014**: Completion updates stats immediately

### 1.5 Task Deletion
- **TC-015**: Click delete button - task is removed from list
- **TC-016**: Delete updates stats immediately

### 1.6 Statistics
- **TC-017**: "Incomplete" stat shows count of uncompleted tasks
- **TC-018**: "Completed" stat shows count of completed tasks
- **TC-019**: "Total Tasks" shows total count
- **TC-020**: "Completion %" shows (completed/total)*100

### 1.7 Focus Mode
- **TC-021**: Focus Mode section shows next incomplete task
- **TC-022**: "Start Pomodoro" button opens Focus Mode modal
- **TC-023**: Focus Mode hidden when no incomplete tasks

### 1.8 Empty State
- **TC-024**: With no tasks, show welcome screen with Parse Syllabus and Add Task buttons

## 2. CALENDAR PAGE

### 2.1 Calendar Display
- **TC-025**: Calendar shows current month
- **TC-026**: Dates with tasks show blue dot indicator
- **TC-027**: Click on date - selects that date

### 2.2 Task Display for Selected Date
- **TC-028**: Shows tasks for selected date
- **TC-029**: Shows formatted date (e.g., "Monday, January 8, 2025")
- **TC-030**: Empty date shows "No tasks for this day" message

### 2.3 Task Interactions on Calendar
- **TC-031**: Checkbox works - can complete/uncomplete tasks
- **TC-032**: Delete button works - removes task from calendar
- **TC-033**: Deleting task removes blue dot if no other tasks on that date
- **TC-034**: Completing task updates visual state (strikethrough, opacity)

## 3. SYLLABUS PARSER

### 3.1 Text Input
- **TC-035**: Can paste syllabus text into textarea
- **TC-036**: Empty text shows error "Please enter some text to parse"

### 3.2 Task Parsing
- **TC-037**: Recognizes "Assignment" with date
- **TC-038**: Recognizes "Lab" with date
- **TC-039**: Recognizes "Quiz" with date
- **TC-040**: Recognizes "Project" with date
- **TC-041**: Recognizes "Midterm" with date
- **TC-042**: Recognizes "Final Exam" with date
- **TC-043**: Recognizes "Test" with date
- **TC-044**: Does NOT match "Test" within "Testing"
- **TC-045**: Extracts course code (e.g., "ENSE 354", "CS 101")
- **TC-046**: Extracts weightage percentage when present
- **TC-047**: Handles various date formats (Jan 10, January 10, etc.)

### 3.3 Year Detection
- **TC-048**: Current year for future dates
- **TC-049**: Next year for past dates
- **TC-050**: Dates from today onward stay in current year

### 3.4 Task Confirmation & Editing
- **TC-051**: Shows parsed tasks in confirmation step
- **TC-052**: Can edit Course Name for each task
- **TC-053**: Can edit Priority (Low/Medium/High)
- **TC-054**: Can edit Weightage percentage
- **TC-055**: Can edit Effort (Low/Medium/High)
- **TC-056**: Can remove unwanted tasks with delete button

### 3.5 Adding to Calendar
- **TC-057**: "Add to Calendar" button adds all confirmed tasks
- **TC-058**: Added tasks appear on Dashboard
- **TC-059**: Added tasks appear on Calendar
- **TC-060**: Success alert shows count of added tasks
- **TC-061**: Modal closes after adding
- **TC-062**: All fields reset after adding

## 4. TASK FORM (Manual Add)

### 4.1 Form Fields
- **TC-063**: Can enter Title
- **TC-064**: Can select Due Date (date picker)
- **TC-065**: Can select Due Time (time picker)
- **TC-066**: Can enter Course Name
- **TC-067**: Can select Priority (Low/Medium/High)
- **TC-068**: Can enter Weightage (0-100)
- **TC-069**: Can select Effort (Low/Medium/High)
- **TC-070**: Can select Schedule Type (School/Work)

### 4.2 Validation
- **TC-071**: Empty Title shows error
- **TC-072**: Empty Due Date shows error
- **TC-073**: Empty Due Time shows error

### 4.3 Save Functionality
- **TC-074**: Valid task is added to tasks list
- **TC-075**: New task appears on Dashboard
- **TC-076**: New task appears on Calendar
- **TC-077**: Form resets after save
- **TC-078**: Modal closes after save

### 4.4 Cancel Functionality
- **TC-079**: Cancel button closes modal
- **TC-080**: Closing modal resets form

## 5. ANALYTICS PAGE

### 5.1 Statistics Display
- **TC-081**: Shows task completion stats
- **TC-082**: Shows progress charts
- **TC-083**: Displays correctly with no tasks
- **TC-084**: Updates when tasks change

## 6. SETTINGS PAGE

### 6.1 Settings Display
- **TC-085**: Settings page loads without errors

## 7. GENERAL FEATURES

### 7.1 Navigation
- **TC-086**: Click "Tasks" in sidebar - navigates to Dashboard
- **TC-087**: Click "Calendar" in sidebar - navigates to Calendar
- **TC-088**: Click "Analytics" in sidebar - navigates to Analytics
- **TC-089**: Click "Settings" in sidebar - navigates to Settings
- **TC-090**: Active page highlighted in sidebar

### 7.2 Dark Mode
- **TC-091**: Click moon icon - switches to dark mode
- **TC-092**: Click sun icon - switches to light mode
- **TC-093**: All components render correctly in dark mode

### 7.3 Search
- **TC-094**: Search box is visible in header
- **TC-095**: Can type in search box

### 7.4 LocalStorage Persistence
- **TC-096**: Tasks saved to localStorage on add
- **TC-097**: Tasks saved to localStorage on update
- **TC-098**: Tasks saved to localStorage on delete
- **TC-099**: Tasks loaded from localStorage on page refresh
- **TC-100**: Empty tasks array handled correctly

### 7.5 Motivational Quotes
- **TC-101**: Morning quote (before 12pm)
- **TC-102**: Afternoon quote (12pm-6pm)
- **TC-103**: Evening quote (after 6pm)

## 8. EDGE CASES & ERROR HANDLING

### 8.1 Data Integrity
- **TC-104**: Handle corrupt localStorage data gracefully
- **TC-105**: Handle missing task fields
- **TC-106**: Handle invalid dates

### 8.2 UI Responsiveness
- **TC-107**: Works on desktop (1400px+)
- **TC-108**: Works on tablet (768px-1400px)
- **TC-109**: Works on mobile (<768px)

### 8.3 Multiple Tasks
- **TC-110**: Can handle 0 tasks
- **TC-111**: Can handle 1 task
- **TC-112**: Can handle 100+ tasks
- **TC-113**: Scrolling works with many tasks

## TEST RESULTS TEMPLATE

| Test ID | Test Case | Status | Notes |
|---------|-----------|--------|-------|
| TC-001  | Today view | ⏳ | |
| TC-002  | This Week view | ⏳ | |
| ...     | ... | ... | ... |

Legend:
- ✅ PASS
- ❌ FAIL
- ⏳ NOT TESTED
- ⚠️ PARTIAL
