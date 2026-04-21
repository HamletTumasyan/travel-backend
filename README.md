# Travel Admin Panel

Express.js admin panel for managing travel website content.

## Features

- **Admin Dashboard** - Manage all website content
- **Multi-language Support** - English & Armenian
- **Image Upload** - Upload package, team, and slider images
- **Database Management** - PostgreSQL with Prisma ORM
- **User Authentication** - Session-based admin login

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Prisma ORM)
- **Frontend**: EJS templates
- **Authentication**: bcrypt, express-session
- **File Upload**: Multer

## Installation

```bash
# Clone repository
git clone https://github.com/HamletTumasyan/travel-backend.git
cd travel-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials and secret key

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with:

```
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
PORT=3000
```

## Project Structure

```
├── controllers/     # Route handlers
├── routes/         # API routes
├── middleware/     # Authentication, uploads, etc.
├── views/          # EJS templates
├── public/         # Static assets (CSS, JS, images)
├── prisma/         # Database schema & migrations
└── app.js          # Main application file
```

## Available Routes

### Admin Routes
- `GET /admin/logo` - Manage logo
- `GET /admin/navbar` - Manage navigation
- `GET /admin/langs` - Manage languages
- `GET /admin/home-page-sliders` - Manage sliders
- `GET /admin/home-page-packages` - Manage packages
- `GET /admin/about-page` - Manage about page
- `GET /admin/contact-page` - Manage contact form
- `GET /admin/footer-labels` - Manage footer

### API Routes
- `GET /api` - Get all website data

## Future Improvements

- [ ] Add input validation middleware
- [ ] Implement file upload to cloud storage (Cloudinary/S3)
- [ ] Add Redis for session management
- [ ] Enhance security with CSRF protection
- [ ] Add error logging system
- [ ] Create API documentation

## License

MIT

## Author

Hamlet Tumasyan
