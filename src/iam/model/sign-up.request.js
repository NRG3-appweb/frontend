/**
 * Sign up request model.
 * @summary
 * This model is used to create a new user.
 */

export class SignUpRequest {

    constructor(
        firstName,
        lastName,
        password,
        email,
        phone,
        dni,
        address,
        city,
        birthDate
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.dni = dni;
        this.address = address;
        this.city = city;
        this.birthDate = birthDate;
    }
}