# Pokemon poke who?

A small side-project to test [Next.js](https://nextjs.org/) with the aim of getting a very quick and snappy user experience (faster than React). Uses [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended), both [getStaticProps()](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) and [getStaticPaths()](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths), optimized [.webp](https://caniuse.com/webp) images, inline fonts and other tricks for optimization.

## Features

Contains a listing of Pokemons that can be sorted by clicking on the column header. When clicking the name of a Pokemon, a detailed view of the Pokemon is shown.

The production build is currently hosted on the Amazon CloudFront CDN at https://www.spinningowl.com/portfolio/pokemon-poke-who/. In October 2022 it scores a perfect [100 of 100](https://pagespeed.web.dev/report?url=https%3A%2F%2Fwww.spinningowl.com%2Fportfolio%2Fpokemon-poke-who%2F&form_factor=desktop) on Google PageSpeed Insights for desktop.

## Install packages
    
    yarn install

## Populate data

    yarn populate

Downloads json and images from an external data source to the public folder. Creates thumbnails.

## Standard scripts from [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)

    yarn dev
    yarn build
    yarn export
    yarn start
    yarn lint

To be able to host the production build in a subfolder, a basepath of "/portfolio/pokemon-poke-who" is used so when testing with 'yarn dev' or 'yarn start', use the following url: http://localhost:3000/portfolio/pokemon-poke-who