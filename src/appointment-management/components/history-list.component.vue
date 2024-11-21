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
        this.completedAppointments = await Promise.all(filteredAppointments);
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