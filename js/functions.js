var cf = 10;/*to float javascript issue*/
var graficoJs;
Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

// Create the chart
function createChart(){

	setTimeout(function(){
		window.CurrentTokenOne.symbol(function(er,symbolOne){
			window.CurrentTokenTwo.symbol(function(err,symbolTwo){
				graficoJs = Highcharts.stockChart('chartdiv2', {
				    chart: {
				        events: {
				            load: function () {

				                // set up the updating of the chart each second
				                var series = this.series[0];
				                setInterval(function () {
				                    var x = (new Date()).getTime(), // current time
				                        y = Math.round(Math.random() * 100);
				                    // series.addPoint([x, y], true, true);
				                }, 1000);
				            }
				        }
				    },

				    rangeSelector: {
				        buttons: [{
				            count: 1,
				            type: 'minute',
				            text: '1M'
				        }, {
				            count: 5,
				            type: 'minute',
				            text: '5M'
				        }, {
				            type: 'all',
				            text: 'All'
				        }],
				        inputEnabled: false,
				        selected: 0
				    },

				    title: {
				        text: symbolOne+' Price in '+symbolTwo
				    },

				    exporting: {
				        enabled: false
				    },

				    series: [{
				        name: symbolOne+' price',
				        data: [0,0]
				    }]
				});	
				tradeEventArray.forEach(function(value,index,array){
					web3.eth.getBlock(value.blockNumber,function(e,r){

						graficoJs.series[0].addPoint([r.timestamp*1000, value.args.amountGet.toNumber()/value.args.amountGive.toNumber()*Math.pow(10,window.CurrentTokenOne.decimals)/Math.pow(10,window.CurrentTokenTwo.decimals)], true, graficoJs.series[0].data.length > 20)
					})
				})	
			})
		})



	},2000)

}

var chartData = [];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var networkArray = {
	1 :'Mainet',
	2 :'Ropsten',
	42 :'kovan',
	4 :'Rinkeby'
}
var array_to_sell = new Array();
var array_to_buy = new Array();
function getExchangeAddress(){
	return $.ajax({
		url:'./ExchAddress.json',
		async:false
	}).responseJSON
}
function getTokenAddress(){
	return $.ajax({
		url:'./CurrentTokenAdd.json',
		async:false
	}).responseJSON
}
function getTokens(){
	return $.ajax({
		url:'./tokens.json',
		async:false
	}).responseJSON
}
function getBalance(){
	// console.log('web3.eth.accounts[0]',web3.eth.accounts[0])
	
	window.GenevExch.balanceOf(window.CurrentTokenTwo.address,web3.eth.accounts[0],{ from:web3.eth.accounts[0]},function(err,result){
	    if(!err) {
	    	window.balance = web3.fromWei(result);

	    	if (window.CurrentTokenTwo.address == 0) {
		    	window.CurrentTokenTwo.symbol(function(e,r){
			        $("#eth_balance").text(window.balance+" "+r);
			        $("#eth_bal_buy").text(window.balance+" "+r);	    		
		    	})	    		
	    	}else{
	    		console.log('Balance que viene',result)
	    		console.log('Balance que viene',window.balance)

		    	window.CurrentTokenTwo.symbol(function(e,r){
		    		
			        $("#eth_balance").text((result.toNumber()/Math.pow(10, window.CurrentTokenTwo.decimals))+" "+r);
			        console.log(result.toNumber()+" "+r);
			        $("#eth_bal_buy").text((result.toNumber()/Math.pow(10, window.CurrentTokenTwo.decimals))+" "+r);	 

		    	})		    		
	    	}


	      }
	    else
	        showModal("ERROR:",err);
    });
	window.GenevExch.balanceOf(window.CurrentTokenOne.address,web3.eth.defaultAccount,{ from:web3.eth.accounts[0]},function(err,result){
	    if(!err) {
	    	if (typeof window.CurrentTokenOne.decimals == 'function') {
		    	window.CurrentTokenOne.decimals(function(e,r){
		    		window.CurrentTokenOne.decimals = r.toNumber();
		    	})	    		
	    	}
			window.CurrentTokenOne.symbol(function(e,r){
				
		            $("#tokenOne_balance").text((result.toNumber()/Math.pow(10, window.CurrentTokenOne.decimals))+" "+r);
		            
		            $("#tokenOne_bal_sell").text((result.toNumber()/Math.pow(10, window.CurrentTokenOne.decimals))+" "+r);		    				

			
			})
	      }
	    else
	        showModal("ERROR:",err);
    });
}

