const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate compelling pitch deck content using Gemini AI
 * @param {Object} eventData - Event information
 * @returns {Promise<Object>} - Generated pitch content
 */
const generatePitchContent = async (eventData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    // Create a detailed prompt for the AI to generate pitch content
    const prompt = `
You are an expert event marketing strategist. Based on the following event details, generate a compelling, professional cold-email sponsorship pitch. This will be sent directly to brand representatives.

EVENT DETAILS:
- Event Name: ${eventData.eventName}
- Event Type: ${eventData.eventType}
- Description: ${eventData.eventDescription}
- Expected Attendance: ${eventData.expectedAttendance}
- Target Audience: ${eventData.targetAudience}
- Date: ${eventData.eventDate || 'TBD'}
- Budget: ${eventData.budget || 'TBD'}
- Sponsorship Tiers: ${JSON.stringify(eventData.sponsorshipTiers || [])}

Please generate a JSON response with exactly this structure (return ONLY valid JSON, no markdown or extra text):
{
  "subjectLine": "A compelling, high-open-rate email subject line",
  "emailBody": "The full body of the email. Use line breaks (\\\\n) for formatting. Include a strong hook, the event details, why the sponsor should care, the sponsorship tiers available, and a clear call to action."
}

Important: Return ONLY the JSON object, no markdown formatting. Make it sound human, persuasive, and data-driven.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON response
    let pitchContent;
    try {
      // Clean the response in case there are markdown code blocks
      let cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      pitchContent = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', responseText);
      // Fallback to a structured response if parsing fails
      pitchContent = generateFallbackContent(eventData, responseText);
    }

    return pitchContent;
  } catch (error) {
    console.error('Error generating pitch content with Gemini:', error.message);
    // Return fallback content instead of crashing so the user still gets a presentation
    console.log('Using fallback content due to API error/rate limits.');
    return generateFallbackContent(eventData, null);
  }
};

/**
 * Fallback content generation if Gemini fails
 */
const generateFallbackContent = (eventData, aiResponse) => {
  return {
    subjectLine: `Partnership Opportunity: ${eventData.eventName} - Reach ${eventData.expectedAttendance} ${eventData.targetAudience}`,
    emailBody: `Hi there,\n\nI'm reaching out because I believe your brand would be a perfect fit for our upcoming event, ${eventData.eventName}.\n\nWe are hosting a ${eventData.eventType} on ${eventData.eventDate || 'a date TBD'}. ${eventData.eventDescription}\n\nWe are expecting ${eventData.expectedAttendance} attendees, primarily consisting of ${eventData.targetAudience}. Partnering with us offers a unique opportunity to directly engage with this demographic and increase your brand visibility.\n\nWe have several sponsorship opportunities available:\n${eventData.sponsorshipTiers?.map(tier => `- ${tier.name}: $${tier.amount}`).join('\n') || '- Custom sponsorship packages available'}\n\nI'd love to jump on a quick call next week to discuss how we can create a mutually beneficial partnership. Let me know if you are available.\n\nBest regards,\n[Your Name]\n[Your Title/Club Name]`
  };
};

module.exports = {
  generatePitchContent,
  generateFallbackContent
};
