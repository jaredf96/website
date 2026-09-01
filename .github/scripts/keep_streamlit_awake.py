"""Keep the portfolio's Streamlit Community Cloud apps awake.

Streamlit puts free-tier apps to sleep after roughly 12 hours without an
active websocket session, and a sleeping app greets visitors with a wake-up
button instead of the app. A plain HTTP ping does not count as activity, so
this script drives a real headless browser: it opens each app, clicks the
wake button when present, waits for the Streamlit frontend to finish
loading, and holds the connection open briefly so the visit registers.
"""

import re
import sys
import time

from playwright.sync_api import TimeoutError as PlaywrightTimeout, sync_playwright

APPS = [
    "https://jaredf96-used-car-predictor.streamlit.app",
    "https://resume-screener-explainable.streamlit.app",
]

# The sleeping page's button reads "Yes, get this app back up!"
WAKE_BUTTON = re.compile(r"back up|wake", re.IGNORECASE)
# Rendered by every loaded Streamlit app, regardless of the app's own UI.
# The app itself runs in a child iframe (at <app>/~/+/), so the check has to
# search every frame, not just the top-level host page.
APP_READY_SELECTOR = '[data-testid="stAppViewContainer"]'
BOOT_TIMEOUT_MS = 4 * 60 * 1000  # cold boots reinstall dependencies; be patient
LINGER_MS = 30 * 1000  # keep the websocket open so the visit counts as activity


def wait_for_app(page, timeout_ms):
    deadline = time.monotonic() + timeout_ms / 1000
    while time.monotonic() < deadline:
        for frame in page.frames:
            try:
                if frame.locator(APP_READY_SELECTOR).count() > 0:
                    return
            except Exception:
                pass  # frames can detach mid-boot; just keep polling
        page.wait_for_timeout(2_000)
    raise PlaywrightTimeout(f"no frame rendered {APP_READY_SELECTOR}")


def visit(page, url):
    page.goto(url, wait_until="domcontentloaded", timeout=60_000)
    page.wait_for_timeout(5_000)

    wake = page.get_by_role("button", name=WAKE_BUTTON)
    if wake.count() > 0:
        print(f"{url}: asleep, clicking the wake-up button")
        wake.first.click()
    else:
        print(f"{url}: no wake-up button, app appears awake")

    wait_for_app(page, BOOT_TIMEOUT_MS)
    page.wait_for_timeout(LINGER_MS)
    print(f"{url}: app loaded")


def main():
    failures = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for url in APPS:
            page = browser.new_page()
            try:
                visit(page, url)
            except PlaywrightTimeout:
                failures.append(url)
                print(f"{url}: FAILED to load within the timeout", file=sys.stderr)
            finally:
                page.close()
        browser.close()
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
