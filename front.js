document.getElementById("startButton").addEventListener("click", function() {
    // Add a transition effect when the button is clicked
    document.querySelector(".content").style.animation = "fadeOut 1s ease-in-out";

    // After animation, redirect to form page
    setTimeout(function() {
        window.location.href = "form.html"; // Link to the form page
    }, 1000); // 1 second delay for the fade-out animation
});

// Fade-out animation keyframe (injected by JavaScript)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(style);