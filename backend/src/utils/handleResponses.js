
const handleError = (res, message, code = 403) => {
    res.status(code).send(message);
};

const handleSuccess = (res, message, data, code = 200) => {
    res.status(code).json({ message, data });
};

module.exports = { handleError, handleSuccess };
