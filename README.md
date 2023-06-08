# T4SG Starter Project

- [T4SG Starter Project](#t4sg-starter-project)
  - [Introduction](#introduction)
  - [Setup](#setup)
    - [Clone repository](#clone-repository)
    - [Package installation](#package-installation)
    - [Supabase Connection Setup](#supabase-connection-setup)
    - [Supabase CLI Setup](#supabase-cli-setup)
    - [Run the webapp](#run-the-webapp)
    - [(Recommended) Configure git message template](#recommended-configure-git-message-template)
  - [Stack references](#stack-references)
    - [Typescript](#typescript)
    - [Components and Styling: `shadcn/ui`, Radix, and Tailwind CSS](#components-and-styling-shadcnui-radix-and-tailwind-css)
    - [Next.js](#nextjs)
      - [Tips for learning:](#tips-for-learning)
    - [Supabase](#supabase)
      - [Troubleshooting the Supabase CLI](#troubleshooting-the-supabase-cli)
    - [Environment variables](#environment-variables)
  - [Development tools](#development-tools)
    - [Code formatting and linting tools](#code-formatting-and-linting-tools)
      - [`eslint`](#eslint)
      - [`prettier`](#prettier)
      - [EditorConfig](#editorconfig)
      - [`husky` and `lint-staged`](#husky-and-lint-staged)
      - [VSCode-specific settings](#vscode-specific-settings)
    - [VSCode Extensions](#vscode-extensions)
      - [`eslint`, `prettier`, `editorconfig`, and `prisma`](#eslint-prettier-editorconfig-and-prisma)
      - [BetterComments](#bettercomments)
      - [Live Share](#live-share)
  - [Deployment guides](#deployment-guides)
  - [Additional stack options (for SSWEs)](#additional-stack-options-for-sswes)
    - [Component libraries](#component-libraries)
    - [User Auth](#user-auth)
    - [Data fetching and other backend tools](#data-fetching-and-other-backend-tools)
    - [Databases](#databases)
    - [Realtime options](#realtime-options)
    - [The T3 Stack](#the-t3-stack)

---

## Introduction

This project is a versatile starter project for T4SG web development projects. The stack and development tools have been chosen carefully to enable teams to develop rapidly on a variety of projects and build apps that are more easily maintainable by clients post-handoff.

The project uses Next.js, a React-based framework with significant optimizations. The frontend uses `shadcn/ui`, an open-source library of UI components that are built with Radix primitives and styled with Tailwind CSS. The backend uses Supabase, an open-source Firebase alternative. The entire stack is written in Typescript to provide comprehensive typesafety across both frontend and backend.

---

## Setup

#### Clone repository

`cd` into a desired destination folder, then clone the repo (preferably using SSH):

```shell
git clone git@github.com:hcs-t4sg/starter-project-2023-v2.git
```

#### Package installation

1. Open the project folder in VSCode. You can do so with the following terminal shortcut:

   ```bash
   # Navigate into the project directory
   cd starter-project-2023-v2.git

   # Open in VSCode
   code .

   # If the second error gives you an error, you probably don't have the VS Code 'code' keyword added to your PATH variable. Follow this tutorial:
   # https://www.freecodecamp.org/news/how-to-open-visual-studio-code-from-your-terminal/#:~:text=Once%20your%20terminal%20is%20open,Then%20hit%20enter%20.&text=Once%20you%20hit%20enter%20%2C%20VS%20Code%20will%20now%20open.
   ```

2. You should see a popup in the bottom right prompting you to install recommended extensions. Please install these, they'll be helpful for code formatting and developing the webapp. You can also view the recommended extensions in the extensions sidebar (`cmd + shift + X`.)

3. You will also get a prompt to use the workspace's Typescript version; accept it. If you don't get one, make sure you're using the workspace's Typescript version by pressing `cmd` + `shift` + `P` and typing "typescript", selecting `Typescript: Select Typescript Version`, and selecting `Use Workspace Version`.

4. Open a terminal in the project folder by dragging up from the bottom of the code window or by going to `Terminal > New Terminal` in the menu bar.

5. Run: `npm install` (`npm i` for short)

   - If you get something like "command not found", you might not have `npm` installed.

- If successful you should see something like:

  ```bash
  added 414 packages, and audited 415 packages in 13s

  149 packages are looking for funding
  run `npm fund` for details

  found 0 vulnerabilities
  ```

#### Supabase Connection Setup

1. Visit the Supabase website, create an account (or login if you already have one), and create a new project. You will be prompted to set a **Database Password; remember it**. Wait for your database provisioning and setup to finish.

2. Duplicate the `.env.example` file (into your root project directory) and rename to `.env`. Inside `.env`, set the following variables according to your Supabase project settings:

   - `NEXT_PUBLIC_SUPABASE_URL`: From Project Settings > API > Project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: From Project Settings > API > Project API Keys > `anon` `public`.
   - `SECRET_SUPABASE_CONNECTION_STRING`: From Project Settings > Database > Connection String > Nodejs. Replace `[YOUR-PASSWORD]` with your database password.

   The final result should look something like this:

   ```shell
   # Some other comments above
   NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijklmnopqrst.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="longlonglongstring"
   SECRET_SUPABASE_CONNECTION_STRING="postgresql://postgres:YourDatabasePasswordHere@db.abcdefghijklmnopqrst.supabase.co:5432/postgres"
   ```

   You should not share these keys publically, especially the `SECRET_SUPABASE_CONNECTION_STRING`. Note that this project uses a package from the popular [T3 stack](https://create.t3.gg/) to validate and provide typesafety to environment variables in `env.mjs` (more on this below). When using these environment variables in your code, you can import them from `env.mjs`. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used in the codebase itself and are thus included in this file. `SECRET_SUPABASE_CONNECTION_STRING` is used only in a helper script in `package.json` and not in the app itself, so it doesn't need to be validated.

#### Supabase CLI Setup

1. The Supabase CLI will be helpful for a number of functions, such as running Supabase locally and generating Typescript types from our database schema. For the CLI to work, you will have to install [Docker](https://www.docker.com). During the installation process, if Docker prompts you to run an `osascript`, make sure to run it.

2. If you've done `npm install`, the CLI should already be installed. You can test it by running `npx supabase`, which will give you a version (`Supabase CLI 1.64.8`) and a list of commands.

3. We preconfigured a command (in `package.json`) for you to easily generate type definitions in `lib-schema.ts` from your remote Supabase database schema. If you've created tables in Supabase, you can test this command now. Otherwise, make sure to run it frequently in development whenever you edit your database schema.

   ```ts
   // Introspects your remote Supabase database and generates types in lib/schema.ts
   npm run types
   ```

   > Notes:
   >
   > - You need to have `SECRET_SUPABASE_CONNECTION_STRING` configured in `.env` in order for the above command to work.
   > - If you want to generate type definitions for a local Supabase project, you can run the full version of the command (read more about it [here](https://supabase.com/docs/guides/api/rest/generating-types)) or edit the `npm` script in `package.json`.

More instructions on troubleshooting potential errors are below.

#### Run the webapp

You can run the webapp with the following terminal command:

```bash
# Start the webapp in development mode (usually what you do in development). Exit with Ctrl + C
npm run dev
```

#### (Recommended) Configure git message template

This project also includes a template for writing good git commit messages. You can configure this template (affects only the project repo) using the following terminal command:

```bash
# Set git commit message to the .gitmessage file (this only affects git in the project repo, not globally)
git config commit.template .gitmessage
```

In future commits, you can run `git commit` (with no attached message or `-m` tag) to open the commit message template in VSCode. Fill in the blanks, save the file (`cmd + S`), and close the file (`cmd + W`) to finish the commit.

---

## Stack references

This section provides a short description and important commands related to each component of the stack. The T3 guides to each component are also linked, which should be helpful especially for understanding how the different components synchronize together and how some of the boilerplate code in the app works.

### Typescript

Typescript is a strongly-typed programming language based on Javascript. It integrates closely with your editor and provides type inference and static type checking to catch errors/bugs early-on and provide a great developer experience. Furthermore, it is a superset of Javascript and can be transpiled to any version of Javascript to run in browsers.

Typescript applies type inference to your files automatically, but you can also manually run it with the following terminal command:

```bash
# Type check all typescript files (--noEmit disables generation of a report file, which is not needed)
npx tsc --noEmit
```

> **More references**
>
> - [T3 Guide to Typescript](https://create.t3.gg/en/usage/typescript)
> - [Official Typescript documentation](https://www.typescriptlang.org/)

### Components and Styling: `shadcn/ui`, Radix, and Tailwind CSS

The project uses UI components from `shadcn/ui`, an open-source library of UI components prebuilt with Radix and Tailwind CSS.

Radix is what developers refer to as a "headless" (or "behavior") UI library. It controls how components **work** (i.e. dropdowns, buttons, checkboxes) and provides a set of unstyled, functional, accessible components (aka **primitives**) to which further styling can be applied. To change how our components **look**, we style them with Tailwind CSS, which is a CSS framework that allows us to rapidly apply CSS styling to our components by adding html classes.

`shadcn/ui` provides a set of UI components prebuilt with Radix and TailwindCSS that can be copy-pasted into our project or added with its CLI (with the terminal command `npx shadcn-ui add`). These components are not "imported" like they are in other component libraries like MUI; they are simply additional code added to our project, which gives us full control over the styling and functionality of each component if necessary. The result is a component library that looks nice with minimal effort but is also easily customizable! Individual `shadcn/ui` components can be customized in `components/ui`, and global theming can be customized in `app/globals.css`.

> **More references**
>
> - [Official `shadcn/ui` documentation](https://ui.shadcn.com)
> - [Radix documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
> - [Official Tailwind CSS documentation](https://tailwindcss.com/docs/installation)
> - [Tailwind CSS cheat sheet](https://nerdcave.com/tailwind-cheat-sheet)
> - [Tailwind in 100 seconds](https://www.youtube.com/watch?v=mr15Xzb1Ook)
> - [Reusing styles and creating abstractions when using Tailwind](https://tailwindcss.com/docs/reusing-styles)

### Next.js

Next.js is a React-based framework that offers significant optimizations with relatively small learning curve. Notably, it provides a powerful page routing system, ability to create built-in API routes without a separate backend, and a variety of options for fetching data and rendering content on the server.

To run the webapp in development mode, use the following terminal command:

```bash
# Start the webapp in development mode (usually what you do in development). Exit with Ctrl + C
npm run dev
```

To create and run a production build of the webapp (great for testing before deployment), use the following terminal command:

```bash
# Create a production build
npm run build

# Start the production build
npm start
```

#### Tips for learning:

Note that React 18 introduced server components, which form a new paradigm for conceptualizing and constructing webapps. This project uses the Next.js `app/` router, which was introduced in Next.js 13 and uses React server components. Server components are very new and can take a while to wrap one's head around (especially for people already accustomed to React's old "mental model"). However, React and Next.js development is shifting towards this new paradigm, just like how we shifted from using class components and lifecycle methods to using functional components and hooks in React a few years ago. So we at T4SG Eng want to move along with the rest of the developer community and ensure that we're learning/practicing the most relevant skills!

If you are new to React, check out the React documentation first before touching Next.js. The Next.js docs have a great [React Essentials](https://nextjs.org/docs/getting-started/react-essentials) section. When browsing documentation or looking at tutorials for Next.js, try to first look for examples explicitly referencing Next 13 or the `app` router, not the `pages` router (which is the traditional way of building Next.js webapps). However, this **does not** mean that `pages`-related content is obsolete! The `app` router uses a balance of server components and client components (more on this in the docs), and client components have the same functionality as components in the `pages` router have always had.

> **More references**
>
> - [Official Next.js documentation](https://nextjs.org)
> - [Official React documentation](https://react.dev)
> - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
> - [Next.js GitHub repository](https://github.com/vercel/next.js/) - good place to ask for help!
> - [Example Next.js project](https://github.com/shadcn/taxonomy) built by `shadcn`!

### Supabase

The backend uses [Supabase](https://supabase.com), an open-source Firebase alternative. (Both are BaaS platforms: backend as a service.) Supabase provides all of Firebase's most important functionality and more:

- **Database:** Built on Postgres, a relational database which has better structure than Firebase's Firestore NoSQL database and is open-source (thus more easily maintainable by clients).
- **Realtime:** Analogous to Firestore's `onSnapshot` realtime listeners, allowing you to listen to changes in the **database** (aka Postgres Changes). Supabase also offers Broadcast and Presence, which are other forms of realtime that provide ultra-fast synchronization for features like chatrooms or online games.
- **User authentication:** Like Firebase, a simple auth system with all social providers and user permissions for database access.
- **File storage:** Like Firebase, cloud storage for any kind of digital content.
- **Edge functions:** Server-side Typescript functions that run on Supabase without needing to set up a backend server. Analogous to Firebase Cloud Functions, which are not available on the free tier!
- **Local development:** Ability to easily create locally-hosted Supabase projects with tracked migration history (super useful when working in teams)
- **Typesafety:** The Supabase CLI (command line interface) can be used to generate Typescript types based on your database schema, allowing for typesafe database queries.

> **More references**
>
> - [Official Supabase documentation](https://supabase.com/docs)
> - [Example project](https://github.com/supabase/auth-helpers/tree/main/examples/nextjs) using Supabase auth with Next.js app router
> - [Another example project](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

##### Troubleshooting the Supabase CLI

Whenever you're running the CLI (such as running the type-generating command above) you might get an error:

```bash
Cannot connect to the Docker daemon at unix:///Users/matthewsu/.docker/run/docker.sock. Is the docker daemon running?
```

Make sure you have Docker running, and start a new terminal and retry the command. If that still doesn't work, you may need to manually point your terminal to Docker in the terminal configuration. Example instructions for using a `zsh` terminal on MacOS:

1. Find your `.zshrc` file. Instructions for finding it are [here](https://osxdaily.com/2021/11/18/where-the-zshrc-file-is-located-on-mac/#:~:text=zshrc%20file%20on%20a%20Mac,customizations%20to%20the%20z%20shell.); note that it is a hidden file, so you may have to press `cmd` + `shift` + `.` in Finder in order to see your hidden files.

2. Open `.zshrc` with notepad and add this line:

   ```bash
   export DOCKER_HOST=unix://"$HOME/.docker/run/docker.sock"
   ```

3. Save and close `.zshrc`, then start a new terminal (make sure you're using a `zsh` terminal and not a `bash` terminal) and retry the command.

Feel free to reach out for help!

### Environment variables

The project uses a package from the popular [T3 stack](https://create.t3.gg/) to validate and provide typesafety to environment variables, so the process of adding an environment variable (for use on the client or server) is slightly more involved than just updating `.env.local`. Instructions for managing environment variables are [here](https://create.t3.gg/en/usage/env-variables).

---

## Development tools

This section provides information on various tools this project uses to streamline the development process.

### Code formatting and linting tools

This starter project uses a [combination](https://stackoverflow.com/questions/48363647/editorconfig-vs-eslint-vs-prettier-is-it-worthwhile-to-use-them-all) of code formatting and linting tools to catch errors and enforce consistent code styling across all collaborators working on the project. Documentation and a quick description of each tool is given below. The configuration files for each tool have also been commented with additional information/references.

The preset configurations should work great out of the box, but feel free to customize them to your liking.

#### [`eslint`](https://eslint.org)

A [linting](<https://en.wikipedia.org/wiki/Lint_(software)>) tool that statically analyzes our code to detect and fix issues with code quality (like unused variables, residual console statements, etc). `eslint` is configured to run on save and before making a `git commit` (see below), but you can also run it manually with the following terminal commands:

```bash
# Easiest way to lint all files in the project.
npm run lint
```

```bash
# Lint a specific file (or all files by using "."). Add the --fix tag to have eslint correct errors that are automatically fixable.
npx eslint [filepath or .] --fix
```

If you need to exclude certain folders/files from the ESLint rules, you can create a `.eslintignore` file.

If you want to modify the `eslint` rules, you can edit the `rules` array in `.eslintrc.cjs`. If adding a new rule, make sure that it doesn't conflict with `prettier` by running the following command ([more info here](https://github.com/prettier/eslint-config-prettier#cli-helper-tool)):

```bash
# Test eslint-config-prettier against some file in the codebase, for example index.tsx. You usually only need to run this for one file
npx eslint-config-prettier src/index.tsx
```

Config file is in `.eslintrc.cjs`.

#### [`prettier`](https://prettier.io)

Formats outputted code to a consistent, opinionated style **after** it has been written. `prettier` is configured to run on save and before making a git commit (see below), but you can also run it manually with the following terminal commands:

```bash
# Check a specific file (or all files by using ".") for formatting errors and give a human-friendly summary of all errors.
npx prettier [filepath or .] --check

# Fix all formatting errors in-place for a specific file (or all files by using ".").
npx prettier [filepath or .] --write
```

Note that `prettier` and `eslint` have [overlapping functionalities](https://www.robinwieruch.de/prettier-eslint/), so to prevent conflict between the two we also add the following two packages:

- [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier#cli-helper-tool): Disables all `eslint` rules that would conflict with `prettier`
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier): Integrates `prettier` rules into `eslint` rules

Finally, our `prettier` configuration also includes a [plugin](https://github.com/trivago/prettier-plugin-sort-imports) for sorting import declarations.

If you need to exclude certain folders/files from the `prettier` formatting, you can create a `.prettierignore` file. The `prettier` config file is in `.prettierrc.cjs`.

#### [EditorConfig](https://editorconfig.org)

Standardizes some settings (only in the project workspace) across different editors (Sublime, VSCode, etc) to apply formatting rules **before** writing code (e.g. hitting `tab` leaves two spaces). Config file is in `.editorconfig`.

#### [`husky`](https://github.com/typicode/husky) and [`lint-staged`](https://github.com/okonet/lint-staged)

`husky` sets a pre-commit hooks that runs typechecking (with `tsc`), `eslint`, and `prettier` checking on our code before making a `git commit`, to prevent us from committing code with poor quality or formatting. `lint-staged` saves time by setting typechecking, `eslint`, and `prettier` to run only on our staged files. This keeps from having to check the entire codebase for every commit. Husky settings are in `.husky/` folder. `lint-staged` config is in `.lintstagedrc.cjs`.

#### VSCode-specific settings

The project contains workspace-specific VSCode settings in `.vscode/settings.json`. These settings (which only apply when inside the project workspace) set the editor to:

- Format with `prettier` and lint with `eslint` on save
- Use `prettier` as the default formatter
- Prompt the user to use the codebase's version of Typescript for Intellisense (preventing errors arising from differing Typescript versions)

### VSCode Extensions

#### `eslint`, `prettier`, `editorconfig`, and `prisma`

These add in-editor support (syntax highlighting, error checking, etc.) for their respective tools. The recommended workspace extensions are configured in `.vscode/extensions.json`.

#### [BetterComments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

Allows you to categorize your comments into color-coded Alerts, Queries, TODOs, and Highlights for more human-friendly annotations.

#### [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)

Enables you to collaboratively edit and debug with others in real time. Think Google Docs functionality but for your codebase.

---

## Deployment guides

Deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker). The easiest way to deploy is with Vercel, which was created by the creators of Next.js!

---

## Additional stack options (for SSWEs)

There's no one-size-fits-all solution to web development. This project is meant to give you a highly flexible platform for starting a webapp, so feel free to swap out any of the stack components or add additional ones! Here are some recommendations below.

### Component libraries

- [Daisy UI](https://daisyui.com) and [Flowbite](https://flowbite.com): Component libraries built on Tailwind CSS.
- [Tanstack](https://tanstack.com) provides some great libraries for rendering charts, tables, and lists

### User Auth

- [NextAuth.js](https://next-auth.js.org)
- [Clerk](https://clerk.com)

### Data fetching and other backend tools

- [SWR](https://swr.vercel.app): React hooks for data fetching. Recommended by Next.js!
- [Tanstack Query](https://tanstack.com/query/latest): React hooks for data fetching. Provides more features than SWR but is also a bit more complex
- [Apollo Client](https://www.apollographql.com/docs/react/): A state management library for querying GraphQL APIs
- [tRPC](https://trpc.io): Allows us to build and consume typesafe APIs from our Next.js backend (API routes) without schemas or code generation
- [Prisma](https://www.prisma.io): A Typescript ORM ([object-relational mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)) that allows you to query and manage your database in a typesafe manner

### Testing frameworks

You [may not](https://www.youtube.com/watch?v=ZGKGb109-I4) need to write tests for your project, but if you do, check out [Cypress](https://www.cypress.io)! It's a great end-to-end testing framework that is visual and easy to work with.

### Databases

Here is a great [guide](https://www.youtube.com/watch?v=cC6HFd1zcbo) on picking databases.

One of the big questions to ask when choosing a database is: "Do I need easy realtime functionality?" Specifically, realtime is the ability for your webapp to be notified of changes to the database such that you can "subscribe" to it. Note that this is **NOT** just the ability for your app to update its data without a page refresh; we can easily get the client to update/refetch its data whenever the **user** makes a change, or intermittently poll a data source to check for updates. Realtime functionality provides, for instance, a way for a user's client to update its data without refresh when a change happens outside of the user's client (say, some other user makes a change).

- [Firestore/Firebase](Firestore/Firebase): Similar to Supabase. Its main draw is that it's very popular, has great documentation, and has a lot of other features. The downside is that the Firestore database is propietary (thus very hard to migrate off of) and non-relational (which presents challenges with typesafety and data consistency). If you're going to use Firestore, you should probably also check out [Fireschema](https://github.com/yarnaimo/fireschema) or [Typesaurus](https://github.com/kossnocorp/typesaurus), which will help address the typesafety issues with native Firestore.
- [Pocketbase](https://pocketbase.io): An open-source backend that (like Supabase and Firebase) provides a realtime database, auth, and file storage. It doesn't have as expansive features as Supabase/Firebase, but it's super lightweight, stores data locally, and is easily self hostable! If you know for sure you won't need the more advanced features of Supabase/Firebase (ex: edge functions) this is a great Supabase alternative.
- [Planetscale](https://planetscale.com): Relational database platform that allows you to manage your database history with a flow similar to `git` branching. It supposedly integrates really well with tRPC and Prisma in the T3 stack (below). However, no easy realtime functionality like with Supabase/Firebase!

Realtime functionality is accomplished really easily with Supabase and Firebase, but it can still be accomplished with other databases that don't have built-in realtime functionality. You will need to use [webhooks](https://zapier.com/blog/what-are-webhooks/#). This may require a dedicated backend for your app (such as through [Express](https://expressjs.com)), or you can use one of the other options for realtime functionality (options below).

### Realtime options

- [Redis](https://redis.com)
- [Kafka](https://kafka.apache.org)
- [Soketi](https://docs.soketi.app)
- [Hop](https://docs.hop.io/getting-started/introduction)
- Dude why do all the realtime platforms have such strange names lol

### The T3 Stack

The [T3 stack](https://create.t3.gg) is a popular stack for web development that focuses heavily on full-staack typesafety and providing a great developer experience. However, as of early June 2023, the T3 stack still uses the Next.js `pages` router (the traditional paradigm for Next.js development) and may [take some time](https://github.com/t3-oss/create-t3-app/issues/1364) to migrate over to the new `app` router. It's also worth noting that Firebase and Supabase don't integrate super well into Prisma, a key component of the stack, based on anecdotal knowledge from the Supabase Discord and this incredibly complicated [Medium article](https://medium.com/@ngoctranfire/using-prisma-with-supabase-row-level-security-and-multi-schema-7c53418adba3). If you're okay with using the `pages` router and don't need realtime, then the T3 stack might be an excellent option! Just note that the learning curve is a bit high at first because you have to get used to tRPC and Prisma.