///////////////////////////////////////////////////////////////////////////////
function init(){
	/*variables to take the control*/
	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(web3.currentProvider);
		  	
	}
	
	window.exchange = getExchangeAddress();
	window.tokens = getTokens();

	$("#pair").html("<option>Select Pair</option>");
	window.tokens.pairs.forEach(function(value,index,array){
		if (index == 0) {
			$("#pair").append("<option selected value='"+value.value+"'>"+value.text+"</option>");
		}else{
			$("#pair").append("<option value='"+value.value+"'>"+value.text+"</option>");			
		}
		
	});

	window.orders = []; //orders backup to reload when pair is changed

	window.CurrentTokenOne = web3.eth.contract(window.tokens.tokens[0].abi).at(window.tokens.tokens[0].address);
	window.CurrentTokenTwo = {};
	window.CurrentTokenTwo.address = "0x0000000000000000000000000000000000000000";
	window.CurrentTokenTwo.decimals = 18;
	window.CurrentTokenTwo.symbol = function(cb){
		cb(null,"ETH");
	}

	$(".currentTokenOne").text(window.tokens.tokens[0].symbol);
	$(".currentTokenTwo").text("ETH");


	window.GenevExch = web3.eth.contract(exchange.exchangeAbi).at(exchange.exchangeAddress);
	window.networkVersion = web3.version.network;

	
	web3.version.getNetwork((err, netId) => {
	  switch (netId) {
	    case "1":
	      console.log('This is mainnet')
	      break
	    case "2":
	      console.log('This is the deprecated Morden test network.')
	      break
	    case "3":
	      console.log('This is the ropsten test network.')
	      break
	    case "4":
	      console.log('This is the Rinkeby test network.')
	      break
	    case "42":
	      console.log('This is the Kovan test network.')
	      break
	    default:
	      console.log('This is an unknown network.')
	  }
	})
	


	$("#buy_price,#buy_amount,#buy_fee,#buy_total,#sell_price, #sell_amount,#sell_fee,#sell_total,#deposit_eth,#deposit_tokenOne,#amount_tokenOne,#total_tokenOne").val(0)
	web3.eth.getAccounts(function(err, accounts){
		// console.log("getAccounts",err,accounts);
	    if (err != null) {
	    	console.error("An error occurred: "+err);
	    }
	    else if (accounts.length == 0) {
	    	// showModal('Warning',"User is not logged in to MetaMask, Please TURN MetaMask ON!")
	    }
	    else {
	    	web3.eth.defaultAccount = accounts[0];
	    	if (web3.version.network != 1) {
	    		console.log('Network:',web3.version.network);
	    		if (typeof networkArray[web3.version.network] != 'undefined') {
	    			// showModal("New Message","User is logged in to MetaMask with <span class='bg-warning'>"+networkArray[web3.version.network]+"</span> network");
	    			console.log("New Message","User is logged in to MetaMask with <span class='bg-warning'>"+networkArray[web3.version.network]+"</span> network");
	    		}else{
	    			showModal("New Message","User is logged in to MetaMask with <span >localhost:8585</span> network");
	    		}

	    	}
	    }
	});
	window.GenevExch.accountLevelsAddr(function(err,result){
		// console.log('Account level address:',err,result);
	})
	window.CurrentTokenOne.decimals(function(error,result){
		if (!error) {
			window.CurrentTokenOne.decimals = result.toNumber();
		}else{
			console.log('tokenOne decimals:',error);
		}
		
	})
	window.coinbase = web3.eth.coinbase;
	
	initEvents();

	createChart(); 

	$("#look_book_orders").click();
}
function initEvents(){
	var orderEvent = window.GenevExch.Order({},{fromBlock: 0, toBlock: 'latest'});
	var cancelEvent = window.GenevExch.Cancel({},{fromBlock: 0, toBlock: 'latest'});
	var depositEvent = window.GenevExch.Deposit({},{fromBlock: 0, toBlock: 'latest'});
	var tradeEvent = window.GenevExch.Trade({},{fromBlock: 0, toBlock: 'latest'});
	var withdrawEvent = window.GenevExch.Withdraw({},{fromBlock: 0, toBlock: 'latest'});
	var graficoEvent = window.GenevExch.Grafico({},{fromBlock: 0, toBlock: 'latest'});
	window.ordersBuy = [];
	window.ordersSell = [];
	window.ordersCancel = [];
	window.depositEventArray = [];
	window.withdrawEventArray = [];
	window.tradeEventArray = [];
	window.amountBuyFilledArray = [];
	window.amountSellFilledArray = [];
	withdrawEvent.watch(function(error, result){
    	// console.log('Event '+result.event,result);
    	if (result) {
    		getBalance();
    		withdrawEventArray.push(result);
    	}
    })
	graficoEvent.watch(function(error, result){
		// console.log('grafico event:',result);

		web3.eth.getBlock(result.blockNumber,function(e,r){

			var date = new Date(r.timestamp);
			var month = date.getMonth();

			// graficoJs.series[0].addPoint([r.timestamp*1000, (result.args.amountGet)/result.args.amountGive*Math.pow(10,window.CurrentTokenOne.decimals)], true, graficoJs.series[0].data.length > 20)
			 
		})
	})
	tradeEvent.watch(function(error, result){
    	// console.log('tradeEvent ',result);
    	// alert("maldicion")
    	
	    	if (result) {
	    		tradeEventArray.push(result);
				getBalance();
				updateFilled();
				createChart();
	    	}
		

    })
    depositEvent.watch(function(error, result){
    	// console.log('deposit event ',result);
    	if (result) {
    		// console.log('New balance',result)
    		depositEventArray.push(result);
    		if (result.args.user == web3.eth.defaultAccount) {
	    		getBalance();
    		}
    	}
    })
    cancelEvent.watch(function(error, result){
    	// console.log('Event '+result.event,result);
    	order = result.args;

    	window.ordersCancel.push(order);

    	drawOrders();
    	updateFilled();
    })
    orderEvent.watch(function(error, result){




    	console.log('orderEvent ',result);


    	web3.eth.getBlockNumber(function(error, currentBlock){


    		// console.log('blockNumber:',result.blockNumber,'currentBlock:',currentBlock,' <= ',result.blockNumber <= currentBlock-1000);
    		//validating old orders;
    		if (result.blockNumber <= currentBlock-1000) {
    			return;
    		}

	    	var order = result.args;
	    	// console.log('order',order);
	    	/*validating repeated order*/
	    	if (theOrderWasRepeated(window.amountBuyFilledArray,order) || theOrderWasRepeated(window.amountSellFilledArray,order)) {
	    		return;
	    	}


	    	window.orders.push(result);

	    	window.GenevExch.amountFilled(order.tokenGet, order.amountGet, order.tokenGive, order.amountGive, order.expires, order.nonce, order.user, 0, 0, 0,function(e,r){
	    		
	    		id = new Date().getTime();
	    		// console.log('SELL:',window.CurrentTokenOne.address.toUpperCase() , order.tokenGive.toUpperCase() , window.CurrentTokenTwo.address.toUpperCase() , order.tokenGet.toUpperCase())
	    		// console.log('BUY:',window.CurrentTokenTwo.address.toUpperCase() , order.tokenGive.toUpperCase(), window.CurrentTokenOne.address.toUpperCase() , order.tokenGet.toUpperCase())
		    	if(window.CurrentTokenOne.address.toUpperCase() == order.tokenGive.toUpperCase() && window.CurrentTokenTwo.address.toUpperCase() == order.tokenGet.toUpperCase()){
					//sell
					// console.log('entra en sell',order.tokenGet, order.tokenGive)
		    		price = (order.amountGet/Math.pow(10,window.CurrentTokenTwo.decimals))/(order.amountGive/Math.pow(10,window.CurrentTokenOne.decimals));
		
	    			amountSellFilledArray.push({
	    				vol:0,
		    			bk:order,
		    			amountFilled:r.toNumber()/order.amountGet.toNumber()*order.amountGive.toNumber(),
		    			amount:order.amountGive.toNumber(),
		    			ask:price,
		    			ready:(r.toNumber()/order.amountGet.toNumber()*order.amountGive.toNumber()) >= order.amountGive.toNumber(),
		    			user:order.user,
		    			id:id,
		    			blockNumber:result.blockNumber
		    		});
		    	}else if(window.CurrentTokenTwo.address.toUpperCase() == order.tokenGive.toUpperCase() && window.CurrentTokenOne.address.toUpperCase() == order.tokenGet.toUpperCase()){
	  				//buying
	  				// console.log('entra en buy',order.tokenGet, order.tokenGive)
		    		price = (order.amountGive/Math.pow(10,window.CurrentTokenTwo.decimals))/(order.amountGet/Math.pow(10,window.CurrentTokenOne.decimals));
		    			 
	    			amountBuyFilledArray.push({
	    				vol:0,
		    			bk:order,
		    			amountFilled:r.toNumber(),//amount filled
		    			amount:order.amountGet.toNumber()-r.toNumber(),//amount wanted
		    			ready:r.toNumber() >= order.amountGet.toNumber(),//filled?
		    			bid:price.toFixed(8),
		    			user:order.user,
		    			id:id,
		    			blockNumber:result.blockNumber
		    		})
		    	}

		    	high = 0;
		    	for (var i = 1; i < window.amountSellFilledArray.length; i++) {
		    		if (window.amountSellFilledArray[i].ask > high) {
		    			high = window.amountSellFilledArray[i].ask;
		    			$('.high_price').html(high+"<span>ETH</span>");
		    		}
		    	}
		    	for (var i = 1; i < window.amountBuyFilledArray.length; i++) {
		    		if (window.amountBuyFilledArray[i].bid > high) {
		    			high = window.amountBuyFilledArray[i].bid;
		    			$('.high_price').html(high+"<span>ETH</span>");
		    		}
		    	}
		    	if (window.amountSellFilledArray[0]) {
			     	low = window.amountSellFilledArray[0].ask;
			    	for (var i = 1; i < window.amountSellFilledArray.length; i++) {
			    		if (window.amountSellFilledArray[i].ask < low) {
			    			low = window.amountSellFilledArray[i].ask;
			    			$('.low_price').html(low+"<span>ETH</span>");
			    		}
			    	}
			    	for (var i = 1; i < window.amountBuyFilledArray.length; i++) {
			    		if (window.amountBuyFilledArray[i].bid < low) {
			    			low = window.amountBuyFilledArray[i].bid;
			    			$('.low_price').html(low+"<span>ETH</span>");
			    		}
			    	}   		
		    	}

		        drawOrders()

	    	})
	 

	 
	    });
    });
    
}
function reloadPairOrders(){
	/*restarting*/
	window.amountBuyFilledArray = [];
	window.amountSellFilledArray = [];

	window.orders.forEach(function(value,index,array){
		var order = value.args;
		console.log("order:",order)
		web3.eth.getBlockNumber(function(error, currentBlock){
			if (value.blockNumber <= currentBlock-1000) {
    			//do nothing
    		}else{
		    	window.GenevExch.amountFilled(order.tokenGet, order.amountGet, order.tokenGive, order.amountGive, order.expires, order.nonce, order.user, 0, 0, 0,function(e,r){
		    		id = new Date().getTime();
		    		
		    		// console.log('SELL:',window.CurrentTokenOne.address.toUpperCase() , order.tokenGive.toUpperCase() , window.CurrentTokenTwo.address.toUpperCase() , order.tokenGet.toUpperCase())
	    			// console.log('BUY:',window.CurrentTokenTwo.address.toUpperCase() , order.tokenGive.toUpperCase(), window.CurrentTokenOne.address.toUpperCase() , order.tokenGet.toUpperCase())
			    	
			    	if(window.CurrentTokenOne.address.toUpperCase() == order.tokenGive.toUpperCase() && window.CurrentTokenTwo.address.toUpperCase() == order.tokenGet.toUpperCase()){
						//sell
						console.log('entra en sell',order.tokenGet, order.tokenGive)
			    		price = (order.amountGet/Math.pow(10,window.CurrentTokenTwo.decimals))/(order.amountGive/Math.pow(10,window.CurrentTokenOne.decimals));
			
		    			amountSellFilledArray.push({
		    				

		    				vol:0,
			    			bk:order,
			    			amountFilled:r.toNumber()/order.amountGet.toNumber()*order.amountGive.toNumber(),
			    			amount:order.amountGive.toNumber(),
			    			ask:price,
			    			ready:(r.toNumber()/order.amountGet.toNumber()*order.amountGive.toNumber()) >= order.amountGive.toNumber(),
			    			user:order.user,
			    			id:id,
			    			blockNumber:value.blockNumber


			    		});
			    	}else if(window.CurrentTokenTwo.address.toUpperCase() == order.tokenGive.toUpperCase() && window.CurrentTokenOne.address.toUpperCase() == order.tokenGet.toUpperCase()){
		  				//buying
		  				console.log('entra en buy',order.tokenGet, order.tokenGive)
			    		price = (order.amountGive/Math.pow(10,window.CurrentTokenTwo.decimals))/(order.amountGet/Math.pow(10,window.CurrentTokenOne.decimals));
			    			 
		    			amountBuyFilledArray.push({
		    				vol:0,
			    			bk:order,
			    			amountFilled:r.toNumber(),//amount filled
			    			amount:order.amountGet.toNumber()-r.toNumber(),//amount wanted
			    			ready:r.toNumber() >= order.amountGet.toNumber(),//filled?
			    			bid:price.toFixed(8),
			    			user:order.user,
			    			id:id,
			    			blockNumber:value.blockNumber
			    		})
			    	}

			    	high = 0;
			    	for (var i = 1; i < window.amountSellFilledArray.length; i++) {
			    		if (window.amountSellFilledArray[i].ask > high) {
			    			high = window.amountSellFilledArray[i].ask;
			    			window.CurrentTokenTwo.symbol(function(errorSymbol,symbol){
			    				$('.high_price').html(high+"<span>"+symbol+"</span>");
			    			})
			    		}
			    	}
			    	for (var i = 1; i < window.amountBuyFilledArray.length; i++) {
			    		if (window.amountBuyFilledArray[i].bid > high) {
			    			high = window.amountBuyFilledArray[i].bid;
			    			window.CurrentTokenTwo.symbol(function(errorSymbol,symbol){
			    				$('.high_price').html(high+"<span>"+symbol+"</span>");
			    			})
			    		}
			    	}
			    	if (window.amountSellFilledArray[0]) {
				     	low = window.amountSellFilledArray[0].ask;
				    	for (var i = 1; i < window.amountSellFilledArray.length; i++) {
				    		if (window.amountSellFilledArray[i].ask < low) {
				    			low = window.amountSellFilledArray[i].ask;
				    			window.CurrentTokenTwo.symbol(function(errorSymbol,symbol){
					    			$('.low_price').html(low+"<span>"+symbol+"</span>");
					    		})
				    		}
				    	}
				    	for (var i = 1; i < window.amountBuyFilledArray.length; i++) {
				    		if (window.amountBuyFilledArray[i].bid < low) {
				    			low = window.amountBuyFilledArray[i].bid;
				    			window.CurrentTokenTwo.symbol(function(errorSymbol,symbol){
					    			$('.low_price').html(low+"<span>"+symbol+"</span>");
					    		})
				    		}
				    	}   		
			    	}

			        drawOrders()

		    	});    			
    		}
		
		})

	});
}
function updateFilled(){
	updateSellFilled();
	updateBuyFilled();
}
function updateSellFilled(){
	// console.log('amountSellFilledArray',amountSellFilledArray.length);
	var newSellVol = 0.00;
	window.amountSellFilledArray.forEach(function(item,index){
		var order = item.bk;
		window.GenevExch.amountFilled(order.tokenGet, order.amountGet, order.tokenGive, order.amountGive, order.expires, order.nonce, order.user, 0, 0, 0,function(e,r){

			console.log("amountGive:",order.amountGive.toNumber());
			console.log("amountGet:",order.amountGet.toNumber());
			console.log('r:',r.toNumber());
			// console.log('r:',r);

    		price = (order.amountGet/Math.pow(10,window.CurrentTokenTwo.decimals))/(order.amountGive/Math.pow(10,window.CurrentTokenOne.decimals));
			if (typeof amountSellFilledArray[index] == 'undefined') {
				return;
			}
			id = amountSellFilledArray[index].id;
			// console.log('typeof $("#"+id)[0] != undefined',typeof $("#"+id)[0] != 'undefined')
			if(typeof $("#"+id)[0] != 'undefined'){
				amountSellFilledArray[index]={
					vol:0,
	    			bk:order,
	    			amountFilled:r.toNumber()/order.amountGet.toNumber()*order.amountGive.toNumber(),
	    			amount:order.amountGive.toNumber(),
	    			ask:price,
	    			ready:(r.toNumber()/order.amountGet.toNumber()*order.amountGive.toNumber()) >= order.amountGive.toNumber(),
	    			user:order.user,
	    			id:id
	    		};

	    		drawOrders();
			}	
		})
	});

}
function updateBuyFilled(){
	var newBuyVol = 0.00;
	window.amountBuyFilledArray.forEach(function(item,index){
		var order = window.amountBuyFilledArray[index].bk;
		if (typeof window.amountBuyFilledArray[index] ==  'undefined') {
			return;
		}
		id = amountBuyFilledArray[index].id;
    	window.GenevExch.amountFilled(order.tokenGet, order.amountGet, order.tokenGive, order.amountGive, order.expires, order.nonce, order.user, 0, 0, 0,function(e,r){
    		price = (order.amountGive/Math.pow(10,window.CurrentTokenTwo.decimals))/(order.amountGet/Math.pow(10,window.CurrentTokenOne.decimals));
    		if(typeof $("#"+id)[0] != 'undefined'){
				amountBuyFilledArray[index]={
					vol:0,
	    			bk:order,
	    			amountFilled:r.toNumber(),//amount filled
	    			amount:order.amountGet.toNumber()-r.toNumber(),//amount wanted
	    			ready:r.toNumber() >= order.amountGet.toNumber(),//filled?
	    			bid:price.toFixed(8),
	    			user:order.user,
	    			id:id
	    		}
				
	    		drawOrders();

			}
		})				

	})
}
function theOrderWasRepeated(orders,newOrder){
	for (var i = 0; i < orders.length; i++) {
		/*buy orders*/
		if (orders[i].bk.tokenGet == '0x0000000000000000000000000000000000000000') {
			if (orders[i].bk.user == newOrder.user && orders[i].bk.expires.toNumber() == newOrder.expires.toNumber() && orders[i].bk.amountGet.toNumber() == newOrder.amountGet.toNumber()) {
				return true;
				break;
			}
		}else{
			if (orders[i].bk.user == newOrder.user && orders[i].bk.expires.toNumber() == newOrder.expires.toNumber() && orders[i].bk.amountGive.toNumber() == newOrder.amountGive.toNumber()) {
				return true;
				break;
			}
		}
	}
	return false;
}
function isListedOnSell(order){
	listed = false;
	price = (order.amountGet/Math.pow(10,18))/(order.amountGive/Math.pow(10,18));
	for (var i = 0; i < window.ordersSell.length; i++) {
		if (window.ordersSell[i].bid == price.toFixed(8) && window.ordersSell[i].user == order.user && window.ordersSell[i].amount == order.amountGive) {
			listed = true;
		}
	}
	return listed;
}
function isListedOnBuy(order){
	listed = false;
	price = (order.amountGive/Math.pow(10,18))/(order.amountGet/Math.pow(10,10));
	for (var i = 0; i < window.ordersBuy.length; i++) {
		if (window.ordersBuy[i].ask == price.toFixed(8) && window.ordersBuy[i].user == order.user && window.ordersBuy[i].amount == order.amountGet) {
			listed = true;
		}
	}
	return listed;
}
function isCanceled(order){
	cancel_order=false;

	for (var k = 0; k < window.ordersCancel.length; k++) {
		if (window.ordersCancel[k].nonce.toNumber() == order.bk.nonce.toNumber() && order.bk.user == window.ordersCancel[k].user) {
			cancel_order=true;
		}
	}

	return cancel_order;
}
function writeInOrders(){
	table = "";
	for (var i = 0; i < window.amountBuyFilledArray.length; i++) {
		cancel_order=false;
			cancel_order=isCanceled(window.amountBuyFilledArray[i]);
			if (cancel_order && window.amountBuyFilledArray[i].user == web3.eth.defaultAccount) {
				table+="<tr class='order_canceled'><td class='buy'>Buy</td><td>"+window.amountBuyFilledArray[i].amount/Math.pow(10,window.CurrentTokenOne.decimals)+"</td><td>"+(window.amountBuyFilledArray[i].bid)+"</td><td>Canceled</td></tr>";
			}
		
		if (!cancel_order && window.amountBuyFilledArray[i].user == web3.eth.defaultAccount) {
			table+="<tr><td class='buy'>Buy</td><td>"+window.amountBuyFilledArray[i].amount/Math.pow(10,window.CurrentTokenOne.decimals)+"</td><td>"+(window.amountBuyFilledArray[i].bid)+"</td><td><a href='' id='"+JSON.stringify(window.amountBuyFilledArray[i].bk)+"' class='cancel_order_btn'>Cancel</a></td></tr>";
		}
	}
	window.amountSellFilledArray.forEach(function(value,index,array){
		cancel_order=false;
		cancel_order=isCanceled(value);
		if (cancel_order && value.user == web3.eth.defaultAccount) {
			table += "<tr class='order_canceled'><td class='sell'>Sell</td><td>"+((value.amount-value.amountFilled)/Math.pow(10,window.CurrentTokenOne.decimals))+"</td><td>"+(value.ask)+"</td><td>Canceled</td></tr>";
			
		}
		if (!cancel_order && value.user == web3.eth.defaultAccount) {
			if (value.ready) {
				table += "<tr><td class='sell'>Sell</td><td>"+((value.amount)/Math.pow(10,window.CurrentTokenOne.decimals))+"</td><td>"+(value.ask)+"</td><td>Filled</td></tr>";

			}else{
				table += "<tr><td class='sell'>Sell</td><td>"+((value.amount-value.amountFilled)/Math.pow(10,window.CurrentTokenOne.decimals))+"</td><td>"+(value.ask)+"</td><td><a href='' id='"+JSON.stringify(value.bk)+"' class='cancel_order_btn'>Cancel</a></td></tr>";
			}
		}
	})
	
	$(".orders_tbody").html(table);
}

