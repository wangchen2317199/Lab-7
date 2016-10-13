$(
	function() {
		$("#registration").click(
			function() {
				var userName = $("#userName").val();
				localStorage.setItem("user", userName);
				window.location.href = "home.html";
			}
		);
	}
);