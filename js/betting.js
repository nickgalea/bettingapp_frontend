function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function hideAlerts(){
	document.getElementById('alert_errorMsg').style.display = "none";
	document.getElementById('alert_Success').style.display = "none";
}

function getbets(){
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/bettingapp/getBets',
		data: {
			'username' : getCookie("bettingapp_username"),
		},
		error: function(arguments) {
		},
		success: function(data) {
			console.log(data);
			
			if (data.length != 0) {
				// Refresh table
				var table = document.getElementById("bets_table");
				while(table.rows.length > 1) {
					table.deleteRow(-1);
				}
				// Add new data
				for (i = 0; i < data.length; i++) {
					bet = data[i];
					var row = table.insertRow(-1);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);

					// Add some text to the new cells:
					cell1.innerHTML = i+1;
					cell2.innerHTML = data[i].riskLevel;
					cell3.innerHTML = data[i].amount;
				}
			}
		}
	})
}

$(document).ready(function(){
	var username=getCookie("bettingapp_username");
	if (username=="") {
		location.href = "http://localhost:8080/bettingapp_frontend/loginfirst.html";
	} else {
		getbets();
	}
});

function placebet(){
	hideAlerts();
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/bettingapp/placeBet',
		data: {
			'username' : getCookie("bettingapp_username"),
			'risk_level' : document.getElementById('input_risklevel').value,
			'amount' : document.getElementById('input_amount').value
		},
		error: function(data) {
			var alertBlock = document.getElementById('alert_errorMsg');
			alertBlock.innerHTML = data.responseText;
			alertBlock.style.display = 'block';
		},
		success: function(data) {
			console.log(data);
			// Append data to table
			var table = document.getElementById("bets_table");
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);

			cell1.innerHTML = document.getElementById("bets_table").getElementsByTagName("tr").length - 1;
			cell2.innerHTML = document.getElementById('input_risklevel').value.toUpperCase();
			cell3.innerHTML = document.getElementById('input_amount').value;
			
			// Inform user that bet is successfully placed
			var alertBlock = document.getElementById('alert_Success');
			alertBlock.innerHTML = 'Bet Successfully Placed!';
			alertBlock.style.display = 'block';
		}
	})
}