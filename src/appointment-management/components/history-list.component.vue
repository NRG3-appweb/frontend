<script>
import HistoryItem from './history-item.component.vue';
import { Appointment } from '../model/appointment.entity.js';
import { HistoryApiService } from '../services/client-history.service.js';
import { ServiceApiService } from '../../service-management/services/service-api.service.js';
import { defaultClientId } from '../../router/index.js';
import { AppointmentApiService } from "../services/appointment-api.service.js";
import { Review } from '../../review/model/review.entity.js';
import { ReviewApiService } from '../../review/services/review.service.js';
export default {
  name: "history-list",
  components: { HistoryItem },
  data() {
    return {
      completedAppointments: [],
      userId: defaultClientId,
      appointmentApiService: new AppointmentApiService(),
      historyApiService: new HistoryApiService(),
      serviceApiService: new ServiceApiService(),
      reviewApiService: new ReviewApiService()
    };
  },
  methods: {
    async fetchCompletedAppointments() {
      try {
        const appointments = await this.appointmentApiService.getAppointmentsByUserId(this.userId);
        const filteredAppointments = appointments.filter(
            appointment => {
              return appointment.status === "COMPLETED"
            }
        );

        const appointmentDetailsPromises = filteredAppointments.map(async appointment => {
          let serviceName = "Unknown Service";
          let companyName = "Unknown Company";

          if (appointment.service && appointment.service.id) {
            const serviceResponse = await this.serviceApiService.getServiceById(appointment.service.id);
            serviceName = serviceResponse ? serviceResponse.serviceName : "Unknown Service";
          } else {
            console.warn(`Missing serviceId for appointment ID: ${appointment.id}`);
          }

          if (appointment.company && appointment.company.id) {
            const companyResponse = await this.historyApiService.getCompanyById(appointment.company.id);
            companyName = companyResponse ? companyResponse.name : "Unknown Company";
          } else {
            console.warn(`Missing companyId for appointment ID: ${appointment.id}`);
          }
          const reviewData = await this.reviewApiService.getReviewByAppointmentId(appointment.id);
          const review = reviewData ? new Review(reviewData) : null;

          if (review) {
            console.log(`Review ID for appointment ID ${appointment.id}:`, review.id);
          } else {
            console.log(`No review found for appointment ID ${appointment.id}`);
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
          newAppointment.service.serviceName = serviceName;
          newAppointment.company.name = companyName;
          newAppointment.review = review;

          return newAppointment;
        });



        this.completedAppointments = await Promise.all(appointmentDetailsPromises);
        console.log('Completed Appointments:', this.completedAppointments);
      } catch (error) {
        console.error("Error fetching completed appointments:", error);
      }
    },
    handleReviewDeleted(appointmentId) {
      const appointment = this.completedAppointments.find(app => app.id === appointmentId);
      if (appointment) {
        appointment.review = null;
      }
    }
  },
  created() {
    this.fetchCompletedAppointments();
  }
};
</script>
<template>
<div class="history-list">
<history-item
    v-for="appointment in completedAppointments"
    :key="appointment.id"
    :appointment="appointment"
    :review="appointment.review"
    @reviewDeleted="handleReviewDeleted"
/>
</div>
</template>

<style scoped>
.history-list {
  display: block;
  width: 100%;
  color: black;
}

.history-item-container {
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>