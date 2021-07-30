$(function() {

    const socket = io();

    const $messageForm = $("#message-form");
    const $messageBox = $("#message");
    const $chat = $("#chat");



    const $nickForm = $("#nickForm");
    const $nickError = $("#nickError");
    const $nickname = $("#nickname");

    const $users = $("#usernames");



    $nickForm.submit( e => {
        e.preventDefault();
        socket.emit("new user", $nickname.val(), data => {
            if(data) {
                $("#nickWrap").hide();
                $("#contentWrap").show();
            } else if ($nickname.val() == ""){
                $nickError.html (`
                <div class="alert alert-danger">
                    pone algo marmota
                </div>
                `);
            }
             else {
                $nickError.html (`
                    <div class="alert alert-danger">
                        Ya existe ese usuario pa
                    </div>
                    `);
            }
            $nickname.val("");
        });
    })



    $messageForm.submit (e => {
        e.preventDefault();
        socket.emit("send message", $messageBox.val());
        $messageBox.val("");
    });


    socket.on("new message", data => {
        $chat.append("<b>" + data.nick + "</b>: " + data.msg + "<br/>");
    });

    socket.on("usernames", data => {
        let html = "";
        for (let i = 0; i < data.length; i++){
            html += `<p><i class="fas fa-user"></i>${data[i]}</p>`
        }
        $users.html(html);
    })
})