<script>
import {ServicesApiService} from "../services/services-api.service.js";
import {Service} from "../model/service.entity.js";
import BusinessServiceItem from "./business-service-item.component.vue";

export default {
  name: "business-service-list",
  components: {BusinessServiceItem},
  data(){
    return{
      services: [],
    }
  },
  methods: {
    async fetchServices() {
      try {
        const serviceApiService = new ServicesApiService();
        const response = await serviceApiService.getServices();
        this.services = response.data.map(service => new Service(
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
        ));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
  },
  created() {
    this.fetchServices();
  },
}
</script>

<template>
    <div style="display: flex; flex-wrap: wrap; gap: 3rem;">
      <business-service-item  v-for="service in services"
                     :key="service.id"
                     :service="service"/>
    </div>
</template>

<style scoped>

</style>