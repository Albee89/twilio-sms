document.getElementById('smsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const to = document.getElementById('to').value;
    const message = document.getElementById('message').value;

    sendSMS(to, message);
});

function sendSMS(to, message) {
    const accountSid = {TWILIO_ACCOUNT_SID};
    const authToken = {AUTH_TOKEN};

    const body = {
        To: to,
        From: '+12565635105',
        Body: message
    };

    fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
        },
        body: new URLSearchParams(body)
    })
    .then(response => {
        if (response.ok) {
            alert('SMS sent successfully!');
        } else {
            alert('Failed to send SMS');
        }
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        alert('Failed to send SMS');
    });
}
