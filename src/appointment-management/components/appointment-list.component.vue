<script>
import AppointmentItem from './appointment-item.component.vue';
import {Appointment} from "../model/appointment.entity.js";
import {BusinessAppointmentApiService} from "../services/business-appointment-api.service.js";
import {AppointmentApiService} from "../services/appointment-api.service.js";
import {ServiceApiService} from "../../service-management/services/service-api.service.js";
import {defaultClientId} from "../../router/index.js";

export default {
  name: "appointment-list",
  components: { AppointmentItem },
  data() {
    return {
      pendingAppointments: [],
      userId: 1,
      selectedAppointment: null,
      dialogVisible: false,
      cancelDialogVisible: false,
      businessApiService: new BusinessAppointmentApiService(),
      appointmentApiService: new AppointmentApiService(),
      serviceApiService: new ServiceApiService(),
    };
  },
  methods: {
    async fetchPendingAppointments() {
      try {
        const appointments = await this.appointmentApiService.getAppointmentsByUserId(defaultClientId);
        const filteredAppointments = appointments.filter(
            appointment => {
              return  appointment.status === "PENDING";
            }
        );

        const appointmentDetailsPromises = filteredAppointments.map(async appointment => {
          let serviceName = "Unknown Service";
          let companyName = "Unknown Company";

          if (appointment.service && appointment.service.id) {
            const serviceResponse = await this.serviceApiService.getServiceById(appointment.service.id);
            serviceName = serviceResponse.data ? serviceResponse.data.serviceName : "Unknown Service";
          } else {
            console.warn(`Missing serviceId for appointment ID: ${appointment.id}`);
          }

          if (appointment.company && appointment.company.id) {
            const companyResponse = await this.businessApiService.getCompanyById(appointment.company.id);
            companyName = companyResponse ? companyResponse.name : "Unknown Company";
          } else {
            console.warn(`Missing companyId for appointment ID: ${appointment.id}`);
          }

          const newAppointment = new Appointment(
              appointment.id,
              appointment.user,
              appointment.service,
              appointment.company,
              appointment.reservationDate,
              appointment.status,
              appointment.date,
              appointment.time,
              appointment.requirements
          );
          newAppointment.serviceName = serviceName;
          newAppointment.companyName = companyName;

          return newAppointment;
        });

        this.pendingAppointments = await Promise.all(appointmentDetailsPromises);
        console.log('Pending Appointments:', this.pendingAppointments);
      } catch (error) {
        console.error("Error fetching pending appointments:", error);
      }
    },

    async handleCancelAppointment(appointmentId) {
      try {
        await this.appointmentApiService.cancelAppointment(appointmentId);
        this.pendingAppointments = this.pendingAppointments.filter(appointment => appointment.id !== appointmentId);
        this.cancelDialogVisible = false;
      } catch (error) {
        console.error('Error canceling appointment:', error);
      }
    },

    openAppointmentDialog(appointment) {
      this.selectedAppointment = appointment;
      this.dialogVisible = true;
    },

    closeAppointmentDialog() {
      this.dialogVisible = false;
      this.selectedAppointment = null;
    },

    openCancelDialog(appointment) {
      this.selectedAppointment = appointment;
      this.cancelDialogVisible = true;
    },

    closeCancelDialog() {
      this.cancelDialogVisible = false;
      this.selectedAppointment = null;
    }
  },
  created() {
    this.fetchPendingAppointments();
  }
};
</script>

<template>
  <div class="appointment-list-container">
    <div v-if="pendingAppointments.length === 0">
      <p>No appointments available</p>
    </div>
    <div v-for="appointment in pendingAppointments"
         :key="appointment.id"
         class="appointment-item-container">
      <appointment-item :appointment="appointment"
                        @open-cancel-dialog="openCancelDialog"
                        @open-appointment-dialog="openAppointmentDialog"/>
    </div>

    <div v-if="dialogVisible" class="dialog-overlay" @click="closeAppointmentDialog">
      <div class="dialog-card" @click.stop>
        <h3>Appointment Details</h3>
        <p><strong>Service:</strong> {{ selectedAppointment?.service.serviceName }}</p>
        <p><strong>Company:</strong> {{ selectedAppointment?.company.name }}</p>
        <p><strong>Date:</strong> {{ selectedAppointment?.date }}</p>
        <p><strong>Time:</strong> {{ selectedAppointment?.time }}</p>
        <button @click="closeAppointmentDialog" class="close-button">Close</button>
      </div>
    </div>

    <div v-if="cancelDialogVisible" class="dialog-overlay" @click="closeCancelDialog">
      <div class="dialog-card" @click.stop>
        <h3>Confirm Cancellation</h3>
        <p>Are you sure you want to cancel this appointment?</p>
        <button @click="handleCancelAppointment(selectedAppointment.id)" class="confirm-button">Yes, Cancel</button>
        <button @click="closeCancelDialog" class="cancel-button">No, Go Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-list-container {
  display: block;
  width: 100%;
  color: black;
}

.appointment-item-container {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.dialog-card h3 {
  margin-top: 0;
}

.dialog-card p {
  margin: 10px 0;
}

.dialog-card button {
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.3125rem;
}

.dialog-card .confirm-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
}

.dialog-card .confirm-button:hover {
  background-color: #ff1a1a;
}

.dialog-card .cancel-button {
  background-color: #ccc;
  color: black;
  border: none;
}

.dialog-card .cancel-button:hover {
  background-color: #999;
}

.dialog-card .close-button {
  color: #ffffff; /* Cambia este valor por el color que prefieras */
  background-color: black;
  border: none;
}

.dialog-card .close-button:hover {
  background-color: red;
  color: #ffffff; /* Color al pasar el cursor */
}

@media (min-width: 768px) {
  .appointment-list-container {
    flex-direction: row;
  }
}
</style>