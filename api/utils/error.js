// export const errorHandler = (statusCode, messgae) => {
//     const error = new Error();
//     error.statusCode = statusCode
//     error.message = messgae
//     return error
// } 

export class AppError extends Error{
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode || 500
    }
}