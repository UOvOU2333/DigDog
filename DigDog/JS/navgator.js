document.getElementById("searchButton").addEventListener("click", function(event) {
	event.preventDefault(); // 阻止按钮默认的提交行为
	var searchInput = document.getElementById("search");
	var searchQuery = searchInput.value;
	if (searchQuery) {
		var baiduURL = "https://www.baidu.com/s?wd=" + encodeURIComponent(searchQuery);
		window.location.href = baiduURL;
	}
});