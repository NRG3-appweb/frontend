<script>
import HistoryList from '../components/history-list.component.vue';

export default {
  name: 'history-page',
  components: {
    HistoryList
  }
};
</script>

<template>
  <div class="history-page">
    <h1>{{ $t('historyPage.completedAppointments') }}</h1>
    <HistoryList/>
  </div>
</template>

<style scoped>
.history-page {
  margin-top: 0px;
  padding: 16px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.parent-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
}

html, body {
  height: 100%;
}
</style>
