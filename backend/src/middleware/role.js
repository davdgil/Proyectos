const { handleError } = require("../utils/handleResponses");

const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const userRol = user.role;

    const checkValueRol = roles.includes(userRol);
  
    if (!checkValueRol) {
      console.log("NOT_ALLOWED")
      handleError(res, "NOT_ALLOWED", 403);
      return;
    }
    next();
  } catch (err) {
    console.log("ERROR_PERMISSIONS", err)
    handleError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = { checkRole } ;
