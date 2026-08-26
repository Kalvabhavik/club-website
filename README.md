# OS Code club website

Next.js app with shadcn/ui and a MongoDB (Mongoose) backend for members, events
and resources.

## Backend setup

1. Copy `.env.example` to `.env.local` and fill in `MONGODB_URI` (local MongoDB
   or an Atlas connection string), a random `SESSION_SECRET`, and the
   `SEED_MEMBER_*` values used to create the first member account.
2. Load the initial member and event data:

```bash
npm run seed
```

3. Start the app with `npm run dev`, then sign in at `/login` with the seeded
   credentials to add, edit or delete events.

### API routes

| Route | Methods |
| --- | --- |
| `/api/auth/login`, `/api/auth/logout`, `/api/auth/me` | `POST`, `POST`, `GET` |
| `/api/events` | `GET` (public), `POST` (member) |
| `/api/events/[slug]` | `GET` (public), `PUT`, `DELETE` (member) |
| `/api/resources` | `GET` (public), `POST` (member) |

Sessions are JWTs signed with `SESSION_SECRET` and stored in an HTTP-only
cookie; passwords are only ever stored as bcrypt hashes.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
