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
    <div class="flex flex-wrap justify-content-around gap-5" >
      <service-item v-for="service in services"
                    :key="service.id"
                    :service="service"/>
    </div>
  </div>
</template>

<style scoped>
</style>