# Project Prompts Log

This document records all user prompts provided throughout the development of the **ParkSG** (Singapore Carpark Tracker) application.

---

## Prompt 1: Initial Application Build (Frontend)

```text
build a singapore based carpark tracker application that tracks real time carpark lot availabilities. build just the front end for now. i will integrate te backend connection later.
```

---

## Prompt 2: GitHub Push Request

```text
git push https://<GITHUB_TOKEN>@github.com/amkgal/lta-carpark-tracker.git
```

---

## Prompt 3: Serverless LTA DataMall Integration

```text
1. add a serverless connection that pulls live data from LTA's datamall using the following endpoints: 

# Live carpark lots (HDB + LTA + URA):
https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2

# All requests need the header:  AccountKey: 

2. store this in /api folder (at project root level)
- include a /health.ts and /carparkavailability.ts
- do not hardcode any keys, I will include them later.
```

---

## Prompt 4: GitHub Push Verification

```text
git push https://<GITHUB_TOKEN>@github.com/amkgal/lta-carpark-tracker.git
```

---

## Prompt 5: Collate Prompts

```text
collate all the prompts into filename prompt.md in the /api folder.
```
