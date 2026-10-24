# Project Grave Ward – Login & Signup (frontend demo)

Open `index.html` in any browser. No build step or server needed.

```
grave-ward-auth/
├── index.html        page markup
├── css/style.css     all styles (light + dark themes)
└── js/
    ├── theme-init.js sets light/dark before first paint
    └── app.js        city image, forms, validation, theme toggle
```

This is a frontend demo: no backend is connected, so nothing is sent or saved.
For real sign-in, connect an auth provider (Auth0, Supabase, Firebase, ...) in `js/app.js`
(see the submit handler and the social-button click handler).
