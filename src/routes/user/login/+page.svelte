<!-- <script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import Field from "$lib/components/Field.svelte";
	import { FieldNameRegister, FieldValidation, LoginUserForm, ToastStatus } from "$lib/interfaces/types";
	import { login } from "$lib/services/controller";
	import { loadingStatus, toastStatusStore } from "$lib/store/store";
	import { assignValue, checkLength, validateEmail } from "$lib/utils/fieldHelper";

    let loginUserForm: LoginUserForm = new LoginUserForm('', '');
    let emailFieldValidation: FieldValidation = new FieldValidation(null, null);
    let passwordFieldValidation: FieldValidation = new FieldValidation(null, null);
    let isLoginBtnDisabled: boolean = true

    function validateLoginInput(event: CustomEvent) {
        const { value, id } = event.detail;
		if (id === FieldNameRegister.EMAIL) {
			emailFieldValidation = validateEmail(value);
            assignValue(value, id, loginUserForm);
		}
		if (id === FieldNameRegister.PASSWORD) {
			passwordFieldValidation = checkLength(value, id, 8, 128);
            assignValue(value, id, loginUserForm);
		}
        if (emailFieldValidation.isValid && passwordFieldValidation.isValid) {
            isLoginBtnDisabled = false;
        }
    }

    async function submitLoginUserForm() {
        try {
            loadingStatus.set(true);
            let response = await login(loginUserForm);
            let data = JSON.parse(await response.text())
            if (!response.ok) {
                throw new Error(data.message)
            }
            const toast: ToastStatus = {
                isShown: true,
                isSuccess: true,
                delay: 3000,
                message: `You're successfully logged in!`
            };
            toastStatusStore.activateToast(toast);
            toastStatusStore.removeToast(toast);
            loadingStatus.set(false);
            goto('/');
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
</script>

<Card width={20} height={25} title backgroundColor="var(--secondary-color)">
    <div slot="card-title">
        <h1>Login</h1>
    </div>
    <div slot="card-body">
        <div class="card-body">
            <form on:submit|preventDefault={submitLoginUserForm}>
                <Field 
                    id="email"
                    type="email" 
                    label="Your email" 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)"
                    on:input-validation={validateLoginInput}
                    fieldValidation={emailFieldValidation} />
                <Field 
                    id="password"
                    type="password" 
                    label="Your password" 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)"
                    icon="mdi:password"
                    on:input-validation={validateLoginInput}
                    fieldValidation={passwordFieldValidation} />
                <div class="forgot-password">
                    <a href="/">Forgot your password ?</a>
                </div>
                <Button 
                    rounded={2} 
                    width={10} 
                    height={2.5} 
                    color="var(--fourthary-color)" 
                    backgroundColor="var(--tertiary-color)" 
                    outline
                    disabled={isLoginBtnDisabled}
                    type="submit">
                    Login
                </Button>
                <div class="register">
                    <a href="/user/register">Not yet an account ? Register here!</a>
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
    }
    .forgot-password {
        width: 100%;
        text-align: right;
    }
    .forgot-password a,
    .register a {
        color: var(--tertiary-color);
        font-size: 0.8rem;
        text-decoration: none; 
    }
    .register {
        width: 100%;
        margin-top: -1rem;
        text-align: center;
    }
</style> -->