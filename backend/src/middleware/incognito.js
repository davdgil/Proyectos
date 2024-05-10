
const anonymousLoginMiddleware = async (req, res, next) => {
  try {

    req.user = {
      _id: '663d4699fdc5a34c1c07be00',
      email: 'anonimo@gmail.com', 
      role: 'anonimo' 
    };

    next();
  } catch (error) {
    console.error('Error en el middleware de login anónimo:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = {
  anonymousLoginMiddleware
};
