const tableBody = document.querySelector(".table-body");
const searchInput = document.querySelector(".search");
const button = document.querySelector(".search-btn");

async function fetchAppointment() {
  tableBody.innerHTML = "";
  try {
    const data = {
      fullName: searchInput.value,
    };

    button.innerHTML = "Searching...";
    const response = await axios.post(
      "http://localhost:3000/api/admin/search-appointment",
      data
    );
    button.innerHTML = "Search";

    console.log(response.data);
    const data1 = response.data.response;

    if (response.data.status == true && data1.length != 0) {
      data1.map((appointment) => {
        const tableRow = document.createElement("tr");
        const appointmentNumberCol = document.createElement("td");
        appointmentNumberCol.innerHTML =
          appointment.id.length > 10
            ? appointment.id.slice(0, 10)
            : appointment.id;
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

        const appointmentStatus = document.createElement("td");
        const span = document.createElement("span");
        span.innerHTML = appointment.status;
        span.classList.add("status", "confirmed");
        appointmentStatus.appendChild(span);
        tableRow.appendChild(appointmentStatus);

        const deleteButton = document.createElement("td");
        const button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add("action-btn", "delete");
        tableRow.appendChild(deleteButton);

        deleteButton.appendChild(button);
        tableBody.appendChild(tableRow);

        deleteButton.addEventListener("click", async () => {
          try {
            const data = {
              id: appointment.id,
            };
            deleteButton.innerHTML = "deleting...";
            const response = await axios.post(
              "http://localhost:3000/api/admin/delete-appointment",
              data
            );
            deleteButton.innerHTML = "delete";
          } catch (error) {
            console.log(error);
          } finally {
            fetchAppointment;
          }
        });
      });
    }
    if (data1.length == 0) {
      const span = document.createElement("span");
      span.innerHTML = "No any record is found";
      tableBody.appendChild(span);
    }
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", fetchAppointment);
