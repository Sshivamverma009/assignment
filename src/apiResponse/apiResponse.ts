
// interface ApiResponse{
//     success : boolean,
//     message : string,
// }

export const ApiResponse = (success : boolean, message : string, data? : []) => {
    return {
        success : success,
        message : message,
        todos : data
    }
}