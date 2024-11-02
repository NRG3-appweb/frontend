<script>
import { Service } from "../../shared/model/service.entity.js";
import { ServiceApiService } from "../services/service-api.service.js";
export default {
  name: "business-service-item",
  components: {},
  props: {
    service: {
      type: Service,
      required: true
    }
  },
  methods: {
    redirectToServiceEdit(serviceId) {
      this.$router.push({name: 'ServiceEdit', params: {serviceId: serviceId}});
    },
    async deleteService(serviceId) {
      try{
        const serviceApiService = new ServiceApiService();
        await serviceApiService.deleteService(serviceId);
        this.$toast.add({
          severity: 'error',
          summary: 'Service Deleted',
          detail: 'Your service has been deleted successfully.',
          life: 3000
        });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  }
}
</script>

<template>
  <pv-card class="bg-white item-card">
    <template #header>
      <div style="padding: 10px">
        <img alt="user header" :src="service.img" class="service-image" />
      </div>
    </template>
    <template #title>
      <div class="content-text">
        {{ service.service_name }}
      </div>
    </template>
    <template #content>
      <div class="content-text">
        {{ service.description }}
      </div>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <pv-button icon="pi pi-pencil"
                   icon-pos="right"
                   :label="$t('businessService.edit')"
                   class="w-full"
                   @click="this.redirectToServiceEdit(service.id)" />
        <pv-button icon="pi pi-delete-left"
                   icon-pos="right"
                   :label="$t('businessService.delete')"
                   class="w-full"
                   severity="danger"
                   @click="this.deleteService(service.id)"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.item-card {
  width: 20rem;
  height: auto;
  overflow: hidden;
  border-style: solid;
  border-color: black;
  border-width: 1px;
}
.content-text {
  color: #37123C;
}
.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
</style>