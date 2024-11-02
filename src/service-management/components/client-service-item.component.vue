<script>
import { Service } from "../../shared/model/service.entity.js";

export default {
  name: "service-item",
  props: {
    service: {
      type: Service,
      required: true
    }
  },
  methods: {
    redirectToServiceDetail(serviceId) {
      this.$router.push({ name: 'Service', params: { id: serviceId } });
    }
  }
}
</script>

<template>
  <pv-card style="width: 20rem; height: auto; overflow: hidden">
    <template #header>
      <img alt="user header" :src="service.img" class="service-image" />
    </template>
    <template #title>{{ service.service_name }}</template>
    <template #subtitle>{{ $t('clientService.price') }}: {{ service.price }}</template>
    <template #content>
      <p class="m-0">
        {{ service.description }}
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <pv-button icon="pi pi-arrow-right"
                   icon-pos="right"
                   :label="$t('clientService.learnMore')"
                   class="w-full"
                   @click="redirectToServiceDetail(service.id)" />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
</style>