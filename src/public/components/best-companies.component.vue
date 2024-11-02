<script>
import { ServiceApiService } from "../../service-management/services/service-api.service.js";

export default {
  name: "best-companies",
  data() {
    return {
      companies: [],
      services: [],
      topCompanies: [],
    };
  },
  methods: {
    async topCompany() {
      const serviceApiService = new ServiceApiService();
      try {
        const servicesResponse = await serviceApiService.getServices();
        const companiesResponse = await serviceApiService.getCompanies();

        this.services = servicesResponse.data;
        this.companies = companiesResponse.data;

        const companyRatings = {};

        this.services.forEach((service) => {
          if (!companyRatings[service.company_id]) {
            companyRatings[service.company_id] = { totalRating: 0, serviceCount: 0 };
          }

          companyRatings[service.company_id].totalRating += service.rating;
          companyRatings[service.company_id].serviceCount++;
        });

        const companyAvgRating = Object.keys(companyRatings).map((companyId) => {
          const avgRating = companyRatings[companyId].totalRating / companyRatings[companyId].serviceCount;
          return { companyId: parseInt(companyId), avgRating };
        });

        const topCompanyIds = companyAvgRating
            .sort((a, b) => b.avgRating - a.avgRating)
            .slice(0, 3)
            .map((item) => item.companyId);


        this.topCompanies = this.companies.filter((company) => topCompanyIds.includes(company.id));

      } catch (e) {
        console.error("Error loading services and companies:", e);
      }
    },
  },
  created() {
    this.topCompany();
  },
};
</script>

<template>
  <div class="p-m-4">
    <h2 class="p-text-center title">{{$t('companyDetail.bestCompany')}}</h2>
    <div class="companies-container p-grid p-nogutter">
      <div
          v-for="company in topCompanies"
          :key="company.id"
          class="p-col-12 p-md-6 p-lg-4 p-p-2"
      >
        <pv-card class="company-card p-shadow-4">
          <template #title>
            <div class="p-d-flex p-jc-center">
              <img :src="company.img" alt="Logo" class="company-logo"/>
            </div>
            <h3 class="p-mt-3">{{ company.name }}</h3>
          </template>

          <template #content>
            <div class="p-card-content p-text-center">
              <p>{{ company.description }}</p>
              <p>{{ $t('companyDetail.ruc') }}: {{ company.ruc }}</p>
              <p>{{ $t('companyDetail.email') }}: {{ company.email }}</p>
              <a :href="company.website" target="_blank">{{ company.website }}</a>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.companies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.company-card {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: #D9D9D9;
}

.company-logo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.company-banner {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.p-shadow-4 {
  box-shadow: 0px 4px 8px rgb(213, 202, 240);
}

.p-text-center {
  text-align: center;
  color: #37123C;
}

.p-p-2 {
  padding: 8px;
}

.p-mt-3 {
  color: #37123C;
}

.title {
  font-size: 3rem;
  text-decoration: underline;
}
</style>

