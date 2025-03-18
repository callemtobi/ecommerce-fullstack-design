import jwt from "jsonwebtoken";

// Anyone
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token invalid. Error: " + err);
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated.");
    }
};
// Logged in
export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("Permission rejected!");
        }
    });
};
// Admin
export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("Permission rejected!");
        }
    });
};

// export default {verifyToken, verifyTokenAndAuthorization};
