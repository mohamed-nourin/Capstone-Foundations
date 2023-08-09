const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    password,
  };

  axios.post("http://localhost:5555/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.data.message === "Login successful") {
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during login. Please try again.");
    });
});
