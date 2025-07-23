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
  emmanuel: [
    "Emmanuel Deko est un développeur fullstack passionné ! 👨‍💻 Il a plusieurs années d'expérience dans le développement web moderne, avec une expertise particulière en Angular, React, et NodeJS. Il est très orienté innovation et toujours à l'affût des nouvelles technologies.",
    "Emmanuel est un architecte du numérique ! 🚀 Il excelle dans la création d'applications web complètes, de la conception à la mise en production. Son approche combine expertise technique et vision créative pour livrer des solutions élégantes et performantes.",
    "C'est un développeur fullstack très talentueux ! Emmanuel maîtrise aussi bien le frontend (Angular, React) que le backend (NodeJS, Python). Il a une approche professionnelle du développement et une passion pour créer des expériences utilisateur exceptionnelles."
  ],
  competences: [
    "Emmanuel maîtrise un large éventail de technologies modernes ! 💻 Frontend : Angular, React, NextJS, TypeScript, HTML5, CSS3, Tailwind CSS. Backend : NodeJS, Express, Python, REST API, WebSocket. DevOps : Docker, Git, CI/CD. Bases de données : MongoDB, MySQL, PostgreSQL, Firebase.",
    "Côté technique, Emmanuel est un expert fullstack ! ⚡ Il excelle en développement frontend avec Angular et React, maîtrise le backend NodeJS et Python, utilise Docker pour le déploiement, et travaille avec des bases de données modernes. Une vraie polyvalence !",
    "Les compétences d'Emmanuel couvrent toute la stack web ! 🌟 Développement : Angular, React, NodeJS, TypeScript, Python. Design : UI/UX, Tailwind CSS. Cloud : Firebase, Vercel, Hostinger. Outils : Docker, Git, WebSocket. Il combine technique et créativité parfaitement !"
  ],
  projets: [
    "Emmanuel a réalisé des projets impressionnants ! 🌟 Son projet phare est Diasporium, une plateforme complète pour la diaspora congolaise (NextJS, NodeJS, WebSocket, Firebase) sur https://diasporium.vercel.app. Il a aussi créé un système de gestion des bourses pour la RDC sur https://celbe-rdc.cd.",
    "Ses réalisations sont vraiment remarquables ! 🚀 Diasporium montre toute son expertise : architecture moderne, real-time avec WebSocket, interface élégante. Le système de bourses RDC démontre sa capacité à créer des solutions pour des organismes officiels. Tous ses projets reflètent un haut niveau de qualité !",
    "Les projets d'Emmanuel révèlent son talent ! 💼 Diasporium est une plateforme sophistiquée avec technologies modernes, le système de bourses RDC est une solution complète pour une institution gouvernementale. Chaque projet montre sa maîtrise technique et son sens du détail."
  ],
  experience: [
    "Emmanuel a plus de 5 années d'expérience en développement web ! 📈 Il a une approche moderne et maîtrise les bonnes pratiques du développement. Son parcours montre une évolution constante et une passion pour l'innovation technologique.",
    "Son expérience est solide et diversifiée ! 💪 Emmanuel a travaillé sur des projets variés, de la diaspora congolaise aux systèmes gouvernementaux. Il combine expertise technique, créativité, et capacité à livrer des solutions complètes et fonctionnelles.",
    "Le parcours d'Emmanuel reflète un développeur accompli ! 🎯 Plus de 5 ans d'expérience, projets concrets comme Diasporium et le système RDC, maîtrise des technologies modernes, et une approche professionnelle du développement web."
  ],
  contact: [
    "Vous pouvez contacter Emmanuel facilement ! 📧 Utilisez le formulaire de contact sur ce site web, ou consultez son GitHub très actif : https://github.com/EMMADEKO10. Il est ouvert aux collaborations, projets freelance, et opportunités professionnelles !",
    "Pour joindre Emmanuel, plusieurs options ! 💬 Formulaire de contact sur le site, profil GitHub (EMMADEKO10), ou explorez son portfolio. Il répond rapidement et est toujours intéressé par de nouveaux défis techniques et collaborations créatives.",
    "Contactez Emmanuel via ce portfolio ! 🌐 Section contact du site, GitHub (EMMADEKO10), ou découvrez d'abord ses projets. Il est disponible pour discussions professionnelles, conseils techniques, ou collaborations sur des projets innovants."
  ],
  diasporium: [
    "Diasporium est le projet phare d'Emmanuel ! 🌍 Une plateforme moderne et complète pour l'intégration de la diaspora congolaise. Technologies utilisées : NextJS, NodeJS, WebSocket pour le real-time, Cloudinary, Firebase. C'est vraiment impressionnant : https://diasporium.vercel.app",
    "Cette plateforme Diasporium montre tout le talent d'Emmanuel ! ⚡ Architecture moderne, fonctionnalités real-time avec WebSocket, interface utilisateur élégante, intégration cloud complète. Un excellent exemple de développement fullstack professionnel et innovant.",
    "Diasporium démontre l'expertise d'Emmanuel ! 🚀 Plateforme complexe avec NextJS pour le frontend, NodeJS pour l'API, WebSocket pour la communication temps réel, intégrations cloud avancées. C'est un projet qui impressionne les recruteurs et clients !"
  ],
  default: [
    "Je suis ravi de vous parler d'Emmanuel ! 😊 Il est développeur fullstack avec plus de 5 ans d'expérience et une passion pour les technologies modernes. Que souhaitez-vous savoir : ses compétences, ses projets comme Diasporium, ou son parcours ?",
    "Excellente question ! 👍 Emmanuel est un développeur très talentueux spécialisé en Angular, React, et NodeJS. Voulez-vous en savoir plus sur ses compétences techniques, ses réalisations comme Diasporium, ou comment le contacter ?",
    "Emmanuel serait ravi de discuter avec vous ! 💼 C'est un expert fullstack avec des projets impressionnants. Je peux vous parler de ses compétences (Angular, React, NodeJS), ses projets (Diasporium, système RDC), ou vous guider vers son contact !"
  ]
};

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function analyzeMessage(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  console.log('Analyzing message:', lowerMessage); // Log pour debug
  
  // Questions sur Emmanuel personnellement
  if (lowerMessage.includes('qui est') || lowerMessage.includes('qui') || lowerMessage.includes('emmanuel') || 
      lowerMessage.includes('deko') || lowerMessage.includes('présent') || lowerMessage.includes('about') || 
      lowerMessage.includes('développeur') || lowerMessage.includes('personne')) {
    console.log('Detected: About Emmanuel');
    return getRandomResponse(predefinedResponses.emmanuel);
  }
  
  // Compétences et technologies - détection améliorée
  if (lowerMessage.includes('compétence') || lowerMessage.includes('competence') || lowerMessage.includes('skill') || 
      lowerMessage.includes('technologie') || lowerMessage.includes('stack') || lowerMessage.includes('maîtrise') || 
      lowerMessage.includes('sait') || lowerMessage.includes('peut') || lowerMessage.includes('capable') || 
      lowerMessage.includes('programming') || lowerMessage.includes('développement') || lowerMessage.includes('language')) {
    console.log('Detected: Skills/Technologies');
    return getRandomResponse(predefinedResponses.competences);
  }
  
  // Projets et réalisations
  if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation') || lowerMessage.includes('portfolio') || 
      lowerMessage.includes('travail') || lowerMessage.includes('créé') || lowerMessage.includes('développé') || 
      lowerMessage.includes('fait') || lowerMessage.includes('construit') || lowerMessage.includes('application')) {
    console.log('Detected: Projects');
    return getRandomResponse(predefinedResponses.projets);
  }
  
  // Expérience et parcours
  if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours') || lowerMessage.includes('carrière') || 
      lowerMessage.includes('profil') || lowerMessage.includes('background') || lowerMessage.includes('formation') || 
      lowerMessage.includes('étude') || lowerMessage.includes('diplôme') || lowerMessage.includes('cursus')) {
    console.log('Detected: Experience');
    return getRandomResponse(predefinedResponses.experience);
  }
  
  // Contact et communication
  if (lowerMessage.includes('contact') || lowerMessage.includes('contacter') || lowerMessage.includes('joindre') || 
      lowerMessage.includes('email') || lowerMessage.includes('téléphone') || lowerMessage.includes('message') || 
      lowerMessage.includes('collaboration') || lowerMessage.includes('embauche') || lowerMessage.includes('recrut')) {
    console.log('Detected: Contact');
    return getRandomResponse(predefinedResponses.contact);
  }
  
  // Projet spécifique Diasporium
  if (lowerMessage.includes('diasporium')) {
    console.log('Detected: Diasporium');
    return getRandomResponse(predefinedResponses.diasporium);
  }
  
  // Système de bourses
  if (lowerMessage.includes('bourse') || lowerMessage.includes('celbe') || lowerMessage.includes('rdc') || lowerMessage.includes('congo')) {
    console.log('Detected: Scholarship system');
    return "Emmanuel a développé un système complet de gestion des bourses pour la cellule interministérielle de la République Démocratique du Congo. C'est un projet web utilisant WordPress pour faciliter le suivi et la gestion des bourses d'études. Vous pouvez le consulter sur https://celbe-rdc.cd";
  }
  
  // Salutations
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || 
      lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('bonsoir')) {
    console.log('Detected: Greeting');
    return "Bonjour ! 👋 Ravi de vous rencontrer ! Je suis l'assistant IA d'Emmanuel. Comment puis-je vous aider à découvrir son travail et ses compétences ?";
  }
  
  // Remerciements
  if (lowerMessage.includes('merci') || lowerMessage.includes('thank')) {
    console.log('Detected: Thanks');
    return "De rien ! 😊 Je suis là pour vous aider à découvrir le travail d'Emmanuel. N'hésitez pas si vous avez d'autres questions !";
  }
  
  // Questions générales ou mots interrogatifs
  if (lowerMessage.includes('quoi') || lowerMessage.includes('que') || lowerMessage.includes('comment') || 
      lowerMessage.includes('pourquoi') || lowerMessage.includes('what') || lowerMessage.includes('how') || 
      lowerMessage.includes('?')) {
    console.log('Detected: General question - checking for specific topics');
    
    // Re-check for specific topics in questions
    if (lowerMessage.includes('compétence') || lowerMessage.includes('competence')) {
      return getRandomResponse(predefinedResponses.competences);
    }
    if (lowerMessage.includes('projet')) {
      return getRandomResponse(predefinedResponses.projets);
    }
    if (lowerMessage.includes('emmanuel') || lowerMessage.includes('deko')) {
      return getRandomResponse(predefinedResponses.emmanuel);
    }
  }
  
  console.log('Using default response');
  return getRandomResponse(predefinedResponses.default);
}

