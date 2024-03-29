<div align="center">
 <img src="https://github.com/HynekS/mulinem-nextjs-sanity/assets/24924967/2d14cc0c-f44b-4da9-a9bd-864e2c8519de" alt="" style="margin-bottom:1rem;">
</div>

# Website for a research project

Website for MULINEM (Medieval Urban Landscape in Northeastern Mesopotamia) project. Built with [Next.js](https://nextjs.org/) & [Sanity.io](https://www.sanity.io/).

## Why?

The research project (on which I did participate) needed a website for presentation. There _was_ a WordPress site with a slightly modified default theme, but it wasn't really representative. Also, for a rarely updated site, it was probably unnecessary to pay for WordPress hosting.

## My solution

I've designed a new look for the website. Initially, I converted the site into a static one with Gatsby on the frontend and Netlify CMS on the backend. The site was OK, but the colleagues were somewhat struggling with the CMS.

 I decided to migrate it to Sanity (which I have used in the past and is more user friendly). Because Gatsby has silently passed away in the meantime, I decided to move to Next.js. I also ditched SSG in favor of SSR. On production, I am aliasing React with Preact to get a significantly smaller bundle size.

 The site is [up and running](https://mulinem.net), being hosted on Vercel.

 <Gallery gallery={gallery}/>

## Notes

One thing I wasn't happy about was the frontend-to-backend type of safety. It is not officially supported yet for GROQ queries (it might work better with GraphQL). There are some promising open source projects working on solutions, but they are still in alpha, and I wasn't able to make them really work. In the end, I just used the codegen and wrote the types for API responses by hand, which is a little _meh_, but for a small project like this, probably acceptable. This should be solved in Sanity v3, but at the time, I wasn't able to get it running.

In general, migrating from Gatsby to Next.js went smoothly. The result is much cleaner (which is probably due to the fact that I have more experience with Next than I did with Gatsby when building the previous version). The only thing I've struggled with a little is the different APIs, mainly for media.
