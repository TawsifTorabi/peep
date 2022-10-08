		
		var button = document.getElementById('buttonSbmt');
		var nameinput = document.getElementById('name');
		var email = document.getElementById('email');
		var pass = document.getElementById('pass');
		var confpass = document.getElementById('confpass');
		
		button.setAttribute("onmouseover","flyAway()");
		button.setAttribute("disabled","");
		
		var InputArr = [nameinput, email, pass, confpass];
		
		for(var i=0; i < InputArr.length; i++){
			InputArr[i].addEventListener("keyup", function(){
				Validate();
			});
			InputArr[i].addEventListener("change", function(){
				Validate();
			});
		}
		
		function resetButtonStyle(){
			button.classList.remove("naughtyBtnGoRight");
			button.classList.remove("naughtyBtnGoLeft");
			button.removeAttribute("disabled","");
		}

		function flyAway(){
			if(button.classList.contains("naughtyBtnGoRight") == false){   
				button.classList.remove("naughtyBtnGoLeft");
				button.classList.add("naughtyBtnGoRight");
			}else{
				button.classList.add("naughtyBtnGoLeft");
				button.classList.remove("naughtyBtnGoRight");
			}
		}

		function formEnabled(msg){
			notificDiv.style.display = "inline-block";
			notificDiv.style.background = "limegreen";
			notification.innerHTML = msg;
			button.removeAttribute("onmouseover");
			resetButtonStyle();
		}
		
		function formDisabled(msg){
			notificDiv.style.display = "inline-block";
			notification.innerHTML = msg;
			notificDiv.style.background = "crimson";
			button.setAttribute("onmouseover","flyAway()");
			button.setAttribute("disabled","");
		}
		
		document.onload= function(){
			console.log('Loaded!');
			Validate();
		};
		
		
		function Validate(){
			let validated = 0;
			if(nameinput.value.length > 0){
				//First Check if full name is entered
				if(nameinput.value.length < 4){
					formDisabled("Input Full Name");
					nameinput.classList.add("inputAreaAlert");
				}else{
					nameinput.classList.remove("inputAreaAlert");
					notification.parentElement.style.display= 'none';
					validated++;
				}
			}
			
			if(email.value.length > 0){
				//Check Email is correctly entered
				if(email.value.split('@').length == 2){
					email.classList.remove("inputAreaAlert");
					notification.parentElement.style.display= 'none';
					validated++;
				}else{
					formDisabled("Input Correct Email address");
					email.classList.add("inputAreaAlert");
				}
			}
			
			if(pass.value.length > 0){
				if(pass.value.length > 8){
					//If Password Value is longer than 8
					pass.classList.remove("inputAreaAlert");
					notification.parentElement.style.display= 'none';
					if(confpass.value.length > 0){
						//If Retype Password value is more than 0, the user started typing.
						if(pass.value == confpass.value){
							//Check If password and retype password Matches
							pass.classList.remove("inputAreaAlert");
							confpass.classList.remove("inputAreaAlert");
							validated++;
						}else{
							//If password does not matches
							formDisabled("Password Mismatch");
							confpass.classList.add("inputAreaAlert");
							
						}
					}
				}
				
				if(pass.value.length <= 8){
					formDisabled("Password Should be more than 8");
					pass.classList.add("inputAreaAlert");
				}
			}
			console.log(validated);
			
			if(validated == 3){
				//All Three Inputs Validated
				formEnabled("Green Light! Green Light!");
			}
		}
