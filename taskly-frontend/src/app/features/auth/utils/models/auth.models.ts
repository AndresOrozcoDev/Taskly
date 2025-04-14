export interface User {
    email?: string | null | undefined,
    password?: string | null | undefined,
    rol?: string | null | undefined
}

export interface ResponseLogin {
    token: string;
}

export interface Response {
    message: string
}

export interface Email {
    email?: string | null | undefined
}

export interface ResponseForget {
    message: string,
    email: string,
    newPassword: string
}