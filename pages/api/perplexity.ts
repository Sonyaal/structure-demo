import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export const runtime = 'nodejs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtain text from request header
    const { text } = req.body;

    console.log("file name!!:", text);

    const modelOutput = `{
  "complianceScore": 85,
  "grammarIssues": [
    {
      "quote": "auhorize or permit any violation or failure to comply with any applicable law.",
      "explanation": "Misspelling of 'authorize' as 'auhorize'."
    },
    {
      "quote": "improve for the purpose of sale).  OR  I, as the owner of the property, am exclusively contracting with licensed contractors to construct the project (Sec. 7044, Business and Professions Code:",
      "explanation": "Inconsistent and unclear sentence structure with abrupt 'OR' followed by incomplete phrasing."
    },
    {
      "quote": "Parking Req'd for Bldg (Auto+Bicycle):   -2   Stalls / 0 Stal  (P) Parking Req'd for Site (Auto+Bicycle):   -2   Stalls /   0   Stal",
      "explanation": "Use of '-2' stalls is nonsensical; likely an error or misstatement; 'Stal' is a truncated form and inconsistent."
    }
  ],
  "ambiguityIssues": [
    {
      "quote": "MERV 13 Filter or Greater Req'd. MERV 13 Filter or Greater Req'd.",
      "explanation": "Repeated statement without further specifics about application or exception conditions creates ambiguity."
    },
    {
      "quote": "Permit Flag - Solar PV Combo Combine Plumbg - Wrk. per 91.107.2.1.1.1 Combine Elec - Wrk. per 91.107.2.1.1.1 Combine HVAC - Wrk. per 91.107.2.1.1.1",
      "explanation": "Abbreviated terms and combined phrases obscure exact scope of work or regulatory references; unclear what 'Combine' means here."
    },
    {
      "quote": "Parking Req'd for Bldg (Auto+Bicycle):   -2   Stalls / 0 Stal",
      "explanation": "Negative parking requirement is ambiguous and illogical."
    }
  ],
  "complianceIssues": [
    {
      "quote": "Hillside Grading Area - YES",
      "explanation": "Permit does not provide detailed soil condition analysis or specialized grading permits required for hillside grading as per California Building Code and LAMC; potential omission of specific required documentation."
    },
    {
      "quote": "Energy Surcharge Electrical   256.46 HVAC   128.23 Plumbing   256.46 ... Green Building Permit Issuing Fee   0.00",
      "explanation": "No explicit statement confirming adherence to California's latest 2022 Title 24 energy efficiency standards; energy surcharge fees included but no proof of compliance or energy modeling report referenced."
    }
  ],
  "codesViolated": [
    {
      "quote": "Permit will also expire if no construction work is performed for a continuous period of 180 days (Sec. 98.0602 LAMC)",
      "explanation": "No indication in the permit that the 180 days inactivity rule will be tracked or enforced; possible noncompliance if construction suspension occurs without notification."
    },
    {
      "quote": "Owner-Builder Declaration claims exemption from Contractor's State License Law per Section 7031.5 Business and Professions Code",
      "explanation": "Owner-builder declaration fails to clearly state basis of exemption in all cases; risk of violation of Section 7031.5 if exemption is incorrect or misrepresented."
    },
    {
      "quote": "Final Declaration states 'it does not auhorize or permit any violation or failure to comply with any applicable law.'",
      "explanation": "Typographical error in 'authorize' undermines official statement, possibly affecting legal enforceability and clarity."
    }
  ]
}`



    // // Define LLM prompt
    // const prompt = `
    //     You are an expert compliance and language reviewer for construction permits.
    //     Your task is to evaluate a permit document and respond with a structured JSON object that includes a compliance score and highlights any potential issues in grammar, clarity, or regulation violations.
    //     The main compliance regulations you are looking for are not following California's most recent energy efficiency requirements, incorrect soil conditions, missing information, MAJORLY incorrect grammar/spelling, and anything that violates California building regulation. 
    //     If there are specific codes that are violated then cite the exact code that was violated followed by an explanation as to why/how it was violated.
    //     Only include elements in the JSON if it is in violation of a compliance rule, has incorrect grammar, or is ambiguous. 
    //     Please follow this format exactly and return only the raw JSON — no commentary, no code blocks, no markdown formatting.
    //     The JSON should ALWAYS contain:
    //     {
    //     "complianceScore": number (0-100),
    //     "grammarIssues": [
    //         {
    //         "quote": string,
    //         "explanation": string
    //         }
    //     ],
    //     "ambiguityIssues": [
    //         {
    //         "quote": string,
    //         "explanation": string
    //         }
    //     ],
    //     "complianceIssues": [
    //         {
    //         "quote": string,
    //         "explanation": string
    //         }
    //     ],
    //     "codesViolated": [
    //         {
    //         "quote": string,
    //         "explanation": string
    //         }
    //     ]
    //     }
    //     Below is the content of the permit to evaluate:
    //     """${text}"""
    // `;

    // // Call OpenRouter API
    // const response = await axios.post(
    //   'https://openrouter.ai/api/v1/chat/completions',
    //   {
    //     model: 'perplexity/sonar',
    //     messages: [
    //       {
    //         role: 'user',
    //         content: prompt,
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );

    // const result = response.data;
    // const modelOutput = result.choices?.[0]?.message?.content ?? '';
    // console.log("Model Output: ", modelOutput);

    res.status(200).json({ success: true, raw: modelOutput });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
