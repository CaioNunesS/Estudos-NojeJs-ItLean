export const errorHandler = (err, req, res, next) => {
    if (err.name === 'appError') 
        return res.status(err.status).json({
            error: err.message,
            stack: err.stack
        });
        if (err.parent.errno == 1062)
        return res.status(400).json({
            message: "Duplicated user"
        });

    return res.status(500).json({
        error: err.message
    });
};
