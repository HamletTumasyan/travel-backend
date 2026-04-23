# Travel Admin Panel

A professional, mobile-responsive Express.js admin panel designed for managing travel website content. Fully optimized for serverless deployment on Vercel.

## 🚀 Key Features

- **Mobile Responsive Design**: Fully optimized for mobile and tablet devices with a custom hamburger menu and responsive layouts.
- **Persistent Sessions**: Powered by `connect-pg-simple` and PostgreSQL to ensure you stay logged in, even in serverless environments like Vercel.
- **Admin Dashboard**: Comprehensive management of Logos, Navbars, Sliders, Packages, and dynamic page content.
- **Multi-language Support**: Built-in support for multiple languages (English & Armenian).
- **Secure Authentication**: Session-based login with encrypted passwords and manual persistence checks.
- **Vercel Optimized**: Pre-configured with `trust proxy` and secure cookie settings for instant deployment.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Prisma ORM)
- **Session Management**: express-session with connect-pg-simple
- **Frontend**: EJS (Embedded JavaScript) Templates
- **Styling**: Vanilla CSS with @media queries
- **File Upload**: Multer (Local Disk Storage)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/HamletTumasyan/travel-backend.git

# Install dependencies
npm install

# Setup Environment Variables
# Create a .env file based on the environment section below

# Database Setup
# Ensure your PostgreSQL database has the required 'session' table
# Run: npx prisma db push (to sync other models)

# Start Development
npm run dev
```

## 🌍 Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"
SECRET_KEY="your_secure_random_string"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_password"
PORT=8000
NODE_ENV="development"
```

## 🏗 Project Structure

```text
├── controllers/    # Shared logic and route handlers
├── routes/         # Express routing definitions
├── middlewares/    # Auth, Session, and Upload configurations
├── views/          # EJS templates and partials
├── public/         # Static assets (CSS, JS, Images)
├── prisma/         # Database models and migrations
├── app.js          # Core application entry point
└── vercel.json     # Vercel deployment configuration
```

## 🛣 Admin Modules

- **Navigation**: `/admin/navbar`
- **Identity**: `/admin/logo` & `/admin/langs`
- **Content**: `/admin/home-page-sliders` & `/admin/home-page-packages`
- **Pages**: `/admin/about-page` & `/admin/contact-page`
- **Footer**: `/admin/footer-labels`

## 📄 License

MIT

## 👤 Author

**Hamlet Tumasyan**
