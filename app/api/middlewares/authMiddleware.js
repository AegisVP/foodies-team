import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

const SECRET_KEY = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("Authorization header missing or malformed");
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user || user.token !== token) {
      console.warn("User not found or token mismatch");
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}