import OpenAI from "openai";
const client = new OpenAI();

// ! AI MODULE (CANNOT HAPPENING RN, PRICING)
export const useAi = () => {
    const ask = async () => {
        const response = await client.responses.create({
            model: "gpt-4.1",
            input: "Write a one-sentence bedtime story about a unicorn."
        });
        console.log(response);
        return response;
    };

    return {
        ask,
    }
}