
import "dotenv/config"
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET


export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
        
  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    const decoded = jwt.verify(authHeader, SECRET);
    console.log(decoded);
    
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}