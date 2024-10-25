// Camera setup
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const capturedImage = document.getElementById('capturedImage');

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error("Error accessing camera: ", err);
        alert("Unable to access camera. Please upload the ID manually.");
    });

// Capture the image when the button is clicked
captureButton.addEventListener('click', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Convert the canvas image to a data URL
    const imageDataUrl = canvas.toDataURL('image/png');
    capturedImage.src = imageDataUrl;
    capturedImage.style.display = 'block';  // Show the captured image

    // Optionally, save the image data to a hidden input field for form submission
    const hiddenImageInput = document.createElement('input');
    hiddenImageInput.type = 'hidden';
    hiddenImageInput.name = 'uploadedID';  // Ensure this matches your EmailJS template
    hiddenImageInput.value = imageDataUrl; // Use this for sending
    document.getElementById('brgyForm').appendChild(hiddenImageInput);
});

// Function to send the email with EmailJS
function sendEmail(formData) {
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById("brgyForm").reset(); // Reset the form after successful submission
            capturedImage.style.display = 'none'; // Hide captured image
            document.getElementById("successMessage").style.display = "block"; // Show success message
        }, (error) => {
            console.error('FAILED...', error);
            alert('Failed to send the email. Please try again.');
        });
}

// Form validation and submission
function validateForm() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var contact = document.getElementById("contact").value;
    var email = document.getElementById("email").value; // Ensure this input is present in your form
    var applicationType = document.getElementById("applicationType").value;
    var purpose = document.getElementById("purpose").value;
    var date = document.getElementById("date").value;
    var capturedImageSrc = capturedImage.src; // Get the src from capturedImage

    // Validate all fields
    if (name === "" || address === "" || contact === "" || email === "" || applicationType === "" || purpose === "" || (capturedImageSrc === "") || date === "") {
        alert("Please fill all the required fields.");
        return false;
    }

    // Prepare form data to send
    var formData = {
        name: name,
        address: address,
        contact: contact,
        email: email,
        applicationType: applicationType,
        purpose: purpose,
        date: date,
        uploadedID: capturedImageSrc // Ensure this matches your EmailJS template
    };

    // Send the email
    sendEmail(formData);

    return false; // Prevent default form submission
}

// Attach the validateForm function to your form's submit event
document.getElementById('brgyForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
    validateForm();
});

