/**
 * Sign in response model
 * @summary
 * This model is used to create a sign in response object
 */
export class SignInResponse {
    /**
     * Constructor
     * @param id The user id
     * @param email The username
     * @param token The generated token
     */
    constructor(id, email, token) {
        this.id = id;
        this.email = email;
        this.token = token;
    }
}