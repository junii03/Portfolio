#!/usr/bin/env node
/**
 * IndexNow submission script
 * - Reads URLs from public/sitemap.xml
 * - Submits them to https://api.indexnow.org/indexnow
 * - Uses env overrides when present
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const cwd = process.cwd();
const PUBLIC_DIR = path.join(cwd, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

const DEFAULT_BASE_URL = process.env.BASE_URL || 'https://www.junaidafzal.dev';
const DEFAULT_KEY = process.env.INDEXNOW_KEY || '38c211ebbf9d4ca085cfbb014b0b415f';

async function readSitemapUrls(sitemapFile) {
    try {
        const xml = await fs.readFile(sitemapFile, 'utf8');
        const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
        return urls.length ? urls : [`${DEFAULT_BASE_URL}/`];
    } catch (e) {
        return [`${DEFAULT_BASE_URL}/`];
    }
}

async function submitIndexNow({ baseUrl, key, urlList }) {
    const host = new URL(baseUrl).host;
    const keyLocation = `${baseUrl.replace(/\/$/, '')}/${key}.txt`;
    const body = { host, key, keyLocation, urlList };

    const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`IndexNow submission failed: ${res.status} ${res.statusText} ${text}`);
    }
    return res;
}

(async () => {
    try {
        const baseUrl = DEFAULT_BASE_URL;
        const key = DEFAULT_KEY;
        const urlList = await readSitemapUrls(SITEMAP_PATH);

        if (!/^https?:\/\//i.test(baseUrl)) throw new Error('BASE_URL must be an absolute URL');
        if (!/^([a-fA-F0-9]{32})$/.test(key)) console.warn('INDEXNOW_KEY is not 32 hex chars; ensure key file matches the same value.');

        console.log(`[IndexNow] Submitting ${urlList.length} url(s) for ${baseUrl} ...`);
        await submitIndexNow({ baseUrl, key, urlList });
        console.log('[IndexNow] Submission successful.');
    } catch (err) {
        console.error('[IndexNow] Error:', err.message);
        process.exitCode = 0; // Do not fail CI/CD build
    }
})();
