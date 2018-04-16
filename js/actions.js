$(document).ready(function(){
	// to change admin;
	$("#change_admin").click(function(){
		var newAdminAddress; /*assign it*/
		window.GenevExch.changeAdmin(newAdminAddress,{gas:3000000,from:web3.eth.accounts[0]},function(error,result){
			console.log(error,result);
		})

	})
});