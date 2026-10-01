# Short Intense Movements | Editorial AI Research Web App

> A luxury editorial science publication and interactive RAG research assistant built with **React (Vite)**, inspired by the warm aesthetic of **WeNatal** and **Kinfolk**.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20RAG-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

## Overview

This web application presents peer-reviewed longevity and physical activity research (*Cell Reports Medicine* & *Nature Medicine*) through an editorial publication design. Readers can explore scientific findings and interact with an integrated **Study Research Assistant** dialog that queries a grounded RAG backend in real time.

---

## Features & Design Highlights

- **WeNatal-Inspired Aesthetic:** Deep forest green palette (`#11241C`), warm cream linen background (`#FAF8F5`), and classic editorial typography (`Fraunces` serif + `Plus Jakarta Sans`).
- **Rich Editorial Photography:** High-end architectural morning-stairs hero photography and laboratory section imagery.
- **Interactive Study Dossiers:** "Ask Study Assistant" callouts throughout the article that launch the AI research dialog pre-loaded with specific study queries.
- **Source Citation Transparency:** The chat modal displays verified ChromaDB text excerpts used to ground each response.
- **Live Health Status:** Displays real-time API connection status.

---

## Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or yarn
- Running [Short Intense Movements Backend API](https://github.com/Chengetanaim/short-intense-movements-api)

### 2. Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chengetanaim/short-intense-movements-frontend.git
   cd short-intense-movements-frontend
