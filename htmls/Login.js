// JavaScript to control the popup display
document.getElementById("create-account-link").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("create-account-popup").style.display = "block";
});

function closePopup() {
    document.getElementById("create-account-popup").style.display = "none";
}

// Function to validate password match
function validatePassword() {
    var password = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password === confirmPassword) {
        alert("Account created successfully");
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match! Please check again");
        return false;
    }
    return true;
}

// Attach the function to the form submission event
document.querySelector('form').onsubmit = validatePassword;

// Function to authenticate a user
function authenticateUser(username, password) {
    $.getJSON("users.json", function (users) {
        var storedUsers = JSON.parse(localStorage.getItem("new-users")) || [];
        var user = users.find(user => user.username === username && user.password === password);
        var storedUser = storedUsers.find(user => user.username === username && user.password === password);

        if (user || storedUser) {
            var loggedInUser = user ? user.username : storedUser.username;
            localStorage.setItem("loggedInUser", loggedInUser);
            alert("Login successful!");
            // Redirect to dashboard.html or perform other actions
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid username or password.");
        }

    }).fail(function () {
        alert("Failed to load user data.");
    });
}

// Function to handle form submission for login
$("form.login-form").submit(function (event) {
    event.preventDefault();
    var username = $("#login-username-email").val();
    var password = $("#login-password").val();
    authenticateUser(username, password);
});

function login() {
    var username = $("#login-username-email").val();
    var password = $("#login-password").val();
    authenticateUser(username, password);
}


// Function to handle form submission for account creation
$("form.create-account-form").submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form inputs
    var name = $("#new-Name").val();
    var email = $("#new-email").val();
    var password = $("#new-password").val();
    var confirmPassword = $("#confirm-password").val();

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create new user object
    var newUser = { name: name, email: email, password: password };

    // Retrieve existing users from localStorage or initialize an empty array
    var users = JSON.parse(localStorage.getItem("new-users")) || [];

    // Add the new user to the array of users
    users.push(newUser);

    // Save the updated users array back to localStorage
    localStorage.setItem("new-users", JSON.stringify(users));

    // Optionally, redirect or display a success message
    alert("Account created successfully!");

    // Close the create account popup
    closePopup();
});


function storeNewsLetter() {
    let email = document.getElementById("newsLet").value;
    let getEmail = JSON.parse(localStorage.getItem("newsLetter")) || [];
    if (getEmail.some(v => v.email === email)) {
        alert("You are already subscribed")
 } else {
        getEmail.push({
            "email": email,
        });
        localStorage.setItem("newsLetter", JSON.stringify(getEmail));
        alert("Thank you for subcribing to the Newsletter")

        emailInput.value = "";

    }

}



