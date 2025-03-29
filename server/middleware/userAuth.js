import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
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
