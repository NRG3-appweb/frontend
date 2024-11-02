<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { Review } from '../model/review.entity.js';
import axios from 'axios';
import Rating from 'primevue/rating';
import { ReviewApiService } from '../services/review.service.js';
import {defaultClientId} from "../../router/index.js";

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

const emit = defineEmits(['saveReview']);
const rating = ref(0);
const comment = ref('');
const images = ref([null, null, null]);
const fileInputs = ref([]);
const serviceName = ref('');
const userName = ref('');
const appointmentDate = ref('');
const reviewData = computed(() => props.review);
const reviewApiService = new ReviewApiService();

const fetchAdditionalData = async (appointmentId, userId) => {
  if (!appointmentId || !userId) {
    console.error('appointmentId or userId is undefined');
    return;
  }

  try {
    const [appointmentResponse, userResponse] = await Promise.all([
      reviewApiService.getAppointmentById(appointmentId),
      reviewApiService.getUserById(userId)
    ]);

    const appointment = appointmentResponse.data;
    const user = userResponse.data;

    const serviceResponse = await reviewApiService.getService(appointment.serviceId);

    serviceName.value = serviceResponse.data.service_name;
    userName.value = user.name;
    appointmentDate.value = appointment.date;
  } catch (error) {
    console.error('Error fetching additional data:', error);
  }
};

const saveReview = () => {
  const review = new Review({
    rating: rating.value,
    comment: comment.value,
    images: images.value,
    createdDate: new Date().toISOString(),
    appointmentId: props.appointment.id,
    userId: props.appointment.userId
  });
  emit('saveReview', review);
};

const uploadImage = async (event, index) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Bliss-review');

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dmeftoblw/image/upload`, formData);
      if (response.data && response.data.secure_url) {
        images.value[index] = response.data.secure_url;
      } else {
        console.error('Error in Cloudinary response', response);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }
};

const fileInputClick = (index) => {
  fileInputs.value[index].click();
};

watch(reviewData, (newReview) => {
  if (newReview) {
    rating.value = newReview.rating;
    comment.value = newReview.comment;
    images.value = newReview.images || [null, null, null];
    fetchAdditionalData(newReview.appointmentId, newReview.userId);
  }
}, {immediate: true});

onMounted(() => {
  if (props.appointment && props.appointment.id && props.appointment.userId) {
    fetchAdditionalData(props.appointment.id, props.appointment.userId);
  }
});
</script>

<template>
  <div class="review-management-card">
    <h2>{{ review ? 'Edit Review' : 'Add Review' }}</h2>
    <form @submit.prevent="saveReview">
      <div class="AppointmentDetails">
        <div>
          <label>Service Name:</label>
          <span>{{ serviceName }}</span>
        </div>
        <div>
          <label>User Name:</label>
          <span>{{ userName }}</span>
        </div>
        <div>
          <label>Appointment Date:</label>
          <span>{{ appointmentDate }}</span>
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

      <div class="image-upload" style="display: flex; justify-content: space-around; margin-top: 10px;">
        <div
            class="upload-frame"
            v-for="(image, i) in images"
            :key="i"
            @click="fileInputClick(i)"
            style="border: 2px dashed #ccc; width: 30%; height: 100px; display: flex; align-items: center; justify-content: center; position: relative;"
        >
          <input
              type="file"
              ref="fileInputs"
              @change="uploadImage($event, i)"
              style="display: none;"
          />
          <i v-if="!image" class="pi pi-camera" style="font-size: 24px;"></i>
          <img v-if="image" :src="image" :alt="'Image Preview ' + (i + 1)"
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
.review-management-card form{
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #666666;
}
.AppointmentDetails{
  display: flex ;
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
.star-container{
  width: 100%;
  display: flex;
  justify-content: center;
}
.stars{
  color: yellow;
}
</style>
