---
title: "BIM.Fundamentals Modeling Task"
subtitle: "Building Information Modeling Fundamentals "
date: 2025-05-16
unit: " Chair of Computing in Civil and Building Engineering, School of Engineering and Design, TUM"
supervised: "Prof. Dr.-Ing. André Borrmann, Prof. Dr.-Ing. Sebastian Esser"
Contributors: Personal Work 
tags: ["Project", "Architecture", "Semantic", "BIM", "Munich, Germany"]
image: "/images/pj7-2.webp"
description: "This project was part of the SS25 BIM Fundamental Course, aimed at developing a deeper understanding of the potential of Building Information Modeling (BIM) and the structure of the IFC schema. The assignment required us to create a semantically enriched and detailed BIM model."
---

## Introduction

This project is the core practical assignment for the "BIM.Fundamentals" course in the Summer Term 2025 at the Technical University of Munich (TUM), School of Engineering and Design. The project aims to deeply explore the potential of Building Information Modeling (BIM) and to master the IFC data schema.

This task requires the creation of a detailed, semantically enriched BIM model that adheres to specific shape requirements. The model's structure, appearance, and material definitions must be strictly defined, ensuring semantic accuracy and data consistency throughout the development process.

## Technical and Execution

This model strictly adheres to multiple technical specifications, focusing on the logic and framework of IFC data:

### **IFC Spatial Structure**
- Established a compliant spatial structure breakdown
- Contains: **IfcProject**,**IfcSite**, **IfcBuilding**, **IfcBuildingStoreys**, **IfcSpaces**

### **Core Building Components**
- Fully implemented necessary building elements
- Contains: **Walls**, **Windows** , **Columns**, **Doors**, **Beams**, **Roof**, **Slabs**, **Stairs** 

### **Semantic Information**

Accurately attached semantic attributes to enhance model intelligence:

- **`LoadBearing`** (True/False) attribute:
  - Applied to load-bearing components (walls, beams, columns)
  - Ensures proper structural analysis and design verification

- **`IsExternal`** (True/False) attribute:
  - Defined for walls and doors
  - Distinguishes between internal and external elements
  - Supports energy analysis and building performance evaluation

- **`IfcSpaces` properties**:
  - All space objects have meaningful names
  - Each space includes an `Area` property in its property sets
  - Enables accurate space area calculations and documentation

### **Specific Design Requirements**

- **High-ceiling hall**: 
  - Designed a training/conference hall spanning at least two stories
  - Demonstrates multi-level spatial modeling capabilities

- **Non-structural glazing facade**:
  - Applied to one side of the building
  - Showcases curtain wall system implementation

- **Furniture placement**:
  - Placed appropriate furniture on at least two stories
  - Ensured zero geometric clashes with building elements

### **Deliverable Standards**

- Format: IFC 4 Reference View Model View Definition (MVD)
- Quantities: Base Quantities exported (volume and area)
- Scope: Complete coverage for all building objects and spaces

![Dashboard](/images/pj7-3.webp)
*Figure 1. Open IFC Viewer*

<div class="not-prose" 
     style="display: flex; gap: 1rem; margin: 1rem auto; width: 80%; justify-content: center;">
  <div style="flex: 1; text-align: center;">
    <img src="/images/pj7-1.webp" alt="Dashboard" style="width:100%; border-radius: 8px;" />
    <p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: 0.5rem; text-align: center;">
      Figure 2. Exterior View
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/images/pj7-2.webp" alt="Dashboard" style="width:100%; border-radius: 8px;" />
    <p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: 0.5rem; text-align: center;">
      Figure 3. Interior View
    </p>
  </div>
</div>