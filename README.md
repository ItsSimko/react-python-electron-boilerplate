# react-python-electron-boilerplate

A cross-platform desktop application built with **Electron**, **React**, and **Python (Flask)**. This application combines a modern React frontend with a Python backend, all packaged into a single Electron desktop application.

## Project Structure

```
physiolens/
├── build/                  # PyInstaller build artifacts
├── dist/                   # Production build output (React + Python)
├── scripts/                # Build scripts
├── src/
│   ├── backend/            # Python Flask backend
│   ├── main/               # Electron main process
│   └── renderer/           # React frontend (Vite)
├── forge.config.cjs        # Electron Forge configuration
├── package.json            # Node.js dependencies and scripts
├── pyproject.toml          # Python dependencies (managed by uv)
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration for React
└── uv.lock                 # Python dependency lock file
```

##  Architecture Overview

PhysioLens uses a **three-layer architecture**:

| Layer | Technology | Description |
|-------|------------|-------------|
| **Main Process** | Electron + TypeScript | Manages application lifecycle, spawns Python backend |
| **Renderer Process** | React + Vite + TypeScript | User interface, communicates with backend via HTTP |
| **Backend** | Python + Flask | REST API server for data processing |

### How It Works

1. **Electron Main Process** (`src/main/main.ts`)
   - Creates the application window
   - In development: connects to Vite dev server, spins up Python backend in UV.
   - In production: loads the bundled React app and spawns the Python executable

2. **React Frontend** (`src/renderer/`)
   - Modern React 18 application built with Vite
   - Communicates with the Python backend via Axios HTTP requests

3. **Python Backend** (`src/backend/main.py`)
   - Flask REST API server running on `http://localhost:5000`
   - In production: packaged as a standalone executable using PyInstaller

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v22 or higher) - [Download](https://nodejs.org/)
- **Yarn** (classic) - Install via `npm install -g yarn`
- **Python** (v3.10) - [Download](https://www.python.org/)
- **uv** (Python package manager) - [Install](https://docs.astral.sh/uv/getting-started/installation/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SET-Capstone-Group2/Client-App.git
cd Client-App
```

### 2. Install Node.js Dependencies

```bash
yarn install
```

### 3. Install Python Dependencies

```bash
uv sync
```

This will create a virtual environment and install all Python dependencies defined in `pyproject.toml`.

## Development

### Start Development Mode

Run all services (Electron, React dev server, and Python backend) simultaneously:

```bash
yarn dev
```

This script will:
1. Start the **Vite dev server** (React) on an available port (default: 5173)
2. Start the **Electron** application pointing to the dev server
3. Start the **Python Flask** backend on port 5000

All processes are managed together and will be cleaned up when you close the Electron window.

### Run Individual Services

If you need to run services separately:

```bash
# React dev server only
yarn start:react

# Electron only (requires React dev server running)
yarn start:electron

# OR using uv
uv run python src/backend/main.py
```

## Building for Production

### Build Python Backend

Compiles the Python backend into a standalone executable using PyInstaller:

```bash
yarn build:python
```

Output: `dist/main.exe` (Windows)

### Build React Frontend

Bundles the React application for production:

```bash
yarn build:react
```

Output: `dist/` folder with optimized static files

## Packaging & Distribution

PhysioLens uses **Electron Forge** for packaging and distribution.

### Package the Application

Creates an unpacked application in the `out/` directory:

```bash
yarn forge:package
```

### Create Distributable

Creates a distributable ZIP file:

```bash
yarn forge:make
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development mode (all services (python, react, electron)) |
| `yarn lint` | Run ESLint on the codebase |
| `yarn preview` | Preview the production React build |
| `yarn start:react` | Start Vite dev server only |
| `yarn build:react` | Build React for production |
| `yarn build:python` | Build Python backend executable |
| `yarn forge:start` | Start via Electron Forge |
| `yarn forge:package` | Package the application |
| `yarn forge:make` | Create distributable |
