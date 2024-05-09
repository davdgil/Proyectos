const { handleError } = require("../utils/handleResponses");
const { verifyToken } = require("../utils/handleJWT");

const authMiddleware = async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
          console.log("NOT_TOKEN");
          handleError(res, "NOT_TOKEN", 401);
          return;
      }
  
      const token = req.headers.authorization.split(' ').pop();
      const dataToken = await verifyToken(token);
  
      if (!dataToken.valid) {
          console.log("INVALID_TOKEN");
          handleError(res, "INVALID_TOKEN", 401);
          return;
      }
  
      // Si dataToken es válido, entonces asignamos el objeto decoded a req.user
      req.user = dataToken.decoded;
      next();
    } catch (err) {
      handleError(res, "NOT_SESSION", 401);
    }
  };
  

module.exports = {authMiddleware};
