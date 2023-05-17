// lança um erro caso esqueçamos de fazer o try catch para lançar o erro do catch

export const asyncWrapper = (fn) => (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}
