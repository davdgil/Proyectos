const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '4h' 
    });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            valid: true,
            expired: false,
            decoded, // Asegúrate de que decoded es el objeto con los datos del usuario
        };
    } catch (error) {
        console.log(error);
        return {
            valid: false,
            expired: error.message.includes('jwt expired'),
            decoded: null
        };
    }
};


module.exports = { signToken, verifyToken };
