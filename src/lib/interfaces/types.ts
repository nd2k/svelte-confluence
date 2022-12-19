export enum FieldNameRegister {
	USERNAME = 'username',
	EMAIL = 'email',
	PASSWORD = 'password',
	PASSWORD_CONFIRMATION = 'confirm-password'
}

export enum FieldNameLogin {
	EMAIL = 'email',
	PASSWORD = 'password'
}

export class RegisterUserForm {
	username: string;
	email: string;
	password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
};

export class LoginUserForm {
	email: string;
	password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
};

export class FieldValidation {
	isValid: boolean|null;
	errorMessage: string|null;

    constructor(isValid: boolean|null, errorMessage: string|null) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
};

export class ToastStatus {
    isShown: boolean;
    isSuccess: boolean;
    delay: number;
    message: string;

    constructor(isShown: boolean, isSuccess: boolean, delay: number, message: string) {
        this.isShown = isShown;
        this.isSuccess = isSuccess;
        this.delay = delay;
        this.message = message;
    }
}

interface Authority {
    authority: string
}

export class User {
    userId: string;
    username: string;
    email: string;
    authorities: Authority[];
    accessToken: string;
    refreshToken: string;

    constructor(
        userId: string,
        username: string,
        email: string,
        authorities: Authority[],
        accessToken: string,
        refreshToken: string
    ) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.authorities = authorities;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}