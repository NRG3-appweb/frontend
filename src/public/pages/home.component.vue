<script>

import BestService from "../components/best-service.component.vue";
import ServiceCategory from "../components/service-category.component.vue";
import BestCompanies from "../components/best-companies.component.vue";
import TopRatedReviews from "../components/top-rated-reviews.component.vue";

export default {
  name: "home",
  components: {TopRatedReviews, BestCompanies, ServiceCategory, BestService}
}
</script>

<template>
  <best-service/>
  <service-category/>
  <top-rated-reviews/>
  <best-companies/>
</template>

<style>

</style>