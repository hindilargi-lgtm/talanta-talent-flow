# Talanta Jobs Portal Implementation Plan

Build a job portal for Talanta Stadium for short-term job applications. The app features a landing page with job listings, an applicant flow (Sign Up/In, Apply), and an HR Admin dashboard for managing applications.

## Scope Summary
- **App Name:** Talanta Jobs
- **Branding:** Red, Black, White theme. Logo: `https://storage.googleapis.com/dala-prod-public-storage/attachments/b438e72e-bb62-4ecf-af9b-527039257c18/1782580218082_1782570804405.jpg`
- **Target Roles:** Applicant, Admin (HR)
- **Persistence:** LocalStorage (as per session constraints, no Supabase/Database)

## Non-Goals
- Remote database persistence (using LocalStorage for demo/simulated state)
- Email notifications or actual authentication server
- Real Excel/PDF generation (will provide button UI and simulated export)

## Assumptions & Open Questions
- **Admin Access:** Hardcoded check for email `admin` (as requested) to access HR Dashboard.
- **Data Persistence:** Since no database is allowed, all sign-ups and applications will be saved to `localStorage`. Data will persist on the same browser/device.
- **Icon:** Use the provided image URL for the app logo/icon.

## Affected Areas
- **Frontend:**
  - `src/App.tsx`: Main router and state management.
  - `src/components/layout`: Navbar (with Sign In/Up), Footer (with WhatsApp/Telegram).
  - `src/components/jobs`: Job cards and details.
  - `src/components/auth`: Sign Up/Sign In forms.
  - `src/components/admin`: Dashboard table, filters, approve/reject actions.
  - `src/hooks/useStorage.ts`: Custom hook to manage localStorage data for jobs and users.

## Phases

### 1. Setup & Branding (frontend_engineer)
- Set up theme colors (Red/Black/White) in `src/index.css`.
- Create shared layout components (Navbar, Footer).
- Integrate the Talanta Logo in the header.
- Add WhatsApp/Telegram support links in the footer.

### 2. Job Listings & Auth UI (frontend_engineer)
- Implement `JobsPage` with the 4 specific job cards: Wapaka Rangi, Wapanguza Vitu, Wapanda Maua, Weka Tiles.
- Create `SignUp` and `SignIn` modals/pages.
- Create `ApplicationForm` modal for "Apply Now".

### 3. State Management & Logic (frontend_engineer)
- Implement `localStorage` logic for:
  - `users`: Array of registered applicants.
  - `applications`: Array of job applications with status (Pending/Approved/Rejected).
  - `currentUser`: To track who is logged in.
- Implement login logic (check if email is `admin` for HR access).

### 4. Admin Dashboard (frontend_engineer)
- Create `AdminDashboard` route protected by the HR role.
- List all applications in a table.
- Filter applications by job type.
- Add "Approve" and "Reject" functionality that updates `localStorage`.
- Add a dummy "Export" button for Excel/PDF.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the entire UI and localStorage-based logic as a single-page application.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4
- **Scope:** Build the Talanta Jobs Portal using React and Tailwind CSS. Use `localStorage` to store user accounts and job applications.
- **Files:**
  - `src/App.tsx`: Main routing and layout.
  - `src/index.css`: Theme configuration.
  - `src/components/JobsList.tsx`: Card UI for the 4 job types.
  - `src/components/AuthForms.tsx`: Sign In/Up logic.
  - `src/components/AdminDashboard.tsx`: HR table and filters.
- **Depends on:** none
- **Acceptance criteria:**
  - App looks professional with Red/Black/White colors.
  - User can Sign Up and then Sign In.
  - Logged-in user can apply for one of the 4 jobs.
  - Admin (email `admin`) can see all applications and change their status.
  - WhatsApp/Telegram links work (open new tabs).
  - All data persists after page refresh (via localStorage).
