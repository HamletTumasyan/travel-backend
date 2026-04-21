const isProduction = process.env.NODE_ENV === "production";

export default function globalErrorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    if (!isProduction) {
        console.error(err);
    }
    
    res.status(statusCode).render("500", {
        status: statusCode,
        title: "Internal Server Error",
        stack: isProduction ? null : err.stack,
        layout: false
    });
}