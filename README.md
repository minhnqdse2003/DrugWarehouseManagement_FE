- # Project Documentation: `drugwarehousemanagement-fe`
- ## 1. Project Overview

  This repository contains the front-end application for Drug Warehouse Management. It is built using React, TypeScript, and a suite of modern development tools to ensure maintainability and efficiency.

- ## 2. Project Structure
- ### Key Scripts
- **`dev`**: Starts the development server using Vite.
- **`build`**: Compiles TypeScript code and builds the production-ready application.
- **`lint`**: Runs ESLint to check for code quality issues.
- **`preview`**: Launches the built application for previewing.
- **`cypress`**: Opens the Cypress end-to-end testing tool.
- ### Main Dependencies
- **React**: The core UI library.
- **TypeScript**: Superset of JavaScript for type safety.
- **@tanstack/react-query**: For data fetching and state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Zod**: A TypeScript-first schema validation library.
- **clsx**: Utility for conditionally joining class names.
- **react-hook-form**: Library for handling form validations.
- **lucide-react**: React components for Lucide icons.
- **@radix-ui/react**: Components for building accessible UIs.
- ### Development Dependencies
- **ESLint**: Linting tool for maintaining code quality.
- **Prettier**: Code formatter to ensure consistent style.
- **Cypress**: End-to-end testing framework.
- **Commitizen**: Tool for writing conventional commits.
- **Vite**: Build tool for modern web development.
- **Webpack**: Module bundler used internally for some tasks.
- **Tailwind CSS plugins**: Used for animations and merging utility classes.
- ## 3. Setup Instructions
- ### Prerequisites

  Ensure that you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** (v7 or higher)
- ### Installation

  Clone the repository and run the following commands:

  ```
  git clone https://github.com/minhnqdse2003/DrugWarehouseManagement_FE.git
  cd drugwarehousemanagement-fe
  npm install
  ```

- ### Running the Development Server

  ```
  npm run dev
  ```

- ### Building the Project

  ```
  npm run build
  ```

- ### Previewing the Build

  ```
  npm run preview
  ```

- ### Linting the Code

  ```
  npm run lint
  ```

- ### Running Tests

  ```
  npm run cypress
  ```

- ## 4. Commitizen Integration
- ### What is Commitizen?

  Commitizen is a tool for writing consistent commit messages in a conventional format. This format helps to create a standardized changelog.

- ### Setup

  Commitizen has been configured to use `cz-conventional-changelog`. The configuration is set up in `package.json`:

  ```
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
  ```

- ### Usage

  When you want to commit your changes, use the following command:

  ```
  npx git-cz
  ```

  or

  ```
  git commit
  ```

  This will trigger Commitizen to guide you through the commit process, asking for the type of change, a short description, and additional details as needed.

- ## 5. Linting and Formatting
- ### ESLint

  ESLint helps maintain code quality and consistency. The ESLint configuration extends `plugin:storybook/recommended` for better integration with Storybook:

  ```
  "eslintConfig": {
    "extends": [
      "plugin:storybook/recommended"
    ]
  }
  ```

- ### Prettier Integration

  Prettier ensures code is formatted consistently. The `eslint-config-prettier` package is used to disable ESLint rules that might conflict with Prettier.

- ## 6. Testing
- ### Cypress

  Cypress is configured for end-to-end testing. To run the tests, use:

  ```
  npm run cypress
  ```

- ## 7. Important Note for Developers
- **Ensure you use `npx git-cz` for commits** to maintain a consistent commit format.
- **Run `npm run lint` frequently** to check for any code quality issues.
- **Check the `.gitignore` file** to ensure sensitive or unnecessary files are not committed to the repository.

---
