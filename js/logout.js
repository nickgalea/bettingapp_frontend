function logOut(){
$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/bettingapp/logOut',
			data: {
				'username' : getCookie("bettingapp_username")
			},
			error: function(data) {
				console.log(data);
			},
			success: function(data) {
				document.cookie = "bettingapp_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				location.href = "http://localhost:8080/bettingapp_frontend/login.html"
			}
		})

}