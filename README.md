# WELLPath — Mental Health Platform

WELLPath is a comprehensive mental health platform connecting patients with verified mental health professionals, supporting students seeking clinical internships, and providing professionals with a full practice management suite.

## 🌐 Live Site

[wellpath-amber.vercel.app](https://wellpath-amber.vercel.app)

---

## ✨ Features

### For Patients
- Browse and book appointments with verified therapists
- Real-time messaging with professionals
- Appointment tracking and history
- Save favourite professionals
- Crisis support access

### For Professionals
- Full profile and availability management
- Client caseload and session notes
- Post jobs and events (pending admin approval)
- Earnings and analytics dashboard
- Real-time messaging with patients

### For Students
- Browse internship listings from verified professionals
- Apply with motivation letters
- Track application status
- Build professional profiles

### For Admins
- Professional verification queue (approve/reject credentials)
- Job and event approval queues
- User management and analytics

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS v4
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Deployment:** Vercel

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev
```

---

## 🧪 Test Accounts

| Role         | Email                       | Password     |
|--------------|-----------------------------|--------------|
| Admin        | admin@wellpath.com          | password123  |
| Professional | professional@wellpath.com   | password123  |
| Patient      | patient@wellpath.com        | password123  |
| Student      | student@wellpath.com        | password123  |

---

## 📁 Project Structure

```
src/
├── assets/          # Static images
├── components/
│   ├── appointment/ # Booking and availability modals
│   ├── chatbot/     # AI assistant component
│   ├── shared/      # Crisis support, notifications, modals
│   └── ui/          # Core UI components (Button, Card, Input…)
├── contexts/        # Auth context
├── hooks/           # Custom React hooks
├── layouts/         # Role-based layout shells
├── lib/             # Supabase client
├── pages/
│   ├── admin/       # Admin dashboard pages
│   ├── auth/        # Login, Signup, Onboarding
│   ├── patient/     # Patient dashboard pages
│   ├── professional/# Professional dashboard pages
│   ├── public/      # Public-facing pages
│   └── student/     # Student dashboard pages
├── services/        # Supabase API service functions
├── types/           # TypeScript interfaces
└── utils/           # Helper utilities
```
