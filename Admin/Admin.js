const totalCustomer = document.querySelector(".total-customer");
const totalAppointment = document.querySelector(".total-appointment");
const totalAppointmentAccepted = document.querySelector(
  ".total-appointment-accepted"
);
const totalAppointmentRejected = document.querySelector(
  ".total-appointment-rejected"
)

console.log(totalCustomer, totalAppointment, totalAppointmentAccepted, totalAppointmentRejected)

async function fetchData() {
  try {

    totalCustomer.innerHTML = 'Loading...';
    totalAppointment.innerHTML = 'Loading...';
    totalAppointmentAccepted.innerHTML = 'Loading...';
    totalAppointmentRejected.innerHTML = 'Loading...';

    const [
      totalCustomerResponse,
      totalAppointmentResponse,
      totalAppointmentAcceptedResponse,
      totalAppointmentRejectedResponse,
    ] = await Promise.all([
      axios.get("http://localhost:3000/api/admin/dashboard/total-customer"),
      axios.get("http://localhost:3000/api/admin/dashboard/total-appointment"),
      axios.get(
        "http://localhost:3000/api/admin/dashboard/accepted-appointment"
      ),
      axios.get(
        "http://localhost:3000/api/admin/dashboard/rejected-appointment"
      ),
    ]);
    console.log(totalCustomerResponse.data);
    console.log(totalAppointmentAcceptedResponse.data);
    console.log(totalAppointmentResponse.data);
    console.log(totalAppointmentRejectedResponse.data);

    totalCustomer.innerHTML = totalCustomerResponse.data.total;
    totalAppointment.innerHTML = totalAppointmentResponse.data.total;
    totalAppointmentAccepted.innerHTML = totalAppointmentAcceptedResponse.data.total;
    totalAppointmentRejected.innerHTML = totalAppointmentRejectedResponse.data.total;

  } catch (error) {
    console.log(error);
  }
};

fetchData()


