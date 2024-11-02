<script>
import LanguageSwitcher from "./language-switcher.component.vue";
import { defaultBusinessId } from '../../router/index.js';
export default {
  components: { LanguageSwitcher },
  data() {
    return {
      drawer: false,
      userType: 'client', // Default user type
      userId: 1 // Temporary user id for testing the component
    };
  },
  computed: {
    items() {
      if (this.userType === 'client') {
        return [
          { label: this.$t('toolbar.home'), to: '/home' },
          { label: this.$t('toolbar.services'), to: '/client-services' },
          { label: this.$t('toolbar.schedule'), to: `/schedule/${this.userId}` },
          { label: this.$t('toolbar.myServices'), to: `/client-myservices/${this.userId}` }
        ];
      } else {
        return [
          { label: this.$t('toolbar.home'), to: '/homeBusiness' },
            // { label: this.$t('toolbar.myServices'), to: `/business-myservices/${this.userId}` },
          { label: this.$t('toolbar.myServicesBussiness'), to: `/business-my-services/${defaultBusinessId}` },
            // { label: this.$t('toolbar.schedule'), to: `/business-schedule/${this.userId}` }
          { label: this.$t('toolbar.schedule'), to: `/business-schedule/${this.userId}` }
        ];
      }
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    changeUserType(type) {
      this.userType = type;
    }
  }
};
</script>

<template>
  <header class="header-toolbar">
    <pv-toolbar style="padding: 5px; background-color: #D1E4FA; border-style: none;">
      <template #start>
        <div class="flex items-center gap-2">
          <div class="flex justify-content-center p-3 mr-8">
            <a style="font-family: 'Tajawal', sans-serif; color: #37123c; font-weight: bold; font-size: 30px">
              BLISS
            </a>
          </div>
        </div>
      </template>
      <template #center>
        <div class="flex items-center gap-2">
          <router-link v-for="item in items" :key="item.label" v-slot="{ navigate, href }" :to="item.to" custom>
            <pv-button :href="href" class="custom-button" @click="navigate" text plain>
              <p style="color: #37123c; margin:0;">{{ item.label }}</p>
            </pv-button>
          </router-link>
        </div>
      </template>
      <template #end>
        <pv-button class="custom-button" icon="pi pi-search" text style="color: #37123c" />
        <pv-button class="custom-button" icon="pi pi-shopping-cart" text style="color: #37123c" />
        <pv-button class="custom-button" icon="pi pi-heart" text style="color: #37123c" />
        <pv-button class="custom-button" icon="pi pi-user" :label="$t('toolbar.login') + ' / ' + $t('toolbar.register')" text plain style="color: #37123c" />
        <div class="flex items-center gap-3 m-2">
          <language-switcher />
          <i class="pi pi-cog" style="font-size: 2rem"></i>
          <select v-model="userType" @change="changeUserType(userType)">
            <option value="client">Client</option>
            <option value="business">Business</option>
          </select>
        </div>
      </template>
    </pv-toolbar>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap');

.header-toolbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 60px;
}

.custom-button:hover {
  background-color: #D1E4FA !important;
}

.custom-button {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
}
</style>