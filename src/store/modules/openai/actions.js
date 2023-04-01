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
      console.log("data: ", response.data.data);
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
      console.log("data: ", response.data.data);
      return response.data.data;
    } catch (err) {
      console.log("error:", err);
      _vm.$toast.error(err);
    }
  },
};
