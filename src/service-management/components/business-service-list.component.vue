<script>
import { defaultBusinessId } from '../../router/index.js';
import {ServiceApiService} from "../services/service-api.service.js";
import {Service} from "../../shared/model/service.entity.js";
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
        const serviceApiService = new ServiceApiService();
        const response = await serviceApiService.getServicesByCompanyId(defaultBusinessId);
        this.services = response.data.map(service => new Service(
            service.id,
            service.company,
            service.category,
            service.name,
            service.description,
            service.price,
            service.duration,
            service.rating,
            service.sales,
            service.imgUrl
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