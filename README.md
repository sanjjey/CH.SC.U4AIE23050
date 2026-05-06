# Logging Middleware & Microservices

The solutions for the microservice development challenge are included in this repository, which is divided into three parts:

## 1. Logging Middleware
Root-level `logger.js` file that can be reused for sending structured application logs to an external API endpoint.
- **File**: `logger.js`
- **Usage**: Logged automatically, based on execution state, successes and errors.

## 2. Vehicle Maintenance Scheduler
A microservice written with the help of Express for the Knapsack problem. It pulls depots and vehicles data from a protected API, and then works out the highest possible impact score that can be achieved over a determined number of mechanic-hours and outputs the list of optimal tasks to execute.
- **Location**: `/vehicle_maintanance_scheduler`
- **How to run**:
  ```bash
  cd vehicle_maintanance_scheduler
  node index.js
  ```
- **How to test**: 
  1. Open Postman.
  2. Now make a `GET` request to `http://localhost:3000/run-scheduler`.
  3. On the Headers tab, put `Authorization` as the key and your JWT token (e.g., `Bearer YOUR_TOKEN`) as the value.

## 3. Notify students of class activities in the priority inbox on campus.
Script that fetches user notifications dynamically, assigns a priority weight to each notification, based on the type of notification (notifications can be of type Placement, Result or Event), sorts them by priority weight and recency, and returns top N notifications from the sorted list.
- **Location**: `/notification_app_be`
- **How to run**:
  ```bash
  cd notification_app_be
  node priority_inbox.js <YOUR_TOKEN> <N>
  ```
  *(Example: `node priority_inbox.js eyJhbGci... 15` to get the top 15 notifications)*

## Setup
Make sure you have Node.js installed. In the root folder, run the following command to install dependencies:
```bash
npm install
```
