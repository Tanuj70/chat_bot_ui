# TejAI - Intelligent ChatBot UI

TejAI is a modern, responsive AI chatbot interface built with Next.js 15, Tailwind CSS, and React. It supports both standalone local testing (in-memory fallback mode) and full MongoDB + DeepSeek AI API integration.

## Features
- **Modern UI**: Clean chat interface inspired by next-generation AI platforms.
- **TejAI Branding**: Custom logo icon, wordmark, and UI styling.
- **Standalone Local Mode**: Works out of the box without requiring external authentication or active MongoDB connection.
- **Flexible AI Integration**: Works with DeepSeek API / OpenAI compatible endpoints, with fallback simulation for local testing.

## Getting Started

1. Clone the repository and install dependencies:
```bash
npm install
```

2. (Optional) Configure environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/tejai
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
