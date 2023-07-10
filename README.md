This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Wombat is a NextJS template that helps quickly write academic website for data sciences etc.
It allows to directly render MarkDown, Jupyter Notebooks, Python code, C++ code, Julia code, etc.

## Getting Started

First, run the development server:

```bash
# use/install the example
npm run wombat:example
# or: install another directory
npm run wombat:install CONTENT_DIR
# run the server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The CONTENT_DIR must have the following structure:
- site.js : the site information (cf. ./example/site.js)
- index.js : the home page (cf. ./example/index.js)
- content/ : the directory containing your pages, md(x), ipynb, etc. (cd. ./example/content directory)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Running with docker

Create a `site.js` `index.js` and a content folder and then run 

```
docker run \
  -p 3000:3000 \
  -it --rm \
  --name wombat \
  -v "$(pwd)":/usr/src/app/example \
  wombat
```

you can edit the files and see the live updates.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
