<template>
  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 w-full text-left">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <span
          class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
          >{{ dataNumber }}</span
        >
        <h3 class="text-base font-normal text-gray-500">{{ text }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "simpleCard",
  props: {
    dataNumber: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: null,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
