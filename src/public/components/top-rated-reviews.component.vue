<script>
import { ReviewApiService } from "../../review/services/review.service.js";

export default {
  name: "top-rated-reviews",
  data() {
    return {
      topRatedReviews: []
    };
  },
  methods: {
    async loadTopRatedReviews() {
      const reviewApiService = new ReviewApiService();
      try {
        const reviewsResponse = await reviewApiService.getReview();
        const reviews = reviewsResponse.data;

        const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);
        const topReviews = sortedReviews.slice(0, 5);

        this.topRatedReviews = topReviews;

       /* this.topRatedReviews = await Promise.all(
            topReviews.map(async (review) => {
              const userResponse = await reviewApiService.getUserById(review.userId);
              const user = userResponse.data[0];
              return { ...review, userName: user.name };
            })
        );*/
      } catch (error) {
        console.error("Error loading top rated reviews:", error);
      }
    }
  },
  mounted() {
    this.loadTopRatedReviews();
  }
};
</script>

<template>
  <div class="top-rated-reviews-container">
    <h2 class="p-text-center title">{{ $t('topRatedReviews.title') }}</h2>
    <div class="reviews-content">
      <div v-for="review in topRatedReviews" :key="review.id" class="review-card">
        <pv-card class="p-shadow-4">
          <template #title>
            <div class="p-d-flex p-jc-center content-text">
              <h3>{{ review.userId }}</h3>
            </div>
          </template>

          <template #content>
            <div class="p-card-content p-text-center content-text">
              <p>{{ $t('topRatedReviews.rating') }}: {{ review.rating }}</p>
              <p>{{ review.comment }}</p>
              <p>{{ $t('topRatedReviews.date') }}: {{ new Date(review.createdDate).toLocaleDateString() }}</p>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-rated-reviews-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reviews-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.p-shadow-4 {
  background: #FFFFFF;
}
.review-card {
  width: 20rem;
  height: auto;
  overflow: hidden;
  margin: 1rem;
}
.content-text {
  color: #000000;
}
.p-text-center {
  text-align: center;
  color: #000000;
  margin-bottom: 16px;
}
.title {
  font-size: 3rem;
  text-decoration: underline;
}
</style>
