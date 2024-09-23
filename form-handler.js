// Ensure the configuration file is loaded first
// emailjs-config.js must be loaded before this script in your HTML file

// Initialize EmailJS with the public key from the configuration

(function(){
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Add event listener to the send button
document.getElementById('contact-form').addEventListener('submit', function(event) {

    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;

    // Send the email using EmailJS
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
        from_firstname: firstName,
        from_lastname: lastName,
        from_email: email,
        message: description
    }).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);

        // Display success message with SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Your message has been sent successfully.',
            confirmButtonText: 'OK',
            background: 'white',
            color: '#06044B',
            customClass: {
                title: 'geologica-font',
                popup: 'geologica-font',
                confirmButton: 'swal2-custom-confirm-button',
            }
        });

        // Clear the form fields
        document.getElementById('contact-form').reset();

    }, function(error) {
        console.log('FAILED...', error);
        // alert("Failed to send the message. Please try again later.");

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to send the message. Please try again later.',
            confirmButtonText: 'OK',
            background: 'white',
            color: '#06044B',
            customClass: {
                title: 'geologica-font',
                popup: 'geologica-font',
                confirmButton: 'swal2-custom-confirm-button',
            }
        });
    });
});
