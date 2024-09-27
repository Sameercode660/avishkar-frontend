const tableBody = document.querySelector(".tableBody");

async function fetchCustomer() {
    tableBody.innerHTML = ''
  try {
    const loadingSpan = document.createElement("span");
    loadingSpan.innerHTML = "Loading...";
    tableBody.appendChild(loadingSpan);

    const response = await axios.get(
      "http://localhost:3000/api/admin/customer-list"
    );

    tableBody.removeChild(loadingSpan);

    const data = response.data.response;

    if (response.data.status == true) {
      data.map((customer) => {
        const tableRow = document.createElement("tr");

        const customerId = document.createElement("td");
        customerId.innerHTML =
          customer.id.length > 10 ? customer.id.slice(0, 10) : customer.id;
        tableRow.appendChild(customerId);

        const customerName = document.createElement("td");
        customerName.innerHTML = customer.firstName + " " + customer.surname;
        tableRow.appendChild(customerName);

        const email = document.createElement("td");
        email.innerHTML = customer.email;
        tableRow.appendChild(email);

        const phone = document.createElement("td");
        phone.innerHTML = "-";
        tableRow.appendChild(phone);

        const joinedDate = document.createElement("td");
        joinedDate.innerHTML = new Date(
          customer.createdAt
        ).toLocaleDateString();
        tableRow.appendChild(joinedDate);

        const deleteButton = document.createElement("td");
        const button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add("action-btn", "delete");
        deleteButton.appendChild(button);
        tableRow.appendChild(deleteButton);

        tableBody.appendChild(tableRow);

        deleteButton.addEventListener('click', async () => {
            try {
                const data = {
                    id: customer.id
                }
                deleteButton.innerHTML = 'deleting...'
                const response = await axios.post("http://localhost:3000/api/admin/delete-customer", data)
                deleteButton.innerHTML = 'delete'

            } catch (error) {
                console.log(error)
            } finally {
                fetchCustomer()
            }
        })
      });
    } else {
      const emptyListSpan = document.createElement("span");
      emptyListSpan.innerHTML = "No record found";
      tableBody.appendChild(emptyListSpan);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchCustomer();
