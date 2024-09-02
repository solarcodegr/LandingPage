// Ensure the configuration file is loaded first
// emailjs-config.js must be loaded before this script in your HTML file

// Initialize EmailJS with the public key from the configuration
(function(){
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Add event listener to the send button
document.getElementById('send-button').addEventListener('click', function() {
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
        alert("Your message has been sent!");
    }, function(error) {
        console.log('FAILED...', error);
        alert("Failed to send the message. Please try again later.");
    });
});
