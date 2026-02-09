# ABHAY – Anonymous Complaint & Justice Support Platform

**ABHAY** is a privacy-first anonymous complaint portal designed to empower individuals to report misconduct, harassment, corruption, or injustice without fear of identity exposure.

---

## 🚀 The Mission

Many people hesitate to raise genuine complaints because revealing their identity can lead to social, academic, or professional retaliation. **ABHAY** addresses this critical issue by ensuring that no personal identity information is collected, stored, or displayed at any stage of the complaint process.

The system operates without user registration or login and relies on secure session-based anonymity. Each complaint is processed through a multi-layer assessment system that provides decision-support tools to help authorized reviewers evaluate reports responsibly.

---

## 🛠 Core Architecture

### 1. Absolute Anonymity
- **No Registration**: Operates entirely via session-based anonymity.
- **Client-Side Security**: Data is encrypted locally before being sharded and broadcast.
- **DID Cloaking**: Uses temporary Decentralized Identifiers (DIDs) to represent users without tracking real-world data.

### 2. AI-Powered Decision Support (Genkit)
- **Content Quality Analysis**: Distills complex evidence into readable summaries.
- **Expert Frameworks**: Analyzes legal, ethical, and societal implications to assist human investigators.
- **Pattern Correlation**: Identifies systemic issues across multiple anonymous reports.
- **Voice Intelligence**: Converts AI insights into audio for accessibility.

### 3. Immutable Transparency
- **Decentralized Storage**: Reports are sharded across IPFS nodes (Simulated).
- **Public Ledger**: Content CIDs are anchored to a public ledger for immutable proof-of-existence.

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: Version 18 or higher.
- **NPM** or **Bun** package manager.
- **Gemini API Key**: Required for Genkit AI features. Get one at [Google AI Studio](https://aistudio.google.com/).

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Techhackontime999/A-B-H-A-Y.git
   cd abhay
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

5. **Start Genkit Developer UI (Optional)**
   To inspect and debug AI flows:
   ```bash
   npm run genkit:dev
   ```

---

## 💻 Development Workflow

### Project Structure
- `src/app`: Next.js App Router (Pages & Layouts).
- `src/components/ui`: ShadCN UI components.
- `src/components/veritas`: Core protocol components (Editor, Wallet, DAO).
- `src/ai/flows`: Genkit AI logic (Summaries, Expert Analysis, Anti-spam).
- `src/hooks`: Custom React hooks for state and UI management.

### Adding New AI Flows
1. Define the input/output schema in `src/ai/flows/`.
2. Register the flow in `src/ai/dev.ts`.
3. Export a server function for the UI to call.

---

## 🤖 AI Multi-Layer Assessment

ABHAY uses several specialized Genkit flows to maintain platform integrity:
- **`summarize-report`**: Converts raw evidence into public-friendly insights.
- **`expert-analysis`**: Provides investigators with legal and ethical context.
- **`prevent-duplicate-reports`**: Flags potential spam or correlated misconduct.
- **`voice-summary`**: Uses Gemini TTS to generate audio insights.

---

## 🤝 Collaboration & Contribution

We welcome contributors focused on privacy, human rights, and decentralized technology.

1. **Fork & Branch**: Create a feature branch from `main`.
2. **Code Standards**: Ensure TypeScript types are strictly followed. Use ShadCN for UI consistency.
3. **Security First**: Never add logging that tracks IP addresses or user agents.
4. **Pull Requests**: Provide a clear description of the feature or fix.

---

## 🛡 Ethical Safeguards
- **No Judging**: The AI provides frameworks, not final verdicts.
- **Abuse Detection**: AI-powered similarity checks prevent duplicate spam.
- **Transparency**: All administrative "anchor" events are logged on the public transparency ledger.
- **Accountability**: Reviewers must stake reputation, ensuring "skin in the game."

---

*ABHAY is designed as a supportive bridge between truth-seekers and justice systems, offering a safe channel for fearless expression while maintaining legal and ethical accountability.*