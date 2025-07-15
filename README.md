# Stellr-Academy
# 🎨 Stellr Academy – Frontend Task Breakdown (React + Vite + TypeScript + Tailwind CSS)

> Stack: React 18, Vite, TypeScript, Tailwind CSS, React Router, Axios, Zustand/Context

---

## ⚙️ 1. Project Setup

- [ ] Initialize project using Vite + React + TypeScript
- [ ] Set up Tailwind CSS with PostCSS
- [ ] Configure Prettier + ESLint for TypeScript
- [ ] Setup folder structure (`src/components`, `src/pages`, `src/services`, etc.)
- [ ] Configure absolute imports (via `tsconfig.json`)
- [ ] Add basic `vite.config.ts` setup
- [ ] Add global error boundary and 404 page

---

## 🌐 2. Routing & Layout

- [ ] Install and configure `react-router-dom`
- [ ] Create public/private route structure
- [ ] Create main layout with header, footer, sidebar (for dashboard)
- [ ] Add route-level guards for authenticated access

**Pages:**
- [ ] Landing Page (`/`)
- [ ] Login Page (`/login`)
- [ ] Register Page (`/register`)
- [ ] Dashboard (`/dashboard`)
- [ ] Course Catalog (`/courses`)
- [ ] Course Detail / Lesson View (`/courses/:id`)
- [ ] Quiz Page (`/courses/:id/quiz`)
- [ ] Certificate Page (`/certificates`)
- [ ] Settings/Profile (`/settings`)

---

## 👤 3. Authentication UI

- [ ] Login with email or phone number
- [ ] OTP verification screens (for phone auth)
- [ ] Handle token storage via `localStorage` or `httpOnly` cookie
- [ ] Show error messages and form validation (React Hook Form / Zod)
- [ ] Redirect to dashboard after login
- [ ] Show loading indicators for async auth

---

## 🎓 4. Onboarding Flow

- [ ] Show welcome screen or onboarding tooltip for first-time users
- [ ] Optional: skip/complete onboarding state tracking
- [ ] Save onboarding state via API or local storage

---

## 📚 5. Course Catalog

- [ ] Fetch and display all courses
- [ ] Filter by hardcoded categories (e.g., Web Dev, Design)
- [ ] Display course tags (e.g., Beginner)
- [ ] Card-based layout for courses (responsive grid)
- [ ] Course detail view with lesson list and descriptions

---

## 🎥 6. Course Player

- [ ] Fetch and display video lesson content (embedded YouTube/Vimeo)
- [ ] Show downloadable PDFs/transcripts
- [ ] Mark lesson as completed (button + API call)
- [ ] Show "Next Lesson" CTA
- [ ] Responsive video player (maintain aspect ratio)

---

## ✅ 7. Quiz System

- [ ] Display quiz questions (multiple choice)
- [ ] Store answers locally before submit
- [ ] Submit answers to backend
- [ ] Show quiz result with score/feedback
- [ ] Basic validation (require all questions answered)

---

## 🧾 8. Certificate UI

- [ ] List of completed courses with certificates
- [ ] Download certificate PDF (from backend)
- [ ] Show certificate preview (iframe or image embed)

---

## 📊 9. User Dashboard

- [ ] Show enrolled courses and progress bars
- [ ] Display quiz completion and certificate status
- [ ] Show next recommended lesson
- [ ] Activity timeline (optional)

---

## ⚙️ 10. Settings & Profile

- [ ] View and update profile info (name, phone, avatar)
- [ ] Change notification preferences
- [ ] Logout button
- [ ] Delete account (optional)

---

## 🔔 11. Notifications & Alerts

- [ ] Basic toast system (using shadcn/ui or `react-hot-toast`)
- [ ] Show notification on lesson complete, quiz complete, etc.
- [ ] Hook into push notification API (OneSignal / FCM integration ready)

---

## 🌐 12. Accessibility & Performance

- [ ] Ensure contrast and readable fonts
- [ ] Add alt tags to all images
- [ ] Use lazy loading for images/videos
- [ ] Tailwind responsive utilities (mobile-first)
- [ ] Lighthouse checks (score above 90)

---

## 🌍 13. Localization Support (Optional)

- [ ] Setup `i18next` or `react-intl`
- [ ] Language switcher (English only in MVP)
- [ ] Store user preference

---

## 🔁 14. State Management & Services

- [ ] Use Zustand or Context API for global state (auth, user, progress)
- [ ] Create `apiClient.ts` using Axios with interceptors
- [ ] Create API service files for:
  - `authService.ts`
  - `courseService.ts`
  - `progressService.ts`
  - `quizService.ts`
  - `certificateService.ts`

---

## 🧪 15. Testing & QA

- [ ] Unit test core components (Jest + React Testing Library)
- [ ] Write test cases for key user flows
- [ ] Manual QA on mobile, tablet, desktop
- [ ] Test slow network conditions using DevTools

---

## 🚀 16. Deployment

- [ ] Add `vite.config.ts` base path for deployment
- [ ] Add `.env` support for API base URLs
- [ ] Deploy to Vercel or Netlify
- [ ] Setup preview environment for staging (CI/CD optional)

---

## 📁 Suggested Folder Structure

