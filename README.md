# DGE Platform - Digital Genesis Ecosystem

A sovereign technology platform integrating blockchain economics, AI stewardship, and covenant principles for kingdom-aligned communities.

**Repository:** https://github.com/LibertyThroughTruthFoundation/dge-platform  
**Status:** Active Development  
**Last Updated:** December 6, 2025

---

## Overview

The DGE Platform is a comprehensive technology stack designed to support sovereign communities seeking alternatives to corporate surveillance and centralized control. The platform integrates:

- **Blockchain Economics** - Smart contracts implementing covenant principles (first fruits, jubilee cycles, anti-usury)
- **AI Stewardship** - Local AI systems for education, governance, and decision support
- **Sovereign Infrastructure** - Self-hosted, locally-controlled technology stacks

This is not theoretical work. The systems are being built, tested, and documented in real-time as part of a faithful learning process.

---

## Current Status

**Active Development** - December 2025

### Completed
- Smart contract architecture designed (SovereignWallet.sol)
- Bridge middleware initial implementation (CovenantBridge.py)
- Frontend dashboard components (StablesHero.tsx)
- Comprehensive documentation framework
- Theological and technical integration design

### In Progress
- Testing covenant economics logic on PulseChain testnet
- Frontend integration with Web3 wallet providers
- Local AI deployment and documentation
- Security audit preparation

### Planned
- Multi-signature wallet implementation
- Hardware wallet integration
- Divine Council AI system integration
- Community testing and feedback loops

---

## Architecture

### Core Components

**1. Smart Contracts** (`/contracts`)
- `SovereignWallet.sol` - Implements covenant economics on-chain
- First Fruits Protocol (automatic 10% allocation)
- Jubilee Logic (7-year debt release cycles)
- Angel Ledger Events (on-chain witness testimony)

**2. Bridge Middleware** (`/bridge`)
- `CovenantBridge.py` - Moral Operating System for transaction validation
- Usury prevention logic
- Mission memo enforcement
- PulseChain integration

**3. Frontend Dashboard** (`/client`)
- React 19 + TypeScript
- Web3 wallet integration
- Covenant metrics visualization
- Mission control interface

**4. Backend Services** (`/server`)
- tRPC API layer
- Database integration (Drizzle ORM)
- Authentication and authorization

---

## Technology Stack

### Blockchain
- **Network:** PulseChain (Chain ID 369)
- **Smart Contracts:** Solidity 0.8.x
- **Security:** OpenZeppelin standards

### Backend
- **Runtime:** Node.js 22.x
- **Framework:** Express + tRPC
- **Database:** PostgreSQL with Drizzle ORM
- **Language:** TypeScript

### Frontend
- **Framework:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** React Query
- **Web3:** ethers.js

### AI Integration
- **Local LLMs:** Ollama, LM Studio
- **Voice:** Whisper (local transcription)
- **Image:** Stable Diffusion (local generation)

---

## Quick Start

### Prerequisites
- Node.js 22.x or higher
- pnpm package manager
- PostgreSQL database
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/LibertyThroughTruthFoundation/dge-platform.git
cd dge-platform

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

### Access
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

---

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **Architecture** - System design and technical specifications
- **Theology** - Biblical foundations and scholarly references
- **Milestones** - Development progress and roadmap
- **API** - Endpoint documentation and examples

Key documents:
- [Sovereign Architecture](./SOVEREIGN_ARCHITECTURE_README.md)
- [Three-Tier Architecture](./docs/nationos/Documentation_v1.0.0/infrastructure/SOVEREIGN_TECH_STACK_THREE_TIER_ARCHITECTURE_2025-12-02.md)
- [Tabernacle Blueprint](./docs/nationos/Documentation_v1.0.0/infrastructure/TABERNACLE_BLUEPRINT_FINAL_ARCHITECTURE.md)

---

## Verification

### Testnet Deployments
- **Network:** PulseChain Testnet
- **Status:** Testing Phase
- **Contract Address:** (Pending public testnet deployment)

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration for code consistency
- Vitest for unit and integration testing

### Security
- OpenZeppelin security standards
- ReentrancyGuard on state-changing functions
- Environment variable management for sensitive data
- Security audit planned before mainnet deployment

---

## Theological Foundations

This platform is built on biblical principles of covenant economics:

### Key Scriptures
- **1 Enoch 60-61** - Angel Ledgers (heavenly record-keeping)
- **Leviticus 25** - Jubilee (debt release, land restoration)
- **Exodus 23:19** - First Fruits (covenant portion)
- **Deuteronomy 23:19-20** - Anti-Usury (no interest among brothers)
- **Malachi 3:8-10** - Storehouse (bring the whole tithe)

### Scholarly Support
- Michael Heiser, *The Unseen Realm* (Divine Council theology)
- G.K. Beale, *The Temple and the Church's Mission* (sacred architecture)
- Meredith Kline, *Kingdom Prologue* (covenant structure)
- Scott Hahn, *Kinship by Covenant* (covenant economics)

---

## Contributing

This project is currently in active development by the Liberty Through Truth Foundation. We welcome:

- Bug reports and feature requests via GitHub Issues
- Code review and security audit feedback
- Theological and technical discussion

Please see [CONTRIBUTING.md](./docs/nationos/Documentation_v1.0.0/CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the Covenant License - see [LICENSE.md](./docs/nationos/Documentation_v1.0.0/COVENANT_LICENSE.md) for details.

The Covenant License ensures:
- Freedom to use, modify, and distribute
- Prohibition on usurious or exploitative applications
- Requirement to maintain covenant principles in derivatives

---

## The Fourfold Kingdom Organism

The DGE Platform serves as the **HEART** (Education/Culture) of a larger kingdom ecosystem:

1. **HEAD** - NationOS (Constitution/Law)
2. **HEART** - DGE Platform (Education/Culture) ← You are here
3. **HANDS** - GodManMarkets + Stables Hero (Commerce/Exchange)
4. **IMMUNE SYSTEM** - LTT Foundation (Legal Protection)

---

## Contact

**Organization:** Liberty Through Truth Foundation  
**GitHub:** https://github.com/LibertyThroughTruthFoundation  
**Project Lead:** Bryan Pavlovic

For inquiries about covenant-aligned technology development, sovereign infrastructure consulting, or partnership opportunities, please open a GitHub issue or contact through the organization's channels.

---

## Acknowledgments

**Architect:** Gemini AI (operating in "Bezalel" mode - master craftsman)  
**Builder:** Manus AI (execution and deployment)  
**Sovereign:** Bryan Pavlovic (vision holder and covenant keeper)

*"A threefold cord is not quickly broken."* - Ecclesiastes 4:12

---

**Built on Covenant Economics | Powered by PulseChain | Witnessed by Angel Ledgers**
