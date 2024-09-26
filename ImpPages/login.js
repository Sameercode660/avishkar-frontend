const loginButton = document.querySelector(".login-btn");
const email = document.querySelector("#username");
const password = document.querySelector("#password");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    if (!email || !password) {
      alert("Anyone field is empty!");
      return;
    }

    const data = {
      email: email.value,
      password: password.value,
    };

    console.log(data);

    loginButton.innerHTML = "Loading...";
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      data
    );

    loginButton.innerHTML = "Login";

    localStorage.setItem("name", response.data.response.firstName);
    localStorage.setItem("id", response.data.response.id);

    loginButton.innerHTML = "LOG IN";
    console.log(response.data);

    if (response.data.status == true) {
      window.location.href = "../home.html";
    }
  } catch (error) {
    console.log(error);
    alert("Unable to login");
  }
});

const firstName = document.querySelector(".firstName");
const surname = document.querySelector(".lastName");
const email1 = document.querySelector(".email");
const password1 = document.querySelector(".password");

const registerButton = document.querySelector(".register-button");

registerButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    if (!firstName || !surname || !email1 || !password) {
      alert("Anyone field is empty!");
      return;
    }

    registerButton.innerHTML = "Loading...";

    const data = {
      firstName: firstName.value,
      surname: surname.value,
      email: email1.value,
      password: password1.value,
    };

    console.log(data);

    registerButton.innerHTML = 'Loading...'
    const response = await axios.post(
      "http://localhost:3000/api/user/register",
      data
    );
    registerButton.innerHTML = 'Register'

    console.log(response.data);

    if(response.data.status == true) {
      localStorage.setItem("name", response.data.response.firstName);
      localStorage.setItem("id", response.data.response.id);
      alert(response.data.message)
      window.location.href = "../home.html";
    } else {
      alert(response.data.message)
    }

  } catch (error) {
    console.log(error)
  }
});
