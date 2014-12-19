function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function alertTimeout(wait){
    setTimeout(function(){
        document.getElementById('alert').style.display = "none";
    }, wait);
}

function alertTimeout1(wait){
    setTimeout(function(){
        document.getElementById('alert_invalid').style.display = "none";
    }, wait);
}

function login(){

	if(document.getElementById('inputUsername').value == ""||document.getElementById('inputPassword').value == "") {
		document.getElementById('alert').style.display = "block";
		alertTimeout(2000);
	} else {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/bettingapp/loginUser',
			data: {
				'username' : document.getElementById('inputUsername').value,
				'password' : document.getElementById('inputPassword').value
			},
			error: function(data) {
				document.getElementById('alert_invalid').style.display = "block";
				alertTimeout1(3000);
			},
			success: function(data) {
				setCookie("bettingapp_username", document.getElementById('inputUsername').value, 10);
				location.href = "http://localhost:8080/bettingapp_frontend/betting_screen.html";
			}
		})
	}
}