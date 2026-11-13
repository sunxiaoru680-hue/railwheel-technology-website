# Railwheel Daily Blog Publishing Runbook

Last updated: 2026-08-15

## Objective

When asked to run the Railwheel daily Blog publishing loop, complete the entire workflow without stopping after the first recoverable failure:

1. Review existing Blog titles and content to avoid duplicate topics and keyword cannibalization.
2. Select a new English topic for railway procurement professionals with commercial search intent.
3. Verify standards and technical facts against current primary sources. Never invent certifications, customers, projects, capacity, test capability, delivery time, or commercial performance.
4. Publish an approximately 1,500–2,200 word article with an SEO title, meta description, canonical URL, one H1, useful H2/H3 structure, FAQ content and schema, product internal links, updated date, and Request a Quote CTA.
5. Use the production domain `https://www.railwheelchina.com` for canonical URLs, schema URLs, sitemap entries, and public verification.
6. Run the full build and page checks. Review responsive/mobile behavior using the existing design and breakpoints.
7. Preserve unrelated user changes. Commit only the files belonging to the daily publishing task.
8. Safely fast-forward the verified commit to `main`, wait for Vercel, and verify the production Blog URL returns HTTP 200 with the expected title and canonical.
9. Do not mark the task complete until the production URL is public and verified.

## Repository Publishing Identity

This repository has its own GitHub Deploy Key. Do not reuse the ZYS key or another repository's key.

- SSH identity path: `~/.ssh/railwheel_codex_ed25519`
- Repository Git configuration should be:

```text
ssh -i ~/.ssh/railwheel_codex_ed25519 -o IdentitiesOnly=yes
```

Never print, copy, commit, or expose the private key. The `.pub` file is the only public portion, but it should only be displayed when the user explicitly requests it for repository authorization.

## Safe Git Sequence

The working tree may be detached because Codex uses Git worktrees. That is acceptable. Use the current verified commit and push it explicitly to `main` only after confirming it is a fast-forward:

```text
git fetch origin main
git merge-base --is-ancestor origin/main HEAD
git push origin HEAD:main
```

Never force-push `main`. If the remote advanced, fetch and integrate the remote work without overwriting unrelated changes, rebuild, recheck, then retry.

## Recovery Order

Do not stop after the first network or authentication failure. Check and retry in this order:

1. Confirm the remote URL and current `core.sshCommand`.
2. Confirm the Railwheel-specific key file is selected with `IdentitiesOnly=yes`.
3. Check that the remote `main` commit is an ancestor of the local verified commit.
4. Retry the safe SSH fetch/push path.
5. If GitHub reports `denied to deploy key`, distinguish a read-only key from a key attached to another repository. GitHub Deploy Keys cannot be reused across repositories.
6. Use the Railwheel-specific key, not `zys_codex_ed25519`.
7. Do not expose tokens or private keys while diagnosing.

## Vercel and Production Verification

Pushing `main` triggers the Vercel deployment. Poll the exact public Blog URL with bounded retries. Completion requires:

- HTTP 200 from the production URL.
- `server: Vercel` or equivalent production response evidence.
- The expected SEO title.
- Exactly one expected H1 in the generated page.
- Canonical matching the exact production URL on `https://www.railwheelchina.com`.
- The expected `dateModified` and Article/FAQ structured data.
- Remote `refs/heads/main` pointing to the published commit.

## 2026-08-15 Reference Publication

- Title: `Railway Wheel Inspection Documents: Buyer Guide to Certificates, NDT and Traceability`
- Target keyword: `railway wheel inspection documents`
- Production URL: `https://www.railwheelchina.com/news/railway-wheel-inspection-documents-guide/`
- Commit: `ed803e9524f51c8748b66b3629149d5a314a7113`
- Build result: 331 generated pages
- Check result: 331 HTML pages plus sitemap, image sitemap, robots, QR assets, and WebP product images passed
- Production result: HTTP 200 with the expected canonical and page title

## Required Completion Report

Report the title, target keyword, word count, changed files, build/check results, commit, main/push/deployment status, public URL, canonical, available page-view and inquiry data, recovery actions, and any remaining blockers. If analytics are unavailable, state that explicitly rather than inventing numbers.
