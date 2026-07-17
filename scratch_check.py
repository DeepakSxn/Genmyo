import urllib.request
import re

routes = [
    "/",
    "/philosophy",
    "/how-it-works",
    "/join",
    "/team",
    "/terms",
    "/partners",
    "/blog",
    "/privacy",
    "/100-conversations",
    "/emotional-check-in"
]

print("Starting Vercel routing asset health check...")
for route in routes:
    url = f"https://genmyo-seo.vercel.app{route}"
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        html = urllib.request.urlopen(req).read().decode('utf-8')
        scripts = re.findall(r'<script\s+type="module"\s+crossorigin\s+src="([^"]+)"', html)
        if not scripts:
            print(f"[{route}] No module scripts found!")
            continue
        
        for src in scripts:
            src_url = 'https://genmyo-seo.vercel.app' + src
            try:
                req_js = urllib.request.Request(
                    src_url,
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                res = urllib.request.urlopen(req_js)
                print(f"[{route}] Script: {src} -> OK (200)")
            except Exception as js_err:
                print(f"[{route}] Script: {src} -> FAILED: {js_err}")
    except Exception as e:
        print(f"[{route}] Failed to fetch page: {e}")
