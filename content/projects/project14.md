---
title: "Sunhou Intranet: An Integrated Enterprise System for Architectural Practice"
subtitle: "Design, implementation and deployment of ERP, project control and knowledge retrieval in a 35-person practice"
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
description: "An integrated ERP, project-control and knowledge system designed and deployed within a 35-person architectural practice, examined as a case of how a construction firm converts software investment into measurable margin visibility."
---

## Context and Scope

Sunhou Intranet is an operations system I designed and implemented for a 35-person architectural practice operating two legal entities. It has been in production use within the firm since 2025.

Prior to its deployment, the firm's operational information was distributed across shared drives, spreadsheets, low-code mobile applications and paper records. The system consolidates these sources into a single database governed by a single permission model, and adds a retrieval layer based on large language models above it.

The practice operates across six case types: architectural design, interior design and change of use, project management, heritage conservation, building appraisal, and public safety inspection. Each carries a distinct document set, billing basis and delivery rhythm. The requirement to accommodate all six within one system accounts for the majority of its structural decisions.

![Sunhou Intranet home dashboard](/images/pj14-2.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 1. Home dashboard: announcements, milestones and calendar in one view.
</p>

## Investment Rationale and the Limits of Scope

The rationale for the investment did not concern productivity. It concerned observability: **cost attribution depended on individual recollection**, gross margin became known only at project closure, and management decisions proceeded without current financial data.

The scope was therefore defined restrictively. The system is an internal instrument for project margin management, not a statutory accounting system. Legal authority over the accounts remains with the firm's accountant; the system is accountable for management-level visibility and cost attribution, not for the general ledger.

This boundary was the first decision taken and the determining constraint on those that followed. It excluded the implementation from a compliance scope it was not equipped to satisfy, and it specified precisely which form of value the investment was answerable for delivering.

## Structural Tensions in Implementation

Three trade-offs recurred throughout development. Each was resolved through structure rather than through procedural rules.

### Standardisation and Local Variation

Project state is modelled in two layers. **Five principal phases** (initiation, planning, execution, monitoring, closure) each expand into a sub-phase sequence determined by delivery method: design-bid-build, project and construction management, or design-build.

A single state machine consequently describes both a conventional design and supervision commission and an integrated design-build contract. No workflow is duplicated per case type, and no case type is constrained to a sequence that misrepresents its actual delivery.

![Project record with the five-phase state indicator](/images/pj14-3.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 2. Project record, with the five principal phases shown across every case type.
</p>

### Enterprise Integration and Project-Level Autonomy

Authorisation operates on two independent axes, neither nested within the other:

| Layer                            | Roles                                                       |
| -------------------------------- | ----------------------------------------------------------- |
| **Company** (mutually exclusive) | Super admin, Administrator, Finance administrator, User      |
| **Project** (assigned per case)  | Project manager / Project architect, Finance owner, Member   |

A designer may hold no company-level authority while holding full editing rights over the project they lead, and may occupy a different role on the next project. The administrator role deliberately excludes company financial editing.

This structure was not devised for the system. It **formalises the practice already established on the firm's shared drives**, where each project maintained its own folder and membership list under the control of that project's lead. The model adopted was the arrangement that already governed the work.

![User management and access control model](/images/pj14-5.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 3. Access control: company roles, project roles and titles as separate dimensions.
</p>

### Strategic Intent and Operational Practice

Two design principles govern the boundary between system authority and user authority.

**Amounts constitute the user's record; percentages are derived values.** When a contract value is revised, the system does not alter any claim amount previously entered by a user. It recalculates the corresponding claim percentage and leaves the uncovered difference to be resolved explicitly. No value confirmed by a user is overwritten.

**The division of responsibility between user and system is encoded as a database field rather than as written procedure.** Every income transaction carries a review state: estimated, confirmed, or unfilled. The system apportions project tax across transactions as an estimate and marks it pending review. Once the accountant enters the invoiced figure, the record is confirmed and the system does not revise it again.

## Instrumentation of Financial Performance

| Instrument                       | Output                                                                                                                            |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Earned value management**      | Planned value, earned value and actual cost yield realised gross margin on completed work, assessed against the project's target |
| **Eight-state transaction model** | Income (unbilled, pending, receivable, received, with an overdue condition) and expenditure (unpaid, pending, payable, paid)     |
| **Three-stage contract value**   | Estimated, contracted and final amounts, with each variation recorded independently                                              |
| **Cash-flow projection**         | Monthly closing balance derived from transaction billing and settlement dates                                                    |
| **Scheduled reporting**          | Fourteen notification event types on daily and weekly cycles, subject to a de-duplication window                                  |

![Project monitoring: earned value against milestone schedule](/images/pj14-4.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 4. Project monitoring: progress, income and expenditure on one milestone axis.
</p>

![Project financial information](/images/pj14-6.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 5. Project finances, decomposed into the eight transaction states.
</p>

The eight-state model is the single source underlying project collection progress, company-level annual operating indicators, cash-flow projection and receivables ageing analysis. Labour cost enters through timesheet entries converted at maintained cost rates.

![Operating indicators: cross-project anomaly summary](/images/pj14-8.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 6. Operating indicators: cross-project progress and financial anomalies.
</p>

![Company financial analysis and cash-flow forecast](/images/pj14-7.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 7. Company-level annual statistics and three-month cash-flow forecast.
</p>

Where timesheet data is insufficient for earned value to carry meaning, project health reports **insufficient data rather than an adverse status signal**. Instrumentation that declares the limits of its own evidence sustains confidence more reliably than instrumentation that returns a value irrespective of input quality.

![Generated weekly report](/images/pj14-9.webp)

<p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: -0.5rem; text-align: center;">
Figure 8. Scheduled weekly report: receivables ageing, cash-flow trend and lagging projects.
</p>

## Retrieval-Augmented Knowledge Layer

The firm's knowledge constraint was never one of competence. Thirty years of precedent, internal regulation and statutory reference remained distributed across repositories that could not be searched under operational time pressure.

- **Retrieval-augmented question answering** on Google Vertex AI, using a backend-for-frontend tool-calling architecture in which the model determines whether retrieval is required and which method applies, rather than retrieving indiscriminately.
- **Hybrid retrieval** combining keyword search (PostgreSQL FTS / pg_trgm) with semantic search (Vertex AI Discovery Engine / pgvector). Every response carries citations resolving to the source document.
- **Retrieval inherits the ERP authorisation scope.** The assistant can surface only material the requesting user was already entitled to access.
- **Domain skills** organised as discrete methodological units, including an implemented project initiation workflow covering site and regulatory data collection, requirement capture, quotation and contract, alongside regulatory assessment, project enquiry and design verification.
- Token consumption, tool invocation, latency and cost are logged per call.

## Technical Architecture

| Layer          | Technology                                                       |
| -------------- | ---------------------------------------------------------------- |
| **Frontend**   | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend**    | FastAPI, SQLAlchemy (async), PostgreSQL, Alembic                 |
| **AI**         | Vertex AI (Gemini), Discovery Engine, Vercel AI SDK              |
| **Auth**       | Cloud IAP with Firebase Auth                                     |
| **Deployment** | Cloud Run, Cloud SQL, Cloud Scheduler, Cloud Build               |

The repository is a monorepo, applying Feature-Sliced Design on the frontend and layered Clean Architecture with domain-driven design on the backend. Path-filtered continuous integration deploys the `dev` branch to staging and `main` to production subject to manual approval. The implementation comprises 22 backend and 23 frontend modules.

## Status

The system is operational within the firm across project management, financial control, knowledge retrieval and AI assistance. Work in progress includes bidirectional calendar synchronisation, semantic search via pgvector, completion of practice-specific formulae within the domain skills, and an audit log for data revision.
