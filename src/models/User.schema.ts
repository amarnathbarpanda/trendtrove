import { z } from 'zod';

export const userSignUpSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be 8 character long"
    }).max(16, {
        message: "Password cannot be more than 16 characters"
    }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/, {
        message: "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
    }),
    firstName: z.string({
        required_error: "First Name is required"
    }),
    lastName: z.string({
        required_error: "Last Name is required"
    }),
    shippingAddress: z.object({
        street: z.string({
            required_error: "street is required"
        }),
        city: z.string({
            required_error: "City is required"
        }),
        state: z.string({
            required_error: "State is required"
        }),
        country: z.string({
            required_error: "Country is required"
        }),
        pinCode: z.number({
            required_error: "Postal/Pin code is required"
        })
    })
});

export const userSignInSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be 8 character long"
    }).max(16, {
        message: "Password cannot be more than 16 characters"
    })
});