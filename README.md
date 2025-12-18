# Skill Bytes — Frontend

A fast, interactive frontend built with Vite and React for the Skill Bytes learning platform. It includes a small 3D effect, challenge UI components, onboarding flows, and leaderboard/dashboard pages.

**Project At A Glance**
- **Language**: JavaScript (ES modules)
- **Framework**: `React` with `Vite`
- **Key libs**: `three`, `framer-motion`, `prismjs`, `react-router-dom`
- **Dev tools**: `eslint`, `vite`

**Features**
- **Challenge selector**: UI to pick coding challenges (`src/challenge-selector`).
- **Daily challenge**: A daily challenge flow (`src/daily-challenge`).
- **Onboarding**: Multi-step onboarding (name, preferences, username).
- **3D visuals**: Lightweight 3D flock effect using `three` (`src/components/3d-flock-effect`).
- **Routing**: Client-side routing with `react-router-dom`.

**Getting Started**

1. Install dependencies:

```powershell
npm install
```

2. Run the dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

4. Preview the production build locally:

```powershell
npm run preview
```

**Available npm Scripts**
- **`dev`**: Starts Vite dev server (`vite`).
- **`build`**: Produces a production build (`vite build`).
- **`preview`**: Serves the production build locally (`vite preview`).
- **`lint`**: Runs ESLint across the project (`eslint .`).

**Project Structure (important files)**
- **`index.html`**: App entry HTML.
- **`vite.config.js`**: Vite configuration.
- **`src/main.jsx`**, **`src/App.jsx`**: React entry and root component.
- **`src/pages/`**: Top-level route pages (dashboard, home, login, signup, leaderboard, contact, etc.).
- **`src/components/`**: Reusable components (including `3d-flock-effect`).
- **`public/`**: Static assets served as-is.

**Styling**
- The project uses CSS files colocated with components, e.g. `src/home/Features.css` and `src/login/Login.css`.

**Testing & Linting**
- ESLint is configured; run `npm run lint` to check for linting issues.

**Deployment**
- This repository contains a `netlify.toml` for deploying to Netlify. Building with `npm run build` produces the static assets to deploy.

**Docs & Contribution**
- See the `docs/` directory for `CONTRIBUTING.md`, `CLA.md`, and `LICENSE.md` for contribution guidelines and licensing.

**License**
- See `docs/LICENSE.md` for license details.

**Contact / Author**
- Repo owner: `anb2473` (see repository settings for contact).

If you'd like, I can also:
- add badges (build, license),
- run the linter and fix minor issues automatically, or
- update the `package.json` with a `start` script for convenience.

---
Generated/updated README for local development and contributor orientation.
