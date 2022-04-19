/**
 * Basic JSON response for controllers
 */
export type BasicResponse = {
    message: string
}

/**
 * Error JSON
 */
export type ErrorResponse = {
    error: string,
    message: string
}

/**
 * Auth JSON Response for Controllers
 */
 export type AuthResponse = {
    message: string,
    token: string
}
