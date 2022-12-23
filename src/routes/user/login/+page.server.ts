import { deserialize } from '$app/forms';
import { LOGIN_URL } from '$env/static/private';
import type { ActionResult, Actions } from '@sveltejs/kit';
import { api } from '../../api';

export const actions: Actions = {
    login: async ({ request }) => {
        const form = await request.formData();
        let response = await api('POST', form, LOGIN_URL); 
        if (response.status === 400) {
            const actionResult: ActionResult = {
                status: 400,
                type: 'failure',
                data: deserialize(await response.text())
            }
            return actionResult;
        } else {
            const actionResult: ActionResult = {
                status: 201,
                type: 'success',
                data: deserialize(await response.text())
            }
            return actionResult;
        }     
    }
}