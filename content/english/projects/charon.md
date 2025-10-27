---
title: "Self-Hosted Farcaster Stack"
date: 2025-10-27T15:00:00+00:00
draft: false
---
# Building a Self-Hosted Farcaster Data Stack with Charon

When we set out to build a comprehensive data infrastructure for Farcaster, we expected months of work reverse-engineering protocols, writing sync engines, and debugging edge cases. What we found instead was a testament to the power of open-source collaboration—and a reminder that sometimes the best code is the code you don't have to write.

Oh, and we're running the entire stack on a Raspberry Pi. But we're getting ahead of ourselves.

## The Vision: Own Your Data, Own Your Infrastructure

Farcaster's decentralised social protocol is powerful, but accessing that data at scale typically means relying on third-party APIs or running a hub without persistence. We wanted something different: **a fully self-hosted stack** that would give us:

- **Complete data ownership** - Every cast, every follow, every profile update stored in our own database
- **Rich querying capabilities** - SQL and GraphQL access to the entire social graph
- **No rate limits** - Our infrastructure, our rules
- **Full control** - From the hub to the API layer, everything running on our own hardware

The dream was simple: run a Farcaster hub, sync all data to PostgreSQL, and expose it through a modern API. The implementation? We thought that would be the hard part.

## The Pleasant Surprise: Waypoint Already Exists

Here's where the story takes a turn. We had budgeted weeks to build a sync engine—the crucial piece of middleware that would bridge the gap between Farcaster's hub gRPC interface and our PostgreSQL database. We expected to:

- Write custom gRPC clients to stream hub events
- Build retry logic and error handling for network failures
- Design database schemas that could efficiently store Farcaster's data model
- Handle backfills for historical data
- Manage state synchronisation and consistency

