# Typed

A simple, local-first typewriting application built with Electron, Next.js, and better-sqlite3. No sign-up, no cloud - everything saves locally on your machine.

## Tech Stack

-   **Electron** - Desktop app framework
-   **Next.js 15** (TypeScript) - UI framework with App Router
-   **better-sqlite3** - Local SQLite database
-   **Tailwind CSS 4** - Styling
-   **IPC Communication** - Secure bridge between Electron and Next.js

## Features

-   🔒 **100% Local** - All data stored on your machine
-   📝 **Simple Typewriting** - Distraction-free writing experience
-   💾 **Auto-save** - Documents saved to local SQLite database

## Project Structure

```
typed/
├── electron/           # Electron main process
│   ├── main.ts        # App initialization & window management
│   ├── preload.ts     # IPC bridge (contextBridge)
│   └── database.ts    # SQLite operations
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React components
│   └── lib/
│       └── db-client.ts  # Client-side DB wrapper
├── types/
│   └── electron.d.ts  # TypeScript definitions
└── out/               # Next.js static export (generated)
```

## Getting Started

### Prerequisites

-   Node.js 20+ installed
-   npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Rebuild native modules for Electron (automatic via postinstall)
# Or manually: npx electron-rebuild
```

### Development

```bash
# Run in development mode (Next.js dev server + Electron)
npm run dev:electron
```

This will:

1. Compile TypeScript files in `electron/` folder
2. Start Next.js dev server on `http://localhost:3000`
3. Launch Electron window

### Available Scripts

-   `npm run dev` - Run Next.js dev server only
-   `npm run dev:electron` - Run full Electron app in dev mode
-   `npm run build` - Build Next.js for production
-   `npm run build:electron` - Compile Electron TypeScript files
-   `npm run electron:build` - Package app for distribution

## Building for Production

```bash
# Build Next.js and package Electron app
npm run electron:build
```

This creates distributable packages in the `dist/` folder for your platform (Mac/Windows/Linux).

## Database

The app uses SQLite (via better-sqlite3) to store documents locally. Database location:

-   **Mac**: `~/Library/Application Support/typed/typed.db`
-   **Windows**: `%APPDATA%/typed/typed.db`
-   **Linux**: `~/.config/typed/typed.db`

### Database Schema

```sql
CREATE TABLE documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Architecture Notes

### Electron Process Model

-   **Main Process** (`electron/main.ts`): Node.js environment, handles native APIs and database
-   **Renderer Process** (Next.js app): Browser environment, handles UI
-   **Preload Script** (`electron/preload.ts`): Secure bridge using `contextBridge`

### Why TypeScript Compilation?

Electron can't run TypeScript directly. The build process:

1. TypeScript files (`.ts`) in `electron/` are compiled to JavaScript (`.js`)
2. Electron loads the compiled `.js` files
3. `.js` files are gitignored (generated artifacts)

## Development Tips

-   DevTools auto-open in development (can be disabled in `electron/main.ts`)
-   Hot reload works for Next.js changes
-   Electron process needs restart for `electron/` changes
-   Database file persists between runs

## License

MIT
