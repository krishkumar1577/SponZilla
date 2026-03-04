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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Create a detailed prompt for the AI to generate pitch content
    const prompt = `
You are an expert event marketing strategist. Based on the following event details, generate a compelling pitch deck content with 5 slides for attracting sponsors.

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
  "slides": [
    {
      "title": "slide title",
      "content": "bullet point 1\\nbullet point 2\\nbullet point 3",
      "notes": "speaker notes for this slide"
    },
    ... (5 slides total)
  ],
  "summary": "One-paragraph executive summary",
  "callToAction": "Compelling call-to-action for sponsors"
}

Important: Return ONLY the JSON object, no markdown formatting, no code blocks.
Make it compelling, data-driven, and focused on sponsor benefits.
Slides should be: 1) Title/Overview, 2) Event Impact, 3) Audience Demographics, 4) Sponsorship Opportunities, 5) Call to Action
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
    console.error('Error generating pitch content with Gemini:', error);
    throw new Error(`Failed to generate pitch content: ${error.message}`);
  }
};

/**
 * Fallback content generation if Gemini fails
 */
const generateFallbackContent = (eventData, aiResponse) => {
  return {
    slides: [
      {
        title: `${eventData.eventName}`,
        content: `Join us for an incredible ${eventData.eventType}\nEvent Date: TBD\nExpected Attendance: ${eventData.expectedAttendance}\nTarget Audience: ${eventData.targetAudience}`,
        notes: 'Opening slide introducing the event'
      },
      {
        title: 'Event Impact & Reach',
        content: `${eventData.eventDescription}\n\nTarget Market: ${eventData.targetAudience}\n\nExpected Reach: ${eventData.expectedAttendance}+ attendees`,
        notes: 'Explain the significance and reach of your event'
      },
      {
        title: 'Why Sponsor This Event?',
        content: `Brand Visibility\nDirect Audience Engagement\nLong-term Partnership Opportunity\nCommunity Impact`,
        notes: 'Key benefits for potential sponsors'
      },
      {
        title: 'Sponsorship Tiers',
        content: `${eventData.sponsorshipTiers?.map(tier => `${tier.name}: $${tier.amount}`).join('\n') || 'Custom sponsorship packages available'}`,
        notes: 'Detailed sponsorship opportunities'
      },
      {
        title: 'Let\'s Partner',
        content: `Contact us to explore sponsorship opportunities\n\nTogether, we can create amazing experiences`,
        notes: 'Closing slide with call-to-action'
      }
    ],
    summary: aiResponse || `Join us for ${eventData.eventName}, a premier ${eventData.eventType} attracting ${eventData.expectedAttendance}+ ${eventData.targetAudience}.`,
    callToAction: 'Become a sponsor and connect with our engaged audience!'
  };
};

/**
 * Generate pitch deck PDF/PPTX file
 * @param {Object} pitchContent - Generated pitch content
 * @returns {Promise<Buffer>} - PPTX file buffer
 */
const generatePitchDeckFile = async (pitchContent) => {
  try {
    const PptxGenJS = require('pptxgenjs');
    const prs = new PptxGenJS();

    // Set presentation properties
    prs.defineLayout({ name: 'LAYOUT1', width: 10, height: 7.5 });
    prs.defineLayout({ name: 'LAYOUT2', width: 10, height: 7.5 });

    const slideLayout = 'LAYOUT1';
    const defaultFont = { name: 'Calibri', size: 44, bold: true };
    const bodyFont = { name: 'Calibri', size: 18 };

    // Add title slide
    let slide = prs.addSlide();
    slide.background = { color: '118ee8' };
    slide.addText('Sponsored Event Pitch Deck', {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 1.5,
      fontSize: 54,
      bold: true,
      color: 'FFFFFF',
      align: 'center'
    });
    slide.addText(pitchContent.summary, {
      x: 0.5,
      y: 4.2,
      w: 9,
      h: 2,
      fontSize: 18,
      color: 'FFFFFF',
      align: 'center'
    });

    // Add content slides
    pitchContent.slides.forEach((slideContent, index) => {
      let contentSlide = prs.addSlide();
      contentSlide.background = { color: 'FFFFFF' };

      // Add slide number and title
      contentSlide.addText(`${slideContent.title}`, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 0.8,
        fontSize: 44,
        bold: true,
        color: '118ee8'
      });

      // Add horizontal line
      contentSlide.addShape(prs.ShapeType.rect, {
        x: 0.5,
        y: 1.4,
        w: 9,
        h: 0.05,
        fill: { color: '118ee8' },
        line: { type: 'none' }
      });

      // Add content
      const contentText = slideContent.content
        .split('\n')
        .map((line) => (line.trim() ? `• ${line.trim()}` : ''))
        .filter((line) => line.length > 0)
        .join('\n');

      contentSlide.addText(contentText, {
        x: 0.8,
        y: 2,
        w: 8.4,
        h: 4.5,
        fontSize: 18,
        color: '333333',
        valign: 'top'
      });

      // Add slide number
      contentSlide.addText(`Slide ${index + 1}`, {
        x: 0.5,
        y: 7,
        w: 9,
        h: 0.3,
        fontSize: 12,
        color: '999999',
        align: 'right'
      });
    });

    // Add closing slide
    let closingSlide = prs.addSlide();
    closingSlide.background = { color: '118ee8' };
    closingSlide.addText('Let\'s Create Magic Together', {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 1,
      fontSize: 48,
      bold: true,
      color: 'FFFFFF',
      align: 'center'
    });
    closingSlide.addText(pitchContent.callToAction, {
      x: 0.5,
      y: 4,
      w: 9,
      h: 2,
      fontSize: 24,
      color: 'FFFFFF',
      align: 'center'
    });

    // Save to buffer
    return prs.writeFile({ fileName: 'pitch-deck.pptx' });
  } catch (error) {
    console.error('Error generating PPTX file:', error);
    throw new Error(`Failed to generate presentation file: ${error.message}`);
  }
};

module.exports = {
  generatePitchContent,
  generatePitchDeckFile,
  generateFallbackContent
};
