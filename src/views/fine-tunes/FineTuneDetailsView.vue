<template>
  <DefaultLayout>
    <div v-if="fineJobInfo" class="">
      <div class="text-gray-500 uppercase font-bold">Details</div>
      <div class="flex justify-between mt-2">
        <h2 class="text-2xl font-bold text-gray-800 my-auto">
          {{ fineJobInfo.fine_tuned_model }}
        </h2>
        <div class="my-auto">
          <div class="py-3 px-6 text-center font-bold">
            <span
              v-if="fineJobInfo.status == 'succeeded'"
              class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
              >Succeeded</span
            >
            <span
              v-if="fineJobInfo.status == 'pending'"
              class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs"
              >Pending</span
            >
          </div>
        </div>
      </div>
      <div class="text-gray-400">{{ fineJobInfo.id }}</div>
      <!-- body -->
      <div class="min-h-screen mt-10">
        <div class="">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 my-auto">Details</h2>
            <div class="text-gray-400">
              See details about your finetune below
            </div>
            <!-- main content -->
            <div class="max-w-4xl bg-gray-50 w-full mt-6">
              <div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Base model</p>
                  <p>{{ fineJobInfo.model }}</p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Fine-tuned model</p>
                  <p>{{ fineJobInfo.fine_tuned_model }}</p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Created at</p>
                  <p>{{ formatDate(fineJobInfo.created_at) }}</p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Updated at</p>
                  <p>{{ formatDate(fineJobInfo.updated_at) }}</p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Batch size</p>
                  <p>
                    {{ fineJobInfo.hyperparams.batch_size }}
                  </p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Numb of epochs</p>
                  <p>
                    {{ fineJobInfo.hyperparams.n_epochs }}
                  </p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">Prompt loss weight</p>
                  <p>
                    {{ fineJobInfo.hyperparams.prompt_loss_weight }}
                  </p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
                >
                  <p class="text-gray-600 font-bold">
                    Learning rate multiplier
                  </p>
                  <p>
                    {{ fineJobInfo.hyperparams.learning_rate_multiplier }}
                  </p>
                </div>
                <div
                  class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4"
                >
                  <p class="text-gray-600">Training files</p>
                  <div class="space-y-2">
                    <div
                      v-for="file in fineJobInfo.training_files"
                      :key="file"
                      class="border-2 flex items-center p-2 rounded justify-between space-x-2"
                    >
                      <div class="space-x-2 truncate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="fill-current inline text-gray-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z"
                          />
                        </svg>
                        <span> {{ file.filename }} </span>
                      </div>
                      <!-- <a href="#" class="text-purple-700 hover:underline">
                        Download
                      </a> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/ main content -->
          </div>
        </div>
        <div class="mt-10">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 my-auto">Events</h2>
            <div class="text-gray-400">
              All events related to this finetune ({{
                fineJobInfo.events.length
              }}
              events)
            </div>
            <!-- main content -->
            <div class="flex flex-col">
              <div class="overflow-x-auto">
                <div class="py-2 inline-block min-w-full">
                  <div class="overflow-hidden">
                    <table class="min-w-full">
                      <thead class="bg-gray-200 border-b">
                        <tr>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Time stamp
                          </th>
                          <th
                            scope="col"
                            class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Message
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(event, index) in fineJobInfo.events.reverse()"
                          :key="index"
                          class="bg-gray-50 border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td
                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {{ index }}
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                          >
                            {{ formatDate(event.created_at) }}
                          </td>
                          <td
                            class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                          >
                            {{ event.message }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!--/ main content -->
          </div>
        </div>
      </div>
      <!--/ body -->
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/components/Layout/DefaultLayout.vue";

export default {
  name: "FineTuneDetailsView",
  props: {},
  components: {
    DefaultLayout,
  },
  data() {
    return {
      fineJobInfo: null,
    };
  },
  mounted() {
    // getting and passing the fintune id
    if (this.$route.params.fineTuneId) {
      console.log(this.$route.params.fineTuneId);
      //   calling handler function
      this.handleGetFineJobInfo(this.$route.params.fineTuneId);
    } else {
      console.log("no fineTuneId passed");
    }
  },
  methods: {
    // function to call action from store
    async handleGetFineJobInfo(fineTuneId) {
      try {
        let response = await this.$store.dispatch("openai/getFineJobInfo", {
          fineTuneId: fineTuneId,
          _vm: this,
        });
        this.fineJobInfo = response;
        console.log(this.fineJobInfo);
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
