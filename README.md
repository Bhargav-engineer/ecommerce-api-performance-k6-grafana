# E‑commerce API Performance Lab (k6 + Grafana)

This repository is a hands‑on performance engineering lab for a small e‑commerce API.  
The goal is to design and test realistic workloads (browse, search, add to cart, checkout), define SLOs, and run controlled experiments using k6 and observability tooling.  
Instead of only running ad‑hoc scripts, this project treats performance as a first‑class engineering concern with clear SLOs, workload models, and repeatable reports.

## Architecture (Planned)

The target system is a simple e‑commerce backend with:

- A REST API service (Node.js/Express or FastAPI) handling product catalog, cart, and checkout.
- A relational database (e.g., PostgreSQL) storing products, carts, and orders.
- Optional Redis cache for read‑heavy catalog endpoints in later experiments.
- Local Docker Compose setup to run the API, database, and observability stack (Grafana + Prometheus) together.

Initially, tests target a public demo endpoint and then will be switched to this local e‑commerce API as it evolves.

The API is implemented as a Node.js + Express service exposing REST endpoints for products, cart, and checkout, backed by a relational database (PostgreSQL) in later iterations.

## Performance Goals (SLOs)

For this case study, the main SLOs are:

- **Browse / search** endpoints: p95 latency < 250 ms and ≥ 99.5% success rate over a 7‑day window.
- **Checkout** endpoint: p95 latency < 300 ms and ≥ 99% success rate over a 7‑day window.
- **API service CPU**: average CPU usage < 70% on the API container under baseline target load.

These will be refined as test data and bottlenecks are discovered.

## Workload Model (High Level)

The workload is based on three user profiles:

- **Browser (≈60%)** – home → browse catalog → 2–3 product detail pages → exit.
- **Buyer (≈25%)** – home → browse → product detail → add to cart → view cart → checkout.
- **Search‑heavy (≈15%)** – home → search → results → product detail → optional add to cart.

Initial peak assumption: ~50 requests per second across these flows, with checkout representing roughly 5–10 RPS. These ratios will be used to design k6 scenarios.

## Tech Stack

- Load testing: k6 (JavaScript‑based scenarios).
- Legacy / comparison: Apache JMeter (planned).
- Backend API: Node.js/Express or FastAPI (planned).
- Database: PostgreSQL (planned).
- Observability: Grafana + Prometheus or APM tool (planned).
- Containerization: Docker / Docker Compose.
- Backend API: Node.js + Express
- Load testing: k6 (JavaScript-based scenarios)
- Legacy / comparison: Apache JMeter (planned)
- Database: PostgreSQL (planned)
- Observability: Grafana + Prometheus or APM tool (planned)
- Containerization: Docker / Docker Compose (planned)

## Getting Started (Current State)

Right now, this project includes a basic k6 smoke test hitting a public demo endpoint.

### Prerequisites

- k6 installed locally. See the official docs for installation instructions.  
- Git installed.

### Run the smoke test

```bash
# Clone this repository
git clone https://github.com/<your-username>/ecommerce-api-performance-k6-grafana.git
cd ecommerce-api-performance-k6-grafana

# Run the baseline smoke test
k6 run perf-tests/k6/smoke.js
```

This will execute a small load test against a public test endpoint and print latency and throughput metrics to the console.

## Project Status

- ✅ Repository structure created (`app`, `perf-tests`, `docs`, `reports`).
- ✅ Mission brief drafted with business context, SLOs, workload model, and experiment backlog.
- ✅ Basic k6 smoke test running against a public demo endpoint.
- ⏳ E‑commerce API implementation (endpoints + DB schema).
- ⏳ k6 scenarios aligned with user journeys (baseline, stress, soak).
- ⏳ Docker Compose stack (API + DB + Grafana/Prometheus).
- ⏳ CI integration (GitHub Actions running k6 tests on pushes / PRs).
- ✅ Basic Node.js + Express API scaffold running locally with `/health` and `/api/products` endpoints.
- ✅ Initial API design documented in `docs/api-design.md` (products, cart, checkout).

## Roadmap (Next Steps)

1. Implement minimal e‑commerce API (products, cart, checkout) with a relational database.
2. Point k6 scenarios at the local API and model user journeys from the mission brief.
3. Add Docker Compose to run API + DB + observability stack locally.
4. Create repeatable performance reports (before/after experiments).
5. Integrate k6 tests into GitHub Actions for continuous performance checks.
