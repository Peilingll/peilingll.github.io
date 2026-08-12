---
title: "Sunhou Intranet: ERP for an Architecture Practice"
subtitle: "Designing, building and deploying an integrated operations system inside a 35-person AEC firm"
date: 2026-08-01
unit: "Sunhou Architects & Partners Association / PANHO, Taiwan"
Contributors: "Personal Work"
tags:
  [
    "Project",
    "ERP",
    "Construction Management",
    "Digital Transformation",
    "RAG",
    "Cloud",
    "Taiwan",
  ]
image: "/images/pj14-1.webp"
description: "An integrated ERP, project-control and knowledge system built and running inside a 35-person architecture practice, and a first-hand case of how a construction firm turns software investment into measurable margin visibility."
---

## Overview

Sunhou Intranet is an operations system I designed and built for a 35-person architectural practice that runs two legal entities. It has been in production inside the firm since 2025.

Before it existed, the firm's operational information was spread across shared drives, spreadsheets, low-code mobile apps and paper. The system consolidates that into a single database under a single permission model, and adds a retrieval layer built on large language models on top of it.

The practice works across six case types: architectural design, interior design and change of use, project management, heritage conservation, building appraisal, and public safety inspection. Each carries its own document set, billing basis and delivery rhythm. Holding all six in one system is the origin of most of the structural decisions below.

## The business case, and its boundary

The firm's problem was not that work went undone. It was that **cost attribution lived in people's memory**, gross margin was known only after a project closed, and management decisions were made without current numbers.

So the scope was drawn deliberately and narrowly: **this is an internal project-margin management tool, not a statutory accounting system.** Legal authority over the books stays with the accountant. The system owns management-level visibility and cost attribution, not the general ledger.

That boundary was the first decision made and the one that shaped everything after it. It kept the implementation out of a compliance scope it would not have survived, and it defined what "value" the investment was accountable for delivering.

## Three tensions

Building the system inside the firm surfaced the same trade-offs repeatedly. Each was resolved in structure rather than in policy.

### Standardisation vs. flexibility

Project state is modelled in two layers: **five main phases** (initiation, planning, execution, monitoring, closing), under which each delivery method (DBB / PCM / design-build) expands into its own sub-phase sequence.

One state machine therefore describes both a conventional design-and-supervision commission and a design-build contract. No separate workflow is built per case type, and no case type is forced into a shape that does not fit it.

### Enterprise integration vs. project autonomy

Permissions run on two independent axes that never nest inside each other:

| Layer                       | Roles                                                                  |
| --------------------------- | ---------------------------------------------------------------------- |
| **Company** (mutually exclusive) | Super admin, Administrator, Finance administrator, User            |
| **Project** (per project)   | Project manager / Project architect, Finance owner, Member              |

A designer can hold no company-level authority at all, yet hold full edit rights over the project they lead, and appear as a different role on the next project. The administrator role deliberately excludes company financial editing.

This structure was not invented. It **formalises what the firm already did on shared drives**, where each project had its own folder and member list, managed by that project's lead. The model that was adopted was the practice that already existed, written down.

### Strategic intent vs. operational use

Two design rules carry most of the weight here.

**Amounts are the user's truth; percentages are derived.** When a contract value changes, the system does not rewrite any claim amount a person has already entered. It recomputes the claim percentage and leaves the uncovered difference for the user to close explicitly. The system never silently overwrites a number a human has confirmed.

**The division of labour between people and the system is a database column, not a written procedure.** Every income transaction carries a review state: estimated, confirmed, or blank. The system pro-rates project tax across transactions as an estimate and marks it pending. Once the accountant enters the actual invoiced figure it becomes confirmed, and the system never touches it again.

## Making value measurable

| Instrument | What it produces |
| ---------- | ---------------- |
| **Earned value management** | Planned value, earned value and actual cost give realised gross margin on completed work, compared against the project's target margin as a status signal |
| **Eight buckets** | Income (unbilled, pending, receivable, received, plus overdue) and expenditure (unpaid, pending, payable, paid) as one state machine |
| **Three-stage contract value** | Estimated, signed and final amounts, with every variation recorded independently |
| **Cash-flow forecast** | Monthly projected closing balance from transaction billing and settlement dates |
| **Notification and weekly report** | 14 event types on daily and weekly schedules, with a de-duplication window |

The eight-bucket state machine is the single source behind project collection progress, company-level annual operating metrics, cash-flow forecasting and receivables ageing. Labour cost enters through timesheets converted at maintained cost rates.

One detail matters more than it looks: when timesheet data is too thin for earned value to be meaningful, project health displays **"insufficient data" rather than a red light.** Instrumentation that reports its own blind spots is what keeps people using it.

## AI layer: retrieval, not replacement

The firm's knowledge problem was never capability. It was that thirty years of precedent, internal rules and regulation sat somewhere nobody could reach under time pressure.

- **Retrieval-augmented Q&A** on Google Vertex AI, using a backend-for-frontend tool-calling architecture in which the model decides whether a search is needed and which kind, rather than retrieving blindly.
- **Hybrid search**: keyword (PostgreSQL FTS / pg_trgm) combined with semantic retrieval (Vertex AI Discovery Engine / pgvector). Every answer carries citations that link back to the source document.
- **Retrieval inherits the ERP permission scope.** The assistant can only surface what the person asking was already entitled to open.
- **Practice skills**: an implemented project-opening workflow covering site and regulatory data collection, requirement capture, quotation and contract, alongside regulatory assessment, project queries and design checks.
- Every call logs token usage, tool use, latency and cost.

## Architecture

| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| **Frontend**   | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui  |
| **Backend**    | FastAPI, SQLAlchemy (async), PostgreSQL, Alembic                  |
| **AI**         | Vertex AI (Gemini), Discovery Engine, Vercel AI SDK               |
| **Auth**       | Cloud IAP with Firebase Auth                                      |
| **Deployment** | Cloud Run, Cloud SQL, Cloud Scheduler, Cloud Build                |

Monorepo, with Feature-Sliced Design on the frontend and layered Clean Architecture / DDD on the backend. Path-filtered CI/CD pipelines deploy a `dev` branch to staging and `main` to production behind manual approval. Implementation spans 22 backend and 23 frontend modules.

## Where this leads

Building this system from inside the practice made one thing clear: the difficult part of construction software is not the software. Every hard decision here was organisational. Where to draw the boundary against the accountant's authority. Whether the permission model should reshape how the firm works or encode how it already works. Which numbers a system is allowed to overwrite, and which belong to a person.

The open questions are the ones I could only see from inside, and cannot answer from a single case:

- What separates a digital investment that reaches measurable business value from one that stalls after go-live?
- When does standardising a process across projects create value, and when does it destroy the local judgement the work depends on?
- How does a firm's stated strategic intent for a system diverge from how it is actually used, and what closes that gap?
