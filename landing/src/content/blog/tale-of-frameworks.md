---
title: 'A Tale of Frameworks: Our Quirky Quest from Next.js to Redwood.js'
authorId: chuckcarpenter
pubDate: '2024-01-19'
slug: tale-of-frameworks
description: 'Let us talk about some cool new technologies, but how sometimes well know frameworks are still good.'
heroImage: 'dan-meyers-T5w1xkN1c-Q-unsplash.jpg'
heroImageCaption: 'Photo by Dan Meyers on Unsplash'
---

## And so it begins

In the realm of web development, choosing the right framework can feel like finding a needle in a digital haystack. Our latest project, an application for managing user journeys and getting analytics for them, started with a dive into [Next.js](https://nextjs.org/) version 14 ("blessed" with React Server Components), paired with a separate API using [ElysiaJS](https://elysiajs.com/). However, as the project continued and the complexity grew, so did our needs.

## Why We Started with Next.js and ElysiaJS
Next.js, with its robust features and scalability, seemed like a natural choice. We've used it quite successfully plenty in the past and felt like an old friend to help us in our own project now, rather than enterprise client projects. React can be the wild west in some ways when it comes to compiling together all the dependencies to make it a full app framework suite, Next.js makes many of those choices for you and provides nice defaults. 

Coupled with ElysiaJS for our API needs (which to be fair is quite bleeding edge and built on the newly released [Bun](https://bun.sh/) runtime), we embarked on this journey with high hopes. Next.js offered us a modern framework with great performance, while ElysiaJS promised a flexible and fast API layer. Bun is just fast, no question.

## The Twist in the Tale: Shifting to RedwoodJS
However, as we navigated through development, we encountered a few hitches. The separate management of front-end and API layers started to feel like juggling apples and oranges – doable, but unnecessarily complex. Bleeding edge tech isn't always the most documented and while open source folks are quite helpful, it's time consuming to ask questions in multiple projects and/or Discord servers. Enter RedwoodJS.

RedwoodJS offered us an integrated solution, blending the front-end and API seamlessly. It was like finding a tool that could juggle for us. The allure of its full-stack capabilities, coupled with a simpler, more cohesive development experience, was too good to pass up.

## Building the App with RedwoodJS
With RedwoodJS, our development process became smoother, akin to a well-oiled machine. Its opinionated structure provided a clear path forward, reducing the overhead of decision-making. The integrated GraphQL API meant that our data management became more streamlined and all the work happened in one monorepo.

## Conclusion
In the end, our journey led us to RedwoodJS, a framework that aligned perfectly with our vision for the journey management application. It reminded us that in the world of web development, flexibility and adaptability are just as important as the features a framework offers. There's something to be said for relying on web technologies that have worked well for years on end. Join us as we continue to explore and share our experiences in this ever-evolving landscape.