<script>
import { ServiceApiService } from "../../service-management/services/service-api.service.js";
import { CompanyDetailApiService } from "../services/company-detail-api.service.js";
import { ReviewApiService } from "../../review/services/review.service.js";

export default {
  name: "company-detail-profile",
  data() {
    return {
      services: [],
      company: null,
      avgRating: null,
      reviews: [],
    };
  },
  props: {
    companyId: {
      type: Number,
      required: false,
    },
  },
  methods: {
    async fetchCompanyDetail() {
      const companyDetailApiService = new CompanyDetailApiService();
      const serviceApiService = new ServiceApiService();
      const reviewApiService = new ReviewApiService();

      try {
        const id = this.companyId || this.$route.params.id;
        if (!id) {
          console.error("No company id provided");
          return;
        }

        const companyResponse = await companyDetailApiService.getCompaniesById(id);
        this.company = companyResponse.data;

        const servicesResponse = await serviceApiService.getServicesByCompanyId(id);
        this.services = servicesResponse.data;

        const reviewsResponse = await reviewApiService.getReviewsByCompanyId(id);
        this.reviews= reviewsResponse.data;
        console.log(this.reviews);

        if (this.reviews.length > 0) {
          const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
          this.avgRating = (totalRating / this.reviews.length).toFixed(2);
        } else {
          this.avgRating = "Not rated yet";
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
  },
  created() {
    this.fetchCompanyDetail();
  },
};
</script>

<template>
  <div v-if="company" class="p-grid p-dir-col p-align-center">
    <!-- Card Company -->
    <div class="p-col-12 p-md-6 p-lg-4 padding-top">
      <pv-card class="company-card p-shadow-2">
        <template #header>
          <h1 class="p-mt-3">{{ company.name }}</h1>
        </template>
        <template #content>
          <div class="company-content flex">
            <div class="image-container">
              <img :src="company.img" alt="Company Image" class="service-img" />
            </div>
            <div class="info-container">
              <p><strong>{{ $t('companyDetail.ruc') }}:</strong> {{ company.ruc }}</p>
              <p><strong>{{ $t('companyDetail.email') }}:</strong> {{ company.email }}</p>
              <p><strong>{{ $t('companyDetail.website') }}: </strong>
                <a :href="company.websiteUrl" target="_blank"> {{ company.websiteUrl }}</a>
              </p>
              <p><strong>{{ $t('companyDetail.averageRating') }}:</strong> {{ avgRating }}</p>
            </div>
            <div class="description-container">
              <p><strong>{{ $t('companyDetail.description')}}</strong></p>
              <p>{{ company.description }}</p>
            </div>
          </div>
        </template>
      </pv-card>
    </div>

    <!-- Card Service -->
    <div class="p-col-12">
      <h2>{{ $t('servicesHome.services') }}:</h2>
      <div class="service-cards">
        <div v-for="service in services" :key="service.id" class="service-card">
          <pv-card class="bg-white services-card p-shadow-4">
            <template #header>
              <div style="padding: 10px">
                <img :src="service.imgUrl" alt="Service Image" width="300px" style="border-radius: 10px;" />
              </div>
            </template>
            <template #title>
              {{service.name}}
            </template>
            <template #content>
              <p><strong>{{ $t('servicesHome.name')}}:</strong> {{service.name}}</p>
              <p>{{ service.description }}</p>

            </template>
          </pv-card>
        </div>
      </div>
    </div>
    <!-- card Reviews -->
    <div class="p-col-12">
      <h2>Reviews:</h2>
      <div class="service-cards">
        <div v-for="review in reviews" :key="review.id" class="service-card">
          <pv-card class="bg-white services-card p-shadow-4">
            <template #header>
              <!-- Optional header content -->
            </template>
            <template #content>
              <p><strong>Calificación:</strong> {{ review.rating }}</p>
              <p><strong>Comentario:</strong> {{ review.comments }}</p>
              <p><strong>Fecha: </strong>{{review.appointment.reservationDate }} </p>

            </template>
          </pv-card>
        </div>
      </div>
    </div>
  </div>
  <p v-else>{{ $t('companyDetail.companyNotFound') }}</p>
</template>

<style scoped>

.padding-top {
  padding-top: 100px;
}


.company-card {
  background: #f5fefe;
  border-color: #9e49b0;
  color: #b39de7;
  border-width: 1px; /* Add this line */
  border-style: solid; /* Add this line */
  overflow: hidden;
}

.services-card{
  color: #37123C;
  width: 20rem;
  height: auto;
  overflow: hidden;
  border-style: solid;
  border-color: black;
  border-width: 1px;
}
.service-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.company-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1000px) {
  .company-content {
    flex-direction: column;
  }
}
.image-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.description-container{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.service-img {

  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  max-height: 300px;
}

.service-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.p-col-12 h2 {
  color: #37123C;
}
</style>

