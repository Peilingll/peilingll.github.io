---
title: "Indoor Ambient Monitoring"
subtitle: "Geo Sensor Web and the Internet of Things"
date: 2025-07-15
unit: "Chair of Geoinformatics, School of Engineering and Design, TUM"
supervised: "Univ.-Prof. Dr. rer. nat. Thomas H. Kolbe, Joseph Gitahi, M.Sc., Benedikt Schwab, M.Sc."
Contributors:  Pei-Ling Song, Meng-Ju Hsieh, Kit-Lung Chan
tags: ["Project", "IoT", "BIM", "Smart Building", "Digital Twin", "Munich, Germany"]
image: "/images/pj2-1.webp"
description: "This project is about developing an Indoor Ambient Monitoring system to manage and visualize human comfort relevant environmental parameters like temperature, humidity, illuminance, noise level, CO2 concentration, and others in an indoor environment. Further, the task is to study an insight on LoRaWAN Indoor Network Coverage."
---

## Introduction
This project is about developing an Indoor Ambient Monitoring system to manage and visualize human comfort relevant environmental parameters like temperature, humidity, illuminance, noise level, CO2 concentration, and others in an indoor environment. Further, the task is to study an insight on LoRaWAN Indoor Network Coverage.

![Dashboard](/images/pj2-1.webp)
*[Open Dashboard](https://xmruuu.github.io/25SS_IoT_Indoor-Ambient-Monitoring/)*

## Methods
The system architecture is divided into hardware and software components. On the hardware side, multiple indoor environmental sensors (measuring CO, PM2.5, temperature, humidity, etc.) transmit data via LoRa using the CayenneLPP encoding format through a LoRaWAN gateway to IoT cloud platforms such as TTN and SWM. On the software side, these platforms forward the data to the FROST Server via the standardized SensorThings API, where it is stored in MongoDB. Meanwhile, the semantic building model of TUM in CityGML LOD 3.0 is processed with FME and converted into Cesium-compatible 3D Tiles. Finally, JavaScript is used to fetch live or historical data from the FROST Server and MongoDB, integrating it into Cesium 3D visualizations and interactive dashboards for end-user applications.

![System Architecture](/images/pj2-2.webp)
*Figure 1. System Architecture*

## Sensor Architecture

![Sensor Architecture](/images/pj2-3.webp)
*Figure 2. Sensor Architecture*

**Required hardware:**

- Mainboard — 1× [Seeeduino LoRaWAN](https://wiki.seeedstudio.com/Seeeduino_LoRAWAN/)  
- Power — 1× [Battery 2000 mAh](https://akkuplus.de/Einzelzelle-634169-37-Volt-2000mAh-Li-Polymer) 
- Temperature, Humidity, Pressure and Air Quality — [BME680 Bosch I2C Bus](https://wiki.seeedstudio.com/Grove-Temperature_Humidity_Pressure_Gas_Sensor_BME680/)  
- PM2.5 & PM10 — [Grove HM3301](https://wiki.seeedstudio.com/Grove-Laser_PM2.5_Sensor-HM3301/) 
- CO, NO₂, C2H5CH and VOC — [Multichannel Gas Sensor V2](https://wiki.seeedstudio.com/Grove-Multichannel-Gas-Sensor-V2/)  

## Environmental Monitoring
We designed a 3D equipment box and fabricated it using 3D printing to protect our sensors. The system was deployed in the BIM Lab (Room 4170) and operated for one week of data collection (10–17 July).

![Sensor Deployment](/images/pj2-4.webp)
*Figure 3. Sensor Deployment*

![BIM lab Room 4170](/images/pj2-5.webp)
*Figure 4. BIM lab Room 4170*

## Validation of Dashboard Insights 
The dashboard aggregates a Cesium 3D context with time‑series charts and a comfort index, enabling spatiotemporal exploration of indoor conditions. Validation shows the system captures real‑world dynamics. A rain event on 16.07 aligns with a temperature drop and humidity spike; on 11–12.07, CO/NO₂ rise with occupancy/ventilation.

![Sensor Deployment](/images/pj2-6.webp)
*Figure 4. Rain event – temperature drop and humidity spike (UTC)*

![BIM lab Room 4170](/images/pj2-7.webp)
*Figure 5. Occupancy/ventilation – CO and NO₂ increase (UTC)*

## Conclusion 
Overall, we successfully established an IoT-based indoor environmental monitoring system utilizing the LoRaWAN network. The complete pipeline was implemented, from sensor deployment and data acquisition to server integration and visualization. Furthermore, we developed a platform to extract and process data from the FROST server and visualize it within the Cesium environment, supporting time-series analysis. The system enables real-time monitoring of key indoor environmental indicators (e.g., CO, VOC, and humidity), thereby providing valuable insights into building performance and occupant comfort.

## References
****
## References  

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[1] Petäjäjärvi, J., Mikhaylov, K., Roivainen, A., Hanninen, T., & Pettissalo, M. (2017). Evaluation of LoRa LPWAN technology for indoor remote health and wellbeing monitoring. <i>International Journal of Wireless Information Networks, 24</i>(2), 153–165. https://doi.org/10.1007/s10776-017-0341-8
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[2] Hsu, W.-L., Lin, C.-H., Wu, C.-T., Chiu, Y.-C., & Yeh, C.-H. (2020). Establishment of smart living environment control system. <i>Sensors and Materials, 32</i>(10), 3433–3447. https://doi.org/10.18494/SAM.2020.2919
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[3] Kim, M., Zhang, Y., & Brown, T. (2023). New low-cost sensing network for indoor environmental monitoring and control in buildings. <i>Energy and Buildings, 293</i>, 113173. https://doi.org/10.1016/j.enbuild.2023.113173
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[4] Yasin, A., Delaney, J., Cheng, C.-T., & Pang, T. Y. (2022). The design and implementation of an IoT sensor-based indoor air quality monitoring system using off-the-shelf devices. <i>Applied Sciences, 12</i>(18), 9450. https://doi.org/10.3390/app12189450
</div>

<div style="margin-bottom:0.8em; padding-left:2em; text-indent:-2em;">
[5] Pereira, P. F. da C., & Broday, E. E. (2021). Determination of thermal comfort zones through comparative analysis between different characterization methods of thermally dissatisfied people. <i>Buildings, 11</i>(8), 320. https://doi.org/10.3390/buildings11080320
</div>
