      function addSolveTimeBox() {
            const container = document.getElementById("solveTimesContainer");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "mm:ss.sss";
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
            }
            return parseFloat(timeStr) || 0;
        }

        function checkTimeLimit() {
            const timeLimit = timeToSeconds(document.getElementById("timeLimit").value.trim());
            const inputs = document.querySelectorAll(".solveTime");
            const times = Array.from(inputs).map(input => timeToSeconds(input.value.trim()));
            
            let totalTime = 0;
            for (let time of times) {
                totalTime += time;
                if (totalTime > timeLimit) {
                    document.getElementById("result").innerText = `Cumulative time limit exceeded! Total cumulative time: ${totalTime.toFixed(3)} seconds.`;
                    document.getElementById("result").style.color = "red";
                    return;
                }
            }
            document.getElementById("result").innerText = `Within limit. Total cumulative time: ${totalTime.toFixed(3)} seconds.`;
            document.getElementById("result").style.color = "green";
        }

        // Add three solve time boxes by default
        window.onload = function() {
            for (let i = 0; i < 3; i++) {
                addSolveTimeBox();
            }
        };