<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { Review } from '../model/review.entity.js';
import axios from 'axios';
import Rating from 'primevue/rating';
import { ReviewApiService } from '../services/review.service.js';
import { HistoryApiService } from "../../appointment-management/services/client-history.service.js";

const props = defineProps({
  review: {
    type: Object,
    default: () => null
  },
  appointment: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['saveReview', 'reviewCreated']);
const rating = ref(0);
const comment = ref('');
const imageUrl = ref('');
const fileInput = ref(null);
const reviewData = computed(() => props.review);

const saveReview = () => {
  const reviewData = {
    userId: props.appointment.user.id,
    appointmentId: props.appointment.id,
    rating: rating.value,
    comment: comment.value,
    imageUrl: imageUrl.value
  };

  console.log('Review Data:', reviewData); // Log the review data

  emit('saveReview', reviewData);
  emit('reviewCreated', reviewData);
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Bliss-review');

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dmeftoblw/image/upload`, formData);
      if (response.data && response.data.secure_url) {
        imageUrl.value = response.data.secure_url;
      } else {
        console.error('Error in Cloudinary response', response);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }
};

const fileInputClick = () => {
  fileInput.value.click();
};

watch(reviewData, (newReview) => {
  if (newReview) {
    rating.value = newReview.rating;
    comment.value = newReview.comments;
    imageUrl.value = newReview.imageUrl || '';
  }
}, { immediate: true });

onMounted(() => {

});
</script>

<template>
  <div class="review-management-card">
    <h2>{{ review ? 'Edit Review' : 'Add Review' }}</h2>
    <form @submit.prevent="saveReview">
      <div class="AppointmentDetails">
        <div>
          <label>Service Name:</label>
          <span>{{ props.appointment.service.serviceName }}</span>
        </div>
        <div>
          <label>Company Name:</label>
          <span>{{ props.appointment.company.name }}</span>
        </div>
        <div>
          <label>Appointment Date:</label>
          <span>{{ props.appointment.reservationDate }}</span>
        </div>
        <div>
          <label>User ID:</label>
          <span>{{ props.appointment.user.id }}</span>
        </div>
      </div>
      <label for="rating">Rating</label>
      <div class="star-container">
        <div class="stars">
          <Rating v-model="rating" :stars="5"/>
        </div>
      </div>
      <label for="comment">Comment</label>
      <textarea id="comment" v-model="comment" required></textarea>

      <div class="image-upload" style="display: flex; justify-content: center; margin-top: 10px;">
        <div
            class="upload-frame"
            @click="fileInputClick"
            style="border: 2px dashed #ccc; width: 30%; height: 100px; display: flex; align-items: center; justify-content: center; position: relative;"
        >
          <input
              type="file"
              ref="fileInput"
              @change="uploadImage"
              style="display: none;"
          />
          <i v-if="!imageUrl" class="pi pi-camera" style="font-size: 24px;"></i>
          <img v-if="imageUrl" :src="imageUrl" alt="Image Preview"
               style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <button type="submit">{{ review ? 'Update Review' : 'Create Review' }}</button>
    </form>
  </div>
</template>

<style scoped>
.review-management-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
}

.review-management-card h2 {
  text-align: center;
  margin-bottom: 20px;
}

.review-management-card form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.review-management-card label {
  font-weight: bold;
}

.review-management-card input,
.review-management-card textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.review-management-card button {
  align-self: center;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #37123C;
  color: white;
  cursor: pointer;
}

.review-management-card button:hover {
  background-color: #37123C;
}

h2 {
  display: block;
  justify-content: center;
  margin-bottom: 10px;
  color: #37123C;
}

.review-management-card form {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #666666;
}

.AppointmentDetails {
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  color: #666666;
}

.AppointmentDetails label {
  float: left;
}

.AppointmentDetails span {
  float: left;
}

.star-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.stars {
  color: yellow;
}
</style>