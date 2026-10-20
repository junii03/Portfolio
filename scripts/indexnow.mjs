#!/usr/bin/env node
/**
 * IndexNow submission script (runs after `vite build`).
 *
 * Only submits for production deployments (VERCEL_ENV=production) or when
 * INDEXNOW_FORCE=1, so local/preview builds never ping search engines.
 * The key file is served from public/<key>.txt.
 */

import { SITE } from '../src/constants/site.js';

const BASE_URL = (process.env.BASE_URL || SITE.url).replace(/\/$/, '');
const KEY = process.env.INDEXNOW_KEY || SITE.indexNowKey;

const isProduction = process.env.VERCEL_ENV === 'production' || process.env.INDEXNOW_FORCE === '1';

async function submit(urlList) {
    const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
            host: new URL(BASE_URL).host,
            key: KEY,
            keyLocation: `${BASE_URL}/${KEY}.txt`,
            urlList,
        }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`IndexNow submission failed: ${res.status} ${res.statusText} ${text}`);
    }
}

(async () => {
    if (!isProduction) {
        console.log('[IndexNow] Skipped (not a production deployment).');
        return;
    }
    try {
        const urlList = [`${BASE_URL}/`];
        console.log(`[IndexNow] Submitting ${urlList.length} url(s) for ${BASE_URL} ...`);
        await submit(urlList);
        console.log('[IndexNow] Submission successful.');
    } catch (err) {
        // Never fail the build because of an indexing ping.
        console.error('[IndexNow] Error:', err.message);
    }
})();
