import jwt from "jsonwebtoken";

export const verifiyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(400).json({ success: false, massage: "invalid token" });
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
