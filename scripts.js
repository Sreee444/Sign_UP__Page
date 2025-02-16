const signUpLink = document.getElementById('signUpLink');
const loginLink = document.getElementById('loginLink');
const loginFormContainer = document.getElementById('loginFormContainer');
const signupFormContainer = document.getElementById('signupFormContainer');
const forgotPasswordFormContainer = document.getElementById('forgotPasswordFormContainer');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');
const invalidCredentialsMessage = document.createElement('div');
invalidCredentialsMessage.classList.add('invalid-credentials');
invalidCredentialsMessage.textContent = 'Invalid email or password. Please try again.';
document.body.appendChild(invalidCredentialsMessage);

const emailNotRegisteredMessage = document.createElement('div');
emailNotRegisteredMessage.classList.add('invalid-credentials');
emailNotRegisteredMessage.textContent = 'This email is not registered.';
document.body.appendChild(emailNotRegisteredMessage);

document.addEventListener('DOMContentLoaded', function () {
    loginFormContainer.style.display = 'block';
    signupFormContainer.style.display = 'none';
    forgotPasswordFormContainer.style.display = 'none'; // Initially hide forgot password form
});

// Form Switching
signUpLink.addEventListener('click', () => {
    loginFormContainer.style.display = 'none';
    signupFormContainer.style.display = 'block';
    forgotPasswordFormContainer.style.display = 'none';
});

loginLink.addEventListener('click', () => {
    signupFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
    forgotPasswordFormContainer.style.display = 'none';
});

const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');

// Show forgot password form
forgotPasswordLink.addEventListener('click', () => {
    loginFormContainer.style.display = 'none';
    signupFormContainer.style.display = 'none';
    forgotPasswordFormContainer.style.display = 'block';
});

// Back to login form
backToLoginLink.addEventListener('click', () => {
    forgotPasswordFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
    signupFormContainer.style.display = 'none';
});

// Hide all form fields and success message
function hideFormFields() {
    loginFormContainer.style.display = 'none';
    signupFormContainer.style.display = 'none';
    forgotPasswordFormContainer.style.display = 'none';
    invalidCredentialsMessage.style.display = 'none';
    emailNotRegisteredMessage.style.display = 'none'; // Hide the email not registered message
}

// Show only the login form and hide signup form and other messages
function showFormFields() {
    loginFormContainer.style.display = 'block';
    signupFormContainer.style.display = 'none';
    forgotPasswordFormContainer.style.display = 'none';
    invalidCredentialsMessage.style.display = 'none';
    emailNotRegisteredMessage.style.display = 'none'; // Hide the email not registered message
}

// Signup form submission logic
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill all fields');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match');
    } else {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);

        hideFormFields();
        successMessage.style.display = 'block';
        successText.textContent = 'Account successfully created! Redirecting to login...';

        setTimeout(() => {
            successMessage.style.display = 'none';
            loginFormContainer.style.display = 'block';
            showFormFields();
        }, 3000);
    }
});

// Login form submission logic
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        hideFormFields();
        successMessage.style.display = 'block';
        successText.textContent = 'Login Successful! Welcome back!';

        setTimeout(() => {
            successMessage.style.display = 'none';
            showFormFields();
        }, 3000);
    } else {
        invalidCredentialsMessage.style.display = 'block';
        setTimeout(() => {
            invalidCredentialsMessage.style.display = 'none';
        }, 3000);
    }
});

// Forgot Password form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;

    const storedEmail = localStorage.getItem('email');

    if (email === storedEmail) {
        // Show password reset message
        successMessage.style.display = 'block';
        successText.textContent = 'Password reset link has been sent to your email.';
        
        // Hide forgot password form and other elements
        forgotPasswordFormContainer.style.display = 'none'; // Hide the form
        setTimeout(() => {
            successMessage.style.display = 'none'; // Hide success message
            loginFormContainer.style.display = 'block'; // Redirect to login page
        }, 3000); // Wait 3 seconds before redirecting
    } else {
        // Show email not registered error message
        emailNotRegisteredMessage.style.display = 'block';
        setTimeout(() => {
            emailNotRegisteredMessage.style.display = 'none'; // Hide error message after 3 seconds
        }, 3000);
    }
});

// Password visibility toggle for login
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    const eyeIcon = document.getElementById('togglePassword');
    eyeIcon.classList.toggle('eye-icon-toggle');
});

// Password visibility toggle for signup (Password)
document.getElementById('toggleSignupPassword').addEventListener('click', function() {
    const signupPasswordInput = document.getElementById('signupPassword');
    const type = signupPasswordInput.type === 'password' ? 'text' : 'password';
    signupPasswordInput.type = type;
    const eyeIcon = document.getElementById('toggleSignupPassword');
    eyeIcon.classList.toggle('eye-icon-toggle');
});

// Password visibility toggle for signup (Confirm Password)
document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    const eyeIcon = document.getElementById('toggleConfirmPassword');
    eyeIcon.classList.toggle('eye-icon-toggle');
});
