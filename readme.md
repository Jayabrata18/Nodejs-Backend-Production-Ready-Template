### To use this repository as a base use this command

   ```bash
   git clone https://github.com/Jayabrata18/ts-nodejs-backend-production-template/tree/second-branch
   ```





### 1. Husky Setup

Husky is used to manage Git hooks, and Lint-Staged ensures that only staged files are linted before a commit. Follow these steps to set up Husky and Lint-Staged:

1. Install Husky and Lint-Staged as development dependencies:
   ```bash
   npm install husky lint-staged -D
   ```
2.	Initialize Husky in your project:
   ```bash
   npx husky init
   ```
3. After initialization, you can configure Husky hooks in the .husky/ directory. 

  
### 2. Commitlint Setup

Commitlint helps ensure that commit messages follow a consistent style, making your commit history more readable and maintainable. Follow these steps to set up Commitlint:

1. Install Commitlint CLI and the conventional config as development dependencies:
   ```bash
   npm install @commitlint/cli @commitlint/config-conventional -D  
   ```
2.	Create a commit-msg hook file in the .husky/ directory and add the following script to it:
   ```bash
   npx --no-install commitlint --edit "$1"
   ```

3.	Create a commitlint.config.js file in the root directory of your project. This file should include the configuration for Commitlint. For example I have Implemented:
   ```json
   // commitlint.config.js
   module.exports = {
    extends: ["@commitlint/cli", "@commitlint/config-conventional"],
      rules: {
        "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
        "subject-case": [0, "always", "sentence-case"],
      }
    }
   ```
 Configuration Breakdown:

- **`extends`**:
  - This property extends the configuration from two sources:
    1. **`@commitlint/cli`**: The core Commitlint CLI.
    2. **`@commitlint/config-conventional`**: A preset that follows the conventional commit format (e.g., **`feat`**, **`fix`**, etc.).

- **`rules`**:
  - **`type-enum`**:
    - Specifies the allowed types of commit messages.
    - The rule is configured with three parameters: **`[2, "always", ["array_of_allowed_types"]]`**.
    - **`2`**: Indicates the rule is an error if not followed (1 would be a warning).
    - **`"always"`**: Enforces the rule at all times.
    - The array **`["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]`** lists the allowed types:
      - **`feat`**: A new feature.
      - **`fix`**: A bug fix.
      - **`docs`**: Documentation changes.
      - **`style`**: Code style changes (formatting, etc.).
      - **`refactor`**: Code changes that neither fix a bug nor add a feature.
      - **`perf`**: Performance improvements.
      - **`test`**: Adding or updating tests.
      - **`build`**: Changes that affect the build system or external dependencies.
      - **`ci`**: Continuous Integration related changes.
      - **`chore`**: Routine tasks that don’t modify code (e.g., updating dependencies).
      - **`revert`**: Reverting a previous commit.

  - **`subject-case`**:
    - Controls the casing of the commit message subject.
    - The rule is configured with three parameters: **`[0, "always", "sentence-case"]`**.
    - **`0`**: Disables the rule (does not enforce any specific case).
    - **`"always"`**: (Ignored here since the rule is disabled).
    - **`"sentence-case"`**: Suggests the commit subject should be in sentence case, but since the rule is disabled (**`0`**), this is not enforced.

This configuration ensures that your commit messages adhere to a consistent format, making them more understandable and easier to read in the project’s history.

### 3. ESLint Setup

ESLint is a tool for identifying and fixing problems in JavaScript and TypeScript code. Below are the steps to set up ESLint in your project:

1. Install ESLint, TypeScript ESLint, and necessary types as development dependencies:

   ```bash
   npm install --save-dev @eslint/js @types/eslint__js typescript-eslint
   ```