Then we discovered [Waypoint](https://github.com/officialunofficial/waypoint).

**Waypoint is exactly what we needed**, and frankly, it's better than what we would have built ourselves. The team behind it ([@officialunofficial](https://github.com/officialunofficial)) clearly understands both Farcaster's protocol intricacies and production data pipeline requirements. Features that would have taken us weeks to implement and debug were already there:

- Robust hub connection management with automatic retries
- Optimised database schemas with proper indexing
- Configurable connection pooling and timeout handling
- Support for sharded hub subscriptions
- A complete backfill system for historical data
- MCP (Model Context Protocol) support for AI agent integration

**This is open source at its finest.** The Waypoint authors solved a genuinely hard problem and shared it with the community. Our "months of work" turned into "an afternoon of configuration."

While Waypoint handles the sync engine and data persistence, we added PostGraphile to complete the stack—automatically generating a full-featured GraphQL API directly from the PostgreSQL schema. No code generation, no manual endpoint creation, just instant API access to the entire Farcaster dataset.

## Enter Charon: Orchestrating the Self-Hosted Stack

With Waypoint handling the heavy lifting, we created **Charon**—a Docker Compose configuration that ties everything together into a cohesive, self-hosted Farcaster data platform.Charon extends a base Snapchain hub installation with:

### Core Infrastructure
- **PostgreSQL with pgvector** - Full persistence of all Farcaster data, with vector extension support for future AI/ML use cases
- **Redis** - Job queuing for backfill operations and future caching layer
- **Waypoint** - The star of the show, syncing hub data to PostgreSQL in real-time

### Data Backfilling
- **Backfill queue** - Manages the historical data sync workload
- **Backfill workers** - Horizontally scalable workers that fetch historical data from the hub

### API Layer
- **PostGraphile** - Automatically generates a full-featured GraphQL API directly from our PostgreSQL schema

The beauty of this architecture is its **composability**. Docker Compose override files let us extend the base Snapchain installation without modifying it, keeping updates clean and allowing the upstream project to evolve independently.

## What Self-Hosting Really Means

When we say "self-hosted," we mean **truly self-hosted**. Every component runs on infrastructure you control:

1. **Your hub** - Running the official Farcaster Snapchain node
2. **Your database** - PostgreSQL instance with complete data history
3. **Your sync engine** - Waypoint connecting the two
4. **Your API** - PostGraphile generating endpoints from your schema

No API keys. No rate limits. No wondering if a third-party service will still exist next year. Just infrastructure you own, running code you can inspect, storing data you control.

### The Data is Yours

Once Charon is running, you have:
- Every cast from the Farcaster network
- Complete follow graphs
- User profiles and metadata
- Historical data going back to the beginning
- All stored in standard PostgreSQL tables you can query however you want

Want to analyse network growth? Write a SQL query. Building a custom client? Use the GraphQL API. Training an ML model? The data's right there in postgres, ready for export.

## The Technical Details (For the Curious)

Charon uses a two-layer Docker Compose architecture:

**Base layer** - The official Snapchain installation with the hub and monitoring
**Override layer** - Our additions (postgres, redis, waypoint, backfill, postgraphile)

All services communicate over a shared Docker network, with health checks ensuring proper startup ordering. The configuration is environment-variable driven, making it easy to tune for different hardware and use cases.

For historical data sync, you can scale the backfill workers horizontally:

```bash
docker compose --profile backfill up -d --scale backfill-worker=5
```

Five workers pulling historical data in parallel, all coordinated through Redis queues. It's elegant, scalable, and requires zero code changes.

## Building on Solid Foundations

The Farcaster ecosystem is maturing rapidly, and projects like Waypoint show the quality of infrastructure being built by the community. By creating Charon, we're not reinventing wheels—we're **composing existing excellent tools** into a cohesive platform.

This is how open-source infrastructure should work:
- **Snapchain** handles hub operations
- **Waypoint** bridges hub and database
- **PostgreSQL** provides reliable persistence
- **PostGraphile** generates APIs automatically
- **Charon** orchestrates it all

Each component does one thing well, and together they create something greater than the sum of parts.

## Running on a Raspberry Pi (Yes, Really)

Here's where things get interesting: **this entire stack is currently running on a Raspberry Pi 5**.

Not a cloud server. Not a beefy homelab rack. A small, fanless computer that fits in your hand, running:
- A full Farcaster Snapchain hub
- PostgreSQL with the complete Farcaster data history
- Redis for job queuing
- Waypoint syncing in real-time
- PostGraphile serving GraphQL queries
- Multiple backfill workers for historical data

Our setup:
- **Raspberry Pi 5** with 16GB RAM
- **2TB NVMe M.2 SSD** for storage
- Total cost: Approximately £300 for the complete hardware

![Raspberry Pi 5 running the full Farcaster stack](/images/pi5.jpg)

This isn't a toy deployment or a proof-of-concept. It's a production-ready Farcaster data infrastructure running on ARM64, handling real-time sync, serving queries, and processing backfill jobs—all from a device that draws about 10 watts under load.

The Raspberry Pi 5 is a revelation for self-hosting. The 16GB RAM model gives you enough headroom for PostgreSQL connection pools, multiple Docker containers, and the hub's memory requirements. The NVMe SSD via the M.2 HAT provides genuine storage performance—no more microSD bottlenecks. And ARM64 support across the entire stack (Snapchain, Waypoint, PostgreSQL, Redis) means everything just works.

**Self-hosting doesn't require a data centre.** It doesn't even require a dedicated server closet. A Raspberry Pi on your desk, connected to your home network, gives you complete ownership of your Farcaster data infrastructure.

This is the promise of decentralised protocols realised: infrastructure anyone can run, with complete data sovereignty.

## Getting Started

If you want to run your own self-hosted Farcaster data infrastructure, Charon is ready to use today. The entire stack can run on a single server (though we recommend dedicated hardware for production use).

Check out the repository at [your-repo-link] for complete setup instructions, architecture documentation, and the GraphQL schema reference.

## Acknowledgments

None of this would have been possible without the Waypoint team. They solved the genuinely hard problems—protocol integration, schema design, backfill orchestration—and shared the solution with the community.

**To [@officialunofficial](https://github.com/officialunofficial) and the Waypoint contributors: thank you.** You saved us months of work and gave the Farcaster ecosystem a critical piece of infrastructure. This is what great open source looks like.

---

*Charon is open source and available on GitHub. We welcome contributions, feedback, and fellow self-hosting enthusiasts. The Farcaster protocol is decentralised—your infrastructure should be too.*
