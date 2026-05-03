const questionDao = require("./dao/question-dao.js");

const questions = [
  {
    "text": "What do you enjoy most when working on a project?",
    "answers": [
      { "text": "Making things look beautiful and interactive", "itRoleId": "frontendDeveloper" },
      { "text": "Building the logic that makes everything work", "itRoleId": "backendDeveloper" },
      { "text": "Finding patterns and insights in data", "itRoleId": "dataAnalyst" },
      { "text": "Making sure everything works without errors", "itRoleId": "qaEngineer" },
      { "text": "Designing how users will experience the product", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you spend your free time at the computer?",
    "answers": [
      { "text": "Browsing cool websites and thinking about how they were built", "itRoleId": "frontendDeveloper" },
      { "text": "Reading about algorithms and system architecture", "itRoleId": "backendDeveloper" },
      { "text": "Exploring datasets and building charts", "itRoleId": "dataAnalyst" },
      { "text": "Testing new apps and finding bugs", "itRoleId": "qaEngineer" },
      { "text": "Collecting design references and browsing Dribbble", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What annoys you most in a product?",
    "answers": [
      { "text": "Ugly or broken interface", "itRoleId": "frontendDeveloper" },
      { "text": "Slow or unstable performance", "itRoleId": "backendDeveloper" },
      { "text": "Decisions made without data", "itRoleId": "dataAnalyst" },
      { "text": "Obvious bugs that were not caught before release", "itRoleId": "qaEngineer" },
      { "text": "Confusing navigation and unclear user flow", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "Which superpower would you want at work?",
    "answers": [
      { "text": "Build any interface perfectly on the first try", "itRoleId": "frontendDeveloper" },
      { "text": "Design systems that never fail", "itRoleId": "backendDeveloper" },
      { "text": "Instantly see cause and effect in any dataset", "itRoleId": "dataAnalyst" },
      { "text": "Find any bug before it reaches the user", "itRoleId": "qaEngineer" },
      { "text": "Know exactly what users need before they say it", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What does a perfect workday look like to you?",
    "answers": [
      { "text": "I built a beautiful interactive component the team loved", "itRoleId": "frontendDeveloper" },
      { "text": "I solved a complex server-side bug no one else could fix", "itRoleId": "backendDeveloper" },
      { "text": "I found an insight in data that changed a business decision", "itRoleId": "dataAnalyst" },
      { "text": "I caught a critical bug before it went to production", "itRoleId": "qaEngineer" },
      { "text": "I ran user interviews and got valuable insights", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you react to criticism of your work?",
    "answers": [
      { "text": "I look at how to improve the visual or interactive part", "itRoleId": "frontendDeveloper" },
      { "text": "I analyze where the logical error was in the code", "itRoleId": "backendDeveloper" },
      { "text": "I check whether data supports or refutes the criticism", "itRoleId": "dataAnalyst" },
      { "text": "I think about what test case I missed", "itRoleId": "qaEngineer" },
      { "text": "I think about how to make the product clearer for users", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What kind of task excites you most?",
    "answers": [
      { "text": "Turning a static mockup into a living interactive page", "itRoleId": "frontendDeveloper" },
      { "text": "Designing a database schema for a complex system", "itRoleId": "backendDeveloper" },
      { "text": "Building a dashboard that tells a clear story from data", "itRoleId": "dataAnalyst" },
      { "text": "Writing test cases that cover every edge case", "itRoleId": "qaEngineer" },
      { "text": "Redesigning a confusing flow to make it intuitive", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What do you value most in your work?",
    "answers": [
      { "text": "Clean visual output and smooth animations", "itRoleId": "frontendDeveloper" },
      { "text": "Reliability, performance and architectural cleanliness", "itRoleId": "backendDeveloper" },
      { "text": "Accuracy and clarity of conclusions", "itRoleId": "dataAnalyst" },
      { "text": "Test coverage and predictable behavior", "itRoleId": "qaEngineer" },
      { "text": "Simplicity and intuitiveness for the user", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you explain your job to someone outside tech?",
    "answers": [
      { "text": "I build everything you see on a website", "itRoleId": "frontendDeveloper" },
      { "text": "I build what works behind the scenes", "itRoleId": "backendDeveloper" },
      { "text": "I find useful information hidden in numbers", "itRoleId": "dataAnalyst" },
      { "text": "I make sure the product works correctly before users see it", "itRoleId": "qaEngineer" },
      { "text": "I design how apps feel and work for people", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "Which tool would you learn first?",
    "answers": [
      { "text": "React or Vue for building modern interfaces", "itRoleId": "frontendDeveloper" },
      { "text": "Node.js or Python for server-side development", "itRoleId": "backendDeveloper" },
      { "text": "SQL and Python for data analysis", "itRoleId": "dataAnalyst" },
      { "text": "Selenium for automated testing", "itRoleId": "qaEngineer" },
      { "text": "Figma for prototyping and design", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What motivates you in the long run?",
    "answers": [
      { "text": "Creating interfaces people find beautiful", "itRoleId": "frontendDeveloper" },
      { "text": "Building systems that run reliably for years", "itRoleId": "backendDeveloper" },
      { "text": "Helping businesses make better decisions through data", "itRoleId": "dataAnalyst" },
      { "text": "Helping teams ship quality products consistently", "itRoleId": "qaEngineer" },
      { "text": "Making digital products people enjoy using", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about details?",
    "answers": [
      { "text": "Every pixel and animation must be exactly right", "itRoleId": "frontendDeveloper" },
      { "text": "Code must be clean and logically structured", "itRoleId": "backendDeveloper" },
      { "text": "Every number must be accurate and verifiable", "itRoleId": "dataAnalyst" },
      { "text": "Details are where the most serious bugs hide", "itRoleId": "qaEngineer" },
      { "text": "Every interaction must feel natural and effortless", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "When something goes wrong in production, what do you do first?",
    "answers": [
      { "text": "Check how it looks across browsers and devices", "itRoleId": "frontendDeveloper" },
      { "text": "Check logs, error traces and server metrics", "itRoleId": "backendDeveloper" },
      { "text": "Analyze data to understand where the failure occurred", "itRoleId": "dataAnalyst" },
      { "text": "Reproduce the issue and document the steps", "itRoleId": "qaEngineer" },
      { "text": "See how users are reacting and what they say", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What kind of project would make you most proud?",
    "answers": [
      { "text": "An interactive landing page with smooth animations", "itRoleId": "frontendDeveloper" },
      { "text": "A high-load API handling millions of requests", "itRoleId": "backendDeveloper" },
      { "text": "An analysis that saved the company millions", "itRoleId": "dataAnalyst" },
      { "text": "A product that shipped without a single critical bug", "itRoleId": "qaEngineer" },
      { "text": "A redesign that significantly improved user satisfaction", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you approach a new project?",
    "answers": [
      { "text": "I look at the design and think about how to implement it", "itRoleId": "frontendDeveloper" },
      { "text": "I start by designing the database schema and API", "itRoleId": "backendDeveloper" },
      { "text": "I first gather and analyze all available data", "itRoleId": "dataAnalyst" },
      { "text": "I study requirements and write test scenarios", "itRoleId": "qaEngineer" },
      { "text": "I start with user research to understand their needs", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What fascinates you about technology?",
    "answers": [
      { "text": "How browsers render complex animations so quickly", "itRoleId": "frontendDeveloper" },
      { "text": "How massive systems handle millions of requests", "itRoleId": "backendDeveloper" },
      { "text": "How machine learning finds patterns in data", "itRoleId": "dataAnalyst" },
      { "text": "How automated tests can catch bugs instantly", "itRoleId": "qaEngineer" },
      { "text": "How good design can change human behavior", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What do you read in your spare time?",
    "answers": [
      { "text": "Blogs about CSS, animations and component libraries", "itRoleId": "frontendDeveloper" },
      { "text": "Articles about system architecture and databases", "itRoleId": "backendDeveloper" },
      { "text": "Research about statistics and data visualization", "itRoleId": "dataAnalyst" },
      { "text": "Content about testing methodologies and automation", "itRoleId": "qaEngineer" },
      { "text": "Books about psychology and user behavior", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about working with users?",
    "answers": [
      { "text": "I want to give them the best visual experience", "itRoleId": "frontendDeveloper" },
      { "text": "I prefer working on the technical side away from users", "itRoleId": "backendDeveloper" },
      { "text": "I analyze their behavior through data and metrics", "itRoleId": "dataAnalyst" },
      { "text": "I make sure the product I test works well for them", "itRoleId": "qaEngineer" },
      { "text": "I love talking to users and understanding their needs", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What does quality mean to you?",
    "answers": [
      { "text": "The interface looks exactly as designed on all devices", "itRoleId": "frontendDeveloper" },
      { "text": "The system is stable, fast and easy to scale", "itRoleId": "backendDeveloper" },
      { "text": "The analysis is accurate and the conclusions are valid", "itRoleId": "dataAnalyst" },
      { "text": "The product does exactly what users expect in every scenario", "itRoleId": "qaEngineer" },
      { "text": "The product solves the problem with minimal effort from the user", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "If you were building your own startup, where would you start?",
    "answers": [
      { "text": "Build a beautiful and polished product interface", "itRoleId": "frontendDeveloper" },
      { "text": "Build a reliable and scalable technical infrastructure", "itRoleId": "backendDeveloper" },
      { "text": "Analyze the market and validate ideas with data", "itRoleId": "dataAnalyst" },
      { "text": "Define quality standards and testing processes", "itRoleId": "qaEngineer" },
      { "text": "Research users deeply to understand their real needs", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you handle uncertainty?",
    "answers": [
      { "text": "I prototype quickly and iterate based on feedback", "itRoleId": "frontendDeveloper" },
      { "text": "I design a robust system that handles edge cases", "itRoleId": "backendDeveloper" },
      { "text": "I collect data to reduce the uncertainty", "itRoleId": "dataAnalyst" },
      { "text": "I map out all possible scenarios in advance", "itRoleId": "qaEngineer" },
      { "text": "I talk to users to understand what they actually need", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your role in a team?",
    "answers": [
      { "text": "I bring designs to life and make them interactive", "itRoleId": "frontendDeveloper" },
      { "text": "I build the backbone that everything else depends on", "itRoleId": "backendDeveloper" },
      { "text": "I provide insights that help the team make better decisions", "itRoleId": "dataAnalyst" },
      { "text": "I am the last line of defense before the product reaches users", "itRoleId": "qaEngineer" },
      { "text": "I bridge the gap between user needs and technical possibilities", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about repetitive tasks?",
    "answers": [
      { "text": "I automate them with reusable components", "itRoleId": "frontendDeveloper" },
      { "text": "I build systems that eliminate repetition", "itRoleId": "backendDeveloper" },
      { "text": "I look for patterns to extract insights from them", "itRoleId": "dataAnalyst" },
      { "text": "I automate them with test scripts", "itRoleId": "qaEngineer" },
      { "text": "I redesign the workflow to make it more efficient", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What excites you about a new product launch?",
    "answers": [
      { "text": "Seeing the interface live and working in the browser", "itRoleId": "frontendDeveloper" },
      { "text": "Watching the system handle real traffic without issues", "itRoleId": "backendDeveloper" },
      { "text": "Getting real user data to analyze and learn from", "itRoleId": "dataAnalyst" },
      { "text": "Knowing that everything was thoroughly tested before release", "itRoleId": "qaEngineer" },
      { "text": "Seeing real users interact with something I designed", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What skill are you most proud of?",
    "answers": [
      { "text": "Turning complex designs into smooth working interfaces", "itRoleId": "frontendDeveloper" },
      { "text": "Designing systems that are reliable and scalable", "itRoleId": "backendDeveloper" },
      { "text": "Telling compelling stories through data and charts", "itRoleId": "dataAnalyst" },
      { "text": "Finding bugs that no one else notices", "itRoleId": "qaEngineer" },
      { "text": "Making complicated things feel simple for users", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about documentation?",
    "answers": [
      { "text": "I document components so others can use them easily", "itRoleId": "frontendDeveloper" },
      { "text": "I write clear API docs and architectural diagrams", "itRoleId": "backendDeveloper" },
      { "text": "I create reports that clearly explain my findings", "itRoleId": "dataAnalyst" },
      { "text": "I document test cases and bug reports thoroughly", "itRoleId": "qaEngineer" },
      { "text": "I document user flows and design decisions", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your biggest strength at work?",
    "answers": [
      { "text": "Attention to visual detail and creative problem solving", "itRoleId": "frontendDeveloper" },
      { "text": "Logical thinking and building robust systems", "itRoleId": "backendDeveloper" },
      { "text": "Analytical mindset and working with numbers", "itRoleId": "dataAnalyst" },
      { "text": "Attention to detail and critical thinking", "itRoleId": "qaEngineer" },
      { "text": "Empathy for users and creative thinking", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you learn best?",
    "answers": [
      { "text": "Building something visible right away", "itRoleId": "frontendDeveloper" },
      { "text": "Understanding the theory first then applying it", "itRoleId": "backendDeveloper" },
      { "text": "Studying real data and finding patterns", "itRoleId": "dataAnalyst" },
      { "text": "Through practice, trying and finding what breaks", "itRoleId": "qaEngineer" },
      { "text": "Observing how people use products and learning from that", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What would you change about most apps you use?",
    "answers": [
      { "text": "Make the animations and transitions smoother", "itRoleId": "frontendDeveloper" },
      { "text": "Make them faster and more reliable", "itRoleId": "backendDeveloper" },
      { "text": "Add better analytics and reporting features", "itRoleId": "dataAnalyst" },
      { "text": "Fix all the small bugs that never get addressed", "itRoleId": "qaEngineer" },
      { "text": "Simplify the navigation and reduce unnecessary steps", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about collaboration?",
    "answers": [
      { "text": "I love working closely with designers to implement their vision", "itRoleId": "frontendDeveloper" },
      { "text": "I enjoy deep technical discussions with other developers", "itRoleId": "backendDeveloper" },
      { "text": "I love sharing data insights and helping others decide", "itRoleId": "dataAnalyst" },
      { "text": "I work closely with developers to improve quality together", "itRoleId": "qaEngineer" },
      { "text": "I collaborate with everyone to ensure the user is always considered", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your relationship with perfectionism?",
    "answers": [
      { "text": "I want every pixel to be exactly right", "itRoleId": "frontendDeveloper" },
      { "text": "I want the architecture to be clean and logical", "itRoleId": "backendDeveloper" },
      { "text": "I want the analysis to be accurate and complete", "itRoleId": "dataAnalyst" },
      { "text": "I want every scenario to be tested and covered", "itRoleId": "qaEngineer" },
      { "text": "I want the experience to feel effortless for users", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you measure success?",
    "answers": [
      { "text": "The interface looks great and runs smoothly", "itRoleId": "frontendDeveloper" },
      { "text": "The system is stable and handles load without issues", "itRoleId": "backendDeveloper" },
      { "text": "The data shows clear results and growth", "itRoleId": "dataAnalyst" },
      { "text": "Zero critical bugs reached the users", "itRoleId": "qaEngineer" },
      { "text": "Users say the product is easy and enjoyable to use", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What kind of feedback do you find most valuable?",
    "answers": [
      { "text": "Visual feedback on design and interaction quality", "itRoleId": "frontendDeveloper" },
      { "text": "Technical feedback on architecture and code quality", "itRoleId": "backendDeveloper" },
      { "text": "Feedback backed by data and metrics", "itRoleId": "dataAnalyst" },
      { "text": "Detailed bug reports with reproduction steps", "itRoleId": "qaEngineer" },
      { "text": "Direct feedback from real users about their experience", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you deal with a tight deadline?",
    "answers": [
      { "text": "Ship a working version and polish it later", "itRoleId": "frontendDeveloper" },
      { "text": "Focus on the critical functionality and skip extras", "itRoleId": "backendDeveloper" },
      { "text": "Prioritize based on what the data says matters most", "itRoleId": "dataAnalyst" },
      { "text": "Insist on minimum necessary testing even under pressure", "itRoleId": "qaEngineer" },
      { "text": "Simplify the scope but keep the user experience intact", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What topic would you choose for a conference talk?",
    "answers": [
      { "text": "CSS animations and modern frontend techniques", "itRoleId": "frontendDeveloper" },
      { "text": "Scalable system design and microservices", "itRoleId": "backendDeveloper" },
      { "text": "Data visualization and storytelling with numbers", "itRoleId": "dataAnalyst" },
      { "text": "Building a culture of quality in software teams", "itRoleId": "qaEngineer" },
      { "text": "How good UX design increases product success", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your ideal working environment?",
    "answers": [
      { "text": "Close collaboration with designers and product team", "itRoleId": "frontendDeveloper" },
      { "text": "Challenging problems, good tooling, freedom to choose solutions", "itRoleId": "backendDeveloper" },
      { "text": "Access to data and tools for deep analysis", "itRoleId": "dataAnalyst" },
      { "text": "Clear processes and shared accountability for quality", "itRoleId": "qaEngineer" },
      { "text": "Direct access to users and freedom to experiment", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What do you think about automation?",
    "answers": [
      { "text": "Automate repetitive UI tasks with scripts and tools", "itRoleId": "frontendDeveloper" },
      { "text": "CI/CD pipelines and automated deployments are essential", "itRoleId": "backendDeveloper" },
      { "text": "Automated data pipelines save enormous amounts of time", "itRoleId": "dataAnalyst" },
      { "text": "Automated testing is one of the most valuable things in software", "itRoleId": "qaEngineer" },
      { "text": "Automation should serve users not replace human judgment", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What would you study if you had unlimited time?",
    "answers": [
      { "text": "Advanced CSS techniques and 3D web animations", "itRoleId": "frontendDeveloper" },
      { "text": "Distributed systems and advanced database optimization", "itRoleId": "backendDeveloper" },
      { "text": "Machine learning and advanced statistical methods", "itRoleId": "dataAnalyst" },
      { "text": "Performance testing and security vulnerability research", "itRoleId": "qaEngineer" },
      { "text": "Human psychology and behavioral design principles", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about presenting your work?",
    "answers": [
      { "text": "I show a live demo of the interface in the browser", "itRoleId": "frontendDeveloper" },
      { "text": "I explain the technical architecture and design decisions", "itRoleId": "backendDeveloper" },
      { "text": "I tell a story through charts and data visualizations", "itRoleId": "dataAnalyst" },
      { "text": "I walk through test results and what was fixed", "itRoleId": "qaEngineer" },
      { "text": "I show user journey maps and prototype walkthroughs", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What kind of problem do you find most interesting?",
    "answers": [
      { "text": "How to make a complex UI feel simple and smooth", "itRoleId": "frontendDeveloper" },
      { "text": "How to make a system handle ten times more load", "itRoleId": "backendDeveloper" },
      { "text": "Why users behave in unexpected ways according to the data", "itRoleId": "dataAnalyst" },
      { "text": "Why a feature works in some cases but fails in others", "itRoleId": "qaEngineer" },
      { "text": "Why users struggle with a certain step in the flow", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What do you think about user feedback?",
    "answers": [
      { "text": "It helps me understand what visual changes to make", "itRoleId": "frontendDeveloper" },
      { "text": "It helps identify performance and reliability issues", "itRoleId": "backendDeveloper" },
      { "text": "It is valuable but I trust quantitative data more", "itRoleId": "dataAnalyst" },
      { "text": "It often reveals bugs we missed in testing", "itRoleId": "qaEngineer" },
      { "text": "It is the most valuable input I can get", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your favorite part of the development process?",
    "answers": [
      { "text": "When the design finally comes to life in the browser", "itRoleId": "frontendDeveloper" },
      { "text": "When the architecture clicks and everything fits together", "itRoleId": "backendDeveloper" },
      { "text": "When the data reveals a surprising and useful insight", "itRoleId": "dataAnalyst" },
      { "text": "When all tests pass and the product is ready to ship", "itRoleId": "qaEngineer" },
      { "text": "When a user says the product is exactly what they needed", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you stay up to date with your field?",
    "answers": [
      { "text": "I follow CSS and JavaScript communities online", "itRoleId": "frontendDeveloper" },
      { "text": "I read engineering blogs from top tech companies", "itRoleId": "backendDeveloper" },
      { "text": "I follow data science and analytics communities", "itRoleId": "dataAnalyst" },
      { "text": "I follow testing communities and read QA blogs", "itRoleId": "qaEngineer" },
      { "text": "I follow design communities and attend UX events", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What would make you leave a job?",
    "answers": [
      { "text": "No attention to design quality or user interface", "itRoleId": "frontendDeveloper" },
      { "text": "No technical challenges or poor code quality culture", "itRoleId": "backendDeveloper" },
      { "text": "Decisions made without data or evidence", "itRoleId": "dataAnalyst" },
      { "text": "No culture of quality or testing", "itRoleId": "qaEngineer" },
      { "text": "No focus on users or user experience", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you approach learning new technologies?",
    "answers": [
      { "text": "I build a small project to see how it looks and feels", "itRoleId": "frontendDeveloper" },
      { "text": "I read the docs thoroughly before writing any code", "itRoleId": "backendDeveloper" },
      { "text": "I look for datasets to experiment with the new tool", "itRoleId": "dataAnalyst" },
      { "text": "I look for edge cases and limitations first", "itRoleId": "qaEngineer" },
      { "text": "I look at how it improves the user experience", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about working alone vs in a team?",
    "answers": [
      { "text": "I enjoy solo coding but love showing results to the team", "itRoleId": "frontendDeveloper" },
      { "text": "I love deep solo work on complex technical problems", "itRoleId": "backendDeveloper" },
      { "text": "I work best alone with data but share findings with everyone", "itRoleId": "dataAnalyst" },
      { "text": "I work closely with the team to define quality standards", "itRoleId": "qaEngineer" },
      { "text": "I need constant collaboration with users and team members", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your approach to security?",
    "answers": [
      { "text": "I make sure the frontend is protected from XSS attacks", "itRoleId": "frontendDeveloper" },
      { "text": "It is directly my responsibility on the server side", "itRoleId": "backendDeveloper" },
      { "text": "I make sure data is handled and stored responsibly", "itRoleId": "dataAnalyst" },
      { "text": "Security vulnerabilities should be caught during testing", "itRoleId": "qaEngineer" },
      { "text": "Users should feel safe and trust the product", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "What is your relationship with data?",
    "answers": [
      { "text": "I use it to understand how users interact with the interface", "itRoleId": "frontendDeveloper" },
      { "text": "I design systems that store and process it efficiently", "itRoleId": "backendDeveloper" },
      { "text": "It is my main tool for understanding the world", "itRoleId": "dataAnalyst" },
      { "text": "I use it to verify that the product behaves correctly", "itRoleId": "qaEngineer" },
      { "text": "I use it to understand and improve user experience", "itRoleId": "uxuiDesigner" }
    ]
  },
  {
    "text": "How do you feel about cross-functional work?",
    "answers": [
      { "text": "I love working with designers to implement their vision perfectly", "itRoleId": "frontendDeveloper" },
      { "text": "I prefer deep technical work with other engineers", "itRoleId": "backendDeveloper" },
      { "text": "I love collaborating with business teams to solve data problems", "itRoleId": "dataAnalyst" },
      { "text": "I work with everyone to make sure quality is a shared responsibility", "itRoleId": "qaEngineer" },
      { "text": "I naturally connect different teams around the user", "itRoleId": "uxuiDesigner" }
    ]
  }
];

questions.forEach((q) => {
  questionDao.create(q);
  console.log(`Created: ${q.text.substring(0, 40)}`);
});

console.log("Done!");