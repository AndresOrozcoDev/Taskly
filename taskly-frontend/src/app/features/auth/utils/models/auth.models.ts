export interface Login {
    email?: string | null | undefined,
    password?: string | null | undefined
}

export interface ResponseLogin {
    token: string;
}