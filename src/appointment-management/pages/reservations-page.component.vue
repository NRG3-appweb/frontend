<script>
import {ServiceApiService} from "../../service-management/services/service-api.service.js";
import {Service} from "../../shared/model/service.entity.js";
import {Appointment} from "../model/appointment.entity.js";
import {ClientAppointmentApiService} from "../services/client-appointment-api.service.js";
import ServiceMiniCard from "../components/service-mini-card.component.vue";
import AppointmentForm from "../components/appointment-form.component.vue";
import {defaultClientId} from "../../router/index.js";

export default {
  name: "reservations",
  components: {AppointmentForm, ServiceMiniCard},
  data(){
    return {
      serviceId: this.$route.params.id,
      bookingService: Service,
      serviceApiService: new ServiceApiService(),
      appointment: Appointment,
      clientAppointmentApiService: new ClientAppointmentApiService(),
      date: new Date(),
      time: new Date(),
      requirements: null
    }
  },
  methods: {
    buildServiceFromResponseData(service) {
      return new Service(
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
      )
    },
    async getBookingService(){
      let response = await this.serviceApiService.getServiceById(this.serviceId);
      this.bookingService = this.buildServiceFromResponseData(response.data);
    },
    async handleBookingEvent(appointment) {
      let response = await this.clientAppointmentApiService.createAppointment(appointment);
      if (response.status === 201) {
        this.afterBookingDialog();
      }
    },
    redirectToServices(){
      this.$router.push({name: 'ClientServices'});
    },
    redirectToSchedules(){
      this.$router.push({name: 'ClientSchedule' , params: {userId: defaultClientId}});
    },
    afterBookingDialog() {
      this.$confirm.require({
        message: 'Where u headed now?',
        header: 'Service Booked :DD!!',
        modal: true,
        rejectProps: {
          label: 'Go to Services',
          outlined: true
        },
        acceptProps: {
          label: 'Go to Sechedule'
        },
        accept: () => {
          this.redirectToSchedules();
        },
        reject: () => {
          this.redirectToServices()
        }
      });
    }
  },
  created(){
    this.getBookingService();
  }

}
</script>

<template>
  <div class="flex gap-5 align-items-start">
    <div class="flex-1 flex align-items-center justify-content-center">
      <div>
        <service-mini-card :service="bookingService"/>
      </div>
    </div>
    <div class="flex-none flex align-items-center justify-content-center">
      <appointment-form :service="bookingService"
       @booking-event="handleBookingEvent"/>
    </div>
    <div class="flex-1 flex align-items-start justify-content-center">
      <div>
        <pv-card style="max-width: 300px">
          <i class="pi pi-credit-card"/>
          <template #title>
            Not what you needed?
          </template>
          <template #subtitle>
            check services again!
          </template>
          <template #footer>
            <pv-button label="Go Back" icon="pi pi-chevron-right" icon-pos="left"
             severity="danger" @click="redirectToServices()" />
          </template>
        </pv-card >
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>