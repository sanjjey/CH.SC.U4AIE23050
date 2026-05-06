const express = require("express");
const Log = require("../logger.js");
const app = express();
app.use(express.json());

async function fetchDepots(authHeader) {
    let response = await fetch("http://20.207.122.201/evaluation-service/depots", {
        headers: { "Authorization": authHeader }
    });
    let result = await response.json();
    console.log("Depots API result:", result);
    return result.depots;
}

async function fetchVehicles(authHeader) {
    let response = await fetch("http://20.207.122.201/evaluation-service/vehicles", {
        headers: { "Authorization": authHeader }
    });
    let result = await response.json();
    console.log("Vehicles API result:", result);
    return result.vehicles;
}

app.get("/run-scheduler", async (req, res) => {
    try {
        await Log("Scheduler", "INFO", "VehicleScheduler", "Incoming request to run-scheduler");

        let authHeader = req.headers.authorization;
        let depotsData = await fetchDepots(authHeader);
        let vehiclesData = await fetchVehicles(authHeader);

        await Log("Scheduler", "INFO", "VehicleScheduler", `Fetched ${depotsData?.length} depots and ${vehiclesData?.length} vehicles`);

        let totalDuration = 0;
        for (let i = 0; i < depotsData.length; i++) {
            totalDuration = totalDuration + depotsData[i].MechanicHours;
        }

        let totalVehicles = vehiclesData.length;
        let dpArray = [];

        for (let i = 0; i <= totalVehicles; i++) {
            dpArray[i] = [];
            for (let j = 0; j <= totalDuration; j++) {
                dpArray[i][j] = 0;
            }
        }

        for (let i = 1; i <= totalVehicles; i++) {
            let currentCar = vehiclesData[i - 1];
            for (let j = 1; j <= totalDuration; j++) {
                if (currentCar.Duration <= j) {
                    let takeIt = currentCar.Impact + dpArray[i - 1][j - currentCar.Duration];
                    let leaveIt = dpArray[i - 1][j];

                    if (takeIt > leaveIt) {
                        dpArray[i][j] = takeIt;
                    } else {
                        dpArray[i][j] = leaveIt;
                    }
                } else {
                    dpArray[i][j] = dpArray[i - 1][j];
                }
            }
        }

        let maxImpact = dpArray[totalVehicles][totalDuration];
        let chosenTasks = [];
        let leftOverHours = totalDuration;

        for (let i = totalVehicles; i > 0; i--) {
            if (dpArray[i][leftOverHours] !== dpArray[i - 1][leftOverHours]) {
                let currentCar = vehiclesData[i - 1];
                chosenTasks.push(currentCar.TaskID);
                leftOverHours = leftOverHours - currentCar.Duration;
            }
        }

        let maxDuration = totalDuration - leftOverHours;

        await Log("Scheduler", "SUCCESS", "VehicleScheduler", `Successfully scheduled ${chosenTasks.length} tasks`);

        res.json({
            status: "success",
            duration: maxDuration,
            impactScore: maxImpact,
            tasksToDo: chosenTasks
        });

    } catch (error) {
        await Log("Scheduler", "ERROR", "VehicleScheduler", `Failed with error: ${error.message}`);
        res.json({ error: "Something went wrong", message: error.message });
    }
});

app.listen(3000, () => {
    console.log(`Server is running in ${3000}`);
});
