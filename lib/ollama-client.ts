// This is a simplified mock implementation of an Ollama client
// In a real application, you would connect to an actual Ollama instance

export interface OllamaAnalysisResult {
  score: number
  issues: {
    grammar: string[]
    ambiguity: string[]
    formatting: string[]
    missing: string[]
  }
  summary: string
}

export async function analyzePermitWithOllama(pdfText: string): Promise<OllamaAnalysisResult> {
  // In a real implementation, this would make an API call to Ollama
  // For now, we'll return mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    score: 70,
    issues: {
      grammar: [
        "Run-on sentences with unclear abbreviations",
        "Incomplete sentences missing units of measure",
        "Misspelled words and redundant phrasing",
      ],
      ambiguity: [
        "Unclear terminology (GREEN - MANDATORY)",
        "Ambiguous abbreviations without context",
        "Measurements without specified units",
        "Negative values without explanation",
      ],
      formatting: ["Inconsistent use of hyphens and slashes", "Missing section headers"],
      missing: ["Required signatures", "Date fields", "Contact information"],
    },
    summary:
      "This permit application contains several issues that need to be addressed before submission. The document has grammar errors, ambiguous terminology, and is missing required information. Addressing these issues will improve clarity and increase the likelihood of approval.",
  }
}
