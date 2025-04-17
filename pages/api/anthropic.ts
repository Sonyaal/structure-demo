import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const runtime = 'nodejs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtain text from request header
    const { base64Image } = req.body;
    console.log("Selected file name:", base64Image); // ✅ LOG HERE

    const modelOutput = ` {
  "complianceScore": 0,
  "ambiguityIssues": [
    {
      "quote": "clear floor space",
      "explanation": "The drawing does not specify the required clear floor space dimensions for wheelchair accessibility."
    }
  ],
  "complianceIssues": [
    {
      "code": "2010 ADA Standards for Accessible Design section 604.3.1",
      "explanation": "The minimum required clear floor space for a wheelchair to approach the toilet is 60 inches minimum perpendicular from the side wall and 56 inches minimum perpendicular from the rear wall, which is not met by the 18 inch dimension shown."
    },
    {
      "code": "2010 ADA Standards for Accessible Design section 604.2",
      "explanation": "The required clearance around a water closet is 60 inches minimum, measured perpendicular from the side wall and 56 inches minimum, measured perpendicular from the rear wall. The 36 inch dimension shown is insufficient."
    }
  ],
  "summary": [
    {
      "summary": "The drawing does not meet ADA requirements for wheelchair accessible toilet compartments. The clear floor space and clearance around the water closet are less than the required minimums."
    }
  ]
}`

    // // Define LLM prompt
    // const prompt = `
    //   You are an expert reviewer of construction permit drawings.
      
    //   Your task is to evaluate a construction figure for ADA and general regulation compliance. Return your findings as a strict JSON object. Do not include any extra text, markdown, or commentary — only valid JSON.
      
    //   For ambiguity issues, include the quote followed by the reason why the drawing was not clear. For compliance issues, include the ADA code violated
    //   followed by why the code was violated.

    //   Provide a general summary at the end to explicity state if the drawing is ADA compliant or not.

    //   Only include elements in the JSON if they are violations or ambiguous. Do not include any backslash characters.
      
    //   Here is the required JSON format:
    //   {
    //     "complianceScore": number (between 0-100),
    //     "ambiguityIssues": [
    //       {
    //         "quote": string,
    //         "explanation": string
    //       }
    //     ],
    //     "complianceIssues": [
    //       {
    //         "code": string,
    //         "explanation": string
    //       }
    //     ],
    //     "summary": [
    //       {
    //         "summary": string,
    //       }
    //     ]
    //   }
      
    //   Do not wrap the response in backticks, code blocks, or markdown. Only return the raw JSON.
      
    //   Analyze the drawing below:
    // `;

    // const messages = [
    //   {
    //     role: "user",
    //     content: [
    //       { type: "text", text: prompt },
    //       {
    //         type: "image_url",
    //         image_url: {
    //           url: `data:image/jpeg;base64,${base64Image}`,
    //         },
    //       },
    //     ],
    //   },
    // ];

    // // Call OpenRouter API
    // const response = await axios.post(
    //   'https://openrouter.ai/api/v1/chat/completions',
    //   {
    //     model: 'anthropic/claude-3-opus',
    //     messages,
    //     max_tokens: 1000,
    //     temperature: 0,
    //   },
    //   {
    //     headers: {
    //         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    //   }
    // );

    

    // const result = response.data;
    // const modelOutput = result.choices?.[0]?.message?.content ?? '';
    // console.log("Model Output: ", modelOutput);
    console.log("Model Output with markers: >>>" + modelOutput + "<<<");


    res.status(200).json({ success: true, raw: modelOutput });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
