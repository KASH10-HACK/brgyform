function validateForm() {
    // Add your form validation logic here if needed
    return true; // Return true to proceed with form submission
}

document.getElementById('brgyForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    const params = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        contact: document.getElementById("contact").value,
        email: document.getElementById("email").value, // Get email value
        applicationType: document.getElementById("applicationType").value,
        purpose: document.getElementById("purpose").value,
        date: document.getElementById("date").value,
    };

    // Send email using EmailJS
    emailjs.send('service_xhqs5f9', 'template_qrshdtr', params)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Email Sent Successfully!");

            // Optionally show the success message
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("brgyForm").reset(); // Reset the form
        }, function(error) {
            console.log('FAILED...', error);
            alert("There was an error sending the email. Please try again later.");
        });
}
