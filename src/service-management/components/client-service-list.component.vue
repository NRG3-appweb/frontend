<script>
import ServiceItem from "./client-service-item.component.vue";

export default {
  name: "service-list",
  components: {
    ServiceItem
  },
  props: {
    services: {
      type: Array,
      default: []
    }
  },
}
</script>

<template>
  <div>
    <h1>{{ $t('clientServiceList.title') }}</h1>
    <div style="display: flex; flex-wrap: wrap; gap: 3rem;">
      <service-item v-for="service in services"
                    :key="service.id"
                    :service="service"/>
    </div>
  </div>
</template>

<style scoped>
</style>