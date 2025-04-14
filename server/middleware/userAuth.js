import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Token from cookie:", token); // ✅ Check if token exists
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // ✅ Confirm secret is loaded

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // ✅ Check payload

    if (decoded.id && decoded.role === "User") {
      req.user = {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name || "",
      };
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden: Only users allowed" });
    }
  } catch (err) {
    console.error("JWT verify error:", err.message); // ⛔ What’s going wrong
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default userAuth;