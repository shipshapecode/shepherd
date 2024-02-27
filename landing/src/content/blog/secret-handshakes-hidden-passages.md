---
title: 'Secret Handshakes and Hidden Passages: Using Redwood Functions'
authorId: chuckcarpenter
pubDate: '2024-02-27'
slug: secret-handshakes-hidden-passages
description: 'When you need something outside of the design of your API, actions in functions can be exposed.'
heroImage: 'cyoa-mystery.png'
heroImageCaption: 'Which way to the promise land?'
---

Redwood.js has served as a great choice in terms of a fully featured web application stack, covering lots of my needs such as authentication and mailing capabilities right out of the box. 

For your main application, using and managing the API for your admin users is very straightforward and uses known conventions. Let's say you have perhaps another use case though? One that creates data via an action or even takes in events from another site? Enter Redwood functions.

## Understanding Redwood Functions

Redwood functions are the backbone of your serverless architecture, enabling you to execute server-side logic without the overhead of managing special access points in the GraphQL that have their own custom directives and you avoid enforcing GraphQL style queries where it might be unfamiliar. These functions can range from processing data, handling requests, to interacting with databases. However, without proper protection, they're like open doors to your data treasury.

## Implementing API Key Authentication

To secure these precious endpoints, we turn to API keys—a unique string that a client must send to access the function. Think of it as a special pass-code that unlocks your application's capabilities. Implementing API key authentication in Redwood functions ensures that only requests with the correct key can invoke your business logic.

Here’s how you might implement such a check:

```typescript
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  const apiKey = event.headers['x-api-key'];
  if (!apiKey) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: "Invalid API Key",
      }),
    };
  }

  // Do your business here, good people
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Access granted: Welcome to the secret club!",
    }),
  }
}
```

You might notice the event arguments on the handler function look familiar if you've worked in serverless environments before. As noted in the Redwood.js documentation:

> Originally, Redwood apps were intended to be deployed as serverless functions to AWS Lambda. Whenever a Redwood app is deployed to a "serverful" environment such as Fly or Render, a Fastify server is started and your Redwood app's functions in api/src/functions are automatically registered onto the server. 

Meaning, they have a similar signature to Lambdas even when in a containerized application. Huzzah!

In the above example, the function first checks if the incoming request contains an 'api-key' header that matches a predefined key stored in the environment variables. If not, it responds with a 403 Forbidden status, effectively barring the door against unauthorized access.

## Why API Keys?

API keys are simple yet effective in controlling access to your functions. They help you track and control how the API is being used, preventing unauthorized use and safeguarding your application from unwanted guests.

## The Tale Ends Here
Incorporating API key authentication into your Redwood functions is like equipping your digital fortress with a sophisticated locking mechanism. It ensures that your functions, whether they're updating user data, processing payments, or querying databases, remain secure and accessible only to those with the correct key.

As you continue to develop and deploy, remember that the security of your functions is integral to the integrity of your application. Secure your Redwood functions with API keys (or any other way you wish), and rest easy knowing that your back-end operations are guarded against the wild west of the web.
