const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  console.log("Received values:", username, email, password, confirmPassword);

  if (password === confirmPassword) {
    const user = {
      username,
      password,
      email,
    };

    try {
      const response = await axios.post("http://localhost:5555/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        window.location.href = "login.html";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  } else {
    alert("Passwords do not match. Please try again.");
  }
});
