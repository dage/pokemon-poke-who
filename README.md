# Pokemon poke who?

A learning project to test [Next.js](https://nextjs.org/) features with the aim of getting a very quick and snappy user experience (faster than React). Uses [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended), both [getStaticProps()](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) and [getStaticPaths()](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths), optimized [.webp](https://caniuse.com/webp) images, inline fonts and other tricks for optimization.

## Features

Contains a listing of Pokemons that can be sorted by clicking on the column header. If clicking the name of a Pokemon, a detailed view of the Pokemon is shown.

Is currently hosted on the Amazon CloudFront CDN at https://www.spinningowl.com/portfolio/pokemon-poke-who/.

## Install packages
    
    yarn install

## Populate data

    yarn populate

Downloads json and images from an external data source to put into the public folder. Creates thumbnails. 

## Standard scripts from [Create Next App](https://nextjs.org/docs/api-reference/create-next-app)

    yarn dev
    yarn build
    yarn export
    yarn start
    yarn lint