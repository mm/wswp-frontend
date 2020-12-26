# What Should We Play? (Front-end)

This repo serves as the front-end for [What Should We Play?](https://github.com/mm/wswp), a project I built for the [DigitalOcean App Platform Hackathon](https://dev.to/devteam/announcing-the-digitalocean-app-platform-hackathon-on-dev-2i1k). You can read over there about my motivation for starting the project and how to get started with setting up a dev environment! There's also an easy "Deploy to DigitalOcean" button there to deploy the whole project for yourself.

## Front-end stack/requirements

The front-end for this project was built in [React](https://reactjs.org) (using [create-react-app](https://github.com/facebook/create-react-app)) and uses the [Chakra UI](https://chakra-ui.com) component library throughout its components. It also uses icons from [Octicons](https://primer.style/octicons/), [Font Awesome](https://fontawesome.com) and [HeroIcons](https://heroicons.com) via [react-icons](https://react-icons.github.io/react-icons/). 

Before building and running this on your local computer, please make sure you go through the [back-end setup](https://github.com/mm/wswp) described in the README there because this depends on that!

## Getting started

1. Clone this repo to your computer: `git clone https://github.com/mm/wswp-frontend`

2. Create an `.env.local` file. In it, specify the base URL for the backend API so the two can communicate, for example:

    ```
    REACT_APP_API_URL=http://localhost:8000/v1
    ```

3. In the project root, run `yarn` and let dependencies install (you only need to do this once)

4. In the project root, run `yarn start` to start the development server and you're good to go!