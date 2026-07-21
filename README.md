# Personal Portfolio

A full stack, animated personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Firebase** (Firestore + Auth + Storage). Every section — Hero, About, Skills, Experience, Projects, and the Contact inbox — is editable from a password-protected `/admin` panel.

The site works and looks fully populated out of the box with placeholder content, even before Firebase is configured. Once you connect Firebase, the admin panel writes real data that replaces the placeholders.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). At this point the public site renders with placeholder content, and `/admin` will show a "Firebase isn't configured yet" notice.

## 2. Set up Firebase (needed for the admin panel to actually save data)

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2. **Add a Web App** (the `</>` icon on the project overview page) and copy the `firebaseConfig` values.
3. Copy `.env.local.example` to `.env.local` and fill in the `NEXT_PUBLIC_FIREBASE_*` values from step 2.
4. In the Firebase console, enable:
   - **Firestore Database** (Build → Firestore Database → Create database, start in production mode).
   - **Authentication** (Build → Authentication → Sign-in method → enable **Email/Password**).
   - **Storage** (Build → Storage → Get started) — used for uploaded images/resume.
5. Create your single admin account: Authentication → Users → **Add user** → enter your email and a password. This is the only account that will ever be able to sign in to `/admin`.
6. Copy that user's **User UID** (shown in the Users table).
7. Open `firestore.rules` and `storage.rules` in this project and replace `"REPLACE_WITH_ADMIN_UID"` with the UID from step 6.
8. Deploy the rules — easiest via the Firebase console:
   - Firestore Database → Rules tab → paste the contents of `firestore.rules` → Publish.
   - Storage → Rules tab → paste the contents of `storage.rules` → Publish.
   (Or use the Firebase CLI: `firebase deploy --only firestore:rules,storage:rules` if you have a `firebase.json` set up.)
9. (Optional) Also add `NEXT_PUBLIC_ADMIN_UID` in `.env.local` to the same UID — it's not required for security (the rules file is what enforces it) but is there if you want to reference it in the app later.
10. Restart `npm run dev`.

Now go to `/admin/login`, sign in with the admin account you created, and start editing — changes appear on the public site instantly.

## 3. Editing content

Everything is managed from `/admin`:

- **Hero** — name, rotating role titles, tagline, avatar image, resume link, social links.
- **About** — bio paragraphs and highlight bullet points.
- **Skills** — add/edit/delete/reorder skills grouped by category, with a proficiency bar. The "icon" field takes an icon name from [`react-icons/si`](https://react-icons.github.io/react-icons/icons/si/) (e.g. `SiReact`, `SiNextdotjs`, `SiDocker`).
- **Experience** — add/edit/delete/reorder your work history timeline.
- **Projects** — add/edit/delete/reorder projects with an uploaded image, tech tags, live/GitHub links, and a "featured" flag.
- **Messages** — every submission from the public Contact form lands here; mark as read or delete.

## 4. Deploying later

This is a single Next.js app, so it deploys cleanly to [Vercel](https://vercel.com/new) (or any Node host) — just add the same `NEXT_PUBLIC_FIREBASE_*` environment variables in your hosting provider's dashboard. No separate backend to deploy.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (custom dark/glassmorphism theme)
- Framer Motion (scroll reveals, magnetic buttons, tilt cards, typewriter hero, page transitions)
- Firebase: Firestore (content + messages), Authentication (single admin login), Storage (images)
- react-hook-form + zod (contact form + validation)
