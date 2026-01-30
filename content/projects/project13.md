---
title: "Context-Aware Digital Twin Driven by Hybrid RAG"
subtitle: "WS2025/26 Fusion Lab - BIM-GIS Integration with AI-Powered Spatial Intelligence"
date: 2026-01-30
unit: "Chair of Computational Modeling and Simulation, School of Engineering and Design, TUM"
supervised: "Prof. Dr.-Ing. André Borrmann"
Contributors: " Pei-Ling Song, Meng-Ju Hsieh, Hongyu Jiang, Omar Haddadin, Mohamed Ali"
tags:
  [
    "Project",
    "BIM",
    "IFC",
    "Digital Twin",
    "Smart Building",
    "Data Science",
    "Machine Learning",
    "Munich, Germany",
  ]
image: "/images/pj13-1.png"
description: "An intelligent campus management platform integrating BIM and GIS data with LangGraph-based AI orchestration for booking, navigation, and spatial analysis services."
---

![Multi-Modal RAG System](/images/pj13-3.png)
_Figure 1. Hybrid Rag_

## Overview

This project explores a multi-modal RAG architecture for Digital Twin spatial reasoning. By synthesizing Neo4j-based IFC topologies, multi-version BIM comparisons, and PostGIS geospatial data, the framework enables context-aware AI interactions. The system integrates knowledge graph augmentation with vector similarity search to deliver precise reasoning across spatial, semantic, and temporal building data.

![Platform Architecture](/images/pj13-2.webp)
_Figure 2. System Architecture_

## Technical Data Structure

### Multi-Modal Data Storage

| Database                  | Purpose                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Neo4j (Graph DB)**      | IFC-based spatial topologies, relationships, real-time status, graph traversal for RAG |
| **PostGIS (Spatial SQL)** | Geospatial layers, building footprints, environmental analytics                        |
| **Vector DB**             | Semantic retrieval of documentation, historical reports, design intent                 |

![Neo4j Knowledge Graph](/images/pj13-1.png)
_Figure 3. Neo4j Knowledge Graph_

![Data Integration](/images/pj13-4.png)
_Figure 4. VC MAP for Geospatial Analysis_

### BIM-GIS Data Alignment

**Entity Anchoring:** Implementation of a deterministic crosswalk table linking BIM GUIDs (`GlobalId`) and GIS GUIDs (`UUID`) to ensure synchronization between topological attributes and geospatial geometries.

**Semantic Synthesis:** Employs LLM-powered property flattening and string serialization of material layers to bridge natural language queries with structured BIM data.

## System Architecture & Orchestration

### LangGraph Orchestrator

The system utilizes a **LangGraph Supervisor** for intelligent intent routing. It dynamically dispatches queries to specific data tools:

- **BIM Tool:** Cypher queries for graph-based topology and occupancy
- **GIS Tool:** Spatial SQL for geospatial analytics and proximity searches
- **RAG Tool:** Vector retrieval for document-based evidence

### Tech Stack

| Layer             | Technologies                                |
| ----------------- | ------------------------------------------- |
| **Frontend**      | Next.js, React, TypeScript, Tailwind CSS    |
| **Visualization** | CesiumJS (Geospatial), Speckle Viewer (BIM) |
| **Backend**       | Python 3.10+, FastAPI (Async)               |
| **ETL Pipeline**  | IfcOpenShell, QGIS/Python, LangChain        |

#### ETL Pipeline Details

| Component         | Function            |
| ----------------- | ------------------- |
| **IfcOpenShell**  | BIM data extraction |
| **QGIS / Python** | GIS processing      |
| **LangChain**     | Document chunking   |

## Versioning & Evolution

### Temporal Context Management

The platform manages the transition between building lifecycle stages through explicit graph relationships:

- **`EVOLVED_FROM` / `EVOLVED_TO`:** Bidirectional links that track the evolution of spaces (Merge, Split, Update, or Delete) between As-built and Proposed models.

- **Semantic Isolation:** Separates historical context from future design intent to prevent data contamination during AI reasoning and retrieval.
  ![Data Integration](/images/pj13-5.png)
  _Figure 5. Facade Paramatric Design_
