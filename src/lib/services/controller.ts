import type { LoginUserForm, RegisterUserForm } from "$lib/interfaces/types";

export async function register(registerUserForm: RegisterUserForm) {
    return await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(registerUserForm)
    })  
}

export async function login(loginUserForm: LoginUserForm) {
    return await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(loginUserForm)
    }) 
}

function createHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST');
    return headers;
}