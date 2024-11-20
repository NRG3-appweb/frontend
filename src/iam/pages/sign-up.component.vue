<script>

import {SignUpRequest} from "../model/sign-up.request.js";
import {useAuthenticationStore} from "../services/authentication.store.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phone: "",
      dni: "",
      address: "",
      city: "",
      birthDate: ""
    }
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.firstName, this.lastName, this.password, this.email, this.phone, this.dni, this.address, this.city, this.birthDate);
      this.authenticationStore.signUp(signUpRequest, this.$router);
    }
  }
}
</script>

<template>
  <div>
    <div class="flex align-items-center justify-content-center ">
      <pv-card>
        <template #header>
          <div>
            <h3>Sign Up</h3>
          </div>
        </template>
        <template #content>
          <div>
            <form @submit.prevent="onSignUp">
              <div class="p-fluid">
                <div class="flex gap-5">
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="firstName">First Name</label>
                      <pv-input-text id="firstName" v-model="firstName" :class="{'p-invalid': !firstName}"/>
                    </pv-float-label>
                  </div>
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="lastName">Last Name </label>
                      <pv-input-text id="lastName" v-model="lastName" :class="{'p-invalid': !lastName}"/>
                    </pv-float-label>
                  </div>
                </div>
                <div class="flex gap-5">
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="email">Email</label>
                      <pv-input-text id="email" v-model="email" :class="{'p-invalid': !email}"/>
                    </pv-float-label>
                  </div>
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="password">Password</label>
                      <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
                    </pv-float-label>
                  </div>
                </div>
                <pv-divider/>
                <div>
                  <span> Address info </span>
                </div>
                <div class="flex gap-5">
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="phone">Phone</label>
                      <pv-input-text id="phone" v-model="phone" :class="{'p-invalid': !phone}"/>
                    </pv-float-label>
                  </div>
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="dni">DNI</label>
                      <pv-input-text id="dni" v-model="dni" :class="{'p-invalid': !dni}"/>
                    </pv-float-label>
                  </div>
                </div>
                <div class="flex gap-5">
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="city">City</label>
                      <pv-input-text id="city" v-model="city" :class="{'p-invalid': !city}"/>
                    </pv-float-label>
                  </div>
                  <div class="field mt-5">
                    <pv-float-label>
                      <label for="address">Address</label>
                      <pv-input-text id="address" v-model="address" :class="{'p-invalid': !address}"/>
                    </pv-float-label>
                  </div>
                </div>
                <span> Birthday </span>
                <div class="flex justify-content-center">
                  <pv-datepicker v-model="birthDate" showIcon fluid iconDisplay="input" />
                </div>
                <div class="p-field mt-5">
                  <pv-button type="submit">Sign Up</pv-button>
                </div>
              </div>
            </form>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>

</style>