---
title: Adapter le modèle objet de vos sites pour inclure la snotion d'activités
description: Dans cet article vous ferez évoluer le modèle objet de vos sites pour inclure la notion de découpage par activités. Ceci vous permettra de vous rapprocher de la réalité du site tout en respectant le format de déclaration du Dispositi Eco Energie Tertiaire.
author: Gaspard Leblanc
date: 2024-10-06 11:33:00 +0800
categories: [DEET, sites]
tags: [sites,json,object]
pin: true
math: true
mermaid: true
image:
  path: /pictures/test_saba.jpg
  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Reflexion du modèle objet "site" dans le cadre d'une démarche d'Energy Management

---

## Contexte

Dans le cadre d'une démarche d'Energy Management à travers la donnée, il est nécessaire de mettre en place un modèle objet permettant de refléter la réalité de vos actifs. En effet la virtualisation de votre partimoine permet le rattachement des données de consommations qui sont essentielles à la mis en place d'une Démarche de Management Energétique

## Philosophie

Pour chacune des données rensignées il est nécessaire de se poser la question: où est-elle utilisée ? Si la réponse est inconnue alors le champ n'est pas nécessaire.

L'objet *site* faisant parti du Patrimoine, il touche l'ensemble de l'écosystème applicatif. Ce dernier étant amené à se compléxifer progressivement au fur et à mesure des développements, il est nécessaire que le site soit basé sur le même fonctionnement. Partant dans un premier temps d'un MVP, nous itérerons avec de nouveaux développement qui rajouteront des possibilités dans l'objet site. **Il est cependant essentiel qu'un utilisateur puisse créer un site avec seulement les données nécessaires au MVP**

## MVP

Le Minimum Viable Product est le produit le plus simple qui permet d'apporter de la valeur au client. Dans le cas du patrimoine, il est difficile d'apporter de la valeur sans rattacher les consommations. 

L'objectif est donc de miser sur la simplicité de remplissage des données et l'enrichissement de ces dernière pour introduire la notion de consommation rattachée au bâti. Pour celà nous combinerons deux approches:
- Les données OpenData disponibles à partir de la géolocalisation
- Les données de la plateforme OPERAT à partir de la typologie d'activité

Photo d'OPERAT

## Modèle objet

Afin de répondre aux besoins du MVP, le modèle objet du site doit être le suivant

``` json
{
  "code": "S0001",
  "name": "Site de test",
  "typology": [
    {
      "activity": "Bureaux",
      "subactivity": "Bureaux Standards",
      "startDate": "2020-01-01",
      "endDate": "",
      "surface": 1642.7
    },
    {
      "activity": "Sport",
      "subactivity": "Gymnase",
      "startDate": "2020-01-01",
      "endDate": "2023-06-30",
      "surface": 645.2
    },
  ],
  "adress": "88 avenue du général Leclerc",
  "postCode": "92100",
  "city": "Boulogne-Billancourt",
  "geoposition": {
    "latitude": 42.482696,
    "longitude": 3.782532,
    "altitude": 87.3
  },
  "distributors": {
    "electricity": ["Enedis"],
    "gas": ["GRDF", "Gaz de Bordeaux"]
  },
  "weather_station": "096428642O",
  "hdd_avg": 639,
  "cdd_avg": 32,
  "climate_zone": "H1c",
  "consumption": 56789
}
````
Fin du code
