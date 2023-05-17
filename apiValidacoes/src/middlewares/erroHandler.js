export const errorHandler = (err, req, res, next) => {
    if (err.name === 'appError') 
        return res.status(err.status).json({
            error: err.message,
            stack: err.stack
        });

    if (err.code === 11000)
        return res.status(400).json({
            // error: err.message,
            message: "Duplicated user"
        });

    return res.status(500).json({
        error: err.message
    });
};
