const jwt = require("jsonwebtoken");

const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      _status: false,
      _message: "No token, authorization denied",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKENKEY || "12345");

    const expectedAdminEmail = process.env.ADMIN_EMAIL || "krsumit2203@gmail.com";
    if (decoded.email !== expectedAdminEmail) {
      return res.status(403).json({
        _status: false,
        _message: "Not authorized as an admin",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      _status: false,
      _message: "Invalid token",
    });
  }
};

module.exports = adminAuthMiddleware;
