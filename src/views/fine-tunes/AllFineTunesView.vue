<template>
  <DefaultLayout>
    <fineTuneListTableComponent />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/components/Layout/DefaultLayout.vue";
import fineTuneListTableComponent from "@/components/global/fineTuneListTableComponent.vue";
export default {
  name: "AllFineTunesView",
  components: {
    fineTuneListTableComponent,
    DefaultLayout,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
