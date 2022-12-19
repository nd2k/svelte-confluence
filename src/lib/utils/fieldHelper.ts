import type { LoginUserForm, RegisterUserForm } from '$lib/interfaces/types';

export function checkLength (value: string, id: string, min: number, max: number) {
	if (value.length > max) {
		return {
			isValid: false,
			errorMessage: `Field "${id}" is longer than ${max} characters`
		};
	}
	if (value.length < min) {
		return {
			isValid: false,
			errorMessage: `Field "${id}" is shorter than ${min} characters`
		};
	}
	return {
		isValid: true,
		errorMessage: ''
	};
};

export function validateEmail (value: string) {
	const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (value.match(validEmailRegex)) {
		return {
			isValid: true,
			errorMessage: ''
		};
	} else {
		return {
			isValid: false,
			errorMessage: 'Email address not valid'
		};
	}
};

export function comparePasswords (password: string, confirmationPassword: string) {
	if (confirmationPassword.length === 0) {
		return {
			isValid: false,
			errorMessage: `Password must at least be 1 character`
		};
	} else if (password === confirmationPassword) {
		return {
			isValid: true,
			errorMessage: ''
		};
	} else {
		return {
			isValid: false,
			errorMessage: `Passwords don't match`
		};
	}
};

export function assignValue(
	updatedValue: string,
	field: string,
	object: LoginUserForm|RegisterUserForm
) {
	for (const [key] of Object.entries(object)) {
		if (key === field) {
			object[key as keyof typeof object] = updatedValue;
		}
	}
};