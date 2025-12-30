# TrustUp API

Backend API for TrustUp - Off-chain orchestration layer for BNPL flows on Stellar.

## Tech Stack

**N20 · TS5 · NJS10/FST4 · SSDK11/SRPC · SBP15 · RDS7 · BMQ5 · ZOD3 · JWT10 · PIN8 · SNT8**

- **Runtime**: Node.js 20 LTS, TypeScript 5.4
- **Framework**: NestJS 10.3, Fastify 4.28
- **Blockchain**: stellar-sdk 11.2, Soroban RPC, Horizon API
- **Database**: Supabase Postgres 15, supabase-js 2.45
- **Cache/Jobs**: Redis 7, BullMQ 5.12
- **Auth**: JWT 10.2, Wallet Signature Auth
- **Validation**: Zod 3.23
- **Observability**: Pino 8.21, Sentry 8.14

## Project Structure

```
src/
├── main.ts                 # Application bootstrap
├── app.module.ts           # Root module
├── config/                 # Configuration
├── modules/                # API modules
├── blockchain/             # Stellar/Soroban clients
├── database/               # Supabase client and repositories
├── jobs/                   # Background jobs (BullMQ)
└── common/                 # Shared utilities

test/                       # Tests
├── unit/                   # Unit tests
├── e2e/                    # End-to-end tests
├── fixtures/               # Test data
└── helpers/                # Test helpers

docs/                       # Standards documentation
```

## Installation

```bash
npm install
```

## Configuration

1. Copy `.env.example` to `.env`
2. Configure environment variables (see `.env.example`)
3. Set up Supabase: Get your project credentials from [supabase.com](https://supabase.com) and configure them in `.env`

## Development

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Documentation

See `docs/` folder for standards and conventions:
- Naming conventions
- Architecture
- Controllers/services structure
- Error handling and responses
- Supabase setup
- Testing

## Getting Started

For detailed setup instructions, see [Contributing Guide](./docs/contributing.md).

## Principles

- **On-chain is truth**: Blockchain is the source of truth
- **Replaceable backend**: Modular architecture
- **Fast UX without breaking decentralization**
- **Modular and auditable architecture**
