HACKRU WINNING PROJECT

Sex Education Chatbot with WebSockets and Gamified Learning
🤝 Empowering Consent and Communication through Education

Project Overview
This project aims to address gaps in sexual education through an interactive, gamified chatbot. Built using React on the frontend and FastAPI on the backend, the chatbot integrates Retrieval-Augmented Generation (RAG) for accurate, contextually relevant responses. The project supports real-time chat functionality between students and counselors using WebSockets and incorporates role-based access to different features. It also offers gamified learning modules to engage students in sexual health topics.

Features
AI-Powered Chatbot with RAG Pipeline:
The chatbot answers sexual health questions, powered by an OpenAI model enhanced with RAG to provide fact-based responses from curated sources.

WebSockets for Real-Time Communication:
Users can connect in real-time as students or counselors. Based on the email used during login, the system identifies the role and assigns the appropriate user ID.

Gamified Learning Modules:
Students can engage with interactive, gamified learning modules about sexual education topics such as STDs, contraception, and consent.

Role-Based Access Control:
The application supports two user roles: students and counselors. Based on their role, users are directed to different functionalities:

Students: Ask questions, complete quizzes, and access educational content.
Counselors: View and respond to student queries through a dedicated chat interface.
Message Persistence with Timestamps:
User prompts, chatbot responses, and all messages between students and counselors are stored in a SQLite database, along with timestamps, to ensure data continuity across sessions.

Tech Stack
Frontend: React
Backend: FastAPI with WebSockets for real-time communication
Database: SQLite using SQLAlchemy for ORM
AI Model: OpenAI API with RAG (Retrieval-Augmented Generation) for knowledge-backed responses
Deployment: Dockerized and deployed on Azure (planned)

Project Structure
.
├── node_modules
├── public
├── RAG                    # RAG Pipeline for enhanced responses
├── src                    # React source files
├── websocketapi           # WebSocket backend API
├── .eslintrc.json
├── .gitignore
├── .npmrc
├── .prettierrc.json
├── CHANGELOG.md
├── genezio.yaml           # YAML file for deployment with Genezio
├── ISSUE_TEMPLATE.md
├── jsconfig.json
├── LICENSE.md
├── package-lock.json
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation

Get started
git clone https://github.com/Prabhat-Shastri/hacker-frontend
cd websocketapi

Activate Pythor Virtual Environment
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload

cd ..

Repeat for RAGAPI
cd RAG

create a .env file with contents
OPENAI_API_KEY=your-openai-api-key

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8001

cd ..

Now, run the React app
cd src
npm install
npm start