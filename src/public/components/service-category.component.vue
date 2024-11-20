<script>
import { CategoryApiService } from "../../service-management/services/category-api.service.js";
import { ServiceApiService } from "../../service-management/services/service-api.service.js";

export default {
  name: "service-category",
  data() {
    return {
      categories: [],
      servicesByCategory: {},
    };
  },
  methods: {
    async fetchServicesByCategory() {
      const categoryApiService = new CategoryApiService();
      const serviceApiService = new ServiceApiService();

      try {
        const categoriesResponse = await categoryApiService.getCategories();
        this.categories = categoriesResponse.data;


        const servicesResponse = await serviceApiService.getServices();
        const allServices = servicesResponse.data;

        for (const category of this.categories) {
          const servicesForCategory = allServices.filter(
              (service) => service.category.id === category.id
          );
          this.servicesByCategory[category.id] = servicesForCategory;
        }
      } catch (error) {
        console.error("Error loading categories or services: ", error);
      }
    },
  },
  mounted() {
    this.fetchServicesByCategory();
  },
};
</script>

<template>
  <div class="service-category-container">
    <h2 class="p-text-center title">{{ $t('serviceCategory.title') }}</h2>
    <div class="p-m-4">
      <div v-for="category in categories" :key="category.id" class="category-container p-mb-4">
        <h2 class="p-text-center">{{ category.name }}</h2>
        <div class="services-container p-d-flex" ref="servicesContainer{{ category.id }}">
          <pv-card
              v-for="service in servicesByCategory[category.id]"
              :key="service.id"
              class="service-card p-shadow-2 p-mr-2"
          >
            <template #header>
              <div style="padding: 10px">
                <img alt="service image" :src="service.imgUrl" class="service-image" />
              </div>
            </template>
            <template #title>
              <div class="content-text">
                {{ service.name }}
              </div>
            </template>
            <template #content>
              <div class="content-text">
                <p>{{ service.description }}</p>
                <p class="p-mt-2">{{ $t('servicesHome.price') }}: ${{ service.price }}</p>
                <p class="p-mt-2">{{ $t('servicesHome.duration') }}: {{ service.duration }} min</p>
                <p class="p-mt-2">{{ $t('servicesHome.sales') }}: {{ service.sales }}</p>
                <p class="p-mt-2">{{ $t('servicesHome.rating') }}: {{ service.rating }}</p>
              </div>
            </template>
          </pv-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-category-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.p-text-center {
  text-align: center;
  color: #37123C;
  margin-bottom: 16px;
}

.title {
  font-size: 3rem;
  text-decoration: underline;
}

.p-m-4 {
  padding: 16px;
}

.category-container {
  margin-bottom: 24px;
}

.services-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.service-card {
  width: 20rem;
  height: auto;
  overflow: hidden;
  border-style: solid;
  border-color: #37123C;
  border-width: 1px;
  background-color: #D5CAF0;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: scale(1.05);
}

.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.p-mb-4 {
  margin-bottom: 16px;
}

.p-mt-2 {
  margin-top: 8px;
}

.p-shadow-2 {
  box-shadow: 0px 2px 8px rgb(179, 157, 231);
}

.content-text {
  color: #37123C;
}
</style>
