# Dynamic Config DOM Modifier - Frontend (Vue.js)

This is the frontend part of the **Vision Bridge Senior Software Developer Assignment**.  
It is a Vue.js application that fetches configuration data from a backend API and dynamically modifies the DOM of a sample page based on the received configuration.

## 🚀 Features

- Fetches configuration data (stored as YAML on backend, served as JSON)
- Supports actions: `remove`, `replace`, `insert`, `alter`
- Configuration actions can be previewed and applied to a sample DOM
- Handles multiple configurations
- Basic UI with a table to display available configs
- Docker support included

## 🧠 How It Works

1. The frontend fetches all available configurations via:
2. Each configuration contains a list of actions like:
- Remove elements by selector
- Replace elements
- Insert new elements
- Alter existing text

3. You can apply one or all configs to the sample HTML page.

## 🖼️ UI Overview

- Home page shows:
- Config list with ID and action count
- A text area to view raw JSON of selected config
- "Apply Selected" and "Apply All" buttons
- Result is applied directly on the sample DOM area

## 📦 Project Setup

```bash
    npm install
    npm run dev