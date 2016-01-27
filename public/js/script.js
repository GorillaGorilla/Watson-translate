/**
 * Created by GB115151 on 20/01/2016.
 */

function run() {
    //get the input, append it to the end of a localhost URL and redirect the current window to this created URL.
    var input = document.getElementById('english-input').value;
    var newUrl = 'http://watson-translate.mybluemix.net/' + input;
    //window.location.href = newUrl;
    var d = {dummy : "data"};
    $.get("/help",d, function(data){
        $(".list").append('<div class="item">' + "Get request performed" + '</div>');
    });
}

