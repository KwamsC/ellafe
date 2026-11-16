# Payload Cloudflare Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)

**This can only be deployed on Paid Workers right now due to size limits.** This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly to Cloudflare Workers by clicking the button to take you to the setup screen.

From there you can connect your code to a git provider such Github or Gitlab, name your Workers, D1 Database and R2 Bucket as well as attach any additional environment variables or services you need.

## Quick Start - local setup

The project uses Cloudflare D1 for SQLite and R2 for media storage. During local development, Wrangler provides local emulations for both, so you do not need a Cloudflare account or a separate database server.

### Prerequisites

Install Node.js `18.20.2` or later in the 18.x line, or `20.9.0` or later, and pnpm `9` or `10`. Run the following commands from the repository root after cloning the repository:

```bash
pnpm install
cp .env.example .env
openssl rand -hex 32
```

Copy the value printed by `openssl` into `.env` as the value of `PAYLOAD_SECRET`.

Create the local D1 database, then start the Next.js development server. There is no separate database process to start. Wrangler stores the local SQLite file in `.wrangler/state/v3` and opens it when you migrate or run the app.

```bash
pnpm payload migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The Payload admin is at [http://localhost:3000/admin](http://localhost:3000/admin); create the first user there. A new local database has no page content, so create and publish a page in the `Pages` collection with the slug `home` for `/` to render instead of returning 404. Local D1 and R2 data is persisted in `.wrangler/state/v3` and is not committed to the repository.

## How it works

Out of the box, using [`Wrangler`](https://developers.cloudflare.com/workers/wrangler/) will automatically create local bindings for you to connect to the remote services and it can even create a local mock of the services you're using with Cloudflare.

We've pre-configured Payload for you with the following:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Customers and admins share the `users` collection. Roles are `admin` and `customer`. Public registration creates a customer. Only users with the `admin` role can open `/admin`. The first user created in an empty database is made an admin. The ecommerce migration also sets every existing user to `admin`, so accounts created before roles existed can still sign in to the admin panel.

- #### Media

  This is the uploads enabled collection. Product images use the same R2 media route as the rest of the site.

## Shop

The storefront sits beside the existing site and uses the same header, footer, and fonts. Prices are in EUR. Enable EUR in the Stripe dashboard before taking payments.

The ecommerce plugin adds products, variants, variant types, variant options, carts, addresses, orders, and transactions. Categories is a separate collection. Pages can also use the Archive, Carousel, Three Item Grid, and Banner blocks.

### Storefront URLs

- `/shop` and `/products/[slug]`
- `/checkout` and `/checkout/confirm-order`
- `/login`, `/logout`, `/create-account`, `/forgot-password`, and `/find-order`
- `/account`, `/account/addresses`, `/account/orders`, and `/account/orders/[id]`

The header links to the account page and opens the cart. Guests can look up an order at `/find-order` with the email address and access token from checkout. Those emails are printed by the console logger until an email adapter is configured. Nodemailer is not used, because it is not available in Workers.

### Stripe

Add these to `.env` for local checkout:

```bash
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOKS_SIGNING_SECRET=
```

Stripe sends payment events to `/api/payments/stripe/webhooks`. Forward them to the local server with the Stripe CLI:

```bash
pnpm stripe-webhooks
```

That runs `stripe listen --forward-to localhost:3000/api/payments/stripe/webhooks`. Put production keys in Worker secrets, not in the repository.

Products and categories are created in the admin. Publishing or deleting a product revalidates `/shop` and `/products/[slug]` with the same cache hooks used by pages.

### Image Storage (R2)

Images will be served from an R2 bucket which you can then further configure to use a CDN to serve for your frontend directly.

### D1 Database

The Worker will have direct access to a D1 SQLite database which Wrangler can connect locally to, just note that you won't have a connection string as you would typically with other providers.

Start the local database with:

```bash
pnpm payload migrate
```

That creates `.wrangler/state/v3` if it does not exist and applies the Payload migrations. `pnpm dev` then uses this database. See [Quick Start - local setup](#quick-start---local-setup) for the full sequence.

You can enable read replicas by adding `readReplicas: 'first-primary'` in the DB adapter and then enabling it on your D1 Cloudflare dashboard. Read more about this feature on [our docs](https://payloadcms.com/docs/database/sqlite#d1-read-replicas).

## Working with Cloudflare

Firstly, after installing dependencies locally you need to authenticate with Wrangler by running:

```bash
pnpm wrangler login
```

This will take you to Cloudflare to login and then you can use the Wrangler CLI locally for anything, use `pnpm wrangler help` to see all available options.

Wrangler is pretty smart so it will automatically bind your services for local development just by running `pnpm dev`.

## Deployments

After you add or change a collection, block, or field, create a migration from the current Payload config:

```bash
pnpm payload migrate:create
```

Apply that migration before the next production build. Static generation reads the remote D1 database (`"remote": true` in `wrangler.jsonc`), so a build that runs first fails with `no such table`.

```bash
pnpm payload migrate
NODE_ENV=production pnpm payload migrate
```

The first command updates the local database used by `pnpm dev`. The second updates the remote database used by `pnpm build`.

Then deploy:

```bash
pnpm run deploy
```

`pnpm run deploy` runs the remote migration, builds the app, and deploys the bundle to Cloudflare. You can move these steps into CI as well.

## Enabling logs

By default logs are not enabled for your API, we've made this decision because it does run against your quota so we've left it opt-in. But you can easily enable logs in one click in the Cloudflare panel, [see docs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#enable-workers-logs).

### Logger Configuration

This template includes a custom console-based logger compatible with Cloudflare Workers. Payload's default logger uses `pino-pretty`, which relies on Node.js APIs not available in Workers and would cause `fs.write is not implemented` errors.

The custom logger in `payload.config.ts`:

- Routes logs through `console.*` methods which Workers handles correctly
- Outputs JSON-formatted logs for Cloudflare observability
- Only active in production (development uses the default `pino-pretty` for better DX)

You can control the log level via the `PAYLOAD_LOG_LEVEL` environment variable (e.g., `debug`, `info`, `warn`, `error`).

### Diagnostic Channel Errors

If you see "Failed to publish diagnostic channel message" errors in your observability logs, these typically come from the `undici` HTTP client library. The template includes `skipSafeFetch: true` in the Media collection to use native fetch instead of undici for file uploads, which helps reduce these errors.

Cloudflare Workers runs in an [isolated environment that cannot access private IP ranges](https://developers.cloudflare.com/workers-vpc/examples/route-across-private-services/) by default, providing built-in SSRF protection. This makes `skipSafeFetch` safe to use.

## Known issues

### GraphQL

We are currently waiting on some issues with GraphQL to be [fixed upstream in Workers](https://github.com/cloudflare/workerd/issues/5175) so full support for GraphQL is not currently guaranteed when deployed.

### Worker size limits

We currently recommend deploying this template to the Paid Workers plan due to bundle [size limits](https://developers.cloudflare.com/workers/platform/limits/#worker-size) of 3mb. We're actively trying to reduce our bundle footprint over time to better meet this metric.

This also applies to your own code, in the case of importing a lot of libraries you may find yourself limited by the bundle.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
