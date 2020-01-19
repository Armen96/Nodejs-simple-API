$(document).ready(function(){
    var socket = io.connect('http://127.0.0.1:4205');

    $.get('/get_chatters', function(response) {
        $('.chat-info').text("There are currently " + response.length + " people in the chat room");
        chatter_count = response.length; //update chatter count
    });

    $('#join-chat').click(function() {
        const username = $.trim($('#username').val());
        $.ajax({
            url: '/join',
            type: 'POST',
            data: {
                username: username
            },
            success: function(response) {
                if (response.status == 'OK') { //username doesn't already exists
                    socket.emit('update_chatter_count', {
                        'action': 'increase'
                    });
                    $('.chat').show();
                    $('#leave-chat').data('username', username);
                    $('#send-message').data('username', username);
                    $.get('/get_messages', function(response) {
                        if (response.length > 0) {
                            let message_count = response.length;
                            let html = '';
                            for (let x = 0; x < message_count; x++) {
                                html += "<li class='user list-group-item'>" + response[x]['sender'] + ': '+ response[x]['message'] + "</li>";
                            }
                            $('.messages-list').prepend(html);
                        }
                    });
                    $('.join-chat').hide(); //hide the container for joining the chat room.
                } else if (response.status == 'FAILED') { //username already exists
                    alert("Sorry but the username already exists, please choose another one");
                    $('#username').val('').focus();
                }
            }
        });
    });

    $('#leave-chat').click(function() {
        var username = $(this).data('username');
        $.ajax({
            url: '/leave',
            type: 'POST',
            dataType: 'json',
            data: {
                username: username
            },
            success: function(response) {
                if (response.status == 'OK') {
                    socket.emit('message', {
                        'username': username,
                        'message': username + " has left the chat room.."
                    });
                    socket.emit('update_chatter_count', {
                        'action': 'decrease'
                    });
                    $('.chat').hide();
                    $('.join-chat').show();
                    $('#username').val('');
                    alert('You have successfully left the chat room');
                }
            }
        });
    });

    $('#send-message').click(function() {
        var username = $(this).data('username');
        var message = $.trim($('#message').val());
        $.ajax({
            url: '/send_message',
            type: 'POST',
            dataType: 'json',
            data: {
                'username': username,
                'message': message
            },
            success: function(response) {
                if (response.status == 'OK') {
                    socket.emit('message', {
                        'username': username,
                        'message': message
                    });
                    $('#message').val('');
                }
            }
        });
    });

    $('#remove-chat-messages').click(function() {
        $.ajax({
            url: '/remove',
            type: 'POST',
            success: function(response) {
                if (response.status == 'OK') {
                    socket.emit('remove');
                }
            }
        });
    });


    socket.on('send', function(data) {
        const username = data.username;
        const message = data.message;
        const html = "<li class='user list-group-item'>" + username + ': '+ message + "</li>";
        $('.messages-list').prepend(html);
    });

    socket.on('count_chatters', function(data) {
        if (data.action == 'increase') {
            chatter_count++;
        } else {
            chatter_count--;
        }

        $('.chat-info').text("There are currently " + chatter_count + " people in the chat room");
    });

    socket.on('message_removed', function () {
        $('.messages-list').empty();
    })
});
