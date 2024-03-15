const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secretKeyy");
    req.user = decoded; // Set the user object in the request
    next();
  } catch (err) {
    return res?.status(401)?.json({ error: "Unauthorized" });
  }
};
