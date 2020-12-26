# What Should We Play? (Front-end)

[![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/mm/wswp-frontend/tree/main)

This repo serves as the front-end for [What Should We Play?](https://github.com/mm/wswp), a project I built for the [DigitalOcean App Platform Hackathon](https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k). You can read over there about my motivation for starting the project and how to get started with setting up a dev environment!

## Front-end stack/requirements

The front-end for this project was built in [React](https://reactjs.org) (using [create-react-app](https://github.com/facebook/create-react-app)) and uses the [Chakra UI](https://chakra-ui.com) component library throughout its components. It also uses icons from [Octicons](https://primer.style/octicons/), [Font Awesome](https://fontawesome.com) and [HeroIcons](https://heroicons.com) via [react-icons](https://react-icons.github.io/react-icons/). 

Before building and running this on your local computer, please make sure you go through the [back-end setup](https://github.com/mm/wswp) described in the README there because this depends on that!

## Deploying to DigitalOcean

If you use the "Deploy to DigitalOcean" button in this README, only the front-end will be deployed. This is due to a current limitation with the button where combining static sites and services isn't possible yet. Make sure the back-end has been deployed to DO first (by using the button [here](https://github.com/mm/wswp)), and make note of the backend's app URL. When deploying this frontend, you'll be asked for a `REACT_APP_API_URL`. This is `https://your-app-slug.ondigitalocean.app/api/v1` once it has been deployed.

Alternatively, you can fork this repo to your own GitHub account and deploy it as a static site component of the backend once that's been deployed to DO! To do this:

1. Go to your backend app deployment in your DigitalOcean App Platform account.

2. Click on "Components", and then "+ Create Component" (Static Site). Select your forked front-end repository. You'll need to set your `REACT_APP_API_URL` to `${APP_URL}/api/v1`. 

3. Deploy and let it build ☺️

## Building the frontend locally

1. Clone this repo to your computer: `git clone https://github.com/mm/wswp-frontend`

2. Create an `.env.local` file. In it, specify the base URL for the backend API so the two can communicate, for example:

    ```
    REACT_APP_API_URL=http://localhost:8000/v1
    ```

3. In the project root, run `yarn` and let dependencies install (you only need to do this once)

4. In the project root, run `yarn start` to start the development server and you're good to go!