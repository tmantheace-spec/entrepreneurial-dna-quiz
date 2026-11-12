// All quiz content lives in this file. Edit text here; no other file needs to change.

// Every question's options are listed in the order A, B, C, D, which map to:
//   A = strategic, B = innovation, C = impact, D = visionary
const ORDER = ["strategic", "innovation", "impact", "visionary"];

const QUESTIONS = [
  {
    q: "You're stranded at an airport for eight hours. Your flight has been delayed and your friends are getting restless. What are you most likely to do?",
    a: [
      "Look into alternative flights and work out the best way to get everyone home.",
      "Explore the airport and see if there's something unexpectedly interesting to do.",
      "Check that everyone is coping okay, particularly the friend who's travelling alone for the first time.",
      "Turn the delay into a group adventure and get everyone involved in making the most of it."
    ]
  },
  {
    q: "You're given a completely blank Instagram account and a challenge to reach 10,000 followers. What's your first move?",
    a: [
      "Work out what kind of content is likely to attract the right audience.",
      "Create something unusual that people haven't come across on their feeds before.",
      "Build an account around a topic that brings people together over something meaningful.",
      "Reach out to interesting people and start building collaborations."
    ]
  },
  {
    q: "Your favourite café announces that it's closing. You and your friends are genuinely devastated. What's your first reaction?",
    a: [
      "Wondering whether the business could be saved and what it would take to make that possible.",
      "Imagining how the café could reinvent itself with a completely different concept.",
      "Thinking about the employees and regular customers who will be affected.",
      "Wondering who you could bring together to help keep the café alive."
    ]
  },
  {
    q: "You're watching a movie and the main character makes a terrible decision. What's most likely going through your mind?",
    a: [
      "“They really should have considered the consequences before doing that.”",
      "“Why are they doing things the conventional way? There's probably another option.”",
      "“I wonder what they're going through that made this seem like the right decision.”",
      "“Someone needs to step up and get this situation under control.”"
    ]
  },
  {
    q: "Your friends ask you to plan a spontaneous weekend trip. Which part would you naturally take charge of?",
    a: [
      "Finding an option that offers the best value for everyone's money.",
      "Finding a destination that nobody in the group has visited before.",
      "Choosing somewhere that everyone can enjoy, regardless of their budget.",
      "Getting everyone excited about the trip and making sure it actually happens."
    ]
  },
  {
    q: "Sauder announces a competition with a $20,000 prize. You can enter with any idea. What would excite you most?",
    a: [
      "Presenting a concept with a strong business case and a realistic chance of succeeding.",
      "Developing something that challenges the way people currently do things.",
      "Creating a solution to a problem that students genuinely care about.",
      "Pitching an ambitious idea and persuading others to help bring it to life."
    ]
  },
  {
    q: "Your friend group is playing Monopoly. What role do you naturally take on?",
    a: [
      "The person calculating which properties are worth buying.",
      "The person inventing completely unnecessary house rules.",
      "The person making sure nobody gets too competitive or left out.",
      "The person turning a casual game into a full-blown championship."
    ]
  },
  {
    q: "You join a student club that is struggling to attract members. What would you be most inclined to do?",
    a: [
      "Look at why students aren't joining and identify what needs to change.",
      "Suggest a completely new concept that could make the club more appealing.",
      "Speak to students to understand what would make the club more welcoming.",
      "Bring the existing members together and get them excited about rebuilding the club."
    ]
  },
  {
    q: "Your flatmate has spent $300 on a gadget that peels bananas automatically. What is your reaction?",
    a: [
      "“How many bananas would you have to peel before this actually pays for itself?”",
      "“Could it peel other fruit? Imagine the possibilities!”",
      "“Is there a way to make this affordable for people who struggle with everyday tasks?”",
      "“This is ridiculous. We need to show everyone how it works.”"
    ]
  },
  {
    q: "UBC introduces a new rule: everyone must start a side hustle. Which one would you be most tempted to try?",
    a: [
      "A service that helps students make smarter financial decisions.",
      "A quirky product that solves an everyday student problem in an unusual way.",
      "A venture that makes student life more affordable or sustainable.",
      "An events or community platform that connects students across campus."
    ]
  }
];

