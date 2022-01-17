# apisyouwonthate.com

![APIs You Won't Hate](https://github.com/apisyouwonthate/apisyouwonthate.com/raw/main/public/img/apis-you-wont-hate-dark.png)

(the website)

This site is built with Next.js and MDX/Markdown, and Chakra UI. It is hosted on Vercel.

## To run the site locally

1. clone this repo
1. `yarn install` to install npm dependencies
1. To make shopify buy button embeds work, create a file called `.env.development` in the root of this project directory with the following values set:

   ```bash
   # IDs for our shopify store, to be able to sell books
   NEXT_PUBLIC_SHOPIFY_DOMAIN=
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
   NEXT_PUBLIC_FATHOM_ID=


   # mailjet API stuff, for the newsletter subscription form
   MAILJET_PUBLIC_KEY=
   MAILJET_SECRET_KEY=
   MAILJET_NEWSLETTER_LIST_ID=

   # API key and base ID for airtable, which we use for our contact form
   AIRTABLE_API_KEY=
   AIRTABLE_BASE_ID=
   ```

   (fill in missing values to the right of each `=` with values from shopify)
   Values from this file will be injected into the react runtime following [these rules](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) whenever you start the project with `yarn dev`).

1. `yarn dev` will run the local dev environment 👍
1. `yarn build` will run the build command to build a prod version of the site, which you can then test locally with `yarn start`

## Code of Conduct

Our aim is to build a constructive, inclusive, and positive community. Please give our our [Code of Conduct](./CODE_OF_CONDUCT.md) a read through before contributing.

[![Powered by Vercel](https://github.com/apisyouwonthate/apisyouwonthate.com/raw/main/public/img/powered-by-vercel.svg)](https://vercel.com?utm_source=apis-you-wont-hate&utm_campaign=oss)
