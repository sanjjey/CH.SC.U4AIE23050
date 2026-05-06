async function Log(stack, level, package, message) {
    let payload = {
        stack: stack,
        level: level,
        package: package,
        message: message
    };

    try {
        await fetch("http://20.207.122.201/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
    }
}

module.exports = Log;
