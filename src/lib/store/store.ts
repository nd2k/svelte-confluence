import type { ToastStatus } from '$lib/interfaces/types';
import { writable, type Writable } from 'svelte/store';

function setupToast() {
    const { subscribe, update } = writable({
        isShown: false,
        isSuccess: false,
        delay: 0,
        message: ''
    });

    return {
        subscribe,
        activateToast: (toastStatus: ToastStatus) => update(value => {
            return value = toastStatus;
        }),
        removeToast: (toastStatus: ToastStatus) => {
            setTimeout(() => {
                toastStatus.isShown = false;
                toastStatus.isSuccess = false;
                toastStatus.delay = 0;
                toastStatus.message = '';
                update(value => {
                    return value = toastStatus;
                })
            }, toastStatus.delay)
        },
    }
}

export const toastStatusStore = setupToast();
export const loadingStatus: Writable<boolean> = writable(false);