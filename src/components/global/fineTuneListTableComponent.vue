<template>
  <div v-if="fineTuneList" class="w-full bg-gray-100 font-sans lg:w-6/12">
    <div class="rounded my-6 w-full">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">ID</th>
            <th class="py-3 px-6 text-left">Model</th>
            <th class="py-3 px-6 text-left">Created date</th>
            <th class="py-3 px-6 text-left">training file</th>
            <th class="py-3 px-6 text-left">Status</th>
            <th class="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="tuneItem in fineTuneList"
            :key="tuneItem.id"
            class="bg-white shadow-md border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <img
                    :title="tuneItem.object"
                    class="h-5"
                    src="https://ih1.redbubble.net/image.4839005887.4100/st,small,507x507-pad,600x600,f8f8f8.jpg"
                    alt=""
                  />
                </div>
                <span class="font-medium truncate w-20" :title="tuneItem.id">{{
                  tuneItem.id
                }}</span>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span
                  class="truncate w-24"
                  :title="tuneItem.fine_tuned_model"
                  >{{ tuneItem.fine_tuned_model }}</span
                >
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center">
                {{ formatDate(tuneItem.created_at) }}
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center justify-center">
                {{ tuneItem.training_files[0].filename }}
              </div>
            </td>
            <td class="py-3 px-6 text-center font-bold">
              <span
                v-if="tuneItem.status == 'succeeded'"
                class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                >Succeeded</span
              >
              <span
                v-if="tuneItem.status == 'pending'"
                class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs"
                >Pending</span
              >
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center">
                <router-link
                  :to="`/fine-tunes/` + tuneItem.id"
                  class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </router-link>
                <div
                  @click="handleDeleteFineTunedModel(tuneItem.fine_tuned_model)"
                  class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "fineTuneListTableComponent",
  props: {},
  data() {
    return {
      fineTuneList: null,
    };
  },
  beforeMount() {
    this.handleFineTuneList();
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
    }, // function to call action from store to delete fine-tuned model
    async handleDeleteFineTunedModel(fine_tuned_model) {
      console.log("model to delete=> ", fine_tuned_model);
      try {
        let response = await this.$store.dispatch(
          "openai/deleteFineTunedModel",
          {
            fine_tuned_model: fine_tuned_model,
            _vm: this,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    // date formater
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      return formattedDate;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
