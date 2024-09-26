const fullName = document.querySelector(".name");
const email = document.querySelector(".email");
const phoneNumber = document.querySelector(".phoneNumber");
const category = document.querySelector(".category");
const date = document.querySelector(".date");
const message = document.querySelector(".message");
const button = document.querySelector(".form-btn");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    if (
      !fullName.value ||
      !email.value ||
      !phoneNumber ||
      !category ||
      !date.value
    ) {
      alert("Anyone field is empty!");
      return;
    }

    const data = {
      fullName: fullName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      category: category.value,
      date: new Date(date.value).toISOString(),
      message: message.value,
    };
    console.log(data);

    button.innerHTML = "loading...";
    const response = await axios.post(
      "http://localhost:3000/api/user/appointment",
      data
    );

    button.innerHTML = "APPOINTMENT NOW";

    fullName.value = "";
    email.value = "";
    phoneNumber.value = "";
    category.value = "";
    date.value = "";
    message.value = "";
    console.log(response.data);

    if (response.data.status == true) {
      alert("Submitted successfully");
      window.location.href = "./home.html";
    }
  } catch (error) {
    console.log(error);
    alert("Unable to register for the appointment!");
  }
});


// subcription login

const subscriptionEmail = document.querySelector('.subscription-email')
const subscriptionButton = document.querySelector('.subscription-btn')

subscriptionButton.addEventListener('click', async(e) => {
  e.preventDefault()

  try {
    if(!subscriptionEmail.value) {
      alert('Please enter email or valid email')
      return;
    }

    const data = {
      email: subscriptionEmail.value
    }

    const response = await axios.post("http://localhost:3000/api/user/subscribe", data)

    console.log(response.data)

    if(response.data.status == true) {
      alert('Now you are a subscriber')
      window.location.href = './home.html'
    } else {
      alert(response.data.message)
    }
  } catch (error) {
    console.log(error)
  }
})
