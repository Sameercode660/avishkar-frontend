const email = document.querySelector('.email')
const password = document.querySelector('.password')
const adminLoginBtn = document.querySelector('.admin-login-btn')


console.log(email, password, adminLoginBtn)

adminLoginBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    try {

        if(!email.value || !password.value) {
            alert('Anyone field is empty')
            return;
        }

        const data = {
            email: email.value,
            password: password.value
        }

        adminLoginBtn.innerHTML = 'Loading...'
        const response = await axios.post("http://localhost:3000/api/admin/login", data)
        adminLoginBtn.innerHTML = 'Login In'

        console.log(response.data)

        if(response.data.status == true) {
            window.location.href = './Admin.html'
        } else {
            alert("Please enter valid credential")
        }
    } catch (error) {
        console.log(error)
    }
})