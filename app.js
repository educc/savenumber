
var app = {};
(function(THIS){
	THIS.convert  = {
		r: 0,
		t: 1,
		d: 1,
		ñ: 2,
		n: 2,
		m: 3,
		c: 4,
		k: 4,
		q: 4,
		l: 5,
		s: 6,
		z: 6,
		f: 7,
		_: 8,
		g: 8,
		j: 8,
		p: 9,
		v: 9,
		b: 9,
	};
	THIS.MIN_LENGTH = 2;
	THIS.STEP_LENGTH = 0.25;
	THIS.length = THIS.MIN_LENGTH;
	THIS.corrects = 0;
	THIS.elShowNumber = document.getElementById("out");
	THIS.elInputText =  document.getElementById("in");
	THIS.elMessageOk =  document.getElementById("message_ok");
	THIS.elMessageError =  document.getElementById("message_error");
	THIS.elForm =  document.getElementById("appform");

	THIS.randomNumber = function(){
		var result = 0;
		var i = 0;
		var max = Math.floor(THIS.length);
		while(i < max){
			var x = Math.floor(Math.random()*10);
			var mul = Math.pow(10, i);
			var aux = x*mul;
			if( aux < mul){
				aux += mul;
			}
			result += aux;
			i += 1;
		}
		return result;
	}

	THIS.getNumberFromForm = function(){
		var text = THIS.elInputText.value.trim();
		text = text.replace(/(ch)+/g,"_");
		var n = text.length;
		var k = 0;
		var result = "";
		for(var i = 0; i < n; i++){
			var c = text.charAt(i);  
			for(var key in THIS.convert){
				var value = THIS.convert[key];
				if( c === key){
					result += value.toString();
				}
			}
		}
		return parseInt(result);
	}

	THIS.match = function(){
		var number1 = parseInt(THIS.elShowNumber.innerText);
		var number2 = THIS.getNumberFromForm();
		if(number1 === number2){
			THIS.corrects += 1;
			THIS.length += THIS.STEP_LENGTH;
			THIS.elMessageOk.innerText = THIS.corrects  + " Correct!";
			THIS.elInputText.value = "";
			THIS.elMessageError.innerText = "";
		}else{
			THIS.corrects = 0;
			THIS.length = THIS.MIN_LENGTH;
			THIS.elMessageOk.innerText = "";
			THIS.elMessageError.innerText = 
				"Incorrect: " + 
				THIS.elShowNumber.innerText  + 
				" != " + number2.toString();
		}
		return number1 === number2;
	}

	THIS.next = function(){
		THIS.elShowNumber.innerText = THIS.randomNumber();
	}

	THIS.setEvents = function(){
		THIS.elForm.addEventListener("submit", function(e){
			e.preventDefault();
			THIS.match();
			THIS.next();
		});
	}

	THIS.main = function(){
		THIS.setEvents();
		THIS.next();
	};

})(app);
app.main();