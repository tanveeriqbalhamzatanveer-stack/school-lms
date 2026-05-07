# 🏫 Nusrat High School – Learning Management System

A professional, production-ready LMS dashboard for students, teachers, and parents. Built with semantic HTML5, modular CSS, and clean vanilla JavaScript.

![Version](https://img.shields.io/badge/version-2.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7)

---

## ✨ Features

- **Multi-role login** — Student / Teacher / Parent
- **Dashboard** — Quick stats, today's schedule, latest notices
- **Attendance** — Monthly records with animated progress bars
- **Results & Grades** — Subject-wise performance, GPA, exam history
- **Fee Record** — Payment history, pending fees, online pay
- **Class Timetable** — Full weekly schedule with color-coded subjects
- **Notice Board** — School announcements with category tags
- **Parent Portal** — Child summary, teacher remarks, contact school
- **Profile Management** — Avatar upload, form editing, localStorage persistence
- **Responsive Design** — Mobile-first with hamburger sidebar
- **Toast Notifications** — User-friendly feedback system
- **Accessibility** — ARIA labels, semantic HTML, keyboard navigation

---

## 📁 Project Structure

```
nusrat-lms/
│
├── index.html              ← Main entry point (all sections)
├── css/
│   └── style.css           ← All styles (variables, layout, components, responsive)
├── js/
│   └── script.js           ← Modular JavaScript (auth, nav, toast, avatar, storage)
├── assets/
│   ├── images/             ← School photos, banners
│   ├── icons/              ← Favicon, touch icons
│   └── fonts/              ← (optional) local font files
├── pages/                  ← (future) individual HTML pages per section
│   ├── dashboard.html
│   ├── attendance.html
│   ├── results.html
│   ├── fees.html
│   ├── timetable.html
│   └── profile.html
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/nusrat-lms.git

# Navigate into project
cd nusrat-lms

# Open with Live Server (VS Code) or any static server
# Option 1: VS Code Live Server extension — right-click index.html → Open with Live Server
# Option 2: Python HTTP server
python3 -m http.server 8080

# Option 3: Node.js serve
npx serve .
```

Then open `http://localhost:8080` in your browser.

**Demo credentials (any value works in demo mode):**
- Roll Number: `NHS-2024-001`
- Password: `demo123`

---

## 📦 Deploy to GitHub Pages

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit – Nusrat LMS v2.0"
git remote add origin https://github.com/YOUR_USERNAME/nusrat-lms.git
git branch -M main
git push -u origin main
```

2. Go to your repository on GitHub
3. Click **Settings** → **Pages**
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/nusrat-lms`

---

## 🌐 Deploy to Netlify

### Option A – Drag & Drop (Fastest)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Drag the entire `nusrat-lms` folder into the Netlify deploy zone
3. Done! Your site is live instantly.

### Option B – GitHub Integration (Recommended for CI/CD)
1. Push your code to GitHub (see above)
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **Add new site** → **Import an existing project**
4. Choose **GitHub** and select your repository
5. Build settings:
   - **Build command**: *(leave empty — static site)*
   - **Publish directory**: `.` (root)
6. Click **Deploy site**

### Option C – Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (Semantic) |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Scripting | Vanilla JavaScript (ES6+, Modules pattern) |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Storage | localStorage (demo persistence) |
| Auth (future) | Firebase Authentication |
| Hosting | Netlify / GitHub Pages / Vercel |

---

## 🛣️ Upgrade Roadmap

### Phase 2 — Backend Integration
- [ ] Connect Firebase Authentication (real login/signup)
- [ ] Firestore database for student records
- [ ] Real-time notifications
- [ ] Admin panel for teachers

### Phase 3 — Advanced Features
- [ ] Online fee payment gateway (JazzCash / EasyPaisa)
- [ ] Push notifications (PWA)
- [ ] Dark mode toggle
- [ ] PDF report card download
- [ ] SMS alerts for parents
- [ ] Homework submission module
- [ ] Student chat / messaging

### Phase 4 — Mobile App
- [ ] React Native mobile app
- [ ] Offline support (Service Workers)
- [ ] Biometric login

---

## 🧩 Customization

### Change School Name / Info
Edit `index.html` — search for "Nusrat High School" and replace with your school name.

### Change Theme Colors
Edit `css/style.css` — modify the `:root` CSS variables at the top of the file.

### Add New Sections
1. Add a new `<section id="section-YOURNAME">` in `index.html`
2. Add a `.nav-item` button with `data-section="YOURNAME"` in the sidebar
3. Add the section title to the `sectionTitles` object in `js/script.js`

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Credits

Designed & developed for **Nusrat High School**, Canal Road, Lahore, Punjab, Pakistan.

> *"Education is the most powerful weapon which you can use to change the world."*
