const handleErrors = (password, phone, email) => {
    let errors = {};

    // Password validation
    let password_errors = [];
    if (!password) {
        password_errors.push("Password is required");
    } else {
        if (password.length < 8) {
            password_errors.push("Password should be more than 8 characters");
        }
        if (password === password.toLowerCase()) {
            password_errors.push("Password should contain at least one capital letter");
        }
        if (password === password.toUpperCase()) {
            password_errors.push("Password should contain at least one lowercase letter");
        }
    }
    if (password_errors.length > 0) {
        errors['pwd_errors'] = password_errors;
    }

    // Phone number validation
    if (!phone || isNaN(phone) || isNaN(parseFloat(phone))) {
        errors['phone_errors'] = 'Please add a valid number';
    }

    // Email validation
    let email_errors = [];
    if (!email) {
        email_errors.push('Email is required!');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        email_errors.push('Invalid email address!');
    }
    if (email_errors.length > 0) {
        errors['email_errors'] = email_errors;
    }

    return errors;
};

export default handleErrors;