// DRAFT COPY: the descriptions, strengths, careers and Sauder text below were
// drafted from the archetype comparison table. Replace with your final wording.
const ARCHETYPES = {
  strategic: {
    name: "Strategic Mind",
    field: "score-strategic-mind",
    tagline: "You analyse.",
    desc: "You lead with logic. When a problem lands in front of you, your instinct is to evaluate it: weigh the options, test the numbers and work out what will actually hold up. What motivates you is making sound decisions, and people trust your judgement because you've thought it through.",
    strengths: [
      "Breaking messy problems into clear choices",
      "Weighing risks, costs and trade-offs",
      "Spotting whether an idea is genuinely viable",
      "Staying level-headed when decisions matter"
    ],
    careers: [
      "Venture capital and investment analysis",
      "Strategy and management consulting",
      "Business development and corporate strategy",
      "Startup finance and operations",
      "Founding a venture built on a strong business case"
    ],
    sauder: "The Entrepreneurship specialization gives your analytical side something real to work on. You'd practise assessing opportunities, testing whether a business model stands up and building the case for an idea, which are skills that carry into founding, funding or advising new ventures."
  },
  innovation: {
    name: "Innovation Architect",
    field: "score-innovation-architect",
    tagline: "You innovate.",
    desc: "You lead with creativity. You question why things are done the way they are and can't resist experimenting with a different approach. What motivates you is creating better solutions, and you're at your best when there's a blank page and no rule saying it has to be done the usual way.",
    strengths: [
      "Seeing possibilities other people miss",
      "Questioning assumptions and conventions",
      "Experimenting, prototyping and iterating",
      "Staying comfortable with ambiguity"
    ],
    careers: [
      "Product design and product management",
      "Founding a product-led startup",
      "Innovation and R&D roles",
      "Brand and creative strategy",
      "Emerging technology ventures"
    ],
    sauder: "The Entrepreneurship specialization gives your ideas a path from concept to reality. You'd learn how to test a new idea with real users, shape it into something people want and turn a creative spark into a venture that can last."
  },
  impact: {
    name: "Impact Catalyst",
    field: "score-impact-catalyst",
    tagline: "You empower.",
    desc: "You lead with purpose and empathy. Before anything else, you want to understand who is affected and what they actually need. What motivates you is making a difference, and you measure a good idea by the good it does for people.",
    strengths: [
      "Understanding what people really need",
      "Noticing who is being left out",
      "Building trust and inclusive communities",
      "Keeping purpose at the centre of decisions"
    ],
    careers: [
      "Social entrepreneurship",
      "Sustainability and ESG roles",
      "Non-profit and community leadership",
      "Impact investing",
      "Purpose-driven brands and ventures"
    ],
    sauder: "The Entrepreneurship specialization shows how purpose and business can strengthen each other. You'd learn to build ventures that are financially sustainable and solve problems people genuinely care about, so the impact you want to make can scale."
  },
  visionary: {
    name: "Visionary Leader",
    field: "score-visionary-leader",
    tagline: "You lead.",
    desc: "You lead with people and action. When you see an opportunity, you rally others around it and get things moving. What motivates you is bringing a vision to life, and your energy tends to turn a loose idea into something everyone wants to be part of.",
    strengths: [
      "Rallying people around a shared goal",
      "Turning ideas into action",
      "Pitching and persuading with confidence",
      "Building teams, partnerships and momentum"
    ],
    careers: [
      "Startup founder or CEO",
      "Sales and partnerships leadership",
      "Venture building and growth roles",
      "Events and community platforms",
      "General management"
    ],
    sauder: "The Entrepreneurship specialization gives your drive a structure. You'd practise pitching ideas, building teams and leading a venture from first concept to launch, alongside classmates and mentors who can help you make it happen."
  }
};
