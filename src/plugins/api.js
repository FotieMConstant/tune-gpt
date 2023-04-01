import { Configuration, OpenAIApi } from "openai";
const openaiApiKey = localStorage.getItem("OPENAI_KEY");
const configuration = new Configuration({
  apiKey: openaiApiKey,
});
export const openai = new OpenAIApi(configuration);