function drawOrders(){


		var rowToSell = '';
		var rowToBuy = '';
		window.volToken = 0;
		window.volTokenSell = 0;
		window.volTokenBuy = 0;
		window.volEth = 0;
		window.ask = 0;
		window.bid = 0;
		newBuyVol = 0;
		newSellVol = 0;
		window.amountBuyFilledArray.sort(sortBuyOrder);
		window.amountSellFilledArray.sort(sortSellOrder);

		for (var i = 0; i < window.amountBuyFilledArray.length; i++) {
			
			tradeDone = false;

			
			if (!amountBuyFilledArray[i].ready) {
				if (amountBuyFilledArray[i].user == web3.eth.defaultAccount) {
					classRow=" style='background-color:green' title='Your Order'";
				}else{
					classRow="";
				}

				newBuyVol += window.amountBuyFilledArray[i].amount/Math.pow(10,window.CurrentTokenOne.decimals);
				rowToSell +="<tr "+classRow+" id='"+window.amountBuyFilledArray[i].id+"'><td style='font-size:10px'>"+newBuyVol.toFixed(3)+"</td><td>"+window.amountBuyFilledArray[i].amount/Math.pow(10,window.CurrentTokenOne.decimals)+"</td><td>"+(window.amountBuyFilledArray[i].bid)+"</td></tr>";
			    window.volToken += parseFloat(window.amountBuyFilledArray[i].amount/Math.pow(10,window.CurrentTokenOne.decimals));
			    window.volEth += parseFloat(window.amountBuyFilledArray[i].bid);
			    window.bid += parseFloat(window.amountBuyFilledArray[i].bid);
				writeInOrders(window.amountBuyFilledArray[i]);
			}

			
			
		}
		for (var i = 0; i < window.amountSellFilledArray.length; i++) {
			
			if (!window.amountSellFilledArray[i].ready) {
				newSellVol += window.amountSellFilledArray[i].amount/Math.pow(10,window.CurrentTokenOne.decimals);
				if (amountSellFilledArray[i].user == web3.eth.defaultAccount) {
					classRow=" style='background-color:green' title='Your Order'";
				}else{
					classRow="";
				}
			    volTokenVar = (window.amountSellFilledArray[i].amount-window.amountSellFilledArray[i].amountFilled);
			    window.volToken += volTokenVar/Math.pow(10,window.CurrentTokenOne.decimals);
			    window.volTokenSell += volTokenVar/Math.pow(10,window.CurrentTokenOne.decimals);
				rowToBuy+="<tr "+classRow+" id='"+window.amountSellFilledArray[i].id+"'><td style='font-size:10px' >"+window.amountSellFilledArray[i].ask.toFixed(5)+"</td><td>"+(window.amountSellFilledArray[i].amount-window.amountSellFilledArray[i].amountFilled)/Math.pow(10,window.CurrentTokenOne.decimals).toFixed(5)+"</td><td>"+window.volTokenSell.toFixed(5)+"</td></tr>";
			    
			    window.volEth += parseFloat(window.amountSellFilledArray[i].ask);
			    window.ask += parseFloat(window.amountSellFilledArray[i].ask);
				writeInOrders(window.amountSellFilledArray[i]);
			}

		}
		writeInOrders();

		$(".order_sell").html("")
		$(".order_buy").html("");
		$(".order_sell").html(rowToSell)
		$(".order_buy").html(rowToBuy);
		window.CurrentTokenOne.symbol(function(e,r){
			$('.volToken').html(window.volToken.toFixed(5)+" <span>"+r+"</span>");
			$('.volEth').html(window.volEth+" <span>ETH</span>");
			$('.ask_value').html(window.ask+" <span>ETH</span>");
			$('.bid_value').html(window.bid+" <span>ETH</span>");
		})
}
function showModal(title,message){
	$("#myModalLabel").text(title);
	$("#myModalBody").html("<p>"+message+"</p>");
	$('#myModal').modal("show")
}

