<script setup>
import { ref, onMounted } from 'vue';
import HistoryItem from './history-item.component.vue';
import { HistoryApiService } from '../services/client-history.service.js';
import { Appointment } from '../model/appointment.entity.js';
import { Review } from '../../review/model/review.entity.js';
import {defaultClientId} from "../../router/index.js";

const userId = defaultClientId;
const completedAppointments = ref([]);
const historyApiService = new HistoryApiService();

const fetchCompletedAppointments = async () => {
  try {
    const appointments = await historyApiService.getAppointments();
    if (!Array.isArray(appointments)) {
      throw new TypeError('Expected an array of appointments');
    }
    const filteredAppointments = appointments.filter(appointment => appointment.userId === userId  && appointment.status === "COMPLETED");
    completedAppointments.value = await Promise.all(
        filteredAppointments.map(async appointment => {
          const service = await historyApiService.getServiceById(appointment.serviceId);
          const company = await historyApiService.getCompanyById(appointment.companyId);
          const reviewData = await historyApiService.getReviewByAppointmentId(appointment.id);
          const review = reviewData.length > 0 ? new Review(reviewData[0]) : null;

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
          newAppointment.serviceName = service.service_name;
          newAppointment.companyName = company.name;
          newAppointment.review = review;

          return newAppointment;
        })
    );
    console.log('Completed Appointments:', completedAppointments.value);
  } catch (error) {
    console.error('Error fetching completed appointments:', error);
  }
};

onMounted(() => {
  fetchCompletedAppointments();
});

const handleReviewDeleted = (reviewId) => {
  completedAppointments.value = completedAppointments.value.map(appointment => {
    if (appointment.review?.id === reviewId) {
      return { ...appointment, review: undefined };
    }
    return appointment;
  });
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>