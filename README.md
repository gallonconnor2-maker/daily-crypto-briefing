# Daily Crypto Briefing — Farcaster Mini App

One crypto discussion question a day. Visitors can tip you in USDC on Base,
straight from their Farcaster wallet — you never hold or front any funds.

Everything below can be done from Safari on your iPhone. No terminal, no Xcode.

## 1. Put this code on GitHub

1. Go to github.com, sign in (or create a free account).
2. Tap **+** → **New repository**. Name it, e.g. `daily-crypto-briefing`. Keep it Public. Create it.
3. On the new repo page, tap **Add file → Upload files**.
4. Upload every file from this project, keeping the folder structure
   (`app/`, `lib/`, `public/.well-known/`, plus the root files like
   `package.json`). Safari lets you select multiple files at once from the
   Files app.
5. Commit the upload.

## 2. Deploy it with Vercel (builds happen in the cloud — your phone does nothing)

1. Go to vercel.com, sign up/sign in with your GitHub account.
2. Tap **Add New → Project**, then import the `daily-crypto-briefing` repo.
3. Before deploying, open **Environment Variables** and add:
   - `NEXT_PUBLIC_CREATOR_ADDRESS` = your wallet address (this is where tips land)
4. Tap **Deploy**. Vercel installs dependencies and builds it for you — takes
   about a minute. You'll get a live URL like `daily-crypto-briefing.vercel.app`.

## 3. Point the app at its real URL

The manifest and embed tag currently say `https://your-app.vercel.app` in two
places — replace both with your real Vercel URL:

- `app/layout.tsx` — the `APP_URL` constant near the top
- `public/.well-known/farcaster.json` — `homeUrl`, `iconUrl`, `imageUrl`, `splashImageUrl`

Edit these directly in the GitHub web editor (open the file, tap the pencil
icon, edit, commit). Vercel will auto-redeploy on every commit.

## 4. Add real images

Add three images to the `public/` folder (again via GitHub's upload-files):
- `icon.png` — square app icon, 1024×1024
- `splash.png` — shown while the app loads
- `og-image.png` — the preview image shown in the Farcaster feed (3:2 ratio)

## 5. Verify the Mini App with Farcaster

1. On your phone, open Farcaster, go to Settings → Developer Tools
   (or visit farcaster.xyz/~/settings/developer-tools while logged in).
2. Use the **Manifest Tool** to generate a signed `accountAssociation` for
   your domain (the Vercel URL's domain, without `https://` or a path).
3. Copy the generated `header`, `payload`, and `signature` values into
   `public/.well-known/farcaster.json`, replacing the `REPLACE_ME` placeholders.
4. Use the **Embed Tool** in Developer Tools to preview how your app's card
   looks in the feed, and to confirm the manifest is valid — the Mini App
   embed schema evolves over time, so trust this tool over any example code,
   including this one.
5. Once verified, your app becomes eligible for Warpcast Developer Rewards
   (paid weekly based on usage) in addition to the direct USDC tips.

## How the tipping actually works

- A visitor taps a tip amount and "Send tip."
- Their Farcaster wallet asks them to confirm a USDC transfer on Base.
- The USDC and the gas fee both come out of *their* wallet — this app never
  holds funds, never pays gas on anyone's behalf, and needs no smart contract.
- The money lands directly in `NEXT_PUBLIC_CREATOR_ADDRESS`.

## Growing this into daily revenue

- Post a cast each day linking to the app so it surfaces in the feed —
  the daily question is already keyed to the date, so it rotates on its own.
- Reply to people who answer in the replies — engagement is what makes people
  come back and tip again.
- Add more questions to `lib/questions.ts` any time; append to the bottom of
  the array so past days' questions don't shift.
- Consider adding push notifications (`sdk.actions.addFrame` / notification
  webhooks) once you're comfortable with the basics — that's the single
  biggest lever for daily return visits.
