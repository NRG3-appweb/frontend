<script>
import BusinessAppointmentItem from './business-appointment-item.component.vue';
import { BusinessAppointmentApiService } from "../services/business-appointment-api.service.js";
import { AppointmentApiService } from "../services/appointment-api.service.js";
import { ServiceApiService } from "../../service-management/services/service-api.service.js";
import {Appointment} from "../model/appointment.entity.js";

export default {
  name: "business-appointment-list",
  components: { BusinessAppointmentItem },
  data() {
    return {
      userList: [],
      companyId: 1,
      selectedUser: null,
      dialogVisible: false,
      cancelDialogVisible: false,
      businessApiService: new BusinessAppointmentApiService(),
      appointmentApiService: new AppointmentApiService(),
      serviceApiService: new ServiceApiService(),
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const appointments = await this.appointmentApiService.getAppointments();

        const filteredAppointments = appointments.filter(
            appointment => appointment.companyId === this.companyId && appointment.status === "PENDING"
        );

        const userDetailsPromises = filteredAppointments.map(async appointment => {
          const serviceResponse = await this.serviceApiService.getServiceById(appointment.serviceId);
          const companyResponse = await this.businessApiService.getCompanyById(appointment.companyId);
          const userResponse = await this.businessApiService.getUserById(appointment.userId);

          const newAppointment = new Appointment(
              appointment.id,
              appointment.userId,
              appointment.serviceId,
              appointment.companyId,
              appointment.reservationDate,
              appointment.status,
              appointment.date,
              appointment.time
          );

          newAppointment.serviceName = serviceResponse.data ? serviceResponse.data.service_name : 'Unknown Service';
          newAppointment.description = serviceResponse.data ? serviceResponse.data.description : 'No Description';
          newAppointment.price = serviceResponse.data ? serviceResponse.data.price : 0;
          newAppointment.duration = serviceResponse.data ? serviceResponse.data.duration : 0;
          newAppointment.rating = serviceResponse.data ? serviceResponse.data.rating : 0;
          newAppointment.img = serviceResponse.data ? serviceResponse.data.img : '';

          newAppointment.companyName = companyResponse ? companyResponse.name : 'Unknown Company';

          newAppointment.userName = userResponse ? userResponse.name : 'Unknown User';
          newAppointment.userEmail = userResponse ? userResponse.email : '';
          newAppointment.userPhone = userResponse ? userResponse.phone : '';
          newAppointment.userAddress = userResponse ? userResponse.address : '';

          return newAppointment;
        });

        this.userList = await Promise.all(userDetailsPromises);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    },

    async handleCancelAppointment(userId) {
      try {
        await this.appointmentApiService.cancelAppointment(userId);
        this.userList = this.userList.filter(user => user.id !== userId);
        this.cancelDialogVisible = false;
      } catch (error) {
        console.error('Error canceling appointment:', error);
      }
    },

    openCancelDialog(user) {
      this.selectedUser = user;
      this.cancelDialogVisible = true;
    },

    closeCancelDialog() {
      this.cancelDialogVisible = false;
      this.selectedUser = null;
    },

    openUserDialog(user) {
      this.selectedUser = {
        name: user.userName,
        email: user.userEmail,
        phone: user.userPhone,
        address: user.userAddress
      };
      this.dialogVisible = true;
    },

    closeUserDialog() {
      this.dialogVisible = false;
      this.selectedUser = null;
    },
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<template>
  <div class="user-list-container">
    <div v-if="userList.length === 0">
      <p>{{ $t('businessAppointmentList.noUsersAvailable') }}</p>
    </div>
    <div v-for="user in userList"
         :key="user.id"
         class="user-item-container"
         @click="openUserDialog(user)">
      <business-appointment-item :user="user"
                                 @open-cancel-dialog="openCancelDialog"/>
    </div>

    <div v-if="dialogVisible" class="dialog-overlay" @click="closeUserDialog">
      <div class="dialog-card" @click.stop>
        <h3>{{ $t('businessAppointmentList.userDetails') }}</h3>
        <p><strong>{{ $t('businessAppointmentList.name') }}:</strong> {{ selectedUser?.name }}</p>
        <p><strong>{{ $t('businessAppointmentList.email') }}:</strong> {{ selectedUser?.email }}</p>
        <p><strong>{{ $t('businessAppointmentList.phone') }}:</strong> {{ selectedUser?.phone }}</p>
        <p><strong>{{ $t('businessAppointmentList.address') }}:</strong> {{ selectedUser?.address }}</p>
        <button @click="closeUserDialog" class="close-button">{{ $t('businessAppointmentList.close') }}</button>
      </div>
    </div>

    <div v-if="cancelDialogVisible" class="dialog-overlay" @click="closeCancelDialog">
      <div class="dialog-card" @click.stop>
        <h3>{{ $t('businessAppointmentList.confirmCancellation') }}</h3>
        <p>{{ $t('businessAppointmentList.confirmCancellationMessage') }}</p>
        <button @click="handleCancelAppointment(selectedUser.id)" class="confirm-button">{{ $t('businessAppointmentList.yesCancel') }}</button>
        <button @click="closeCancelDialog" class="cancel-button">{{ $t('businessAppointmentList.noGoBack') }}</button>
      </div>
    </div>
  </div>
</template>




<style scoped>
.user-list-container {
  display: block;
  width: 100%;
  color: black;
}

.user-item-container {
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
</style>