// Fonction pour appeler OpenAI (si la clé API est configurée)
async function callOpenAI(message: string, context: string): Promise<string> {
  const openaiApiKey = process.env['OPENAI_API_KEY'];
  
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  // Prompt système personnalisé pour Emmanuel
  const systemPrompt = `Tu es l'assistant IA personnel d'Emmanuel Deko, un développeur fullstack talentueux et passionné. 

INFORMATIONS SUR EMMANUEL :
👨‍💻 Profil : Développeur fullstack avec plus de 5 années d'expérience
🚀 Spécialités : Angular, React, NextJS, NodeJS, Python, TypeScript
💼 Expertise : Applications web complètes, architecture moderne, UX/UI
🌟 Projets phares :
  - Diasporium : Plateforme diaspora congolaise (NextJS, NodeJS, WebSocket, Firebase) - https://diasporium.vercel.app
  - Système de bourses RDC : Gestion bourses gouvernementales (WordPress) - https://celbe-rdc.cd
  - Portfolio personnel : Site vitrine moderne (Angular 18, SSR)

🛠️ Stack technique complète :
  Frontend: Angular, React, NextJS, TypeScript, HTML5, CSS3, Tailwind CSS, Material Design
  Backend: NodeJS, Express, Python, REST API, WebSocket, API GraphQL
  Bases de données: MongoDB, MySQL, PostgreSQL, Firebase Firestore
  Cloud & DevOps: Docker, Git, CI/CD, Vercel, Hostinger, Coolify, Nginx
  Design: Figma, Adobe Creative Suite, UI/UX Design

🎯 Vision : Créer des expériences numériques exceptionnelles qui combinent innovation technique et design élégant
💡 Approche : Développement moderne avec bonnes pratiques, code propre, performances optimisées
🌍 Passion : Technologies émergentes, communauté open-source, solutions pour l'Afrique

INSTRUCTIONS DE CONVERSATION :
- Sois enthousiaste et professionnel en parlant d'Emmanuel
- Mets en valeur ses compétences techniques et sa créativité
- Utilise des emojis appropriés pour rendre la conversation vivante
- Donne des exemples concrets de ses projets et technologies
- Encourage les visiteurs à explorer son portfolio et le contacter
- Reste authentique et évite l'exagération
- Réponds en français sauf si on te parle en anglais
- Si on demande des détails techniques, sois précis et informatif
- Oriente vers ses projets concrets comme Diasporium et le système RDC
- Encourage les collaborations et opportunités professionnelles

Réponds toujours comme si tu connaissais parfaitement Emmanuel et son travail, avec passion et précision.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI');
    }

    const aiResponse = data.choices[0].message.content.trim();
    console.log('OpenAI response generated successfully');
    return aiResponse;

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

export default async function handler(req: any, res: any): Promise<void> {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string' });
      return;
    }

    console.log('📥 Incoming message:', message);

    let response: string;

    // 🔥 PRIORITÉ 1: OpenAI (si clé API disponible)
    const openaiApiKey = process.env['OPENAI_API_KEY'];
    
    if (openaiApiKey && openaiApiKey.trim() !== '') {
      console.log('🤖 Using OpenAI GPT for intelligent response...');
      try {
        response = await callOpenAI(message, '');
        console.log('✅ OpenAI response generated successfully');
        
        res.status(200).json({
          response,
          source: 'openai',
          timestamp: new Date().toISOString()
        });
        return;
        
      } catch (error) {
        console.warn('⚠️ OpenAI failed, falling back to predefined responses:', error);
        // Continue vers le fallback
      }
    } else {
      console.log('ℹ️ OpenAI API key not configured, using predefined responses');
    }

    // 🔥 PRIORITÉ 2: Analyse sémantique avec réponses prédéfinies
    console.log('📋 Using semantic analysis with predefined responses...');
    response = analyzeMessage(message);
    
    res.status(200).json({
      response,
      source: 'predefined',
      timestamp: new Date().toISOString()
    });
    return;

  } catch (error) {
    console.error('❌ API Error:', error);
    
    // 🔥 FALLBACK ULTIME
    res.status(500).json({
      response: "Je suis désolé, je rencontre actuellement des difficultés techniques. 😔 Mais je peux vous dire qu'Emmanuel est un excellent développeur fullstack ! N'hésitez pas à explorer son portfolio ou à utiliser le formulaire de contact pour le joindre directement.",
      source: 'error_fallback',
      timestamp: new Date().toISOString()
    });
    return;
  }
} 