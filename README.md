# BufferQ

**High-Performance Sidecar Proxy for API Concurrency Control & Monetization**

BufferQ is a lightweight, cloud-native sidecar proxy designed to enforce dynamic,
tenant-level API concurrency control at microsecond latency (~0.006ms). By decoupling
traffic pacing from your application code, BufferQ protects backend services from
cascading overload and enables instant monetization control — without requiring raw
API key syncing, JIT database lookups, or host application intrusion.

## 🛰️ Architecture Overview

BufferQ operates on the **Pass-Through Metadata** pattern. Your application's existing
auth middleware validates arriving requests and injects trusted internal headers.
BufferQ intercepts the downstream request over standard container loopback
(localhost), enforces global active-slot leases against Redis, and paces traffic
before it hits your core API.

```
  [ External Client ]
          │
          ▼
  [ Host Middleware / Ingress ]  <── Performs Auth & DB Lookups
          │  Injects: X-BufferQ-Tenant-ID & X-BufferQ-Max-Concurrency
          ▼
 ┌───────────────────────────────────────────────────────────────┐
 │ Pod / Container Boundary                                       │
 │                                                                │
 │   [ BufferQ Sidecar ] ◄─── (Leases Slots via Local/Redis)     │
 │           │                                                    │
 │    (Forward on Success / 429 on Exceeded Limit)                │
 │           │                                                    │
 │           ▼                                                    │
 │   [ Main API Service ] (Port 5000 / localhost)                 │
 └───────────────────────────────────────────────────────────────┘
```

## ⚡ Key Features

- **Microsecond evaluation** — local memory caching combined with atomic Redis
  counters executes slot evaluation in ~0.006ms.
- **Zero key syncing** — never sync client API keys or sensitive credentials to a
  third-party DB. Your host middleware retains total ownership of identity.
- **Cloud-native design** — deploys natively as a container sidecar in Kubernetes,
  AWS ECS, or Google Cloud Run.
- **Automatic backpressure** — handles dynamic concurrency queueing and returns
  standard HTTP 429 Too Many Requests with precise `Retry-After` headers during peak
  traffic spikes.

## 📋 Pass-Through Header Protocol

When forwarding traffic to the BufferQ sidecar, your application middleware injects
the following internal context headers:

| Header Name                     | Type               | Description                                                                 | Example       |
| -------------------------------- | ------------------ | ----------------------------------------------------------------------------- | -------------- |
| `X-BufferQ-Tenant-ID`             | String             | Unique identifier for the account, tenant, or API key owner.                  | `tenant_usr_99` |
| `X-BufferQ-Max-Concurrency`       | Integer            | The maximum number of active parallel slots allowed for this tenant.          | `50`           |
| `X-BufferQ-Queue-Timeout`         | Integer (Optional) | Max milliseconds a request may wait in queue for an open slot before timing out. | `500`        |

## 📄 License

BufferQ is licensed under the **Business Source License 1.1 (BSL 1.1)**.

- **Free** for internal production use, development, testing, and client installs.
- **Commercial license required** to resell BufferQ as a managed service or embed it
  in a competing commercial offering.
- Converts automatically to **Apache License 2.0** on **January 1, 2030**.

See [LICENSE.txt](LICENSE.txt) for the full legal text and [NOTICE.md](NOTICE.md) for
a plain-English summary. For commercial licensing inquiries, contact
**chriszioutas@gmail.com**.
