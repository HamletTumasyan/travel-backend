import session from "express-session";
import pgSession from "connect-pg-simple";
import pg from "pg";

const pgStore = pgSession(session);
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default function sessionMiddleware() {
    return session({
        store: new pgStore({
            pool: pool,
            tableName: 'session'
        }),
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        }
    });
}