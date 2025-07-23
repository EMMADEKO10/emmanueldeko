import { Request, Response } from 'express';

interface ChatRequest {
  message: string;
  context: string;
}

interface ChatResponse {
  response: string;
  error?: string;
}

// Réponses prédéfinies basées sur le contenu du portfolio d'Emmanuel
const predefinedResponses = {
  competences: [
    "Emmanuel maîtrise un large éventail de technologies modernes ! Il excelle en Angular, React, et NextJS pour le frontend, avec une solide expertise en NodeJS et Python pour le backend. Il utilise aussi Docker, Firebase, MongoDB, et d'autres outils DevOps.",
    "Côté technique, Emmanuel est fort en développement fullstack : TypeScript, HTML5, CSS3, Tailwind CSS, Express, REST API, WebSocket, bases de données (MongoDB, MySQL, PostgreSQL), et cloud (Vercel, Hostinger)."
  ],
  projets: [
    "Emmanuel a réalisé des projets impressionnants ! Diasporium est sa fierté - une plateforme complète pour la diaspora congolaise avec NextJS, NodeJS, et WebSocket (https://diasporium.vercel.app). Il a aussi développé un système de gestion des bourses pour la RDC.",
    "Ses projets principaux incluent Diasporium (plateforme diaspora avec tech moderne) et le système de bourses pour la cellule interministérielle RDC. Tous montrent son expertise fullstack et sa capacité à livrer des solutions complètes."
  ],
  experience: [
    "Emmanuel est un développeur fullstack passionné avec plusieurs années d'expérience. Il a une approche moderne du développement, maîtrise les bonnes pratiques, et est toujours à l'affût des nouvelles technologies.",
    "Son parcours montre une expertise solide en développement web moderne. Il crée des applications complètes de A à Z, avec une attention particulière à l'expérience utilisateur et aux performances."
  ],
  contact: [
    "Vous pouvez contacter Emmanuel directement via ce site dans la section contact ! Son GitHub est aussi actif : https://github.com/EMMADEKO10. Il est ouvert aux collaborations et nouveaux projets.",
    "Pour le joindre, utilisez le formulaire de contact sur ce site ou consultez son profil GitHub (EMMADEKO10). Il répond généralement rapidement aux messages professionnels."
  ],
  diasporium: [
    "Diasporium est le projet phare d'Emmanuel ! C'est une plateforme moderne pour l'intégration de la diaspora congolaise, développée avec NextJS, NodeJS, WebSocket, Cloudinary et Firebase. Vraiment impressionnant : https://diasporium.vercel.app",
    "Cette plateforme Diasporium montre toute l'expertise d'Emmanuel : architecture moderne, real-time avec WebSocket, gestion cloud avec Firebase. C'est un excellent exemple de son travail fullstack."
  ],
  default: [
    "Je suis ravi de vous parler d'Emmanuel ! Il est développeur fullstack avec une passion pour les technologies modernes. Que souhaitez-vous savoir sur ses compétences, projets, ou expérience ?",
    "Excellent choix de me poser cette question ! Emmanuel est un développeur très talentueux. Voulez-vous en savoir plus sur ses projets comme Diasporium, ses compétences techniques, ou son parcours ?",
    "Emmanuel serait ravi de discuter avec vous ! N'hésitez pas à explorer son portfolio ou à me poser des questions spécifiques sur son travail. Que vous intéresse le plus ?"
  ]
};

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function analyzeMessage(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Analyser le message pour déterminer le type de réponse
  if (lowerMessage.includes('compétence') || lowerMessage.includes('skill') || lowerMessage.includes('technologie') || lowerMessage.includes('stack')) {
    return getRandomResponse(predefinedResponses.competences);
  }
  
  if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation') || lowerMessage.includes('portfolio') || lowerMessage.includes('travail')) {
    return getRandomResponse(predefinedResponses.projets);
  }
  
  if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours') || lowerMessage.includes('carrière') || lowerMessage.includes('profil')) {
    return getRandomResponse(predefinedResponses.experience);
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('contacter') || lowerMessage.includes('joindre') || lowerMessage.includes('email')) {
    return getRandomResponse(predefinedResponses.contact);
  }
  
  if (lowerMessage.includes('diasporium')) {
    return getRandomResponse(predefinedResponses.diasporium);
  }
  
  // Réponses pour les salutations
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Bonjour ! 👋 Ravi de vous rencontrer ! Je suis l'assistant IA d'Emmanuel. Comment puis-je vous aider à découvrir son travail et ses compétences ?";
  }
  
  // Réponses pour les remerciements
  if (lowerMessage.includes('merci') || lowerMessage.includes('thank')) {
    return "De rien ! 😊 Je suis là pour vous aider à découvrir le travail d'Emmanuel. N'hésitez pas si vous avez d'autres questions !";
  }
  
  return getRandomResponse(predefinedResponses.default);
}

// Fonction pour appeler OpenAI (si la clé API est configurée)
async function callOpenAI(message: string, context: string): Promise<string> {
  const openaiApiKey = process.env['OPENAI_API_KEY'];
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }
  
  const systemPrompt = `Tu es l'assistant IA professionnel du portfolio d'Emmanuel Deko. ${context}
  
  Instructions:
  - Réponds en français de manière amicale et professionnelle
  - Concentre-toi sur les informations fournies sur Emmanuel
  - Si la question sort du contexte professionnel, redirige poliment vers le portfolio
  - Sois concis (maximum 2-3 phrases)
  - Encourage les visiteurs à explorer le portfolio ou à contacter Emmanuel`;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
      temperature: 0.7
    })
  });
  
  if (!response.ok) {
    throw new Error('OpenAI API call failed');
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message, context }: ChatRequest = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    let response: string;
    
    try {
      // Tentative d'utilisation d'OpenAI
      response = await callOpenAI(message, context || '');
      console.log('Used OpenAI for response');
    } catch (error) {
      // Fallback vers les réponses prédéfinies
      response = analyzeMessage(message);
      console.log('Used predefined responses (OpenAI not available)');
    }
    
    const chatResponse: ChatResponse = {
      response: response
    };
    
    res.status(200).json(chatResponse);
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      response: "Désolé, je rencontre un problème technique. Pouvez-vous réessayer dans un moment ?"
    });
  }
} 