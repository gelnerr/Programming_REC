# Programming - REC 2025
### 🧩 Problem Statement
University students often struggle to stay organized and manage their study time effectively across multiple classes, assignments, labs, midterms, and appointments. This often leads to missed deadlines, poor academic performance, and burnout.

Our task was to design a **minimum viable product (MVP)** that helps students efficiently manage their academic life. The tool should be intuitive, featuring a **calendar** and a **dashboard**, allowing users to input tasks at specific dates and times.

---

## 💡 Solution Overview
Our solution, **Syllabyte**, is an intelligent planner that automates task management for students.

Instead of manually entering dozens of deadlines from multiple syllabi, students can **paste their syllabus text directly into the app**, and our parser automatically extracts key dates (assignments, labs, quizzes, exams) and adds them to a clean, visual calendar.

### Core Goals
- Simplify task entry  
- Reduce setup time at the start of the term  
- Help students visualize workload distribution  
- Prevent burnout through smart prioritization and minimal display

---

## 🧠 Key Features (MVP)
| Feature | Description |
|----------|-------------|
| 🗓️ **Calendar Integration** | Input tasks for specific dates and times |
| ⭐ **Smart Priority System** | Automatically ranks tasks by urgency and effort |
| 📋 **Syllabus Parser** | Paste course outlines; the app extracts and lists deadlines using Regex |
| 🎨 **Color-Coded Dashboard** | Visual priority indicators based on effort and due date |
| 🌙 **Dark/Light Mode** | Accessibility option for late-night or bright-light studying |
| 🧭 **Minimal Display Mode** | Reduces on-screen clutter, showing only upcoming tasks |

---

## 🗺️ Story Map Overview
### Epics
- **Scheduling** – Calendar editing and priority task creation  
- **Syllabus Parser** – Text parsing and automated task detection  
- **Dashboard Overview** – Daily/weekly view and upcoming summary  
- **Accessibility** – Customizable appearance and dark/light mode  

### MVP Highlights
- Ability to input tasks at specific dates and times  
- Smart priority assignment (based on effort and urgency)  
- Regex-based syllabus parsing  
- Automatic weekly task generation  
- Color-coded categorization  
- Minimalist task display  

---

## ⚙️ Tech Stack
- **Frontend:** React.js / TypeScript  
- **Styling:** TailwindCSS / Chakra UI  
- **Logic:** JavaScript Regex for syllabus parsing  
- **Storage:** LocalStorage (for MVP)  
- **Version Control:** GitHub  

---

## 🧑‍💻 Team Roles
| Name | Role | Key Contribution |
|------|------|------------------|
| Member 1 | Frontend Developer | Dashboard & Calendar UI |
| Member 2 | Backend Logic | Syllabus Parser & Regex extraction |
| Member 3 | UX Designer | Theme, accessibility, and layout |
| Member 4 | Presenter & Documentation | README, slides, and GitHub organization |

---

## 🧾 Deliverables
- ✅ Usable program (MVP)
- ✅ GitHub repository with commit history
- ✅ User guide for operation
- ✅ 10-minute presentation covering:
  - Introduction  
  - Methodology  
  - Features  
  - Issues encountered  

---

## ⚡ Future Enhancements (Post-MVP)
- Notifications for upcoming deadlines  
- Study time recommendations based on workload  
- Sync with Google Calendar  
- Task completion analytics  

---
