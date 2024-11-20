<script>



import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

export default {
  name: "sign-in",
  components: {},
  data(){
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    onSignIn() {
      let authenticationStore = useAuthenticationStore();
      let signInRequest = new SignInRequest(this.email, this.password);
      authenticationStore.signIn(signInRequest, this.$router);
    },
    redirectToSignUp() {
      this.$router.push({name: "sign-up"});
    }
  }
}
</script>

<template>
  <div class="h-fit">
    <div class="flex align-items-center justify-content-center ">
      <pv-card class="">
        <template #title>
          Sign In
        </template>
        <template #content>
          <div>
            <form @submit.prevent="onSignIn">
              <div class="p-fluid">
                <div class="field mt-5">
                  <pv-float-label>
                    <div>
                      <label for="email">Email</label>
                      <pv-input-text id="email" v-model="email" :class="{'p-invalid': !email}"/>
                    </div>

                  </pv-float-label>
                </div>
                <div class="field mt-5">
                  <pv-float-label>
                    <div>
                      <label for="password">Password</label>
                      <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
                    </div>
                  </pv-float-label>
                </div>
                <div class="p-field mt-5 flex justify-content-around">
                  <pv-button type="submit">Sign In</pv-button>
                  <pv-button type="button"
                             severity="secondary"
                             @click="redirectToSignUp">Sign Up</pv-button>
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