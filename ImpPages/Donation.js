const fullName = document.querySelector('.fullName');
const email = document.querySelector('.email');
const phoneNumber = document.querySelector('.phoneNumber');
const address = document.querySelector('.address');
const typeOfDonation = document.querySelector('.typeOfDonation');
const additionalInformation = document.querySelector('.additionalInformation')
const button = document.querySelector('.donation-button')


console.log(fullName, email, phoneNumber, address, typeOfDonation, additionalInformation, button)

button.addEventListener('click', async(e) => {
    e.preventDefault()
    try {
        const data = {
            fullName: fullName.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            address: address.value,
            typeOfDonation: typeOfDonation.value,
            additionalInformation: additionalInformation.value
        }

        console.log(data)

        button.innerHTML = 'Loading...'
        const response = await axios.post("http://localhost:3000/api/donation/register", data)
        button.innerHTML = 'Submit Registration'
        console.log(response.data)
        if(response.data.status == true) {
            alert("Successfully registered")
            window.location.href = '../home.html'
        }
    } catch (error) {
        console.log(error)

        alert("Unable to register for donation")
    }
})