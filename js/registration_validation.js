$(document).ready(function(){
  $("#inputName").change(function(){

	  var str = document.getElementById('inputName').value;
	  var patt = new RegExp("^[ A-z]+$");
	  var res = patt.test(str);
	  if(!res)
		  document.getElementById('firstname_alert').style.display = "block";
	  else
		  document.getElementById('firstname_alert').style.display = "none";
  });
});

$(document).ready(function(){
	  $("#inputSurname").change(function(){

		  var str = document.getElementById('inputSurname').value;
		  var patt = new RegExp("^[ A-z]+$");
		  var res = patt.test(str);
		  if(!res)
			  document.getElementById('surname_alert').style.display = "block";
		  else
			  document.getElementById('surname_alert').style.display = "none";
	  });
	});

$(document).ready(function(){
	  $("#inputPassword").change(function(){

		  var str = document.getElementById('inputPassword').value;
		  if(str.length<8)
			  document.getElementById('password_alert').style.display = "block";
		  else
			  document.getElementById('password_alert').style.display = "none";
	  });
	});

$(document).ready(function(){
	  $("#inputDate").focusout(function(){
	  var str = document.getElementById('inputDate').value;
	  var date_arr = str.split("-");
	  var dob_y = parseInt(date_arr[0]);
	  var dob_m = parseInt(date_arr[1]);
	  var dob_d = parseInt(date_arr[2]);

	  var today = new Date();
	  var today_d = today.getDate();
	  var today_m = today.getMonth()+1;
	  var today_y = today.getFullYear();

	  if (today_y - dob_y < 18) {
		  document.getElementById('dob_alert').style.display = "block";
		} else if (today_y - dob_y == 18)
			if(dob_m > today_m)
			{
				 document.getElementById('dob_alert').style.display = "block";
			}
			else if((dob_m == today_m)&&(dob_d>today_d))
			{
				document.getElementById('dob_alert').style.display = "block";
			}
			else
				document.getElementById('dob_alert').style.display = "none";
		else
			document.getElementById('dob_alert').style.display = "none";

	  });
});

$(document).ready(function(){
	  $("#inputCVV").change(function(){

		  var str = document.getElementById('inputCVV').value;
		  var patt = new RegExp("^[0-9]+$");
		  var res = patt.test(str);
		  if((!res)||(str.length!=3))
			  document.getElementById('cvv_alert').style.display = "block";
		  else
			  document.getElementById('cvv_alert').style.display = "none";
	  });
	});

$(document).ready(function(){
	  $("#inputExpiry").focusout(function(){
	  var str = document.getElementById('inputExpiry').value;
	  var date_arr = str.split("-");
	  var exp_y = parseInt(date_arr[0]);
	  var exp_m = parseInt(date_arr[1]);

	  var today = new Date();
	  var today_m = today.getMonth()+1;
	  var today_y = today.getFullYear();

	  if (today_y > exp_y) {
		  document.getElementById('expiry_alert').style.display = "block";
		} else if (today_y == exp_y)
			if(today_m > exp_m)
			{
				 document.getElementById('expiry_alert').style.display = "block";
			}
			else
				document.getElementById('expiry_alert').style.display = "none";
		else
			document.getElementById('expiry_alert').style.display = "none";

	  });
});


function luhnalgorithm(value) {
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

$(document).ready(function(){
	  $("#inputCreditCard").change(function(){
	  var cc_numb = document.getElementById('inputCreditCard').value;

	  if (cc_numb.charAt(0)==4) {
			// Visa
			if ((cc_numb.length == 13 || cc_numb.length == 16)&&(luhnalgorithm(cc_numb))) {
				document.getElementById('creditcard_alert').style.display = "none";
			} else {
				document.getElementById('creditcard_alert').style.display = "block";
			}
	  }

	  else if (cc_numb.charAt(0)==3) {
		  //American Express
		  if((cc_numb.length == 15)&&(cc_numb.charAt(1)==4 || cc_numb.charAt(1)==7)&&(luhnalgorithm(cc_numb))){
			  document.getElementById('creditcard_alert').style.display = "none";
		  }
		  else document.getElementById('creditcard_alert').style.display = "block";
	  }

	  else if (cc_numb.charAt(0)==5) {
		  //American Express
		  if((cc_numb.length == 16)&&(cc_numb.charAt(1)>=1 && cc_numb.charAt(1)<=5)&&(luhnalgorithm(cc_numb))){
			  document.getElementById('creditcard_alert').style.display = "none";
		  }
		  else document.getElementById('creditcard_alert').style.display = "block";
	  }
	  else document.getElementById('creditcard_alert').style.display = "block";



	  });
});

function isformvalid(){
var still_incorrect = false;

if($(password_alert).is(":visible")||$(firstname_alert).is(":visible")||$(surname_alert).is(":visible")||$(dob_alert).is(":visible")||$(creditcard_alert).is(":visible")||$(expiry_alert).is(":visible")||$(cvv_alert).is(":visible"))
	still_incorrect = true;

if(document.getElementById('inputUsername').value == ""||document.getElementById('inputPassword').value == ""||document.getElementById('inputName').value == ""||document.getElementById('inputSurname').value == ""||document.getElementById('inputDate').value == ""||document.getElementById('inputCreditCard').value == ""||document.getElementById('inputExpiry').value == ""||document.getElementById('inputCVV').value == "")
	still_incorrect = true;

if(still_incorrect)
	alert("Some Data is Still Incorrect");
else {

	var rad_val;
	// get list of radio buttons with specified name
	var radios = document.getElementsByName('usertypeoptions');

	    // loop through list of radio buttons
	    for (var i=0, len=radios.length; i<len; i++) {
	        if ( radios[i].checked ) { // radio checked?
	            rad_val = radios[i].value; // if so, hold its value in val
	            break; // and break out of for loop
	        }
    }

	$.ajax({

		type: 'POST',
		url: 'http://localhost:8080/bettingapp/registerUser',
		data: {
			'username' : document.getElementById('inputUsername').value,
			'password' : document.getElementById('inputPassword').value,
			'name' : document.getElementById('inputName').value,
			'surname' : document.getElementById('inputSurname').value,
			'dob' : document.getElementById('inputDate').value,
			'user_type' : rad_val,
			'ccNumber' : document.getElementById('inputCreditCard').value,
			'ccExpiry' : document.getElementById('inputExpiry').value,
			'cvv' : document.getElementById('inputCVV').value
		},
		error: function(jqXHR, textStatus, errorThrown) {
			location.href = "http://localhost:8080/bettingapp_frontend/register_fail.html";
		},
		success: function() {
			location.href = "http://localhost:8080/bettingapp_frontend/register_success.html";
		}

	})

}
}