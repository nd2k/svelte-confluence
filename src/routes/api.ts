import { deserialize } from "$app/forms";
import { REGISTER_URL, SERVER_AUTH_URI, SERVER_BASE_URL } from "$env/static/private";


export async function api(method: string, form: FormData) {
    const data = JSON.stringify(Object.fromEntries(form));
    return await fetch(SERVER_BASE_URL + SERVER_AUTH_URI + REGISTER_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': SERVER_BASE_URL,
            'Access-Control-Allow-Credentials': 'true'
        },
        body: data
    })
}