<script>
import { ServiceApiService } from "../../service-management/services/service-api.service.js";

export default {
  name: "best-service",

  data() {
    return {
      services: [],
      bestService: null,
    };
  },
  methods: {
    async fetchBestService() {
      const serviceApiService = new ServiceApiService();
      try {
        const servicesResponse = await serviceApiService.getServices();
        this.services = servicesResponse.data;

        if (Array.isArray(this.services) && this.services.length > 0) {
          const sortedServices = this.services.sort((a, b) => b.rating - a.rating);
          this.bestService = sortedServices[0];
        }
      } catch (error) {
        console.error("Error loading best services: ", error);
      }
    },
  },
  created() {
    this.fetchBestService();
  },
};
</script>

<template>
  <div class="best-service-container">
    <h2 class="p-text-center title">{{ $t('bestService.title') }}</h2>
    <div v-if="bestService" class="best-service-content flex justify-content-center">
      <pv-card class="best-service-card p-shadow-2">
        <template #title>
          <h2 class="service-title">{{ bestService.service_name }}</h2>
        </template>
        <template #content>
          <div class="service-content flex">
            <div style="padding: 10px">
              <img :src="bestService.img" alt="service image" class="service-image"/>
            </div>
            <div class="info-container">
              <p class="p-mt-2">{{ $t('servicesHome.price') }}: ${{ bestService.price }}</p>
              <p class="p-mt-2">{{ $t('servicesHome.duration') }}: {{ bestService.duration }} min</p>
              <p class="p-mt-2">{{ $t('servicesHome.sales') }}: {{ bestService.sales }}</p>
              <p class="p-mt-2">{{ $t('servicesHome.rating') }}: {{ bestService.rating }}</p>
            </div>
          </div>
        </template>
      </pv-card>
    </div>
    <div v-else class="flex justify-content-center">
      <p>{{ $t('bestService.error') }}</p>
    </div>
  </div>
</template>

<style scoped>
.p-text-center {
  text-align: center;
  color: #37123C;
  margin-bottom: 16px;
}

.title {
  font-size: 3rem;
  text-decoration: underline;
}

.best-service-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.best-service-content {
  display: flex;
  justify-content: center;
}

.best-service-card {
  width: 100%;
  height: auto;
  max-width: 580px;
  overflow: hidden;
  padding: 16px;
  border-radius: 8px;
  background: transparent;
  color: #37123C;
  background: #D5CAF0;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  transition: transform 0.3s ease;
}

.best-service-card:hover {
  transform: scale(1.02);
}

.service-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.service-content {
  display: flex;
}

.service-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.info-container {
  width: 50%;
  padding: 0 16px;
}

.p-mt-2 {
  margin-top: 8px;
}
</style>
