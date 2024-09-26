// Function to validate phone number
function isValidPhoneNumber(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

// Function to validate email
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Password strength checker function
function isStrongPassword(password) {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordPattern.test(password);
}

// Function to check if the user already exists
function userAlreadyExists(email) {
    const storedEmail = localStorage.getItem('signupEmail');
    return storedEmail === email;
}

// Handle Sign Up Form Submission
function signupFormHandler() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const signupMsg = document.getElementById('signup-msg');

    // Validate if user already exists
    if (userAlreadyExists(email)) {
        signupMsg.textContent = "User already exists! Please log in.";
        document.getElementById('signupForm').reset(); // Clear form fields
        return false;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        signupMsg.textContent = "Please enter a valid email address!";
        return false;
    }

    // Validate phone number format
    if (!isValidPhoneNumber(phone)) {
        signupMsg.textContent = "Please enter a valid 10-digit phone number!";
        return false;
    }

    // Check if password is strong
    if (!isStrongPassword(password)) {
        signupMsg.textContent = "Set a strong password! (At least 8 characters, with uppercase, lowercase, number, and special character)";
        return false;
    }

    // Validate if passwords match
    if (password !== confirmPassword) {
        signupMsg.textContent = "Passwords do not match!";
        return false;
    }

    // Store user credentials in localStorage
    localStorage.setItem('signupEmail', email);
    localStorage.setItem('signupPassword', password);

    // Display successful signup message
    signupMsg.textContent = `Thank you for signing up, ${name}! You can now log in.`;

    // Clear the form fields after submission
    document.getElementById('signupForm').reset();

    return false;  // Prevent actual form submission
}

// Handle Login Form Submission
function loginFormHandler() {
    const loginEmail = document.getElementById('loginEmail').value.trim();
    const loginPassword = document.getElementById('loginPassword').value.trim();
    const loginMsg = document.getElementById('login-msg');

    // Retrieve the stored user credentials
    const storedEmail = localStorage.getItem('signupEmail');
    const storedPassword = localStorage.getItem('signupPassword');

    // Check if the entered email and password match the stored ones
    if (loginEmail === storedEmail && loginPassword === storedPassword) {
        loginMsg.textContent = "Login successful!";
    } else {
        loginMsg.textContent = "Incorrect email or password!";
    }

    // Clear the login form fields after submission
    document.getElementById('loginForm').reset();

    return false;  // Prevent actual form submission
}
