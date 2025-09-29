---
title: "Constraints Design in Timber Modular Process"
subtitle: "24' AEC Hackathon Munich"
date: 2024-11-09
unit: "AEC HACKATHON & TUM Venture Lab Built Environment"

Contributors: Pei-Ling Song | Meng-Ju Hsieh | Wanlin Zhang  & in collaboration with Drees & Sommer
tags: ["Project","Prefabrication","Modular Design","BIM","AEC", "Munich, Germany"]
image: "/images/pj6-1.webp"
description: "This project, initiated by Drees & Sommer, addresses inefficiencies in timber modular prefabrication caused by late design changes and misaligned parameters. We proposed a Constraint Design (CD) model, introducing an intermediate abstract layer that integrates manufacturing and MEP requirements early in the design phase. By embedding constraints upfront, the approach reduces redesign efforts, improves collaboration and efficiency."
---

## Introduction
This project was developed during the **[2024 AEC Hackathon Munich](https://hackaec.com/events.html)** and collabrated with  [TUM Venture Lab Built Environment](https://www.tum-venture-labs.de/labs/built-environment/). We proposed a **Constraint Design (CD)** model, introducing an intermediate abstract layer that integrates manufacturing and MEP requirements early in the design phase. By embedding constraints upfront, the approach reduces redesign efforts, improves collaboration and efficiency..  

## Hackathon Topics
The challenge from **[Drees & Sommer](https://www.dreso.com/de/)** focused on timber modular design, where misaligned details between designers and manufacturers often cause costly redesigns. Our goal was to create an **abstract intermediate model** that simplifies data exchange and coordination.  
![Dashboard](/images/pj6-6.webp)
*Figure 1. Overview of the main challenge (sourced from Drees & Sommer)*

## Solution Concept 
Based on this challenge, we proposed the **Constraint Design (CD) model**, drawing inspiration from Constraint Programming in computer science and AI. The core idea of Constraint Programming is to find feasible or optimal solutions within given constraints. The CD model eliminates the complexity of ATD’s iterative communication while retaining the influence of all stakeholders’ constraints on the design process. These constraints are centralized for designers to consider comprehensively, simplifying the workflow, enhancing feasibility, and increasing integration.   
![Dashboard](/images/pj6-1-1.webp)
*Figure 2. Constraint Design Model (sourced from Drees & Sommer)*

## Original Model 
To simplify early design, complex BIM geometry is abstracted into bounding boxes generated through mesh analysis. By extracting key features from meshes (vertex points, normals, and face indices), both solid and hollow regions can be represented in simplified form. This approach allows constraints from different stakeholders to be applied directly to bounding boxes, improving communication and flexibility in the timber modular process. 
![Dashboard](/images/pj6-10.webp)
*Figure 3. The formation process of the original model through mesh analysis*

## Constraints Integration with Speckle 
The model is connected to the Speckle platform, a collaborative data hub that enables real-time exchange across different BIM tools. Similar to GitHub for AEC data, Speckle supports version control and structured data management, allowing designers, manufacturers, and MEP stakeholders to add and synchronize constraints seamlessly.  
![Dashboard](/images/pj6-9.webp)
*Figure 4. The process of data storage and reconstruction in Speckle.*


## Revit Plug-In as Prototype
We built a Python-based Revit plug-in using pyRevit to implement the Constraint Design model. One function converts design entities into bounding-box models for constraint integration via Speckle, while the other retrieves and visualizes modified constraints directly in Revit through the Speckle API and uses GraphQL (Graph Query Language) to query from structured data, and employs Python's Json API to retrieve data from the web interface and return it to the plugin script. This enables real-time collaboration between designers and manufacturers.
![Dashboard](/images/pj6-11.webp)
*Figure 5. The process of data storage and reconstruction in Speckle.*

## Application Scenario
The bounding box contains the diameter of a hole, with the designer initially setting the hole diameter to "10mm." However, the manufacturer's machine tool can only provide a hole of size less than "8mm," so the bounding box dimensions are adjusted by manufacturer. This new bounding box is visualized on the designer's end, prompting the designer to adjust the hole diameter to the new range. When multiple constraints (for example the MEP planner suggests a diameter of more than “9mm”) exist for an object, the designer must further consider constraint conflict.
![Dashboard](/images/pj6-12.webp)
*Figure 6. Comparison of models between Speckle (left) and Revit (right) interfaces.*

## Conclusion

In summary, Constraint Design serves as an intermediary abstraction layer between design and manufacturing. By integrating bounding boxes with the collaborative infrastructure of Speckle, this approach enhances coordination efficiency, reduces rework, and fosters more transparent communication across stakeholders. Looking forward, the framework holds potential to integrate real-time visualization, process automation, and machine learning, paving the way for greater digitalization and intelligence in the AEC industry.


## Further Development
Future improvements include:  
- Solving **data loss issues** in Speckle/IFC transfer.  
- Adding **agile and real-time collaboration** features.  
- Enhancing **transparency** through live visualization.  
- Moving toward **automation and intelligent conflict resolution** with machine learning.  
