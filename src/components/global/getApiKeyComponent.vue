<template>
  <div class="">
    <div class="bg-white border rounded-lg p-3">
      <h2 class="text-xl font-bold">
        Enter your OpenAI API key to get started
      </h2>
      <div class="text-gray-500">
        We take your security seriously - your key is encrypted and stored in
        the URL only for the duration of your session. This ensures that you
        won't have to re-enter it if you reload the page, and we do not save
        your API key.
      </div>
      <div class="flex space-x-3">
        <input
          type="text"
          v-model="apiKey"
          placeholder="Enter key"
          class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <button
          @click="setKey()"
          class="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
        >
          Set
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "getApiKeyComponent",
  props: {},
  data() {
    return {
      apiKey: "",
    };
  },
  beforeMount() {
    this.apiKey = localStorage.getItem("OPENAI_KEY");
    console.log(this.apiKey);
  },
  methods: {
    setKey() {
      if (this.apiKey != "") {
        localStorage.setItem("OPENAI_KEY", this.apiKey);
        console.log(localStorage.getItem("OPENAI_KEY"));
        this.$toast.success("API Key set");
        // seload page after setting key
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        this.$toast.error("Please set a key");
        console.log("no key set: ", this.apiKey);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
