<p align="center">
  <img src="https://user-images.githubusercontent.com/28964599/213861233-43a76814-7993-46e7-89fe-8dc05cc1f37f.png">
</p>

### Table of contents

---

[Prerequisites](#prerequisites)  
[Tech stack](#tech-stack)  
[How to run and build the project](#how-to-run-and-build-the-project)    
[Adding dependencies](#adding-dependencies)  
[MVP](#mvp-minimum-viable-product)  
[After-MVP](#after-mvp-features)  

---

## Prerequisites

- Node v16  
- Yarn  
- ESLint & Prettier plugins  
- Make ([Guide for Windows users](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows))  

## Tech stack

**Frontend**: `TypeScript`, `React.js v18`, `Next.js v13 (with app directory)`, `ChakraUI`  
**Backend**: `TypeScript`, `Nest.js`  
**Infra/Providers**: `AWS`, `Auth0`, `Vercel`  
**Other**: `Pulumi`, `Docker`, `Turborepo`  

## How to run and build the project

Clone the project, go to the project directory and run this command:

```sh
make ci && make dev
```
To verify that the project is running go to `http://localhost:3000` and `http://localhost:3333` and see if something happens

## Adding dependencies

Always use yarn workspaces to add new dependencies to any package/app.  
If you want it to be in `devDependencies` use `-D` option after `add` keyword  

```sh
## adding `someTestDependencyPleaseReplaceWithYours` to a frontend application.
yarn workspace @opencourser/web add someTestDependencyPleaseReplaceWithYours

## adding `someTestDependencyPleaseReplaceWithYours` to a backend application
yarn workspace @opencourser/api add someTestDependencyPleaseReplaceWithYours
```

In cases where you want to install a global dependency for all packages (i.e. new TypeScript version or utility), use this command at the root level:
```sh
yarn add -W someTestDependencyPleaseReplaceWithYours
```

## MVP (minimum viable product)

The list of features we expect to have to release MVP: 
- [ ] Seamless CI/CD pipelines,
- [ ] IaC based on Vercel, Auth0 & AWS,
- [ ] Video streaming,
- [ ] Payments with PayPal/Stripe (paid tickets to access the course),
- [ ] User accounts for Consumer and Creator
- [ ] Basic Consumer dashboard
- [ ] Basic CMS for Creators (as a dashboard)
  - [ ] Ability to CRUD public and private courses
  - [ ] Ability to CRUD a video-based, content-based or mixed Topic 
  - [ ] Ability to CRUD transcriptions for a video
  - [ ] Basic customer management
- [ ] Fully integrated Auth0 authn & authz
- [ ] Perfect a11y & keyboard-only users experience
- [ ] Green Web Vitals on homepage and public courses pages
- [ ] Bandwidth optimization - video compression, etc
- [ ] SEO - rss, og, sitemaps, meaningful HTML tags, etc.

## After-MVP Features
- [ ] Optional community comments under a Topic
- [ ] Ability to include Quizes in a Topic (or just another type of Topic)
- [ ] MDX support in CMS (through sandboxes or plugins ?)
- [ ] Roadmaps/Paths (similar to pluralsight)
- [ ] much more...

