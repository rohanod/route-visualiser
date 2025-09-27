Create a visualiser designed for llms to use that shows a list of routes to take from one point to another including which stops to get on and off at, which bus/tram to take between change stops, etc. The way to have it llm-ready will be having the import be a json and having no actual route data in the app and having everything in a json file for importing. Include the prompt in a tab of the app along with a ts schema(also in the ai prompt given)

First plan the json schema then create scripts to organise the data because the kmz file does have the points on the route of the bus/tram line but you need to make sure it is in the proper order. I want to be able to combine the TPG_LIGNES.kmz(THe route of the buses/trams) with TPG_ARRETS.json(ALl of the tpg stops and which lines stop there) so there is just one file to download. After you have done all these setup things, you can start working on the app itself. Think of at least 3 more setup things to do or more if needed.

For the kmz file, it should be possible to get the proper route because I imported the kmz file I gave to you into google earth pro and it found the correct route(maybe 1-5 metres off sometimes but more than good enough) but it didn't have the correct order. You can use TPG_ARRETS.json

The first script you need to make is the one that turns TPG_ARRETS.csv into TPG_ARRETS.json because the csv is the original.

give an example actually. don't have coords for the stops; just for the start and end. All I want to see is something like this. You can plan the json schema so that the app uses tpg_arrets.json and TPG_LIGNES.kmz.

The data that you want to use from the files i gave you should be compiled into one or two files using a script and they can be used to make the actual path and the imported json can only have the stops along the way.

Create the example json first

I want javascript scripts and create the scripts in a scripts folder in the project folder(Use better-t-stack to create the app so we can have a bunch of useful things. Here is my starting command, modify it as you see fit but we don't need to save any routes, just visualise them `pnpm create better-t-stack@latest my-better-t-app --frontend next --backend next --runtime node --api trpc --auth none --payments none --database none --orm none --db-setup none --package-manager pnpm --git --web-deploy none --server-deploy none --install --addons pwa tauri turborepo --examples none`). start with the scripts section. Use a proper libary for converting the swiss coords. Don't create the full app, just these helper scripts. Make sure to test the scripts. Delete main project if you actually did create the main app

Use all the tools you have to help with the task