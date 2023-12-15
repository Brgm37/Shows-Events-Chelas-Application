// Define all possible application errors
export const ERROR_CODES = {
    INVALID_ARGUMENT: 400,
    NOT_FOUND: 404,
    USER_NOT_FOUND: 404,
    NOT_AUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
}

export default {
    INVALID_ARGUMENT: argName => {
        return new Error(ERROR_CODES.INVALID_ARGUMENT, `Invalid argument ${argName}`)
    },
    NOT_FOUND: (what) => { 
        return new Error(ERROR_CODES.NOT_FOUND,`${what} not found`)
    },
    USER_NOT_FOUND: (what) => { 
        return new Error(ERROR_CODES.USER_NOT_FOUND,`User not found`)
    },
    NOT_AUTHORIZED: (who, what) => { 
        return new Error(ERROR_CODES.NOT_AUTHORIZED,`${who} has no access to ${what}`)
    },
    INTERNAL_SERVER_ERROR: (what, why) => {
        return new Error(ERROR_CODES.INTERNAL_SERVER_ERROR,`Error fetching ${what} due: ${why}`)
    }
}

function Error(code, description) {
    this.code = code
    this.description = description
}