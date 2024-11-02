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
              category.category_name,
              category.description
          )
      );
    },
    buildServicesFromResponseData(service){
      return service.map(
          service=> new Service(
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
  <div class="flex">
    <div class="text-center p-4 max-w-50rem">
      <category-filter v-model="selectedCategories" :categories="categories"/>
      <price-filter
          v-if="minValue != null && maxValue != null"
          v-model="selectedRange"
          :minServiceValue="minValue"
          :maxServiceValue="maxValue"/>
      <div class="m-3">
        <pv-button label="Filter" class="w-full" raised @click="filterServices()"/>
      </div>
    </div>
    <div class="text-center p-4 mx-4 w-auto">
      <service-list :services="filteredServices"/>
    </div>
  </div>


</template>

<style>
</style>