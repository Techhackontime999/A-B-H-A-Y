# A-B-H-A-Y Protocol: Decentralized Truth & Transparency

**A-B-H-A-Y** (Anonymous Blockchain-Hardened Audit Yield) is a premium, end-to-end encrypted reporting protocol designed for whistleblowers, investigative journalists, and transparency advocates. It leverages decentralized storage and AI-powered intelligence to ensure that truth remains immutable and accessible.

---

## 🚀 Quick Start: Installation

A-B-H-A-Y is built with the **Next.js App Router**, **Tailwind CSS**, and **Genkit AI**.

### Prerequisites
- Node.js 18+ 
- A Gemini API Key (for Genkit AI features)

### Local Setup
1. **Clone the repository** (or download the prototype files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Create a `.env` file in the root and add your Gemini API Key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) to view the protocol in action.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- **AI Engine**: [Genkit AI](https://js.genkit.dev/) (powered by Google Gemini)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context (Wallet & Protocol state)

---

## 🧠 How it Works (The Architecture)

A-B-H-A-Y operates on a four-layer architecture to ensure maximum safety and transparency:

### 1. Identity Layer (DID)
Instead of accounts, users generate a **Decentralized Identifier (DID)** via a cryptographic wallet simulation. This cloaks the user's real identity while providing a unique anchor for reputation.

### 2. Encryption Layer (The Vault)
When a report is composed, it is encrypted client-side using **AES-256**. The protocol ensures that raw, unencrypted data never leaves the user's browser until it is sharded.

### 3. Storage & Proof Layer (IPFS + Blockchain)
- **IPFS**: Data is sharded and distributed across decentralized nodes, generating a unique Content Identifier (CID).
- **Blockchain**: The CID is anchored to a public ledger with a transaction hash, providing a timestamped "Proof of Existence" that is immutable.

### 4. Intelligence Layer (Genkit AI)
A-B-H-A-Y uses **Genkit** to perform three critical automated tasks:
- **Duplicate Detection**: Prevents the registry from being spammed with repetitive information.
- **AI Summarization**: Distills complex evidence into readable summaries for the general public.
- **Expert Analysis**: Provides deep-dive insights into the legal and ethical implications of a report.
- **Voice Synthesis**: Converts summaries into high-quality audio for better accessibility.

---

## 📖 User Guide

### For Whistleblowers
1. **Connect**: Generate your DID via the "Generate DID" button.
2. **Compose**: Use the **Evidence Vault** to write your report.
3. **Preview**: Check the "Secure Preview" to see the encrypted state.
4. **Broadcast**: Submit the report. It will step through encryption, signing, and anchoring in real-time.

### For Verifiers (The DAO)
1. **Stake**: Go to the **Verify** page and stake your reputation to join the council.
2. **Audit**: Review the "Pending" queue of reports.
3. **Vote**: Stake your reputation on whether a report is authentic or misinformation.
4. **Rank Up**: Correct votes increase your reputation, moving you up the **Elite Leaderboard**.

---

## 📂 Project Structure

```text
src/
├── ai/                # Genkit AI Flows & Prompts
│   ├── flows/         # Logical AI pipelines (Summaries, Analysis, TTS)
│   └── genkit.ts      # Genkit initialization
├── app/               # Next.js App Router (Pages & Layouts)
│   ├── reports/       # The Truth Registry
│   ├── submit/        # Secure Editor
│   ├── transparency/  # Public Ledger & Network Analytics
│   └── verify/        # DAO Governance Dashboard
├── components/        # UI Components
│   ├── ui/            # ShadCN atomic components
│   ├── layout/        # Navbar & Footer
│   └── veritas/       # Feature-specific protocol components
└── lib/               # Utilities & Global State
```

---

## 🛡 Ethical Guidelines
A-B-H-A-Y is a tool for transparency. We encourage users to:
- Verify information before voting.
- Never use the platform for harassment or dox individuals.
- Use a VPN/Tor for maximum anonymity during the broadcast phase.

---

*This project is a high-fidelity prototype built within Firebase Studio.*