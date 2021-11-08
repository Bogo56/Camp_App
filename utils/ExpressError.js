// Creating a custom Error class

class ExpressError extends Error{
    constructor(message,statusCode){
        super();
        this.statusCode = statusCode;
        this.message = message
}
}

module.exports = ExpressError;