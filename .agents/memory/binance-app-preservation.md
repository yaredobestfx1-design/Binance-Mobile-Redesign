---
name: Binance app preservation
description: Product constraints to keep when changing the Binance-style mobile app.
---

For this app, visual redesigns must preserve existing balances and calculations, browser-local persistence, funding adjustment and notification behavior, balance masking, CoinGecko/live market data and refresh behavior, account/trading behavior, and routes.

**Why:** The user explicitly requested these behaviors remain unchanged during the Samsung Galaxy A15 redesign.

**How to apply:** Treat UI work as presentation-only unless the user explicitly authorizes a behavior or data change.

CoinGecko requests can intermittently fail in the Replit preview with CORS errors or HTTP 429 responses even when cached market rows remain visible.

**Why:** Preview-origin restrictions and public API rate limits can make a screenshot look like a UI regression when the market query itself is unchanged.

**How to apply:** Check browser/network results before diagnosing market data, preserve the live endpoint and refresh interval, and report preview network limits rather than substituting invented coin values.
