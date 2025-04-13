import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id && tokenDecode.role === "User") {
      req.user = { id: tokenDecode.id }; // Store securely in req.user
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.error("Error during authentication:", err);
    return res.status(401).json({ message: err.message });
  }
};


export default userAuth;