2.	Create an eslint.config.mjs file in the root directory of your project with the following content:

   ```javascript
   // eslint.config.mjs
  import eslint from 'eslint/js';
  import tseslint from 'typescript-eslint';
  import eslintConfigPrettier from 'eslint-config-prettier';

  export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    files: ["**/*.ts"],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommendedTypeChecked,
        eslintConfigPrettier
    ],
    rules: {
        'no-console': 'error',
        'no-useless-catch': 0,
        quotes: ["error", "double", { allowTemplateLiterals:      true }],
    }
   });
   ```
3.	Run ESLint across your project to check for any issues:

	```bash
	npx eslint .
	```
4.	Add a pre-commit script to automatically lint staged files before committing:
	- In the .husky/pre-commit file, add:

    ```bash
    npx lint-staged
    ```
5.	Add the following configuration to your package.json to ensure only staged .ts files are linted:

    ```bash
    "lint-staged": {
      "*.ts": [
        "npm run lint:fix"
      ]
    }
  ```
  ### Configuration Breakdown:


- **`parserOptions`**:
    - **`project: true`**: Enables project-based linting, meaning it will use the **`tsconfig.json`** settings.
    - **`tsconfigRootDir: import.meta.dirname`**: Specifies the root directory of your TypeScript configuration, using the directory of the current module.

- **`files`**:
    - Specifies that ESLint should only target **`"**/*.ts"`** files, meaning it will lint all TypeScript files in your project.

- **`extends`**:
    - **`eslint.configs.recommended`**: Extends the recommended ESLint rules.
    - **`...tseslint.configs.recommendedTypeChecked`**: Spreads the recommended TypeScript rules that include type-checking.
    - **`eslintConfigPrettier`**: Extends the Prettier configuration to ensure there are no conflicts between ESLint and Prettier.

- **`rules`**:
    - **`'no-console': 'error'`**: Disallows the use of **`console`** statements in the code. If used, it will throw an error.
    - **`'no-useless-catch': 0`**: Disables the rule that prevents unnecessary **`catch`** blocks.
    - **`quotes: ["error", "double", { allowTemplateLiterals: true }]`**:
        - Enforces the use of **double quotes** for strings.
        - **`allowTemplateLiterals: true`**: Allows the use of template literals even if single or double quotes are enforced.

This configuration ensures that your TypeScript code follows best practices and maintains consistency in formatting, while also integrating smoothly with Prettier for code formatting.

### 4. Prettier Setup

Prettier is an opinionated code formatter that helps maintain consistent code style across your project. Follow these steps to set up Prettier in your project:

1. **Install Prettier and ESLint Prettier Configuration**:

   ```bash
   npm install --save-dev --save-exact prettier
   npm install --save-dev eslint-config-prettier
   ```
2.	Add Prettier Scripts to package.json:
To integrate Prettier with your project’s build and linting scripts, add the following scripts to your package.json:

   ```json
    "format:check": "prettier . --check",
    "format:fix": "prettier . --fix",
    ```
3. Add in package.json

    ```json
   "lint-staged": {
    "*.ts": [
      "npm run format:fix"
    ]
  },
    ```
4. Configure Prettier:
Create a .prettierrc file in the root directory of your project with the following configuration:

   ```json
   {
    "trailingComma": "none",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": false,
    "doubleQuote": true,
    "bracketSameLine": true,
    "printWidth": 150,
    "singleAttributePerLine": true,
    "endOfLine": "crlf"
   }
   ```
   ### Configuration Options:

- **`trailingComma`**: `"none"`
  - **Description**: Controls the use of trailing commas.
  - **Value**: `"none"` - No trailing commas will be added.

- **`tabWidth`**: `4`
  - **Description**: Specifies the number of spaces per indentation level.
  - **Value**: `4` - Each tab will be equivalent to 4 spaces.

- **`semi`**: `false`
  - **Description**: Determines whether to add a semicolon at the end of statements.
  - **Value**: `false` - Semicolons will not be used.

