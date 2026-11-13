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

// Result content, copied from the group's Google Doc.
// `short` is the name shown in the DNA mix and saved with each response.
const ARCHETYPES = {
  strategic: {
    name: "The Strategic Mind",
    short: "Strategic Mind",
    field: "score-strategic-mind",
    quote: "Every great idea needs a smart strategy.",
    summary: "Is analytical, commercially aware, and enjoys evaluating risks, assessing feasibility, and making calculated decisions.",
    strengthsIntro: "Your answers suggest that you approach challenges with logic, careful consideration, and a strong sense of commercial awareness. You enjoy understanding the bigger picture before making decisions and tend to evaluate opportunities through a practical lens.",
    strengths: [
      ["Analytical thinking", "Breaking down complex problems and identifying patterns."],
      ["Strategic decision-making", "Weighing alternatives and considering long-term consequences."],
      ["Commercial awareness", "Recognising what makes a business idea financially and commercially viable."],
      ["Risk assessment", "Anticipating potential challenges and making informed decisions."],
      ["Problem evaluation", "Questioning assumptions and examining the feasibility of different solutions."]
    ],
    careers: [
      ["Business Strategy Analyst", "Evaluating business performance and identifying strategic opportunities."],
      ["Venture Analyst", "Assessing early-stage businesses and their growth potential."],
      ["Management Consultant", "Helping organisations solve business problems and improve performance."],
      ["Entrepreneurial Finance Associate", "Evaluating funding requirements and financial opportunities for ventures."],
      ["Business Development Strategist", "Identifying commercial opportunities and developing growth strategies."]
    ],
    courses: [
      {
        title: "Economics of Entrepreneurship and Innovation",
        code: "COMM_V 382",
        tag: "BCom specialization core",
        desc: "Learn how economic forces influence innovation, new ventures, market opportunities, and the commercialisation of ideas.",
        why: "Develops your ability to understand market conditions, assess business opportunities, and evaluate the economic feasibility of new ventures."
      },
      {
        title: "Entrepreneurial Finance and Private Equity",
        code: "COMM_V 387",
        tag: "BCom specialization core",
        desc: "Explore the financial considerations involved in starting, financing, and growing entrepreneurial ventures.",
        why: "Strengthens your understanding of funding decisions, financial viability, investment, and the relationship between entrepreneurs and investors."
      },
      {
        title: "New Venture Design",
        code: "COMM 466 / APSC 486",
        tag: "Recommended experiential course",
        desc: "Work in interdisciplinary teams to develop a venture, research its market, create financial projections, develop a business model, and pitch to investors.",
        why: "Gives you the opportunity to apply analytical and commercial thinking to an actual venture concept."
      }
    ]
  },
  innovation: {
    name: "The Innovation Architect",
    short: "Innovation Architect",
    field: "score-innovation-architect",
    quote: "There is always a better way.",
    summary: "Enjoys questioning existing solutions, developing original ideas, and creating products or services that improve people's lives.",
    strengthsIntro: "Your answers suggest that you are naturally curious, imaginative, and inclined to question conventional approaches. You enjoy exploring possibilities and thinking about how existing products, services, or experiences could be improved.",
    strengths: [
      ["Creative thinking", "Generating original ideas and exploring unconventional possibilities."],
      ["Curiosity", "Asking questions and looking beyond established solutions."],
      ["Experimentation", "Being willing to test ideas, learn from feedback, and refine solutions."],
      ["Problem-solving", "Approaching challenges from different perspectives."],
      ["Adaptability", "Responding positively to new information and changing circumstances."]
    ],
    careers: [
      ["Product Manager", "Guiding the development and improvement of products."],
      ["Innovation Consultant", "Helping organisations identify and implement new ideas."],
      ["Design Strategist", "Using human-centred thinking to develop better products and services."],
      ["Technology Entrepreneur", "Creating ventures around emerging technologies and innovative solutions."],
      ["AI Product Specialist", "Exploring how artificial intelligence can be developed into useful products and services."]
    ],
    courses: [
      {
        title: "Design Methods for Business Innovation",
        code: "COMM_V 388",
        tag: "BCom specialization course option",
        desc: "A studio-based learning experience exploring design processes, collaborative problem-solving, and innovation for external clients.",
        why: "Helps you turn abstract ideas into practical solutions through design strategies, experimentation, and human-centred thinking."
      },
      {
        title: "Creativity in Business",
        code: "COMM_V 389",
        tag: "BCom specialization course option",
        desc: "Explore the role of creative thinking in business and how original ideas can contribute to innovation.",
        why: "Encourages you to develop your imagination as a practical business capability."
      },
      {
        title: "New Product Development",
        code: "COMM_V 482",
        tag: "BCom specialization course option",
        desc: "Explore how new products are developed and brought towards the market.",
        why: "Connects your interest in creating and improving things with the commercial process of developing products."
      }
    ]
  },
  impact: {
    name: "The Impact Catalyst",
    short: "Impact Catalyst",
    field: "score-impact-catalyst",
    quote: "Success means making a difference.",
    summary: "Is driven by purpose and wants to use business as a tool to address social challenges.",
    strengthsIntro: "Your answers suggest that you are purpose-driven and motivated by the possibility of creating meaningful change. You tend to consider the wider implications of decisions and are drawn to challenges that affect people, communities, or the environment.",
    strengths: [
      ["Empathy", "Understanding different perspectives and recognising the needs of others."],
      ["Social awareness", "Identifying challenges affecting communities and society."],
      ["Purpose-driven thinking", "Connecting your goals to a larger sense of meaning."],
      ["Ethical decision-making", "Considering the social and environmental consequences of business decisions."],
      ["Collaborative problem-solving", "Bringing people together around a shared purpose."]
    ],
    careers: [
      ["Social Entrepreneur", "Developing ventures that address social challenges."],
      ["Sustainability Consultant", "Helping organisations develop more sustainable business practices."],
      ["Social Impact Strategist", "Designing initiatives that create measurable social value."],
      ["Impact Investment Analyst", "Evaluating investments based on their financial and social outcomes."],
      ["Community Enterprise Manager", "Developing and managing ventures that serve community needs."]
    ],
    courses: [
      {
        title: "Green Entrepreneurship and Sustainable Startups",
        code: "COMM_V 386M",
        tag: "Counts towards Entrepreneurship option requirements",
        desc: "Learn how entrepreneurship can address environmental and social challenges. Work in multidisciplinary startup teams to identify sustainable opportunities, co-design ideas, and pitch to impact investors.",
        why: "Directly connects your desire to make a difference with the development of commercially viable, sustainable ventures."
      },
      {
        title: "Social Entrepreneurship",
        code: "COMM_V 485",
        tag: "Related Sustainability and Social Impact coursework",
        desc: "Explore how entrepreneurial approaches can address social challenges and create value for communities.",
        why: "Helps you investigate how business models can be developed around social needs."
      },
      {
        title: "Impact Investing: Social Finance in the 21st Century",
        code: "COMM_V 386L",
        tag: "Related Sustainability and Social Impact coursework",
        desc: "Explore investments that seek to generate financial returns alongside measurable social and environmental impact.",
        why: "Connects your purpose-driven outlook with the financial mechanisms that can support social and environmental ventures."
      }
    ]
  },
  visionary: {
    name: "The Visionary Leader",
    short: "Visionary Leader",
    field: "score-visionary-leader",
    quote: "Big ideas need people who believe in them.",
    summary: "Enjoys inspiring others, building teams, communicating ambitious visions, and leading ventures.",
    strengthsIntro: "Your answers suggest that you enjoy taking initiative, bringing people together, and motivating others towards a common goal. You are drawn to big-picture thinking and enjoy turning ambitious ideas into coordinated action.",
    strengths: [
      ["Leadership", "Taking initiative and providing direction when working towards a goal."],
      ["Communication", "Expressing ideas clearly and generating enthusiasm around a vision."],
      ["Relationship-building", "Developing connections and bringing different people together."],
      ["Influence and persuasion", "Gaining support for ideas and encouraging others to contribute."],
      ["Execution and initiative", "Moving from planning towards action and maintaining momentum."]
    ],
    careers: [
      ["Startup Founder / CEO", "Establishing a venture and leading its overall direction."],
      ["Business Development Manager", "Building partnerships and identifying opportunities for growth."],
      ["Venture Development Associate", "Supporting the development and expansion of emerging businesses."],
      ["Startup Fundraising / Investor Relations Associate", "Building relationships with investors and communicating a venture's potential."],
      ["Venture Growth Manager", "Developing strategies and initiatives to scale a business."]
    ],
    courses: [
      {
        title: "New Venture Design",
        code: "COMM 466 / APSC 486",
        tag: "Recommended experiential course",
        desc: "Work in an interdisciplinary team to develop a venture, build a prototype, prepare a business plan, and pitch to investors.",
        why: "Offers practical opportunities to collaborate, coordinate different areas of expertise, communicate a shared vision, and bring an idea closer to reality."
      },
      {
        title: "Disruption",
        code: "COMM_V 486J",
        tag: "Entrepreneurship option course",
        desc: "Work within the Creative Destruction Lab ecosystem to develop disruptive strategies for a startup, using insights into human behaviour, global trends, and emerging ideas.",
        why: "Gives you exposure to how entrepreneurial leaders challenge established markets, influence strategic direction, and develop new opportunities for ventures. The course also involves developing strategies that can influence a company's progress and investor perception."
      },
      {
        title: "Applied Methods in Technology Start-ups at CDL",
        code: "COMM_V 489",
        tag: "Follow-on experiential opportunity",
        desc: "This is the next course in the CDL pathway, following COMM_V 486J.",
        why: "Offers a further opportunity to engage with technology startups and apply entrepreneurial thinking in a venture environment."
      }
    ]
  }
};
