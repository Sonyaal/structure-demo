import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const runtime = 'nodejs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtain text from request header
    const { text } = req.body;

    // Define LLM prompt
    const prompt = `
    You are an expert compliance and language reviewer for California construction permits.

    Your task is to analyze the provided text and return a JSON object structured as follows:

    {
      "complianceScore": <score out of 100>,
      "grammarIssues": [
        {
          "quote": "<exact text from the input>",
          "explanation": "<what's wrong and how to fix it>"
        }
      ],
      "ambiguityIssues": [
        {
          "quote": "<exact ambiguous phrase>",
          "explanation": "<why it is unclear or vague>"
        }
      ],
      "complianceIssues": [
        {
          "quote": "<text that violates regulations or lacks compliance>",
          "explanation": "<what regulation it violates and how to fix it>"
        }
      ]
    }

    ONLY return valid JSON — no explanations or commentary. Do not wrap in markdown or triple backticks. Do not include anything else outside of the JSON.

    Text to review:
    """${text}"""
    `;

    // Call Ollama API (local)
    const response = await axios.post(
      'http://localhost:11434/api/chat',
      {
        model: 'llama3.2', // or another model that responds well to structured JSON
        messages: [
          {
            role: 'user',
            content: "Text to review:" + text + "Analyze the document and return a JSON format. Your analysis should include complianceScore between 60 and 100, grammarIssues, ambiguityIssues and complianceIssues feilds.",
          }
        ],
        stream: false,
        format: 'json',
        options: { temperature: 0 },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    

    const result = response.data;
    const modelOutput = result.message.content;;
    console.log("Model Output: ", modelOutput);
    console.log("Full Ollama Response:", response.data);

    

    res.status(200).json({ success: true, raw: modelOutput });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
