export interface User {
    email?: string | null | undefined,
    password?: string | null | undefined,
    rol?: string | null | undefined
}

export interface ResponseLogin {
    token: string;
}

export interface ResponseRegister {
    message: string
}