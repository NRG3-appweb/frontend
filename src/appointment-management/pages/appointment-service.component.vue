<script>
import appointmentsListComponent from "../components/appointment-list.component.vue";
import appointmentList from "../components/appointment-list.component.vue";

export default {
  name: "appointment-service",
  components: { appointmentList, appointmentsListComponent },
  data() {
    return {
      userId: null
    };
  },
  created() {
    this.userId = this.$route.params.userId;
  }
}
</script>

<template>
  <pv-card class="custom-card">
    <template #header>
      <h1 class="title">{{ $t('appointment.appointments') }}</h1>
    </template>
    <template #content>
      <div class="appointment-container">
        <appointment-list :userId="userId"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.custom-card {
  background-color: white;
  width: 100%;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.appointment-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 5px;
}

.title {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
  color: black;
}
</style>