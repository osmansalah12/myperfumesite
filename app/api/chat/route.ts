import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    const openAIResponse = await callOpenAI(message, context);
    
    return NextResponse.json({ response: openAIResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

async function callOpenAI(message: string, context: string): Promise<string> {
  // Real OpenAI integration - uncomment and add your API key to use
  /*
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert fragrance consultant and AI assistant for scent.co. You have extensive knowledge about perfumes, fragrance notes, brands, seasonal recommendations, and can provide personalized suggestions. Be helpful, knowledgeable, and engaging. Focus on fragrance-related topics and provide detailed, useful advice. Keep responses conversational but informative.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to simulated response
    return generateIntelligentResponse(message);
  }
  */

  // For demo purposes - this simulates ChatGPT-like responses
  return generateIntelligentResponse(message);
}

function generateIntelligentResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm excited to help you explore the world of fragrances. Whether you're looking for your first signature scent, want to understand fragrance notes better, or need recommendations for a specific occasion, I'm here to guide you. What fragrance questions can I help you with today?";
  }

  // Fresh/Summer fragrances
  if (lowerMessage.includes('fresh') || lowerMessage.includes('summer') || lowerMessage.includes('citrus') || lowerMessage.includes('light')) {
    return "For fresh, summery fragrances, I'd recommend looking for scents with bright citrus top notes like bergamot, lemon, or grapefruit. These create an energizing, clean opening that's perfect for warm weather.\n\nSome excellent options include:\n• Acqua di Gio by Giorgio Armani - features lime and marine notes\n• Light Blue by Dolce & Gabbana - Sicilian lemon with apple\n• Sauvage by Dior - bergamot with a fresh, modern twist\n\nThese typically last 4-6 hours and work beautifully for daytime wear. Would you like recommendations for any specific occasions or note preferences?";
  }

  // Luxury/Expensive fragrances
  if (lowerMessage.includes('luxury') || lowerMessage.includes('expensive') || lowerMessage.includes('premium') || lowerMessage.includes('high end')) {
    return "Luxury fragrances are distinguished by their use of rare, high-quality ingredients and masterful composition. Here's what makes them special:\n\n• Premium ingredients like natural oud, ambergris, or Bulgarian rose absolute\n• Superior longevity (8+ hours) and complexity\n• Artisanal craftsmanship and unique compositions\n\nSome standout luxury houses include:\n• Tom Ford - known for bold, sophisticated scents\n• Creed - heritage house with exceptional quality\n• Maison Francis Kurkdjian - modern luxury with artistic flair\n\nBaccarat Rouge 540, for example, uses saffron and amberwood for its distinctive, long-lasting character. What type of luxury experience are you looking for?";
  }

  // Romantic/Date night fragrances
  if (lowerMessage.includes('date') || lowerMessage.includes('romantic') || lowerMessage.includes('seductive') || lowerMessage.includes('evening')) {
    return "For romantic occasions, you'll want fragrances that create intimacy and allure. Look for warm, sensual compositions featuring:\n\n• Vanilla and amber for sweetness and warmth\n• Sandalwood and cedar for sophistication\n• Rich florals like jasmine and rose for romance\n• Spices like cardamom or pink pepper for intrigue\n\nPerfect choices include:\n• Tom Ford Black Orchid - mysterious with dark chocolate and patchouli\n• Yves Saint Laurent Black Opium - coffee and vanilla for sweet seduction\n• Viktor & Rolf Flowerbomb - explosive floral bouquet\n\nApply 30 minutes before your date to allow proper development. These work best in evening settings and cooler weather.";
  }

  // Fragrance notes education
  if (lowerMessage.includes('notes') || lowerMessage.includes('understand') || lowerMessage.includes('explain') || lowerMessage.includes('learn')) {
    return "Fragrance notes are the individual scent components that make up a perfume. They're organized in a pyramid structure:\n\n**Top Notes** (first 15-30 minutes):\n• First impression - usually fresh and light\n• Examples: citrus, herbs, light fruits\n\n**Middle/Heart Notes** (30 minutes - 4 hours):\n• The main character of the fragrance\n• Examples: florals, spices, fruits\n\n**Base Notes** (4+ hours):\n• Foundation that provides longevity\n• Examples: woods, vanilla, musk, amber\n\nUnderstanding this helps you choose fragrances that develop beautifully on your skin. What specific notes are you curious about?";
  }

  // Seasonal recommendations
  if (lowerMessage.includes('winter') || lowerMessage.includes('cold') || lowerMessage.includes('warm weather')) {
    if (lowerMessage.includes('winter') || lowerMessage.includes('cold')) {
      return "Winter fragrances should be rich, warm, and comforting to complement the season:\n\n• **Woody notes**: sandalwood, cedar, vetiver\n• **Oriental notes**: vanilla, amber, incense\n• **Spices**: cinnamon, cardamom, clove\n• **Gourmand notes**: chocolate, coffee, caramel\n\nGreat winter choices:\n• Tom Ford Oud Wood - warm and sophisticated\n• Thierry Mugler Angel - gourmand with chocolate and vanilla\n• Creed Royal Oud - luxurious and enveloping\n\nThese heavier fragrances perform better in cold weather and won't be overwhelming indoors.";
    } else {
      return "For warm weather, choose lighter, fresher fragrances that won't become cloying:\n\n• **Citrus**: bergamot, lemon, grapefruit\n• **Aquatic**: marine, sea salt, water lily\n• **Green**: grass, leaves, cucumber\n• **Light florals**: lily of the valley, freesia\n\nPerfect warm weather options:\n• Hermès Un Jardin Sur Le Toit - fresh and green\n• Issey Miyake L'Eau d'Issey - clean and aquatic\n• Dolce & Gabbana Light Blue - Mediterranean freshness\n\nThese provide refreshing relief without being overpowering in heat.";
    }
  }

  // Building custom scents
  if (lowerMessage.includes('custom') || lowerMessage.includes('build') || lowerMessage.includes('create') || lowerMessage.includes('profile')) {
    return "Creating a custom scent profile is an exciting journey! Here's how to approach it:\n\n**Step 1: Identify Your Preferences**\n• What moods do you want to evoke?\n• Which existing scents do you love?\n• What occasions will you wear it for?\n\n**Step 2: Choose Your Note Families**\n• Start with 2-3 families you're drawn to\n• Consider how they'll work together\n• Think about the story you want to tell\n\n**Step 3: Build Your Pyramid**\n• Select complementary top, middle, and base notes\n• Ensure good balance and flow\n\nOur Scent Builder tool can help you experiment with combinations and get AI-powered matches. What type of impression do you want your signature scent to make?";
  }

  // General fragrance advice
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('help me find')) {
    return "I'd love to help you find the perfect fragrance! To give you the best recommendations, could you tell me more about:\n\n• **Occasion**: Daily wear, work, special events, or date nights?\n• **Season**: When do you plan to wear it most?\n• **Mood**: Fresh and energetic, warm and cozy, mysterious and seductive?\n• **Experience level**: Are you new to fragrances or looking to expand your collection?\n• **Preferences**: Any notes you particularly love or want to avoid?\n\nWith these details, I can suggest specific fragrances that would be perfect for you. What sounds most important to you right now?";
  }

  // Default intelligent response
  return "That's an interesting question about fragrances! I'm here to help you navigate the wonderful world of scents. Whether you're looking for:\n\n• Specific fragrance recommendations\n• Understanding fragrance notes and families\n• Seasonal or occasion-appropriate scents\n• Building a custom scent profile\n• Learning about luxury vs. designer fragrances\n\nI can provide detailed, personalized guidance. What specific aspect of fragrance would you like to explore? Feel free to describe what you're looking for, and I'll help you find the perfect scent!";
}