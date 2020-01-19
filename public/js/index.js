const API_URL = 'http://127.0.0.1:4205/api';

$(document).ready(function () {
    /**
     * Test in docker kubernetes create 10000 users in the same time*****
     */
    $('.create-user-btn').click(function () {
        for (let i = 0; i < 1000; i++) {
            const user = {
                name: '',
                email: '',
                password: ''
            };

            const randomNumber = Math.ceil(Math.random() * 10000);

            user.name = generateRandomString(7);
            user.email = `${user.name}-${randomNumber}@gmail.com`;
            user.password = 'secret';

            $.ajax({
                url: API_URL+'/users',
                type: "POST",
                data: user ,
                success: function (response) {
                    console.log(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        }
    });

    $('.search-user-btn').click(function () {
        const searchResult = $('#search').val();

        $.ajax({
            url: API_URL+'/users/search?name=' + searchResult + '',
            type: "GET",
            success: function (response) {
                updateUserTableList(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    $.ajax({
        url: API_URL+'/users',
        type: "GET",
        success: function (response) {
            if(response) {
                updateUserTableList(response);

                $('#dtBasicExample').DataTable({
                    "paging": false, // false to disable pagination (or any other option)
                    "searching": false
                });
                $('.dataTables_length').addClass('bs-select');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});

function updateUserTableList(response) {
    $('.user-table').empty();

    for (let user of response) {
        const userLine = $("<tr>" +
            "<td>"+ user.name +"</td>" +
            "<td>"+ user.email +"</td>" +
            "<td>"+ user.password +"</td>" +
            "</tr>"
        );

        $('.user-table').append(userLine);
    }
}

function generateRandomString(length) {
    let result           = '';
    const characters       = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
