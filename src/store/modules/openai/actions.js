// import axios from "axios";
import { openai } from "@/plugins/api.js";

export default {
  async createCompletion() {
    try {
      const response = await openai.createCompletion({
        model: "davinci:ft-moonblocks-2023-04-01-14-44-27",
        prompt: "What is Lens Protocol",
        max_tokens: 1000,
      });
      if (response.data) {
        console.log("choices: ", response.data.choices);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  },

  // eslint-disable-next-line no-unused-vars
  async listFineTunes({ commit }, _vm) {
    try {
      const response = await openai.listFineTunes();
      console.log("listFineTunes data: ", response.data.data);
      return response.data.data;
    } catch (err) {
      console.log("error:", err);
      _vm.$toast.error(err);
    }
  },
  // list of files that belong to the user's organization.
  // eslint-disable-next-line no-unused-vars
  async listFiles({ commit }, _vm) {
    try {
      const response = await openai.listFiles();
      console.log("listFiles data: ", response.data.data);
      return response.data.data;
    } catch (err) {
      console.log("error:", err);
      _vm.$toast.error(err);
    }
  },
  // function to get info about a fine-tune job.
  // eslint-disable-next-line no-unused-vars
  async getFineJobInfo({ commit }, payload) {
    try {
      const response = await openai.retrieveFineTune(payload.fineTuneId);
      console.log("retrieveFineTune data: ", response.data);
      return response.data;
    } catch (err) {
      console.log("error:", err);
      payload._vm.$toast.error(err);
    }
  },
  // function to delete fine-tuned model.
  // eslint-disable-next-line no-unused-vars
  async deleteFineTunedModel({ commit }, payload) {
    try {
      const response = await openai.deleteModel(payload.fine_tuned_model);
      console.log("FineTuned deleted data: ", response.data);
      if (response.data.deleted) {
        payload._vm.$toast.success(
          payload.fine_tuned_model + " deleted successfully!"
        );
        // delay and then reload page
        // setTimeout(function () {
        //   location.reload();
        // }, 3000);
      } else {
        payload._vm.$toast.error("Couldn't delete " + payload.fine_tuned_model);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        payload._vm.$toast.error(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      console.log("error:", error);
    }
  },
};
