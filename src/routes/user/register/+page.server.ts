import { deserialize } from '$app/forms';
import type { ActionResult } from '@sveltejs/kit';
import { api } from '../../api';
import type { Actions } from './$types';

export const actions: Actions = {
    register: async ({ request }) => {
        const form = await request.formData();
        let response = await api('POST', form); 
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