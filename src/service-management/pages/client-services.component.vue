<script>
import serviceListComponent from "../components/client-service-list.component.vue";
import ServiceList from "../components/client-service-list.component.vue";
import PriceFilter from "../components/price-filter.component.vue";
import CategoryFilter from "../components/category-filter.component.vue";
import {CategoryApiService} from "../services/category-api.service.js";
import {ServiceApiService} from "../services/service-api.service.js";
import {Category} from "../model/category.entity.js";
import {Service} from "../model/service.entity.js";

export default {
  name: "client-services",components: {CategoryFilter, PriceFilter, ServiceList, serviceListComponent},
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
    getFilterPrices(prices) {
      this.minValue = Math.min(...prices);
      this.maxValue = Math.max(...prices);
    },
    getCategories() {
      this.categoriesApiService.getCategories()
          .then(response => {
            this.categories = this.buildCategoriesFromResponseData(response.data);
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
          });
    },
    getServices() {
      this.serviceApiService.getServices()
          .then(response => {
            this.services = this.buildServicesFromResponseData(response.data);
            this.getFilterPrices(this.services.map(service => service.price));
            this.filteredServices = this.services;
          })
          .catch(error => {
            console.error('Error fetching services:', error);
          });
    },
    getFilterServices() {
      this.filteredServices = this.services.filter(service => {
        // Extract the category IDs from the selectedCategories array
        const selectedCategoryIds = this.selectedCategories.map(category => category.id);

        // Check if the service's category_id is in the selected categories or if no category is selected
        const inCategory = selectedCategoryIds.length === 0 || selectedCategoryIds.includes(service.category_id);

        // Check if the service's price is within the selected price range
        const inPriceRange = service.price >= this.selectedRange[0] && service.price <= this.selectedRange[1];

        return inCategory && inPriceRange;
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

  <div class="flex">
    <div class="text-center p-4 max-w-50rem">
      <category-filter v-model="selectedCategories" :categories="categories"/>
      <price-filter v-model="selectedRange" :minServiceValue="minValue" :maxServiceValue="maxValue"/>
      <div class="m-3">
        <pv-button label="Filter" class="w-full" raised @click="getFilterServices()"/>
      </div>
    </div>
    <div class="text-center p-4 mx-4 w-auto">
      <service-list :services="filteredServices"/>
    </div>
  </div>


</template>

<style >

</style>