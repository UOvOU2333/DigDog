function getWeather() {
		var city;
		if (document.getElementById("cityInput").value == ""){
			city = document.getElementById("citySelect").value;
			console.log(city);
		}else {
			city = document.getElementById("cityInput").value;
			console.log(city);
		}
	  // 使用 AJAX 获取实时天气数据
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=269d058c99d1f3cdcd9232f62910df1d", true);

		xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var weatherData = JSON.parse(xhr.responseText);
			//当前天气
			document.getElementById("weatherResult").innerHTML = /* "当前天气：" + */ weatherData.weather[0].description;
			//当前湿度
			document.getElementById("weatherHumi").innerHTML = /* "当前湿度：" + */ weatherData.main.humidity;
			//当前温度
			var kdeg = (weatherData.main.temp-273.15);
			var cdeg = kdeg.toFixed(1);
			document.getElementById("weatherTemp").innerHTML = /*"当前温度：" + */ cdeg /* + "C°" */ ;
			//最高温
			//var kdegmax = (weatherData.main.temp_max-273.15);
			//var cdegmax = kdeg.toFixed(0);
			//document.getElementById("weatherTempMax").innerHTML = cdegmax;
			//最低温
			//var kdegmin = (weatherData.main.temp_min-273.15);
			//var cdegmin = kdeg.toFixed(0);
			//document.getElementById("weatherTempMin").innerHTML = cdegmin;
			//城市 / 地区
			document.getElementById("site").innerHTML = /* "城市 / 地区：" + */ weatherData.name + " / " + weatherData.sys.country;
			//icon
			document.getElementById("weatherimg").src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + weatherData.weather[0].icon + ".png";
			//大气压
			document.getElementById("weatherPress").innerHTML = /* "大气压强：" + */ weatherData.main.pressure;
			//multipleAlt
			var altn = document.getElementById("changebot").value;
			console.log(altn);
			if(altn == "feels_like"){
				var kdegf = (weatherData.main.feels_like-273.15);
				var cdegf = kdegf.toFixed(0);
				document.getElementById("changetop").innerHTML = cdegf + "°" ;
			}else if (altn == "windspeed"){
				document.getElementById("changetop").innerHTML = weatherData.wind.speed + "m/s";
			}else if (altn == "winddeg"){
				document.getElementById("changetop").innerHTML = weatherData.wind.deg + "°";
			}else if (altn == "cloudsall"){
				document.getElementById("changetop").innerHTML = weatherData.clouds.all + '%';
			}

		}
	  };

	  xhr.send();
	}

	window.onfocus(getWeather());