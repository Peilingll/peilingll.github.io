---
title: "Digital Twin × BIM × IoT"
subtitle: "Creating Comfortable and Energy-Efficient Indoor Environments with Machine Learning"
date: 2025-08-29
tags: ["Paper Review", "BIM", "IoT", "Digital Twin", "Machine Learning", "Munich, Germany"]
---

In the field of architecture, **“comfort” and “energy efficiency” are often seen as conflicting goals**. Heating, Ventilation, and Air Conditioning (HVAC) systems account for nearly **40% of a building’s total energy use**. Reducing energy consumption without compromising occupant comfort is therefore a complex and urgent challenge.  
  

I recently read and reviewed a study on a **Digital Twin (DT) + BIM + IoT framework**, where the key focus was:
  
  
➔ How to dynamically optimize indoor thermal comfort while reducing energy consumption through open-source platforms, real-time sensing, and machine learning.  



## Why a New Approach?  

- **Thermal comfort** is defined by ASHRAE as a psychological state of satisfaction with one’s environment.  
- The traditional **Predicted Mean Vote (PMV) model** is accurate but requires multiple real-time parameters (temperature, humidity, air speed, radiation, etc.), making it costly and impractical for large-scale deployment.  
- A simplified version, **sPMV**, only requires **temperature and humidity** while maintaining reasonable accuracy, making it much more suitable for IoT-based monitoring.  



## Research Framework  

The study adopted a **five-layer IoT architecture** (sensing, communication, support, application, and security):  

1. **Sensing**: ESP32 and DHT22 sensors monitored indoor and outdoor thermal parameters.  
2. **Transmission**: Data was sent via Wi-Fi to a Firebase cloud database.  
3. **Modeling**: Sensors were integrated into a Revit-based BIM model, then exported as IFC.  
4. **Visualization**: Using IFC.js, the DT platform displayed sensor data directly within the 3D model.  
5. **Machine Learning**: A hybrid forecasting model combining **Prophet** (for seasonality/trends) and **LSTM** (for temporal dependencies) predicted indoor conditions to support HVAC control.  


## Case Study  
 **Location**: Rawalpindi, Pakistan  

- Two IoT sensors were installed — one indoors in an office and one outdoors on a nearby residential building — following ANSI/ASHRAE standards.  
- A **LOD350 BIM model** was developed in Revit 2024, with sensors modeled as Revit families and connected to real-time data in the DT platform.  

This allowed comfort indices to be visualized directly in the model and dynamically forecasted.  


## Results and Highlights  

1. **Reliable data**: Sensor readings showed minimal deviation from calibrated thermistors.  
2. **sPMV validation**: Strong correlation with the PMV model (MAE = 0.29, RMSE = 0.37).  
3. **Machine Learning performance**:  
    - Prophet only → MAE = 0.788, R = 0.891  
    - Hybrid Prophet–LSTM → MAE = 0.29, R = 0.96 (much higher accuracy)  

Overall, the system successfully provided predictive insights to support HVAC optimization in real time.  



## Contributions & Significance  

1. **Cross-domain integration**: BIM × IoT × Digital Twin × ML in one platform.  
2. **Open-source and cost-effective**: Feasible for large-scale deployment and compatible with existing Building Management Systems (BMS).  
3. **Practical modeling**: sPMV requires only two input parameters for real-time comfort evaluation.  
4. **Smarter HVAC**: The hybrid ML model significantly improves predictive control.  

## Overall
This study shows how **Digital Twins and AI** can transform buildings into **more energy-efficient, user-centered environments**, offering both comfort and sustainability.Challenges remain such as power supply, network stability, and data security — but this framework demonstrates strong potential for **smarter, more sustainable building management**. 


## Reference  
****

{{< apa 
   number="1"
   author="Iqbal, F., & Mirzabeigi, S." 
   year="2025" 
   title="Digital twin-enabled building information modeling–Internet of Things (BIM-IoT) framework for optimizing indoor thermal comfort using machine learning" 
   journal="Buildings" 
   volume="15" 
   issue="10" 
   pages="1584" 
   doi="https://doi.org/10.3390/buildings15101584" 
>}}
