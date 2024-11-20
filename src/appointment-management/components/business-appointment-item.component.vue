<script>
import {Appointment} from "../model/appointment.entity.js";
import {ServiceApiService} from "../../service-management/services/service-api.service.js";
import {Service} from "../../shared/model/service.entity.js";

export default {
  name: 'business-appointment-item',
  props: {
    appointment: {
      type: Appointment,
      required: true
    }
  },
  data() {
    return {
      service:{
        type: Service
      }
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.appointment.date).toLocaleDateString('en-CA');
    }
  },
  methods: {
    openCancelDialog() {
      this.$emit('open-cancel-dialog', this.appointment);
    },
    async fetchServiceImage() {
      let serviceApiService = new ServiceApiService();
      const response = await serviceApiService.getServiceById(this.appointment.service.id);
      this.service = new Service(
          response.data.id,
          response.data.company,
          response.data.category,
          response.data.name,
          response.data.description,
          response.data.price,
          response.data.duration,
          response.data.rating,
          response.data.sales,
          response.data.imgUrl
      );
    }
  },
  created() {
    this.fetchServiceImage();
  }
}
</script>

<template>
  <div class="user-card">
    <div class="user-content">
      <img :src="this.service.imgUrl" alt="Service Image" class="user-image" />
      <div class="user-details">
        <div class="appointment-info">
          <h3 class="section-title">{{ $t('businessAppointment.appointment') }}</h3>
          <p><strong>{{ $t('businessAppointment.date') }}:</strong> {{ formattedDate }}</p>
          <p><strong>{{ $t('businessAppointment.time') }}:</strong> {{ appointment.time }}</p>
        </div>
        <hr class="divider" />
        <div class="service-info">
          <h3 class="section-title">{{ $t('businessAppointment.services') }}: {{ appointment.serviceName }}</h3>
          <p><strong>{{ $t('businessAppointment.description') }}:</strong> {{ this.service.description }}</p>
          <p><strong>{{ $t('businessAppointment.price') }}:</strong> ${{ this.service.price}}</p>
          <p><strong>{{ $t('businessAppointment.duration') }}:</strong> {{ this.service.duration }} {{ $t('businessAppointment.minutes') }}</p>
        </div>
        <hr class="divider" />
        <div class="user-info">
          <h3 class="section-title">{{ $t('businessAppointment.user') }}: {{ appointment.user.firstName }} {{appointment.user.lastName}}</h3>
          <!--
          <p><strong>{{ $t('businessAppointment.email') }}:</strong> {{ appointment.userEmail }}</p>
          <p><strong>{{ $t('businessAppointment.phone') }}:</strong> {{ appointment.userPhone }}</p>
          <p><strong>{{ $t('businessAppointment.address') }}:</strong> {{ appointment.userAddress }}</p>
          -->
        </div>
      </div>
    </div>
    <div class="button-container">
      <button @click.stop="openCancelDialog" class="cancel-button">{{ $t('businessAppointment.cancelAppointment') }}</button>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.user-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.user-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.section-title {
  font-size: 1.5rem;
  color: black;
  margin: 5px 0 10px;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
}

.appointment-info p,
.service-info p,
.user-info p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 0.625rem;
}

.cancel-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  width: 12rem;
  text-align: center;
}

.cancel-button:hover {
  background-color: #ff1a1a;
}

</style>