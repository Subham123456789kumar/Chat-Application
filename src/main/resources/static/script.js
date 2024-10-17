var stompClient = null;

function sendMessage() {
    let messageContent = $("#message-value").val();
    let imageFile = $("#image-input")[0].files[0]; // Get the selected file

    if (stompClient) {
        let jsonOb = {
            name: localStorage.getItem("name"),
            content: messageContent,
        };

        if (imageFile) {
            // Create a FileReader to convert the image to base64
            let reader = new FileReader();
            reader.onloadend = function() {
                jsonOb.imageUrl = reader.result; // Store the base64 string in the JSON object
                stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
                clearInputs(); // Clear inputs after sending
            }
            reader.readAsDataURL(imageFile); // Convert to base64
        } else {
            stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
            clearInputs(); // Clear inputs after sending
        }
    } else {
        console.error("stompClient is not connected.");
    }
}

function clearInputs() {
    $("#message-value").val(""); // Clear the input field after sending
    $("#image-input").val("");   // Clear image input after sending
}

function connect() {
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log("Connected: " + frame);

        $("#name-form").addClass('d-none');
        $("#chat-room").removeClass('d-none');

        // Subscribe to the topic
        stompClient.subscribe("/topic/return-to", function(response) {
            showMessage(JSON.parse(response.body));
        });
    }, function(error) {
        console.error("Connection error: " + error);
    });
}

function showMessage(message) {
    let messageHtml = `<tr><td><b>${message.name}:</b> ${message.content}</td></tr>`;
    
    // If the message contains an image URL, display the image
    if (message.imageUrl) {
        messageHtml += `<tr><td><img src="${message.imageUrl}" alt="Image" style="max-width: 100%;"></td></tr>`;
    }

    $("#message-container-table").prepend(messageHtml);
}

$(document).ready(() => {
    $("#login").click(() => {
        let name = $("#name-value").val();

        if (name) {
            localStorage.setItem("name", name);
            $("#name-title").html(`Welcome, <b>${name}</b>`);
            connect();
        }
    });

    $("#send-btn").click(() => {
        sendMessage();
    });

    $("#logout").click(() => {
        localStorage.removeItem("name");
        
        if (stompClient !== null) {
            stompClient.disconnect();
            console.log("Disconnected");
        }

        $("#name-form").removeClass('d-none');
        $("#chat-room").addClass('d-none');
    });
});
