# THE PROJECT GRAVEYARD — Production Frontend

A high-fidelity project autopsy and autonomous software resurrection platform built by Team Trinexis.

---

## 🚀 Quick Local Run

```bash
npm install
npm run dev
```

---

## 📦 How to Push to GitHub (Manual Guide)

Follow these exact terminal steps in this folder:

```bash
# 1. Initialize git repository
git init

# 2. Stage all files
git add .

# 3. Create your first commit
git commit -m "feat: complete The Project Graveyard production frontend"

# 4. Rename default branch to main
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push code to GitHub
git push -u origin main
```

---

## ⚡ How to Deploy on Vercel

Once your code is pushed to GitHub, follow these simple steps to host it live for free:

1. **Sign In to Vercel**:
   Go to [vercel.com](https://vercel.com) and log in with your **GitHub** account.

2. **Add New Project**:
   Click **"Add New..."** in the top-right corner and select **"Project"**.

3. **Import Your Repository**:
   Find your GitHub repository from the list and click **"Import"**.

4. **Configure Project Settings**:
   Vercel will automatically detect the settings from `vercel.json` and `package.json`:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Deploy**:
   Click the blue **"Deploy"** button.
   Vercel will build the project in ~30 seconds and provide you with a live `https://your-project.vercel.app` URL!

---

## 🗂️ Clean Folder Structure

```text
THE_FRONTEND/
├── public/                 # Static assets, icons, discovery.html, vault.html
├── src/
│   ├── components/         # Dashboard, Graveyard, Vault, Errors, Sliders
│   ├── context/            # ThemeContext & VaultContext
│   ├── data/               # Mock repository catalog
│   ├── types/              # Project and Navigation types
│   ├── App.tsx             # Root application component
│   ├── index.css           # Full gothic crimson design tokens & glassmorphism
│   └── main.tsx            # React 18+ application bootstrap
├── index.html              # HTML entry point with Cinzel & JetBrains fonts
├── package.json            # Project dependencies & build scripts
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel SPA routing & rewrite rules
├── vite.config.ts          # Vite build configuration
└── README.md               # GitHub & Vercel deployment guide
```
