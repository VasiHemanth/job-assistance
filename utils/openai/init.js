import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: "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",
});
export const openai = new OpenAIApi(configuration);
