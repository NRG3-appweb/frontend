<script>
import CompanyDetailProfile from "../components/company-detail-profile.component.vue";
import {defaultBusinessId} from "../../router/index.js";

export default {
  name: "company-detail-page",
  components: {CompanyDetailProfile},
  data(){
    return {
      companyId: defaultBusinessId
    }
  }
}
</script>

<template>
<company-detail-profile :companyId="companyId"/>
</template>

<style scoped>

</style>