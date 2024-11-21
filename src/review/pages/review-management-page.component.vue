<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ReviewManagementCard from '../components/review-management-card.component.vue';
import { ReviewApiService } from '../services/review.service.js';
import { HistoryApiService } from '../../appointment-management/services/client-history.service.js';

const route = useRoute();
const router = useRouter();
const appointment = ref(null);
const appointmentId = route.params.appointmentId;
let review = ref(null);
const reviewApiService = new ReviewApiService();
const appointmentApiService = new HistoryApiService();

const fetchReviewAndAppointment = async () => {
  try {
    const appointmentResponse = await appointmentApiService.getAppointmentById(appointmentId);
    appointment.value = appointmentResponse.data;

    try {
      const reviewResponse = await reviewApiService.getReviewByAppointmentId(appointmentId);
      review.value = reviewResponse.data;
    } catch (reviewError) {
      if (reviewError.response && reviewError.response.status === 404) {
        review.value = null;
        console.warn('Review not found for appointment ID:', appointmentId);
      } else {
        throw reviewError;
      }
    }
  } catch (error) {
    console.error('Error fetching appointment:', error);
  }
};

const saveReview = async (reviewData) => {
  try {
    if (review.value && review.value.id) {
      console.log('Updating review:', review.value.id);
      await reviewApiService.updateReview(review.value.id, reviewData);
    } else {
      console.log('Creating new review');
      await reviewApiService.createReview(reviewData);
    }
    await router.push({ name: 'ClientMyServices' });
  } catch (error) {
    console.error('Error saving review:', error);
  }
};



onMounted(() => {
  fetchReviewAndAppointment();
});
</script>

<template>
  <div>
    <ReviewManagementCard v-if="appointment" :review?="review" @saveReview="saveReview" :appointment="appointment"/>
  </div>
</template>

<style scoped>
</style>