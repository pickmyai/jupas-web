

## 託管：Cloudflare Workers（2026-11-12 由 Vercel 遷移）

- 網站由 Cloudflare Worker `jupascalculator-website` 提供（`wrangler.jsonc`）；push `main` 會由 Cloudflare Workers Builds 自動 build 及部署，已不再使用 Vercel。
- 轉址寫在 `public/_redirects`（有斜線、無斜線兩個版本都要寫；含 `*`／`:` 的規則放最後，上限 100 條），header 寫在 `public/_headers`。`vercel.json` 已刪除，不要再加回。
- apex → www 及補尾斜線由 Cloudflare zone 的 redirect rule 處理；Vercel Analytics 已移除。
