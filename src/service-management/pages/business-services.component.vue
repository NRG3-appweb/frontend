<script>
import ServiceList from "../components/client-service-list.component.vue";
import BusinessServiceList from "../components/business-service-list.component.vue";

export default {
  name: "business-services",
  components: { BusinessServiceList, ServiceList }
}
</script>

<template>
  <pv-card class="mt-5 mb-5 bg-white">
    <template #header>
      <h1 class="header-left">{{$t('businessServices.ourServices')}}</h1>
    </template>
    <template #content>
      <div class="content-center">
        <business-service-list />
      </div>
    </template>
    <template #footer>
      <div class="add-button">
        <router-link to="/business-service-management/create-service">
          <pv-button icon="pi pi-plus"
                     icon-pos="right"
                     :label="$t('businessServices.addService')"
                     severity="secondary"
                     class="custom-purple-button" />
        </router-link>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

.add-button {
  margin: 3rem;
}
.custom-purple-button {
  background-color: #37123C;
  border-color: #37123C;
  color: #ffffff;
}
.content-center {
  display: flex;
  justify-content: center;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
}
.header-left {
  color: #37123C;
  font-family: 'Tajawal', sans-serif;
  font-weight: normal;
  text-align: left;
  padding-left: 35px;
}
</style>