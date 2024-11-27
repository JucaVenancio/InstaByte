import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function descriptionGeneratorWithGemini(imageBuffer) {

    const prompt = "Gere uma descrição em português do Brasil para a seguinte imagem";

    try {

        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png",
            },
        };

        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text not available.";

    } catch (erro) {
        console.error("Error to get alt-text", erro.message, erro);
        throw new Error("Erro to get alt-text from Gemini");
    }

}
