<script>
import {Appointment} from '../model/appointment.entity.js';
import {Review} from '../../review/model/review.entity.js';
import {ReviewApiService} from '../../review/services/review.service.js';
import {HistoryApiService} from '../services/client-history.service.js';
export default{
  name: "history-item",
  components: {},
  props:{
    appointment: {
      type: Appointment,
      required: true
    }
  },
  data() {
    return {
      review: {
        type: Review,
        required: false
      },
      serviceImage: "",
      hasReview: false,
      reviewApiService: new ReviewApiService(),
      historyApiService: new HistoryApiService()
    }
  },
  methods:{
    goToReviewPage(appointmentId){
      this.$router.push({name: 'ReviewManagementPage', params: {appointmentId}});
    },
    async fetchServiceDetails(){
      try {
        const service = await this.historyApiService.getServiceById(this.appointment.service.id);
        this.serviceImage = service.img;
      } catch (error) {
        console.error('Error fetching services details:', error);
      }
    },
    async deleteReview(reviewId) {
      try {
        if (reviewId) {
          await this.reviewApiService.deleteReview(reviewId);
          console.log('Review deleted successfully');
        } else {
          console.error('Review ID is undefined');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    },
    async checkReviewExists() {
      try {
        const reviewData = await this.reviewApiService.getReviewByAppointmentId(this.appointment.id);
        console.log('Review data:', reviewData);
        this.hasReview = reviewData !== null;
        if (reviewData) {
          this.review = new Review(
              reviewData.data.id,
              reviewData.data.userId,
              reviewData.data.appointment,
              reviewData.data.rating,
              reviewData.data.comments,
              reviewData.data.date
          )
        }
      } catch (error) {
        console.error('Error checking review existence:', error);
        this.hasReview = false;
      }
    }
  },
  watch: {
    review(newReview) {
      this.hasReview = !!newReview;
      this.review = newReview;
    }
  },
  created() {
    console.log('Appointment:', this.appointment);
    this.fetchServiceDetails();
    this.checkReviewExists()
  },
}
</script>

<template>
  <div class="history-card">
    <img v-if="serviceImage" :src="serviceImage" alt="Service Image" class="service-image"/>
    <div class="history-content">
      <h3 class="service-name">{{ appointment.service.serviceName }}</h3>
      <p class="company-name">{{ appointment.company.name }}</p>
      <p class="appointment-date" v-if="appointment.date">{{ appointment.date }}</p>
      <p class="appointment-date" v-else>{{ $t('historyCard.noSchedule') }}</p>
    </div>
    <div class="card-actions">
      <button class="add-button" v-if="!hasReview" @click="goToReviewPage(appointment.id)">
        {{ $t('historyCard.addReview') }}
      </button>
      <div class="actions-buttons" v-if="hasReview">
        <button class="edit-button" @click="goToReviewPage(appointment.id)">
          {{ $t('historyCard.editReview') }}
        </button>
        <button class="delete-button" @click="deleteReview(review.id.toString())">
          {{ $t('historyCard.deleteReview') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border: 1px solid #ececec;
  border-radius: 12px;
  margin: 0 auto 20px;
  background-color: #f9f7fc;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.service-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
}

.history-content {
  text-align: center;
  margin-bottom: 16px;
}

.service-name {
  font-size: 1.4rem;
  color: #37123C;
  font-weight: bold;
  margin-bottom: 8px;
}

.company-name {
  color: #6b5b95;
  font-size: 1.1rem;
  margin-bottom: 6px;
}

.appointment-date {
  color: #a5a5a5;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.actions-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
}

button {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}

.add-button {
  background-color: #a1cfff;
  color: #004080;
}

.edit-button {
  background-color: #b2f5ea;
  color: #007f5f;
}

.delete-button {
  background-color: #ffccd5;
  color: #800020;
}
</style>