- **`singleQuote`**: `false`
  - **Description**: Enforces the use of single quotes instead of double quotes.
  - **Value**: `false` - Double quotes will be used for strings.

- **`doubleQuote`**: `true`
  - **Description**: Determines whether to use double quotes for strings.
  - **Value**: `true` - Double quotes will be used.

- **`bracketSameLine`**: `true`
  - **Description**: Controls whether to put the `>` of a multi-line JSX element at the end of the last line or on its own line.
  - **Value**: `true` - The closing bracket of JSX elements will be on the same line as the last prop.

- **`printWidth`**: `150`
  - **Description**: Specifies the line length where Prettier will try to wrap code.
  - **Value**: `150` - Lines will wrap at 150 characters.

- **`singleAttributePerLine`**: `true`
  - **Description**: Ensures that each attribute in JSX or HTML elements is on its own line.
  - **Value**: `true` - Each attribute will be placed on a new line.

- **`endOfLine`**: `"crlf"`
  - **Description**: Defines the end-of-line character.
  - **Value**: `"crlf"` - Use carriage return and line feed (`\r\n`) for line breaks.

This configuration ensures that your code is formatted consistently according to the specified rules, helping to maintain readability and uniformity across your project.



### 5. TypeScript Setup

To set up TypeScript for your project, follow these steps:

1.  Install TypeScript:

   ```bash
   npm install ts --save-dev
   ```
2.	Initialize TypeScript Configuration:

   ```bash
   npx tsc --init
   ```
3.	Install Type Definitions:

   ```bash
   npm install --save-dev @types/node
   ```
4.	Install ts-node for Running TypeScript Files:

   ```bash
   npm install --save-dev ts-node
   ```
5.	Configure nodemon for Development:
Create a nodemon.json file for development purposes with the following configuration:

   ```json
   {
  "ext": ".ts",
  "ignore": ["dist", "node_modules"]
  }
  ```
-  **`"ext": ".ts"`**
	-	**Description**: Specifies the file extensions that nodemon will watch for changes.
-	**`"ignore": ["dist", "node_modules"]`**
	-	**Description**: Directories to be ignored by nodemon during file watching.
	### TypeScript Configuration Options Explained

- **`target`: `"es5"`**
  - **Description**: Specifies the ECMAScript version for the compiled JavaScript. In this case, the code will be transpiled to ECMAScript 5, ensuring compatibility with older environments.

- **`module`: `"commonjs"`**
  - **Description**: Defines the module system for code generation. Here, CommonJS is used, which is typical for Node.js environments and ensures that `require` and `module.exports` are used for module imports and exports.

- **`outDir`: `"./dist"`**
  - **Description**: Redirects the output of the compiled JavaScript files to the `./dist` directory. This helps in organizing the build output separately from the source files.

- **`rootDir`: `"./src"`**
  - **Description**: Specifies the root directory of the input files. This setting helps in controlling the output directory structure by maintaining the relative paths of files in the `./src` directory when outputting to `./dist`.

- **`removeComments`: `true`**
  - **Description**: Omits comments from the emitted JavaScript files, resulting in cleaner output that is often preferred for production environments.

- **`strict`: `true`**
  - **Description**: Enables all strict type-checking options in TypeScript, promoting more robust and error-free code by enforcing strict rules.

- **`noImplicitAny`: `true`**
  - **Description**: Raises an error when an expression or declaration implicitly has an `any` type, forcing explicit type definitions and reducing potential runtime errors.

- **`strictNullChecks`: `true`**
  - **Description**: Ensures that `null` and `undefined` are not assignable to other types unless explicitly checked, helping to prevent common bugs related to null values.

- **`strictFunctionTypes`: `true`**
  - **Description**: Enforces stricter checking of function types, ensuring that function signatures are checked more rigorously, which helps to catch type-related errors.

- **`strictPropertyInitialization`: `true`**
  - **Description**: Ensures that all class properties are properly initialized either in the constructor or with default values, preventing potential issues with uninitialized properties.

