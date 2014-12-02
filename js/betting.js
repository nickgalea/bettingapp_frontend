function hide_all_alerts(){
document.getElementById('alert_amounthigh').style.display = "none";
document.getElementById('alert_riskhigh').style.display = "none";
document.getElementById('alert_3bets').style.display = "none";
document.getElementById('alert_cumulative').style.display = "none";
document.getElementById('alert_success').style.display = "none";
}

function getbets(){
$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/bettingapp/getBets',
			data: {
				'username' : localStorage.getItem("bettingapp_username"),
			},
			error: function(jqXHR, textStatus, errorThrown) {
		  		},
			success: function(data) {
				console.log(data);
				if(data == "0_BETS")
				{
					console.log("No Bets");
					document.getElementById("bets_h1").innerHTML = "No Bets Yet!";
				}
				else
				{
					document.getElementById("bets_h1").innerHTML = "Your Current Bets";
					var bets = data.split("|");
					console.log(bets.length + " Bets");
					var table = document.getElementById("bets_table");
					while(table.rows.length > 1) {
					table.deleteRow(-1);
					}

					for (i = 0; i < bets.length; i++) {
					    bet = bets[i];
					    risk = bet.split(",")[0].toLowerCase();
					    amount = bet.split(",")[1];
					    console.log(risk + " " + amount);
						var row = table.insertRow(-1);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						var cell3 = row.insertCell(2);

						// Add some text to the new cells:
						cell1.innerHTML = i+1;
						cell2.innerHTML = risk.charAt(0).toUpperCase() + risk.slice(1);
						cell3.innerHTML = amount+"&#8364;";
					}
				}
			}
		})
}

$(document).ready(function(){
console.log(localStorage.getItem("bettingapp_username"));
getbets();
});


function placebet(){
hide_all_alerts();
console.log(localStorage.getItem("bettingapp_username"));
$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/bettingapp/placeBet',
			data: {
				'username' : localStorage.getItem("bettingapp_username"),
				'risk_level' : document.getElementById('input_risklevel').value,
				'amount' : document.getElementById('input_amount').value
			},
			error: function(jqXHR, textStatus, errorThrown) {
		  		},
			success: function(data) {
				console.log(data);
				if(data == "AMOUNT_TOO_HIGH")
				{
				document.getElementById('alert_amounthigh').style.display = "block";
				}
				if(data == "RISK_TOO_HIGH")
				{
				document.getElementById('alert_riskhigh').style.display = "block";
				}
				if(data == "3_BETS_ALREADY")
				{
				document.getElementById('alert_3bets').style.display = "block";
				}
				if(data == "CUMULATIVE_REACHED")
				{
				document.getElementById('alert_cumulative').style.display = "block";
				}
				if(data == "BET_PLACED")
				{
				document.getElementById('alert_success').style.display = "block";
				getbets();
				}
			}
		})
}