<script>
import {ServiceApiService} from "../services/service-api.service.js";
import {Service} from "../model/service.entity.js";

export default {
  name: "client-service-detail",
  components: {},
  data() {
    return {
      service: Service,
      currentService: Service,
      serviceApiService: new ServiceApiService(),
    };
  },
  methods: {
    buildServiceFromResponseData(service) {
      return new Service(
          service.id,
          service.category_id,
          service.company_id,
          service.service_name,
          service.description,
          service.price,
          service.duration,
          service.rating,
          service.sales,
          service.created_at,
          service.img
      )
    },
    getServiceId() {
      return this.$route.params.id;
    },
    getServiceById(id){
      this.serviceApiService.getServiceById(id)
          .then(response => {
            this.currentService = this.buildServiceFromResponseData(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the service:", error);
          });
    },
    getCurrentService(){
      let serviceId = this.getServiceId();
      if (serviceId) {
        this.getServiceById(serviceId);
      }
    }
  },
  created() {
    this.getCurrentService();
  }
};
</script>

<template>
  <div style="margin-top: 10rem; background-color: #1a1a1a; padding: 5rem; border-radius: 1rem;">
    <div class="flex gap-1">
      <div>
        <img :src="currentService.img" alt="Service Image" />
      </div>
      <div>
        <h1>{{ currentService.service_name }}</h1>
        <p>{{ $t('clientServiceDetail.description') }}: {{ currentService.description }}</p>
        <p>{{ $t('clientServiceDetail.price') }}: {{ currentService.price }}</p>
        <p>{{ $t('clientServiceDetail.duration') }}: {{ currentService.duration }}</p>
      </div>
    </div>
    <div class="mt-7">
      <pv-button :label=" $t('clientServiceDetail.bookNow') " class="w-full" />
    </div>
  </div>
</template>

<style scoped>
/* Add any necessary styles here */
</style>