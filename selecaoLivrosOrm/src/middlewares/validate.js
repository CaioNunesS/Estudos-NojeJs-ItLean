//middleware é uma barreira, meio de campo. Só funciona com o next, que é um método do express
// next é um callback da funçao que recebe e fala para ir para o prox, libera a barreira
// import Joi from 'joi'
export const validate = (schemaName) => {
    return function (req, res, next) {
        const isValid = schemaName.validate(req.body)
        // console.log('isValid.error.details ===>',isValid.error.details[0].message);
        if (!isValid.error) return next()

        const errorDetails = isValid.error.details.map(detail => {
            const errorMessage = detail.message.replace(/["\\]/g, "");
            console.log('error msg ===>', errorMessage);
            return errorMessage.charAt(0).toUpperCase() + errorMessage.substring(1)
        });
        console.log('errorDetails ===>', errorDetails);

        return res.status(400).json({ message: 'ValidationError', details: errorDetails[0] });
    }
}








