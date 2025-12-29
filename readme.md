# PR-8-AdminProfile

A simple Node.js + Express admin panel for managing products, categories, subcategories, extra categories and user (admin) profiles. Uses EJS for server-side views, image uploads, session-based auth and MongoDB for persistence.

## Quick Overview

- **Purpose:** Admin-facing web app to manage product catalog and admin profile features (login, edit profile, change password, reset password via OTP).
- **Views:** Server-rendered with `EJS` and client-side libraries (DataTables, Bootstrap, jQuery).
- **Uploads:** Image uploads stored in `/uploads` and referenced from views.

## Features

- Add / Edit / View products
- Add / Edit / View categories, subcategories, extra categories
- Admin authentication and profile page
- Password reset (OTP flow) and change password
- Image upload for products and user avatars
- Flash messages for success/error notifications

## Tech Stack

- Node.js (ES module style)
- Express
- EJS templating
- MongoDB (via `mongoose`)
- Multer for file uploads
- Session-based auth with `express-session`
- Dev tool: `nodemon`

## Folder Structure (important files)

- `index.js` - app entrypoint
- `package.json` - project metadata & scripts
- `configs/` - configuration (DB, dotenv)
- `controllers/` - request handlers for resources
- `routers/` - route definitions
- `models/` - Mongoose models for DB entities
- `views/` - EJS templates (`views/pages` and `views/partials`)
- `public/` - static assets (css, js, libs)
- `uploads/` - uploaded images

## Prerequisites

- Node.js 18+ recommended
- npm (comes with Node)
- MongoDB instance (local or hosted)

## Environment variables

Create a `.env` file in the project root (or set environment variables) with at least the following values used by the app:

- `MONGO_URI` - MongoDB connection string (e.g. `mongodb://localhost:27017/dbname`)
- `PORT` - port to run the server (default: `3000`)
- `SESSION_SECRET` - secret for session signing
- Any other variables referenced in `configs/dotenv.js` or `configs/db.js`

## Install and Run

1. Install dependencies:

```bash
npm install
```

2. Run in development (auto-restarts with changes):

```bash
npm run dev
```

3. Or run production/start:

```bash
npm start
```

The server entrypoint is `index.js` and the project uses the `start`/`dev` scripts defined in `package.json`.

## Database setup

- Ensure your MongoDB instance is reachable via `MONGO_URI`.
- The app uses `mongoose` models located in `models/` and will create collections automatically when documents are saved.

## Uploads and Static Files

- Uploaded images are saved to the `uploads/` directory. Ensure this folder is writable by the app process.
- Static assets are served from `public/`.

## Common tasks

- Edit admin profile: open the profile page from the app after logging in.
- Add a product: use the Add Product page under `views/pages/add-product.ejs`.

## Troubleshooting

- If the app fails to connect to DB, check `MONGO_URI` and start MongoDB.
- If file uploads fail, ensure `uploads/` exists and has proper permissions.

## Contributing

1. Fork the repo and create a feature branch.
2. Add or update tests (if applicable).
3. Submit a PR describing your change.

## License

This project uses ISC by default (see `package.json`). Update as needed.

## Contact

For questions, open an issue in the repository or contact the project maintainer.

## Live Demo

https://pr-8-admin-profile.vercel.app/login
