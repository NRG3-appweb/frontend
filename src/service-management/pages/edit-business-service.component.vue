<script>
import { Service } from "../../shared/model/service.entity.js";
import { ServiceApiService } from "../services/service-api.service.js";
import {CategoryApiService} from "../services/category-api.service.js";

export default {
  name: "edit-business-service",
  props: {
    serviceId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      service: new Service(),
      serviceName: null,
      duration: null,
      price: null,
      description: null,
      selectedCategory: null,
      categories: []
    };
  },
  methods: {
    async fetchService() {
      try {
        const serviceApiService = new ServiceApiService();
        const response = await serviceApiService.getServiceById(parseInt(this.serviceId));
        this.service = new Service(
          response.data.id,
          response.data.company,
          response.data.category,
          response.data.name,
          response.data.description,
          response.data.price,
          response.data.duration,
          response.data.rating,
          response.data.sales,
          response.data.img
        );
        console.log('Service:', this.service);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    async fetchCategories() {
      const categoriesApiService = new CategoryApiService();
      try{
        let response = await categoriesApiService.getCategories();
        this.categories = response.data.map(category => ({
          cname: category.name,
          name: category.id
        }));
      }catch (error){
        console.error('Error fetching categories:', error);
      }
    },
    async updateService(){
      const serviceData ={
        categoryId: this.selectedCategory ? parseInt(this.selectedCategory.name) : this.service.category.id,
        name: this.serviceName ? this.serviceName : this.service.name,
        description: this.description ? this.description : this.service.description,
        price: this.price ? this.price : this.service.price,
        duration: this.duration ? this.duration : this.service.duration,
      };
      try {
        const serviceApiService = new ServiceApiService();
        await serviceApiService.updateServiceById(this.service.id, serviceData);
        window.location.reload();
        console.log('Service updated:', serviceData);
        this.$toast.add({
          severity: 'success',
          summary: 'Service Updated',
          detail: 'Your services has been updated successfully.',
          life: 3000
        });
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error updating the services.',
          life: 3000
        });
      }
    }
  },
  created() {
    this.fetchService();
    this.fetchCategories()
  }
}
</script>

<template>
  <div class="content">
    <pv-card class=" p-5 custom-card-3 bg-gray-50" style="max-width: 800px ">
      <template #header>
        <div>
          <h2 class ="title">{{$t('editService.title')}}</h2>
        </div>
      </template>
      <template #content>
        <div style="text-align: left">
          <h2 style="font-weight: normal;">{{$t('editService.serviceName')}}</h2>
          <pv-input-text style="background-color: white; color: black; width: 100%" type="text" v-model="serviceName" :placeholder="service.name" class="custom-text-input"/>
        </div>
        <div style="text-align: left">
          <h2 style="font-weight: normal;">{{$t('editService.serviceCategory')}}</h2>
          <pv-cascade-select style="background-color: white; color: black; width: 100%" v-model="selectedCategory" :options="categories" optionLabel="cname" optionGroupLabel="name"
                             optionGroupChildren="children" :placeholder="service.category.name" class="custom-cascade-select" />
        </div>
        <div style="text-align: left">
          <h2 style="font-weight: normal;">{{$t('editService.serviceDuration')}}</h2>
          <pv-input-number style="background: white!important; color: black" v-model="duration" mode="decimal" showButtons :min="40" :max="180" fluid :placeholder="service.duration.toString()" />
        </div>
        <div style="text-align: left">
          <h2 style="font-weight: normal;">{{$t('editService.servicePrice')}}</h2>
          <pv-input-number style="background-color: white; color: black" v-model="price" inputId="currency-us" :min="0" mode="currency" currency="USD" locale="en-US" fluid
                           :placeholder="service.price.toString()" />
        </div>
        <div style="text-align: left">
          <h2 style="font-weight: normal;">{{$t('editService.serviceDescription')}}</h2>
          <pv-textarea v-model="description" rows="10" cols="75" style="background-color: white; color: black" :placeholder="service.description" />
        </div>
      </template>
      <template #footer>
        <pv-button :label="$t('editService.editButton')" class="mt-5" style="background-color: #37123C; color: white" @click="updateService" router/>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
  .custom-card-3 {
    font-family: 'Montserrat', sans-serif;
    color: #37123C;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>