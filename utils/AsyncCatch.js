// Middleware that catches the erros in async callback functions and sends them
// to the apps error handler route
module.exports = function AsyncCatch (func){
    return (req,res,next) =>   {
        func(req,res,next).catch(next);
    }
}