<script lang="ts">
    import { goto } from '$app/navigation';
	import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import Field from "$lib/components/Field.svelte";
	import { FieldNameRegister, FieldValidation, RegisterUserForm, ToastStatus, type ErrorMessage } from "$lib/interfaces/types";
	import { loadingStatus, toastStatusStore } from '$lib/store/store';
    import type { PageData, ActionData } from './$types';
    import { applyAction, enhance } from '$app/forms';
  

	import { assignValue, checkLength, comparePasswords, validateEmail } from "$lib/utils/fieldHelper";
	import type { ActionResult } from '@sveltejs/kit';

    let registerUserForm: RegisterUserForm = new RegisterUserForm('', '', '');
    let usernameFieldValidation: FieldValidation =  new FieldValidation(null, null);
    let emailFieldValidation: FieldValidation = new FieldValidation(null, null);
    let passwordFieldValidation: FieldValidation = new FieldValidation(null, null);
    let confirmPasswordFieldValidation: FieldValidation = new FieldValidation(null, null);
    let isRegisterBtnDisabled: boolean = true;

    function validateRegisterInput(event: CustomEvent) {
        const { value, id } = event.detail;
        if (id === FieldNameRegister.USERNAME) {
			usernameFieldValidation = checkLength(value, id, 4, 6);
            assignValue(value, id, registerUserForm);
		}
		if (id === FieldNameRegister.EMAIL) {
			emailFieldValidation = validateEmail(value);
            assignValue(value, id, registerUserForm);
		}
		if (id === FieldNameRegister.PASSWORD) {
			passwordFieldValidation = checkLength(value, id, 8, 128);
            assignValue(value, id, registerUserForm);
		}
		if (id === FieldNameRegister.PASSWORD_CONFIRMATION) {                      
			confirmPasswordFieldValidation = comparePasswords(registerUserForm.password, value);
		}
		if (
			usernameFieldValidation.isValid &&
			emailFieldValidation.isValid &&
			passwordFieldValidation.isValid &&
			confirmPasswordFieldValidation.isValid
		) {
			isRegisterBtnDisabled = false;
		}
    }

    async function handleRegisterResponse(result: ActionResult) {
        if (result.type === 'success' && result.data != undefined) {
            const res = result.data;
            try {
                loadingStatus.set(true);
                if (res.status === 201) {
                    const toast: ToastStatus = {
                        isShown: true,
                        isSuccess: true,
                        delay: 3000,
                        message: 'Your account has been successfully created!'
                    };
                    toastStatusStore.activateToast(toast);
                    toastStatusStore.removeToast(toast);
                    loadingStatus.set(false);
                    goto('/user/login');
                } 
                if (res.status === 400) {
                    const toast: ToastStatus = {
                        isShown: true,
                        isSuccess: false,
                        delay: 3000,
                        message: res.data.message
                    };
                    toastStatusStore.activateToast(toast);
                    toastStatusStore.removeToast(toast);
                    loadingStatus.set(false);
                }  
            } catch(e: any) {
                console.error(e);
                const toast: ToastStatus = {
                    isShown: true,
                    isSuccess: false,
                    delay: 3000,
                    message: e.message
                };
                toastStatusStore.activateToast(toast)
                toastStatusStore.removeToast(toast);
                loadingStatus.set(false);
            }
        }
    }
</script>

<Card width={25} height={30} title backgroundColor="var(--secondary-color)">
    <div slot="card-title">
        <h1>Register</h1>
    </div>
    <div slot="card-body">
        <div class="card-body">
            <form 
                action="?/register"
                method="POST"
                use:enhance={() => {
                    return ({ result}) => handleRegisterResponse(result);
                }}>
                <Field 
                    id="username"
                    type="text" 
                    label="Your username" 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)"
                    icon="mdi:user"
                    on:input-validation={validateRegisterInput}
                    fieldValidation={usernameFieldValidation} />
                <Field 
                    id="email"
                    type="text" 
                    label="Your email" 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)"
                    icon="ic:baseline-email"
                    on:input-validation={validateRegisterInput}
                    fieldValidation={emailFieldValidation} />
                <Field 
                    id="password"
                    type="password" 
                    label="Your password" 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)"
                    icon="mdi:password" 
                    on:input-validation={validateRegisterInput}
                    fieldValidation={passwordFieldValidation}/>
                <Field 
                    id="confirm-password"
                    type="password" 
                    label="Confirm your password" 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)"
                    icon="mdi:password" 
                    on:input-validation={validateRegisterInput}
                    fieldValidation={confirmPasswordFieldValidation}/>
                <Button 
                    rounded={2} 
                    width={10} 
                    height={2.5} 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)" 
                    outline
                    disabled={isRegisterBtnDisabled}
                    type="submit">
                    Register
                </Button>
                <div class="login">
                    <a href="/user/login">Already an account ? Login here!</a>
                </div>
            </form>
         </div>
    </div>
</Card>

<style>
    h1 {
        color: var(--tertiary-color);
        padding: 1rem;
    }
    .card-body {
        margin: 2rem;
        display: flex;
        justify-content: center;
        align-content: center; 
        flex-direction: column;
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
        margin: 0.8rem 0;
        position: relative;
    }
    .login a {
        color: var(--tertiary-color);
        font-size: 0.8rem;
        text-decoration: none; 
    }
    .login {
        width: 100%;
        margin-top: -1rem;
        text-align: center;
    }
</style>