- **`alwaysStrict`: `true`**
  - **Description**: Parses each source file in strict mode and includes `"use strict"` in the emitted JavaScript, enforcing strict mode rules in all files.

- **`noUnusedLocals`: `true`**
  - **Description**: Reports errors for local variables that are declared but not used anywhere in the code, helping to clean up unnecessary code.

- **`noUnusedParameters`: `true`**
  - **Description**: Reports errors for function parameters that are not used within the function, which aids in maintaining clean and concise function signatures.

- **`noImplicitReturns`: `true`**
  - **Description**: Ensures that all code paths in a function return a value, reducing the likelihood of functions that unintentionally return `undefined`.

- **`esModuleInterop`: `true`**
  - **Description**: Enables compatibility between CommonJS and ES Modules, allowing for default imports from modules that may not have a default export, improving interoperability.

- **`sourceMap`: `true`**
  - **Description**: Generates source maps (`.map` files) that allow debugging tools to map compiled JavaScript back to the original TypeScript source files, making debugging easier.

- **`skipLibCheck`: `true`**
  - **Description**: Skips type checking of declaration files (`.d.ts` files), which can speed up the compilation process and is often used when type checking library files is not necessary.

- **`forceConsistentCasingInFileNames`: `true`**
  - **Description**: Ensures that file references are case-sensitive, preventing issues related to inconsistently-cased file names and improving cross-platform compatibility.
		
	
### 6. Steps to Configure dotenv-flow and Update Scripts

1. Install these packages 
   
   ```bash
   npm install dotenv-flow cross-env
   ```

2.	Create your environment variable files:
	1.	.env.development for the development environment.
	2.	.env.production for the production environment.
   
    ```json
        ENV=development_or_production
        PORT=your_port_number
        SERVER_URL=your_server_url
        DATABASE_URL=your_database_url
   ```
3. Update the dev and start scripts in your package.json:

   ```json
        {
        "scripts": {
            "dev": "cross-env NODE_ENV=development nodemon src/server.ts",
            "start": "cross-env NODE_ENV=production node dist/server.js"
                }
        }
   ```
   
4. Add the config.ts file to manage the environment variables in your project:

    ```javascript
        import dotenvFlow from "dotenv-flow";

        dotenvFlow.config();

        export default {
            ENV: process.env.ENV,
            PORT: process.env.PORT,
            SERVER_URL: process.env.SERVER_URL,
            DATABASE_URL: process.env.DATABASE_URL,
        };
    ```
### 7.  Error Handling and Logging


1.	Install Winston:

    ```bash
    npm install winston
    ```
    

2.	Create a Logger:
Set up a logger using Winston to handle various levels of logs, such as info, error, and debug. Ensure that log files are stored outside the src directory to avoid clutter.   

### 8. Other Necessary Items

1.	Install Source Map Support:
	
   ```bash
   npm install source-map-support
   npm install @types/source-map-support -D
   ```
2.	Enable Source Maps:
In your tsconfig.json, enable source maps by setting:

   ```json
     {
      "compilerOptions": {
        "sourceMap": true
         }
     }
   ```
   
3.	Integrate Source Map Support in Logger:
In the logger file, add the following: 

   ```javascript
   import * as sourceMapSupport from "source-map-support";
   
   sourceMapSupport.install();
   ```    
4. Colorful Terminal Output

   ```
   npm install colorette
   ```
   
5. MongoDB Connection, Logs & Migrations
 
   ```
   npm install mongoose winston-mongodb ts-migrate-mongoose
   ```
6. Health Check, Security Headers, CORS, and Rate Limiting

   ```bash
   npm install cors helmet
   npm install rate-limiter-flexible
   ```
   
   
    
    













In this markdown documentation:
- **Code blocks** are used for commands and JSON configurations.
- **Descriptions** explain each configuration option and step.
- **Bullet points** and headings organize the content for clarity.





