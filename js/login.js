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

	if(document.getElementById('inputUsername').value == ""||document.getElementById('inputPassword').value == "")
	{
		document.getElementById('alert').style.display = "block";
		alertTimeout(2000);
	}
		else
		{
			$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/bettingapp/loginUser',
			data: {
				'username' : document.getElementById('inputUsername').value,
				'password' : document.getElementById('inputPassword').value
			},
			error: function(jqXHR, textStatus, errorThrown) {
		  		console.log(textStatus, errorThrown)
		  		document.getElementById('alert_invalid').style.display = "block";
				alertTimeout1(5000);
		  		},
			success: function() {
				localStorage.setItem("bettingapp_username", document.getElementById('inputUsername').value);
				location.href = "http://localhost:8080/bettingapp_frontend/betting_screen.html"
			}
		})
	}
}