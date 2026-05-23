# Report v0.1 – Browse Scenario (Public Demo)

## 1. Test Objective
The goal of this test is to validate the basic k6 setup and exercise a simple “browse” user journey against the public k6 demo site. This is a dry run to verify that VU execution, checks, and basic metrics collection work as expected before targeting the custom e‑commerce API.

## 2. Test Setup
Script: perf-tests/k6/baseline_browse.js
Target: https://test.k6.io/ and /news.php
Load profile: 10 VUs for 1 minute (constant VU executor via options.vus and options.duration).

User flow:
GET / (home page), check status 200.
Sleep 3 seconds.
GET /news.php, check status 200.
Sleep 3 seconds, then repeat.

## 3. Results Summary
http_req_duration (overall): avg ≈ 117.37 ms, p(95) ≈ 235.74 ms
http_req_failed: 0%
checks: 100% passed

## 4. Observations
At this low load, the public demo site easily meets our early SLO‑style targets (p95 < 250–300 ms), which is expected.
Checks passed 100%, confirming that the basic script and endpoints are healthy.
This test uses a constant VU model, which is sufficient for validating mechanics, but later scenarios will shift to arrival‑rate or more realistic profiles.

## 5. Next Steps
• Migrate this scenario from the public demo site to the locally hosted e‑commerce API once the API is implemented.
• Split into multiple scenarios aligned with the Browser, Buyer, and Search‑heavy profiles from the mission brief.
• Add k6 thresholds for p95 latency and error rate based on the defined SLOs once baseline numbers are available for the custom API.