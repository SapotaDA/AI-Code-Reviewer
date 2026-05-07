const axios = require('axios');

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
  }

  async reviewCode(code, language) {
    try {
      const prompt = `As an expert code reviewer, please analyze the following ${language} code and provide a comprehensive review. 

Focus on:
1. Bug detection and potential issues
2. Code optimization suggestions
3. Security vulnerabilities
4. Best practices violations
5. Readability improvements
6. Complexity analysis
7. Performance considerations

Please provide your review in a structured format with clear sections and actionable recommendations.

Code to review:
\`\`\`${language}
${code}
\`\`\``;

      const response = await axios.post(
        `${this.baseURL}/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate code review');
    }
  }

  async explainCode(code, language) {
    try {
      const prompt = `As an expert developer, please explain the following ${language} code in detail. 

Focus on:
1. What the code does
2. How it works
3. Key concepts and patterns used
4. The overall purpose and functionality
5. Any important nuances or edge cases

Please provide a clear, beginner-friendly explanation.

Code to explain:
\`\`\`${language}
${code}
\`\`\``;

      const response = await axios.post(
        `${this.baseURL}/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate code explanation');
    }
  }

  async improveCode(code, language) {
    try {
      const prompt = `As an expert software engineer, please improve the following ${language} code. 

Focus on:
1. Performance optimization
2. Code readability and maintainability
3. Best practices and modern patterns
4. Error handling
5. Code organization
6. Documentation

Please provide:
1. The improved version of the code
2. A detailed explanation of the changes made
3. The benefits of each improvement

Original code:
\`\`\`${language}
${code}
\`\`\``;

      const response = await axios.post(
        `${this.baseURL}/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate code improvements');
    }
  }
}

module.exports = new AIService();
