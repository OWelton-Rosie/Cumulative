function addSolveTimeBox() {
    const container = document.getElementById("solveTimesContainer");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "mm:ss:ms";
    input.className = "solveTime";
    input.oninput = checkTimeLimit;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
}

function timeToSeconds(timeStr) {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
        const [minutes, seconds] = parts;
        return parseFloat(minutes) * 60 + parseFloat(seconds);
    } else if (parts.length === 3) {
        const [minutes, seconds, milliseconds] = parts;
        return parseFloat(minutes) * 60 + parseFloat(seconds) + parseFloat(milliseconds) / 1000;
    }
    return parseFloat(timeStr) || 0;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.round((seconds % 1) * 100);
    
    return `${padZero(minutes)}:${padZero(remainingSeconds)}:${padZero(milliseconds, 2)}`;
}

function padZero(number, length = 1) {
    return String(number).padStart(length, '0');
}

function checkTimeLimit() {
    const timeLimit = timeToSeconds(document.getElementById("timeLimit").value.trim());
    const inputs = document.querySelectorAll(".solveTime");
    const times = Array.from(inputs).map(input => timeToSeconds(input.value.trim()));
    
    let totalTime = 0;
    for (let time of times) {
        totalTime += time;
        if (totalTime > timeLimit) {
            const excessTime = totalTime - timeLimit;
            document.getElementById("result").innerHTML = `Cumulative time limit exceeded by ${formatTime(excessTime)}!<br>Total cumulative time: ${formatTime(totalTime)}.`;
            document.getElementById("result").style.color = "red";
            return;
        }
    }
    
    // If within the limit, show how much time is left before reaching the limit
    const timeLeft = timeLimit - totalTime;
    document.getElementById("result").innerHTML = `Within limit. Time remaining: ${formatTime(timeLeft)}.<br>Total cumulative time: ${formatTime(totalTime)}.`;
    document.getElementById("result").style.color = "green";
}

// Add three solve time boxes by default
window.onload = function() {
    for (let i = 0; i < 3; i++) {
        addSolveTimeBox();
    }
};
