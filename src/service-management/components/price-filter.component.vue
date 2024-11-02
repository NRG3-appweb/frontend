<script>
export default {
  name: "price-filter",
  props: {

    minServiceValue: {
      type: Number,
      required: true,
    },
    maxServiceValue: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Array,
      default: []
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      minValue: this.minServiceValue,
      maxValue: this.maxServiceValue,
      value: [this.minServiceValue, this.maxServiceValue]
    };
  },
  watch: {
    minServiceValue(newVal) {
      this.minValue = newVal;
    },
    maxServiceValue(newVal) {
      this.maxValue = newVal;
    },
    value(newValue) {
      if (newValue[0] < this.minValue) newValue[0] = this.minValue;
      if (newValue[1] > this.maxValue) newValue[1] = this.maxValue;
      this.$emit('update:modelValue', newValue);
    }
  },

  created() {
    this.value = [this.minServiceValue, this.maxServiceValue];
  }
};
</script>

<template>
  <div class="w-auto">
    <pv-card>
      <template #title> {{ $t('priceFilter.filterByPrice') }} </template>
      <template #content>
        <div class="m-3 flex">
          <pv-input-text
              id="min-input"
              v-model.number="value[0]"
              :placeholder="$t('priceFilter.minValue')"
          />
          <pv-input-text
              id="max-input"
              v-model.number="value[1]"
              :placeholder="$t('priceFilter.maxValue')"
              class="ml-2"
          />
        </div>
        <pv-slider
            v-model="value"
            range
            class="w-56 m-1"
            :min="minValue"
            :max="maxValue"
        />
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
/* You can add custom styling here if necessary */
</style>