---
title: "Real-Time Building Digital Model Reconstruction Using a Robotic Agent"
subtitle: "Software Lab"
date: 2025-07-18
unit: "Chair of Computational Modeling and Simulation
TUM Department of Civil, Geo and Environmental Engineering
Technical University of Munich"
supervised: "Prof. Dr.-Ing. André Borrmann/ Mohammad Reza Kolani/ Mansour Mehranfar/ CMS "
Contributors: Pei-Ling Song, Anisha Sinha, Anoushk Kolagotla, Kit Lung Chan
tags: ["Project", "Point Cloud", "Simulation", "Semantic", "Robotics", "Munich, Germany"]
image: "/images/pj1-4.webp"
description: "The project is designed to capture and process real-time spatial data of the built environment by integrating advanced sensing technologies, such as LiDAR and an RGB-D camera, onto a robotic platform."
---

## Introduction
The project is designed to capture and process real-time spatial data of the built environment by integrating advanced sensing technologies, such as LiDAR and an RGB-D camera, onto a robotic platform. These sensors work in unison to collect high-quality spatial and visual data, which is then seamlessly streamed using the Robot Operating System (ROS). ROS facilitates the efficient handling of sensor data, enabling real-time processing through advanced algorithms that reconstruct the environment's geometry with precision. By combining robotics, state-of-the-art sensors, advanced point cloud processing techniques, and real-time computation, the project aims to provide accurate and dynamic spatial mapping solutions, offering a robust foundation for appli￾cations in fields such as architecture, urban planning, and autonomous navigation.

![Dashboard](/images/pj1.gif)
*Figure 1. Go2 System Trial conducted in the corridors outside Room 4171 at TUM campus*

## Methodology


1. **Device Setup**  
   The Unitree Go2 robot is equipped with a LiDAR sensor and an onboard mini-PC, enabling autonomous navigation and real-time data acquisition.  

2. **Real-Time Data Processing**  
   - **Data Collection**: Capturing raw point cloud data of the built environment.  
   - **Preprocessing**: Applying semantic segmentation to classify and refine spatial elements.  
   - **Transformation**: Converting segmented data into structured geometric models.  

3. **Export**  
   The reconstructed model is exported in IFC format, ensuring interoperability with BIM workflows and downstream applications in architecture, engineering, and construction.  

![Dashboard](/images/pj1-1.webp)
*Figure 2. Methodology*

## Device Setup
<div class="not-prose" 
     style="display: flex; gap: 1rem; margin: 1rem auto; width: 80%; justify-content: center;">
  <div style="flex: 1; text-align: center;">
    <img src="/images/pj1-2.webp" alt="Dashboard" style="width:100%; border-radius: 8px;" />
    <p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: 0.5rem; text-align: center;">
      Figure 3. Connection Diagram – Go2 SLAM System
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/images/pj1-3.webp" alt="Dashboard" style="width:100%; border-radius: 8px;" />
    <p style="color: gray; font-style: italic; font-size: 0.875rem; margin-top: 0.5rem; text-align: center;">
      Figure 4. ROS2-Rviz Viewe
    </p>
  </div>
</div>


## Data Collection 
![Dashboard](/images/pj1-4.webp)
*Figure 5. Point Cloud from Field Survey Trial*

## Data Processing  

### Semantic Segmentation Framework

1. **View Generation**  
   The raw point cloud is randomly cropped and masked to produce global, local, and masked views, allowing the model to learn from incomplete spatial perspectives.  

2. **Dual Encoder Framework**
   
   Two encoders based on **Point Transformer V3 (PTv3)** are trained in parallel, with weights synchronized through **Exponential Moving Average (EMA)** to ensure stable convergence.  

3. **Self-Distillation**  
   Reference and query encoders align their features using **Sinkhorn-Knopp Centering**, producing consistent embeddings for robust representation learning.  


The resulting learned features provide a strong foundation for accurate and efficient semantic segmentation of complex 3D environments.
![Dashboard](/images/pj1-5.webp)
*Figure 6. Semantic segmentation preprocessing*  


### Point Cloud Classification

We implement a **semantic segmentation pipeline** to classify point cloud data of the built environment. The process begins with subsampling the raw point cloud and estimating surface **normals using KNN**. **Floor and ceiling surfaces** are then automatically extracted by analyzing normal orientations and clustering points with **DBSCAN** to form large planar regions. The **remaining points** are classified using a deep learning model trained on the **ScanNet-20 dataset**, predicting semantic categories such as **walls, furniture, and doors**.  Finally, the results are merged and exported as a **classified PLY file**, providing a structured and interpretable 3D representation.  


