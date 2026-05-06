# Logging Middleware & Microservices

This repository contains the solutions for the microservice development challenge, broken down into three main components:

## 1. Logging Middleware
A reusable `logger.js` file at the root directory that handles sending structured application logs to an external API endpoint.
- **File**: `logger.js`
- **Usage**: Included in the other services to automatically log execution state, successes, and errors.

## 2. Vehicle Maintenance Scheduler
An Express-based microservice that solves the Knapsack problem. It fetches depots and vehicles data from a protected API, calculates the maximum operational impact score achievable within a given total mechanic-hours budget, and returns the list of optimal tasks to be executed.
- **Location**: `/vehicle_maintanance_scheduler`
- **How to run**:
  ```bash
  cd vehicle_maintanance_scheduler
  node index.js
  ```
- **How to test**: 
  1. Open Postman.
  2. Send a `GET` request to `http://localhost:3000/run-scheduler`.
  3. Under the Headers tab, add `Authorization` as the key and your JWT token (e.g., `Bearer YOUR_TOKEN`) as the value.

## 3. Campus Notifications Microservice (Priority Inbox)
A script that dynamically fetches user notifications, adds a priority weight based on the notification type (`Placement` > `Result` > `Event`), sorts them by weight and recency, and returns the top `N` notifications.
- **Location**: `/notification_app_be`
- **How to run**:
  ```bash
  cd notification_app_be
  node priority_inbox.js <YOUR_TOKEN> <N>
  ```
  *(Example: `node priority_inbox.js eyJhbGci... 15` to get the top 15 notifications)*

## Setup
Make sure you have Node.js installed. Run the following command in the root folder to install dependencies:
```bash
npm install
```
