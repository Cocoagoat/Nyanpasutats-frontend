 
const allowedErrors = ["This user's list is private.",
     "User does not exist.",
     "Please enter a username."]

export function sanitizeError(errorMessage: string){
    if (allowedErrors.includes(errorMessage)){
        return errorMessage
    }
    return "An unexpected error has occurred on our side. Please try again later." 
}