function volEther(){
	sumaEth = 0;
	restaEth = 0;
	for (var i = 0; i < depositEventArray.length; i++) {
		if (depositEventArray[i].args.token == "0x0000000000000000000000000000000000000000") {
			sumaEth += parseFloat(depositEventArray[i].args.amount);
		}
	}
	for (var i = 0; i < withdrawEventArray.length; i++) {
		if (withdrawEventArray[i].args.token == "0x0000000000000000000000000000000000000000") {
			restaEth += parseFloat(withdrawEventArray[i].args.amount);
		}
	}
	return (sumaEth-restaEth)/Math.pow(10,18);
}
function volToken_(token){
	sumaToken = 0;
	restaToken = 0;
	// console.log('token',token)
	for (var i = 0; i < depositEventArray.length; i++) {
		if (depositEventArray[i].args.token.toUpperCase() == token.address.toUpperCase()) {
			sumaToken += parseFloat(depositEventArray[i].args.amount);
		}
	}
	for (var k = 0; k < withdrawEventArray.length; k++) {
		if (withdrawEventArray[k].args.token.toUpperCase() == token.address.toUpperCase()) {
			restaToken += parseFloat(withdrawEventArray[k].args.amount);
		}
	}
	// console.log('sumaToken',sumaToken)
	// console.log('restaToken',restaToken)
	return (sumaToken-restaToken)/Math.pow(10,token.decimals);
}

function sortBuyOrder(a,b) {
  if (a.bid > b.bid)
    return -1;
  if (a.bid < b.bid)
    return 1;
  return 0;
}
function sortSellOrder(a,b) {
  if (a.ask < b.ask)
    return -1;
  if (a.ask > b.ask)
    return 1;
  return 0;
}
function IsNumeric(input){
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}