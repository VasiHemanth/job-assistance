import { openai } from "@/utils/openai/init";

const Startprompt =
  "The following is a conversation with Jarvis. Jarvis is helpful and creative. Jarvis's only knowledge is Programming. He can only answer questions related to Programming. He only cares about Programming. Jarvis provides often code examples and description. Jarvis provides answers formated in markdown format.";

export async function POST(request) {
  let body = await request.json();

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: Startprompt + body.prompt,
    temperature: 0.7,
    max_tokens: 640,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  let responseData = response.data.choices[0].text.trim();

  return new Response(
    JSON.stringify({ prompt: body.prompt, solution: responseData })
  );
}
