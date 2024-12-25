const { verifyToken } = require("../Service/config");

function verifyUser() {
  return (req, res, next) => {
    console.log("Middleware");
    const token = req.cookies?.uid;
    if (!token) {
      if (req.url === "/user/login" || req.url === "/user/register") {
        return next();
      } else {
        return res.status(401).json({"msg":"Login first"});
      
      }
    }
    console.log("+++")

    try {
      const user = verifyToken(token);
      if (!user) {
        return res.status(401).send("User not found");
      }
      req.user = user;
      return next(); // Move to the next middleware or route handler
    } catch (e) {
      return res.status(500).send("Server error: " + e.message);
    }
  };
}

module.exports = { verifyUser };

