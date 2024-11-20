<script>
import { HistoryApiService } from "../services/client-history.service.js";
import {Appointment} from "../model/appointment.entity.js";

export default {
  name: 'appointment-item',
  props: {
    appointment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      serviceImage: '', // URL de la imagen del servicio
      historyApiService: new HistoryApiService()
    };
  },
  async mounted() {
    await this.loadServiceImage();
  },
  methods: {
    async loadServiceImage() {
      try {
        const serviceData = await this.historyApiService.getServiceById(this.appointment.service.id);
        this.serviceImage = serviceData.imgUrl; // Asigna la imagen del servicio a serviceImage
      } catch (error) {
        console.error("Error loading services image:", error);
      }
    },
    openCancelDialog() {
      this.$emit('open-cancel-dialog', this.appointment);
    },
    openAppointmentDialog() {
      this.$emit('open-appointment-dialog', this.appointment);
    },
    formattedDate() {
      return new Date(this.appointment.date).toLocaleDateString('en-CA');
    }
  }
};
</script>

<template>
  <div class="appointment-card" @click="openAppointmentDialog">
    <div class="appointment-content">
      <img alt="service image" class="appointment-image" :src="serviceImage"/>
      <div class="appointment-details">
        <h3 class="appointment-title">{{ appointment.service.serviceName }} - {{ appointment.company.name }}</h3>
        <div class="date-time-container">
          <div class="date-card">{{ $t('appointment.date') }}: {{ formattedDate() }}</div>
          <div class="time-card">{{ $t('appointment.time') }}: {{ appointment.time }}</div>
        </div>
        <button @click.stop="openCancelDialog" class="cancel-button">Cancel Appointment</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointment-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.appointment-content {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.appointment-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.appointment-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

.appointment-title {
  font-size: 1.5rem;
  color: black;
  margin: 5px 5px 10px;
}

.date-time-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  color: #00aced;
}

.date-card, .time-card {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  min-width: 100px;
  text-align: center;
}

.appointment-info p {
  margin: 0;
  font-size: 1rem;
  color: #666;
}

.cancel-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-top: 0.625rem;
  font-size: 1rem;
  width: 12rem;
  text-align: center;
}

.cancel-button:hover {
  background-color: #ff1a1a;
}
</style>
