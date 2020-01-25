module.exports = (res, error) => {
    const errorStatus = error.status ? error.status : 500;
    res.status(errorStatus).json({
        success: false,
        message: error.message ? error.message : error,
        status: errorStatus
    });
};
