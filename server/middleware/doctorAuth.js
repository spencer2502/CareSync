import jwt from "jsonwebtoken";

const doctorAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id && decoded.role === "Doctor") {
      req.doctor = {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name || "",
      };
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Only doctors allowed" });
    }
  } catch (err) {
    console.error("Doctor auth error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default doctorAuth;
