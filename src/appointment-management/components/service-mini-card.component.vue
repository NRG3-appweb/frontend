<script>
import {Service} from "../../shared/model/service.entity.js";

export default {
  name: "service-mini-card",
  props: {
    service: Service
  }
}
</script>

<template>
  <pv-card>
    <template #header>
      <img alt="service" :src="service.imgUrl" style="max-width: 300px"/>
    </template>
    <template #title>
      {{ service.name }}
    </template>
    <template #subtitle>
      {{ service.description }}
    </template>
    <template #content>
      PEN {{ service.price }}
    </template>
  </pv-card>
</template>

<style scoped>

</style>