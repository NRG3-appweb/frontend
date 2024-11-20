<script>
import {ServiceApiService} from "../services/service-api.service.js";
import {Service} from "../../shared/model/service.entity.js";

export default {
  name: "client-service-detail",
  components: {},
  data() {
    return {
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
          service.name,
          service.description,
          service.price,
          service.duration,
          service.rating,
          service.sales,
          service.imgUrl
      )
    },
    getServiceId() {
      return this.$route.params.id;
    },
    async getServiceById(id){
      const response = await this.serviceApiService.getServiceById(id);
      this.currentService = this.buildServiceFromResponseData(response.data);
    },
    getCurrentService(){
      let serviceId = this.getServiceId();
      if (serviceId) {
        this.getServiceById(serviceId);
      }
    },
    redirectToReservations(serviceId){
      this.$router.push({name: 'Reservations', params: {id: serviceId}});
    }
  },
  created() {
    this.getCurrentService();
  }
};
</script>

<template>
  <div style="background-color: #ffffff;" class="flex flex-row m-3 mx-8 border-round-3xl">
    <div class="flex align-items-center justify-content-center m-8 fadein animation-duration-1000">
      <img :src="currentService.imgUrl" alt="Service Image" class="service-image"/>
    </div>
    <div class="flex align-items-start justify-content-center m-8 text-left max-w-30rem">
      <div>
        <div>
          <span class="text-7xl font-bold">{{currentService.name}}</span>
        </div>
        <div class="flex justify-content-between  ">
          <div>
            <span class="text-4xl font-bold"> PEN {{currentService.price}}</span>
          </div>
          <div class="flex align-items-center justify-content-center gap-2" >
            <span class="text-xl"> {{currentService.rating}}</span>
            <i class="pi pi-star-fill"/>
          </div>
        </div>
        <div class="m-1">
          <pv-button :label=" $t('clientServiceDetail.bookNow') " class="w-full"
           @click="redirectToReservations(currentService.id)"/>
        </div>
        <div>
          <pv-divider type="solid"/>
        </div>
        <div>
          <span> Duration: {{currentService.duration}} mins </span>
        </div>
        <div >
          <span> {{currentService.description}} </span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.service-image{
  max-width: 700px;
  max-height: 500px;
}
</style>