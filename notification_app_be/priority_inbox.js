async function startPriorityInbox() {
    try {
        let rawToken = process.argv[2] || "";
        let n = parseInt(process.argv[3]) || 10;
        
        let authHeader = rawToken;
        if (!authHeader.startsWith("Bearer ")) {
            authHeader = "Bearer " + rawToken;
        }
        
        let req = await fetch("http://20.207.122.201/evaluation-service/notifications", {
            headers: { "Authorization": authHeader }
        });
        let resData = await req.json();
        
        if (resData.message) {
            console.log("API Error:", resData.message);
            return;
        }
        
        let allNotifs = resData.notifications || [];
        
        for (let i = 0; i < allNotifs.length; i++) {
            let singleNotif = allNotifs[i];
            if (singleNotif.Type === "Placement") {
                singleNotif.weight = 3;
            } else if (singleNotif.Type === "Result") {
                singleNotif.weight = 2;
            } else if (singleNotif.Type === "Event") {
                singleNotif.weight = 1;
            } else {
                singleNotif.weight = 0;
            }
        }
        
        allNotifs.sort((a, b) => {
            if (a.weight !== b.weight) {
                return b.weight - a.weight;
            } else {
                let timeOne = new Date(a.Timestamp).getTime();
                let timeTwo = new Date(b.Timestamp).getTime();
                return timeTwo - timeOne;
            }
        });
        
        let finalTopN = [];
        for (let j = 0; j < n; j++) {
            if (allNotifs[j] !== undefined) {
                finalTopN.push(allNotifs[j]);
            }
        }
        
        console.log(`Top ${finalTopN.length} Notifications:`, finalTopN);
        return finalTopN;
        
    } catch (err) {
        console.error("Oops! Something went wrong:", err.message);
    }
}

startPriorityInbox();