![Dashboard](/images/pj1-6.webp)
*Figure 7. Semantic segmentation preprocessing*

### Geometric Modeling
In this step, we generate a simplified 3D model from point cloud data. For floors, we use RANSAC to reduce noise and focus on the main surface. For walls—we apply DBSCAN clustering to g separate disconnected wall segments and use interquartile range (IQR) filtering to remove Z-axis outliers. Next, split the XY plane into grids. and an axis-aligned bounding box is generated for each cell. Then, these bounding boxes are used to build the 3D geometry model and export it as an OBJ file. In the next phase, we plan to convert it to an IFC 

![Dashboard](/images/pj1-7.webp)
*Figure 8. Geometric Modeling*

## Future Work

- **Integrate door and window classification**  
  Detect and label fixtures for richer BIM outputs.  

- **Full Geometry-to-IFC Pipeline**  
  Convert extracted primitives into **IfcWall**, **IfcSlab**, and **IfcFurnishingElements** automatically.  

- **Real-Time Process Orchestration**  
  Stream SLAM > Segmentation > Bounding-box fitting > IFC export in a single workflow.  

- **Hardware Upgrade: Camera Fusion**  
  Combine LiDAR with RGB/depth cameras for improved coverage and texture capture.  

## References
****

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[1] Dong, S., Xu, K., Zhou, Q., Tagliasacchi, A., Xin, S., Nießner, M., & Chen, B. (2019). Multi-robot collaborative dense scene reconstruction. <i>ACM Transactions on Graphics (TOG), 38</i>(4), 1–16. https://doi.org/10.1145/3306346.3322997
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[2] Xu, K., Zheng, L., Yan, Z., Yan, G., Zhang, E., Nießner, M., Deussen, O., Cohen-Or, D., & Huang, H. (2017). Autonomous reconstruction of unknown indoor scenes guided by time-varying tensor fields. <i>ACM Transactions on Graphics (TOG), 36</i>(6), 1–14. https://doi.org/10.1145/3130800.3130830
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[3] Liu, L., Xia, X., Sun, H., Shen, Q., Xu, J., Chen, B., Huang, H., & Xu, K. (2018). Object-aware guidance for autonomous scene reconstruction. <i>ACM Transactions on Graphics (TOG), 37</i>(4), 1–11. https://doi.org/10.1145/3197517.3201376
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[4] Mehranfar, M., Braun, A., & Borrmann, A. (2024). From dense point clouds to semantic digital models: End-to-end AI-based automation procedure for Manhattan-world structures. <i>Automation in Construction, 162,</i> 105392. https://doi.org/10.1016/j.autcon.2024.105392
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[5] Franz, S., Irmler, R., & Rüppel, U. (2018). Real-time collaborative reconstruction of digital building models with mobile devices. <i>Advanced Engineering Informatics, 38,</i> 569–580. https://doi.org/10.1016/j.aei.2018.07.004
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[6] Gao, X., Zhang, S., Liu, Y., et al. (2024). A new framework for generating indoor 3D digital models from point clouds. <i>Remote Sensing, 16</i>(18), 3462. https://doi.org/10.3390/rs16183462
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[7] Segal, A., Haehnel, D., & Thrun, S. (2009). Generalized-ICP. In <i>Robotics: Science and Systems</i> (Vol. 2, No. 4). https://doi.org/10.15607/RSS.2009.V.021
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[8] Ali, M. K., Hussain, A., Chen, X., et al. (2019). Multi-sensor depth fusion framework for real-time 3D reconstruction. <i>IEEE Access, 7,</i> 136471–136480. https://doi.org/10.1109/ACCESS.2019.2942145
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[9] Chair of Computational Modeling and Simulation. (n.d.). Mobile machinery lab. Technical University of Munich (TUM). https://www.cms.bgu.tum.de
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[10] Pan, Y. (2023). Creating an information-rich digital twin of indoor environments by interpretation and fusion of image and point-cloud data (Doctoral dissertation, Technische Universität München). https://mediatum.ub.tum.de
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[11] Mohanarajah, G., Usenko, V., Singh, M., D’Andrea, R., & Waibel, M. (2015). Cloud-based collaborative 3D mapping in real time with low-cost robots. <i>IEEE Transactions on Automation Science and Engineering, 12</i>(2), 423–431. https://doi.org/10.1109/TASE.2014.2368991
</div>

