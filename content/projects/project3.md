---
title: "Tree Species Classification"
subtitle: "Data Science in Earth Observation"
date: 2025-07-21
unit: "Chair of Data Science in Earth Observation, School of Engineering and Design, TUM"
supervised: "Prof. Dr. Xiaoxiang Zhu, Dr. Muhammad Shahzad, Dr. Andrés Camero Unzueta"
Contributors: Pei-Ling Song, Meng-Ju Hsieh, Hongyu Jiang, Hoi-Wang Lo, Kit-Lung Chan
tags: ["Research", "Machine Learning", "Earth Observation", "Data Science", "Munich, Germany"]
image: "/images/pj3-1.webp"
description: "The aim of this project is to classify dominant tree species across Germany by leveraging satellite image time series. Forest management practices benefit from knowledge of species distribution, which supports site-adapted tree selection and climate-resilient forest planning."
---

## Introduction
The aim of this project is to classify dominant tree species across Germany by leveraging satellite image time series. Forest management practices benefit from knowledge of species distribution, which supports site-adapted tree selection and climate-resilient forest planning. Tree species labels in the TreeSatAI dataset are organised hierarchically (leaf type, genus, species), allowing us to develop classification methods that exploit this structure to improve model performance. We integrate Sentinel-2 multi-spectral imagery (10 spectral bands, 5 vegetation indices) into a data processing pipeline that extracts monthly composites (March–October 2022) and generates 5×5 pixel patches for each reference point. We trained and evaluated five classification models: Random Forest, XGBoost, Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), and Transformer architectures.Hierarchical labels (L1, L2) significantly improved accuracy both traditional machine learning and deep learning models(CNN, RNN). Furthermore, data augmentation with rotation and translation enhanced the generalisation ability of deep learning models. Among all methods, XGBoost achieved the highest test accuracy (83.6%)

![Dashboard](/images/pj3-1.webp)
*Figure 1. EDA - Tree Species Sample Distribution in Germany*

## Project Report

<div class="not-prose" 
     style="margin-top: 0.5rem; max-width: 1200px; margin-left: auto; margin-right: auto; padding-left: 2rem; padding-right: 2rem; width: 100%;">
  
  <!-- 方法1: iframe 嵌入 -->
  <iframe src="/documents/25SS_DSEO_Report.pdf" 
          width="100%" 
          height="600px" 
          style="border: 1px solid #ddd; border-radius: 8px;"
          title="Project Report PDF">
    <p>Your browser does not support PDF preview. Please <a href="/documents/25SS_DSEO_Report.pdf" target="_blank">click here to download the full report</a>.</p>
  </iframe>
  
  <!-- 備用下載連結 -->
  <div style="text-align: center; margin-top: 1rem;">
    <a href="/documents/25SS_DSEO_Report.pdf" 
       target="_blank" 
       style="color: #7e6afc; text-decoration: underline;">
      Download Full Report
    </a>
  </div>
  
</div>

*In respect of publication policies and team contributions, only the sections authored by me are shared.*