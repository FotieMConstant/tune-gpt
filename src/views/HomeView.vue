<template>
  <DefaultLayout>
    <div class="mb-3">
      <getApiKeyComponent />
    </div>
    <div class="flex space-x-3">
      <simpleCard
        v-if="fineTuneList"
        text="Fine-tune(s)"
        :dataNumber="fineTuneList.length"
      />
      <simpleCard
        v-if="filesLists"
        text="File(s)"
        :dataNumber="filesLists.length"
      />
    </div>
  </DefaultLayout>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from "@/components/Layout/DefaultLayout.vue";
import getApiKeyComponent from "@/components/global/getApiKeyComponent.vue";
import simpleCard from "@/components/modules/cards/simpleCard.vue";

export default {
  name: "HomeView",
  components: {
    DefaultLayout,
    getApiKeyComponent,
    simpleCard,
  },
  data() {
    return {
      filesLists: null, //list of files that belongs to the organization
      fineTuneList: null, // list of all finetune models
    };
  },
  beforeMount() {
    console.log(localStorage.getItem("OPENAI_KEY"));
    if (localStorage.getItem("OPENAI_KEY") != null) {
      this.handlefilesLists(); //get all uploaded filesList
      this.handleFineTuneList(); //get fineTune list
    } else {
      console.log("there is no key!");
    }
  },
  methods: {
    // function to call action from store
    async handleFineTuneList() {
      try {
        let response = await this.$store.dispatch("openai/listFineTunes", this);
        this.fineTuneList = response;
        console.log(this.fineTuneList);
      } catch (error) {
        console.log(error);
      }
    },
    // function to call action from store
    async handlefilesLists() {
      try {
        let response = await this.$store.dispatch("openai/listFiles", this);
        this.filesLists = response;
        console.log(this.filesLists);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
