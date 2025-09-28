Create a visualiser designed for llms to use that shows a list of routes to take from one point to another including which stops to get on and off at, which bus/tram to take between change stops, etc. The way to have it llm-ready will be having the import be a json and having no actual route data in the app and having everything in a json file for importing. Include the prompt in a tab of the app along with a ts schema(also in the ai prompt given)

First plan the json schema then create scripts to organise the data because the kmz file does have the points on the route of the bus/tram line but you need to make sure it is in the proper order. I want to be able to combine the TPG_LIGNES.kmz(THe route of the buses/trams) with TPG_ARRETS.json(ALl of the tpg stops and which lines stop there) so there is just one file to download. After you have done all these setup things, you can start working on the app itself. Think of at least 3 more setup things to do or more if needed.

For the kmz file, it should be possible to get the proper route because I imported the kmz file I gave to you into google earth pro and it found the correct route(maybe 1-5 metres off sometimes but more than good enough) but it didn't have the correct order. You can use TPG_ARRETS.json

The first script you need to make is the one that turns TPG_ARRETS.csv into TPG_ARRETS.json because the csv is the original.

give an example actually. don't have coords for the stops; just for the start and end. All I want to see is something like this. You can plan the json schema so that the app uses tpg_arrets.json and TPG_LIGNES.kmz.

The data that you want to use from the files i gave you should be compiled into one or two files using a script and they can be used to make the actual path and the imported json can only have the stops along the way.

I want javascript scripts and create the scripts in a scripts folder in the project folder(Use better-t-stack to create the app so we can have a bunch of useful things. Here is my starting command, modify it as you see fit but we don't need to save any routes, just visualise them `pnpm create better-t-stack@latest route-visualiser --frontend next --backend next --runtime node --api trpc --auth none --payments none --database none --orm none --db-setup none --package-manager pnpm --no-git --web-deploy none --server-deploy none --install --addons pwa ruler tauri turborepo --examples none`). start with the scripts section. Use a proper libary for converting the swiss coords. Don't create the full app, just these helper scripts. Make sure to test the scripts. Delete main project if you actually did create the main app

Use all the tools you have to help with the task

The git repo is https://github.com/rohanod/route-visualiser. You can clone it to see the other data

## UPDATES:
I ran the better t stack command and here was the output:

```
(base) ➜  route-visualiser git:(main) ✗ pnpm create better-t-stack@latest route-visualiser --frontend next --backend next --runtime node --api trpc --auth none --payments none --database none --orm none --db-setup none --package-manager pnpm --no-git --web-deploy none --server-deploy none --install --addons pwa ruler tauri turborepo --examples none

 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 
┌  Creating a new Better-T-Stack project
│
●  Using these pre-selected options:
│
│  Frontend: next
│  Backend: next
│  Runtime: node
│  API: trpc
│  Database: none
│  ORM: none
│  Auth: none
│  Payments: none
│  Addons: pwa, ruler, tauri, turborepo
│  Examples: none
│  Git Init: No
│  Package Manager: pnpm
│  Install Dependencies: Yes
│  Database Setup: none
│  Web Deployment: none
│  Server Deployment: none
│
│
│
◇  Tauri desktop app support configured successfully!
│
●  Setting up Ruler...
│
◇  Select AI assistants for Ruler
│  16 items selected
│
◇  Applied rules with Ruler
│
◆  Project template successfully scaffolded!
│
◇  Dependencies installed successfully

 ╭─────────────────────────────────────────────────────────────────╮
 │                                                                 │
 │  Next steps                                                     │
 │  1. cd route-visualiser                                         │
 │  2. pnpm run dev                                                │
 │  Your project will be available at:                             │
 │  • Frontend: http://localhost:3001                              │
 │  • Backend API: http://localhost:3000                           │
 │                                                                 │
 │  Desktop app with Tauri:                                        │
 │  • Start desktop app: cd apps/web && pnpm run desktop:dev       │
 │  • Build desktop app: cd apps/web && pnpm run desktop:build     │
 │  NOTE: Tauri requires Rust and platform-specific dependencies.  │
 │     See: https://v2.tauri.app/start/prerequisites/              │
 │                                                                 │
 │  Update all dependencies:                                       │
 │  pnpm dlx taze -r                                               │
 │                                                                 │
 │  Like Better-T-Stack? Please consider giving us a star          │
 │     on GitHub:                                                  │
 │  https://github.com/AmanVarshney01/create-better-t-stack        │
 │                                                                 │
 ╰─────────────────────────────────────────────────────────────────╯

│
◆  You can reproduce this setup with the following command:
│  pnpm create better-t-stack@latest route-visualiser --frontend next --backend next --runtime node --database none --orm none --api trpc --auth none --payments none --addons pwa ruler tauri turborepo --examples none --db-setup none --web-deploy none --server-deploy none --no-git --package-manager pnpm --install
│
└  Project created successfully in 18.30 seconds!

(base) ➜  route-visualiser git:(main) ✗ 
```
I want you to first clone the repo to find the data and examples then put the scripts in there. When giving me the result, just zip up the git repo for me to download and don't try to push anything

In existing-scripts/, there are some previously used scripts. You can reuse them to help make the new one

Priority:
0. Ask any clarifying questions you have
1. Create the scripts to combine the data
2. Create the full app features with embeded data to make it look like the examples
3. Create the json import