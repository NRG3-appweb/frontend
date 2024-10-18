<script>

export default {
  name: "create-business-service",
  data(){
    return {
      serviceName: null,
      price: null,
      description: null,
      selectedCategory: null,
      categories: [
        {name: '1', cname: '1'},
        {name: '2', cname: '2'},
        {name: '3', cname: '3'}
      ]
    }
  },
  methods: {
    upload() {
      this.$refs.fileupload.upload();
    },
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    async createService() {
      const serviceData = {
        service_name: this.serviceName,
        price: this.price,
        description: this.description,
        category_id: this.selectedCategory ? this.selectedCategory.id : null,
        company_id: 1, // Assuming a static company_id for this example
        duration: 60, // Assuming a static duration for this example
        raiting: 3.5, // Assuming a default rating for new services
        sales: 8, // Assuming no sales initially
        created_at: new Date().toISOString(),
        img: "https://res.cloudinary.com/dbdoazcrx/image/upload/v1727333993/ulxogsmo1ynfnaxxmxiv.webp" // Assuming a static image URL for this example
      };
      try {
        const serviceApiService = new ServicesApiService();
        const response = await serviceApiService.createService(serviceData);
        this.$toast.add({
          severity: 'success',
          summary: 'Service Created',
          detail: 'Your service has been created successfully.',
          life: 3000
        });
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error creating the service.',
          life: 3000
        });
      }
    }
  }
}
</script>

<template>
  <div style="margin-top: 40px">
    <div class="grid nested-grid">
      <div class="col-4">
        <div class="grid">
          <div class="col-12">
            <pv-card class="w-20rem p-5 custom-card-1">
              <template #header>
                <div>
                  <i class="pi pi-credit-card" style="font-size: 5rem" />
                </div>
                <p style="font-weight: bold">{{ $t('createBusinessText.workAtTheSpeed') }}</p>
              </template>
              <template #content style="padding: 0">
                <p>{{ $t('createBusinessText.gradualAccumulation') }}</p>
              </template>
              <template #footer>
                <pv-button icon="pi pi-angle-right"
                           icon-pos="right"
                           :label="$t('createBusinessText.learnMore')"
                           severity="secondary"
                           class="bg-white-alpha-10"
                           style="color: #37123C" />
              </template>
            </pv-card>
          </div>
          <div class="col-12">
            <pv-card class="w-20rem p-5 custom-card-2">
              <template #header>
                <div>
                  <i class="pi pi-credit-card" style="font-size: 5rem" />
                </div>
                <p>{{ $t('createBusinessText.workAtTheSpeed') }}</p>
              </template>
              <template #content>
                <p>{{ $t('createBusinessText.gradualAccumulation') }}</p>
              </template>
              <template #footer>
                <pv-button icon="pi pi-angle-right"
                           icon-pos="right"
                           :label="$t('createBusinessText.learnMore')"
                           severity="secondary"
                           class="bg-white-alpha-10"
                           style="color: #37123C" />
              </template>
            </pv-card>
          </div>
        </div>
      </div>
      <div class="col-8">
        <pv-card class="w-auto p-5 custom-card-3 bg-gray-50">
          <template #header>
            <div>
              <h2 style="font-family: 'Tajawal', sans-serif; font-weight: normal; font-size: 3rem; margin-top: 0; margin-bottom: 10px">{{ $t('createBusinessService.title') }}</h2>
            </div>
          </template>
          <template #content>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">{{ $t('createBusinessService.serviceName') }}</h2>
              <pv-input-text type="text" v-model="serviceName" :placeholder="$t('createBusinessText.nameYourService')" style="width: 100%" class="custom-text-input" />
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">{{ $t('createBusinessService.categories') }}</h2>
              <pv-cascade-select v-model="selectedCategory" :options="categories" optionLabel="cname" optionGroupLabel="name"
                                 optionGroupChildren="children" :placeholder="$t('createBusinessText.selectCategory')" style="width: 100%" class="custom-cascade-select" />
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">{{ $t('createBusinessService.upload') }}</h2>
              <div class="card flex flex-col gap-6 items-center justify-center">
                <pv-toast />
                <pv-file-upload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" />
                <pv-button :label="$t('createBusinessText.upload')" @click="upload" severity="secondary" />
              </div>
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">{{ $t('createBusinessService.price') }}</h2>
              <pv-input-number v-model="price" inputId="currency-us" :min="0" mode="currency" currency="USD" locale="en-US" fluid
                               :placeholder="$t('createBusinessText.setPrice')" />
            </div>
            <div style="text-align: left">
              <h2 style="font-weight: normal;">{{ $t('createBusinessService.description') }}</h2>
              <pv-textarea v-model="description" rows="10" cols="75" style="background-color: white; color: black" :placeholder="$t('createBusinessText.addDescription')" />
            </div>
          </template>
          <template #footer>
            <pv-button :label="$t('createBusinessService.createService')" class="mt-5" style="background-color: #37123C; color: white" @click="createService" />
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card-1 {
  font-family: 'Montserrat', sans-serif;
  color: #37123C;
  background: #D5CAF0;
}

.custom-card-2 {
  font-family: 'Montserrat', sans-serif;
  color: #37123C;
  background: #D9D9D9;
}

.custom-card-3 {
  font-family: 'Montserrat', sans-serif;
  color: #37123C;
}

.custom-text-input {
  background-color: #ffffff;
  color: black;
}

.custom-cascade-select {
  background-color: #ffffff;
}

</style>
