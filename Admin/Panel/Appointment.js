const tableBody = document.querySelector(".appointment-body");

async function fetchData() {
    tableBody.innerHTML = ''
  try {
    
    const loadingSpan = document.createElement('span')
    loadingSpan.innerHTML = 'Loading...'
    tableBody.appendChild(loadingSpan)

    const response = await axios.get(
      "http://localhost:3000/api/admin/fetch-appointment"
    );

    tableBody.removeChild(loadingSpan)

    const data = response.data.response;

    if (response.data.status == true) {
      data.map((appointment) => {
        const tableRow = document.createElement("tr");

        const appointmentNumberCol = document.createElement("td");
        appointmentNumberCol.innerHTML = appointment.id.length > 10 ? appointment.id.slice(0,10) : appointment.id;
        tableRow.appendChild(appointmentNumberCol);

        const customerName = document.createElement("td");
        customerName.innerHTML = appointment.fullName;
        tableRow.appendChild(customerName);

        const serviceName = document.createElement("td");
        serviceName.innerHTML = appointment.category;
        tableRow.appendChild(serviceName);

        const date = document.createElement("td");
        date.innerHTML = new Date(appointment.date).toLocaleDateString();
        tableRow.appendChild(date);

        const time = document.createElement("td");
        time.innerHTML = new Date(appointment.date).toLocaleTimeString();
        tableRow.appendChild(time);

        const appointmentStatus = document.createElement("td");
        const span = document.createElement("span");
        span.innerHTML = appointment.status;
        span.classList.add('status','confirmed')
        appointmentStatus.appendChild(span);
        tableRow.appendChild(appointmentStatus);

        const deleteButton = document.createElement("td");
        const button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add("action-btn", "delete");
        tableRow.appendChild(deleteButton);

        deleteButton.appendChild(button);
        tableBody.appendChild(tableRow);

        deleteButton.addEventListener('click', async () => {
            try {
                const data = {
                    id: appointment.id
                }
                deleteButton.innerHTML = 'deleting...'
                const response = await axios.post("http://localhost:3000/api/admin/delete-appointment", data)
                deleteButton.innerHTML = 'delete'

            } catch (error) {
                console.log(error)
            } finally {
                fetchData()
            }
        })
      });
    } else {
        const emptyListSpan = document.createElement("span")
        emptyListSpan.innerHTML = "No record found"
        tableBody.appendChild(emptyListSpan)
    }
  } catch (error) {
    console.log(error);
  }
}

fetchData();
