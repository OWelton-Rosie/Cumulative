        // Warn the user if they try to leave the page
        window.addEventListener('beforeunload', function (event) {
            // You can customize the message or leave it empty
            const confirmationMessage = "Are you sure you want to leave? Your progress might be lost.";
            
            // Standardize the warning message across browsers
            event.returnValue = confirmationMessage; // For most modern browsers
            return confirmationMessage; // For some older browsers
        });