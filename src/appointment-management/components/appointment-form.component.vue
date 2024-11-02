<script>
import {Service} from "../../shared/model/service.entity.js";
import {Appointment} from "../model/appointment.entity.js";

export default {
  name: "appointment-form",
  components: {},
  props: {
    service: Service
  },
  data() {
    return {
      date: new Date(),
      time: new Date(),
      requirements: null
    }
  },
  methods:{
    buildAppointmentFromFormData(){
      let nowDate = new Date();
      nowDate = nowDate.toISOString();
      let bookingDate = this.date.toISOString();
      let bookingTime = `${this.time.getHours().toString().padStart(2, '0')}:${this.time.getMinutes().toString().padStart(2, '0')}`;
      return new Appointment(
          null,
          1,
          this.service.id,
          this.service.company_id,
          nowDate,
          "PENDING",
          bookingDate,
          bookingTime,
          this.requirements
      );

    },
    emitBookingEvent(){
      let appointment = this.buildAppointmentFromFormData();
      this.$emit('booking-event', appointment);
    },
    confirmBooking(){
      this.$confirm.require({
        message: 'Are you sure u want to book ' + this.service.service_name + ' service ?',
        header: 'Confirmation',
        icon: 'pi pi-calendar-clock',
        rejectProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: 'Book'
        },
        accept: () => {
          this.emitBookingEvent()
        }
      });
    }
  }
}
</script>

<template>
  <pv-confirm-dialog/>
  <pv-card>
    <template #title>
      Make An Appointment
    </template>
    <template #content>
      <div>
        <label class="font-bold block mb-2"> Any requirements? </label>
        <pv-textarea v-model="requirements"  rows="6" cols="30" class="w-full"/>
      </div>
      <div class="mt-5">
        <div class="flex-auto">
          <label class="font-bold block mb-2"> Select Date </label>
          <pv-datepicker v-model="date" readonly/>
          <div class="card flex justify-center">
            <pv-datepicker v-model="date" inline showWeek class="w-full sm:w-[30rem]"/>
          </div>
        </div>
        <div class="flex-auto">
          <label class="font-bold block mb-2"> Select Time </label>
          <pv-datepicker v-model="time" timeOnly readonly/>
          <div class="card flex justify-center">
            <pv-datepicker  v-model="time" inline timeOnly fluid class="w-full sm:w-[30rem]" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <pv-button label="Book Now" icon="pi pi-check" icon-pos="right" @click="confirmBooking()"/>
    </template>
  </pv-card>
</template>

<style scoped>

</style>