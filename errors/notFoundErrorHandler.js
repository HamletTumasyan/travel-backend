export default function notFoundErrorHandler(req, res, next) {
    res.status(404).render("404", {
        status: 404,
        title: "Page Not Found",
        layout: false
    });

}