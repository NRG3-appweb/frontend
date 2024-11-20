<script>
import serviceListComponent from "../components/client-service-list.component.vue";
import ServiceList from "../components/client-service-list.component.vue";
import PriceFilter from "../components/price-filter.component.vue";
import CategoryFilter from "../components/category-filter.component.vue";
import {CategoryApiService} from "../services/category-api.service.js";
import {ServiceApiService} from "../services/service-api.service.js";
import {Category} from "../model/category.entity.js";
import {Service} from "../../shared/model/service.entity.js";

export default {
  name: "client-services",components: { CategoryFilter, PriceFilter, ServiceList, serviceListComponent},
  data() {


    return {
      categories: [],
      services: [],
      categoriesApiService: new CategoryApiService(),
      serviceApiService: new ServiceApiService(),
      minValue: null,
      maxValue: null,
      selectedCategories: [],
      selectedRange: [],
      filteredServices: []
    };
  },
  methods: {
    buildCategoriesFromResponseData(categories){
      return categories.map(
          category=> new Category(
              category.id,
              category.name,
              category.description
          )
      );
    },
    buildServicesFromResponseData(service){
      return service.map(
          service=> new Service(
              service.id,
              service.category,
              service.company,
              service.name,
              service.description,
              service.price,
              service.duration,
              service.rating,
              service.sales,
              service.imgUrl
          )
      );

    },
    getMinValue(values) {
      return Math.min(...values);
    },
    getMaxValue(values) {
      return Math.max(...values);
    },
    async getCategories() {
      let response = await this.categoriesApiService.getCategories();
      this.categories = this.buildCategoriesFromResponseData(response.data);
    },
    async getServices() {
      let response = await this.serviceApiService.getServices();
      this.services = this.buildServicesFromResponseData(response.data);

      this.filteredServices = this.services;

      let prices = this.services.map(service => service.price);
      this.minValue =  this.getMinValue(prices)
      this.maxValue = this.getMaxValue(prices)
    },
    async filterServices(){

      this.filteredServices = this.services.filter(service => {
        let categoryMatch = this.selectedCategories.length === 0 || this.selectedCategories.some(category => category.id === service.category_id);
        let priceMatch = this.selectedRange.length === 0 || (service.price >= this.selectedRange[0] && service.price <= this.selectedRange[1]);
        return categoryMatch && priceMatch;
      });

    }


  },
  created() {
    this.getCategories();
    this.getServices();

  }

}
</script>

<template>
  <pv-toast/>
  <div class="flex" >
    <div class=""  >
      <div class="my-3">
        <category-filter v-model="selectedCategories" :categories="categories"/>
      </div>
      <div class="my-3">
        <price-filter
            v-if="minValue != null && maxValue != null"
            v-model="selectedRange"
            :minServiceValue="minValue"
            :maxServiceValue="maxValue"/>
      </div>
      <div class="my-3">
        <pv-button label="Filter" class="w-full" raised @click="filterServices()"/>
      </div>
    </div>

    <div class="text-center p-4 mx-4 w-full" >
      <service-list :services="filteredServices"/>
    </div>
  </div>


</template>

<style>
#app {
  padding: 2rem;
  text-align: center;
}

body {
  margin: 0;
  display: block !important;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

</style>