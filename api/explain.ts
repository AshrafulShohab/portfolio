import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, correctAnswer, studentAnswer } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Explain why the student's answer is incorrect and why the correct answer is correct for the following question.\nQuestion: ${question}\nCorrect Answer: ${correctAnswer}\nStudent's Answer: ${studentAnswer}\n\nProvide a concise, easy-to-understand explanation in Bengali language. Use markdown formatting if needed. Do not output the whole prompt. Explain it clearly. Provide mathematical explanations if applicable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.status(200).json({ explanation: response.text });
  } catch (error) {
    console.error('Explanation error:', error);
    return res.status(500).json({ error: 'Failed to generate explanation' });
  }
}
