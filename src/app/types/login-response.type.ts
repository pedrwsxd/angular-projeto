export type LoginResponse = {
    id?: number;
    token: string,
    nome: string,
    roles: string[]; 
}