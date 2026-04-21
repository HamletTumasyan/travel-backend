export default function baseUrl(req, res, next) {
    req.baseFullUrl = `${req.protocol}://${req.get("host")}`;
    next();
}   