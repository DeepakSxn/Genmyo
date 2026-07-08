# GenMyo Blog Page — Deployment Note
**For:** Gaurav  
**File:** GenMyo_Blog_Page.html  
**Date:** July 2026

This document contains deployment notes, routing instructions, and SEO requirements for the GenMyo blog standalone page.

---

## 1. Route Configuration
- **Endpoint:** Deploy the index at `/blog` (singular convention is preferred for cleaner post URLs).
- **Navigation Compatibility:** The Partners page nav links to `/blog` already. Once the blog is deployed to `/blog`, the link will work without further modifications.

## 2. Per-Post URLs (SEO Optimization)
Individual post pages must be split into separate URLs to rank in search engines. The JSON-LD schema references these exact URLs:
- `/blog/the-conversation-after-the-workshop`
- `/blog/what-a-hundred-honest-conversations-taught-us`

## 3. The Rendering Fix (Blocker)
- **Problem:** `genmyo.ai` is currently client-side JavaScript-rendered. Pages like *For You* and *For Business* are not indexed.
- **Requirement:** The blog needs to be server-rendered or prerendered so search crawlers can index full HTML content.
- **Actions:** Add both post URLs to `sitemap.xml` and submit them via Google Search Console once live.

## 4. Completed Elements in the File
- Unique title tags, meta descriptions, and canonical URLs.
- Open Graph and Twitter Card tags.
- Validated JSON-LD structured data (`Blog` + `BlogPosting` schema for both posts).
- Semantic article markup with schema attributes.
- *(Recommended)* Add an `og:image` URL once a blog card graphic (1200x630) is ready.

## 5. Cadence & Maintenance
- Posts will be added periodically.
- For each new post:
  1. Create a unique `/blog/slug` URL.
  2. Add a `BlogPosting` entry in the JSON-LD schema.
  3. Add a post card to the blog index page.
