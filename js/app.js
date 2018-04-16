/*********************************************************************************
 *********************************************************************************
 *
 * Genevieve Exchange System
 * Javascript Front-End
 *
 *********************************************************************************
 ********************************************************************************/

// Enforce JavaScript 1.8.5 (ECMAScript version 5)

_id = document.getElementById.bind(document);

/*********************************************************************************
 *
 * Data - Functions
 *
 *********************************************************************************/

function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}


/*********************************************************************************
 *
 * Page Initialization
 *
 *********************************************************************************/
// console.log("OK");
//var Web3;             // web3 library
//var web3;             // web3 provider
var GenevExch; // handle to contract


 /*********************************************************************************
 *
 * Page Initialization
 *
 *********************************************************************************/


_id("buy_price").onkeyup = function(){
  Functions.calculate_buy();
};
_id("buy_amount").onkeyup = function(){
  Functions.calculate_buy();
};
_id("sell_price").onkeyup = function(){
  Functions.calculate_sell();
};
_id("sell_amount").onkeyup = function(){
  Functions.calculate_sell();
};

//get contract abstraction
 //import '../../build/contracts/Exch.json';
        
//$(document).ready(function () {
  window.addEventListener('load', function() {

    // connect with provider
  //Web3 = require('web3');
   if (typeof web3 !== 'undefined') {
     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
     window.web3 = new Web3(web3.currentProvider);
   }
   console.log(window.web3);
   //provider = web3.currentProvider;
   // window.web3 = new Web3(web3.currentProvider);
   // setTimeout(function(){
     //  console.log(web3);
   //  },2000);
   // var web3 = new Web3(Web3.givenProvider);
    window.Metamask = true;

    window.coinbase = web3.eth.coinbase;
    console.log("Coinbase: " + coinbase);
    //document.getElementById('coinbase').innerText = coinbase;
  
    // get provider data
    //var coinbaseBalanceETH = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));
    //document.getElementById('coinbaseBalance').innerText = coinbaseBalanceETH;
  
   // var blockNumber = web3.eth.blockNumber;
    //document.getElementById('blockNumber').innerText = blockNumber;


web3.version.getNetwork((err,netId) => {

  if ( netId == 4 ) { // Rinkeby
    window.GXVCTokenAdd = '0x5b6851181d79DdB6980AD55B2aFe730e95A0ECe4'; // Rinkeby 
    var ExchAddress = '0x3ec9deF1ebCCA9B6365783D4C2E1C267c9B65b92'; // Rinkeby 
    _id('contractAddress').href = "https://rinkeby.etherscan.io/address/" + ExchAddress;
    }

  if ( netId == 1 ) { // Mainnet
    window.GXVCTokenAdd = '0x22F0AF8D78851b72EE799e05F54A77001586B18A';
    var ExchAddress = '0x3ec9deF1ebCCA9B6365783D4C2E1C267c9B65b92';
    _id('contractAddress').href = "https://etherscan.io/address/" + ExchAddress;
    }

  var GXVCTokenAbiString = '[{"constant": false, "inputs": [{"name": "_from", "type": "address"}, {"name": "_value", "type": "uint256"}, {"name": "_data", "type": "bytes"} ], "name": "tokenFallback", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"} ]';
  var GXVCTokenAbi = JSON.parse(GXVCTokenAbiString);
  window.GXVCtoken = web3.eth.contract(GXVCTokenAbi).at(GXVCTokenAdd);

  var ExchAbiString = '[{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"}],"name":"trade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"}],"name":"order","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orderFills","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cancelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"depositToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"amountFilled","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeMake_","type":"uint256"}],"name":"changeFeeMake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeMake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeRebate_","type":"uint256"}],"name":"changeFeeRebate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeAccount","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"amount","type":"uint256"},{"name":"sender","type":"address"}],"name":"testTrade","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeAccount_","type":"address"}],"name":"changeFeeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeRebate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"feeTake_","type":"uint256"}],"name":"changeFeeTake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"admin_","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"orders","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeTake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"accountLevelsAddr_","type":"address"}],"name":"changeAccountLevelsAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"accountLevelsAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenGet","type":"address"},{"name":"amountGet","type":"uint256"},{"name":"tokenGive","type":"address"},{"name":"amountGive","type":"uint256"},{"name":"expires","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"user","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"availableVolume","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"admin_","type":"address"},{"name":"feeAccount_","type":"address"},{"name":"accountLevelsAddr_","type":"address"},{"name":"feeMake_","type":"uint256"},{"name":"feeTake_","type":"uint256"},{"name":"feeRebate_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"}],"name":"Order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"expires","type":"uint256"},{"indexed":false,"name":"nonce","type":"uint256"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenGet","type":"address"},{"indexed":false,"name":"amountGet","type":"uint256"},{"indexed":false,"name":"tokenGive","type":"address"},{"indexed":false,"name":"amountGive","type":"uint256"},{"indexed":false,"name":"get","type":"address"},{"indexed":false,"name":"give","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"Withdraw","type":"event"}]';
  var ExchAbi = JSON.parse(ExchAbiString);
  window.GenevExch = web3.eth.contract(ExchAbi).at(ExchAddress);

 


  // Log contract events  
   var events = GenevExch.allEvents({});
   //console.log(events);
   events.get((error, logs) => {
      if (error) {
        console.log('ERROR:',error);
      }else{
        console.log("Log:",logs);
      }
      // we have the logs, now print them
     //  logs.forEach(log => console.log(log));
     });
 
   // Get Orders
  GenevExch.Order({},{fromBlock:0}).get(function(error,answer){
  if (!error) {
    console.log(answer);
      } else {
        console.log(error);
      }
  });

Functions.getBalance();

});


}); // Closes windows.load


  
/*********************************************************************************
 *
 * Contract Interaction - Transactions
 *
 *********************************************************************************/

window.Functions = {


calculate_buy: function() {
    var total = parseFloat(_id("buy_price").value) * parseFloat(_id("buy_amount").value);
  if (isNaN(total) || typeof total == "undefined") total = 0;
  _id("buy_total").value = total;
},

calculate_sell: function() {
    var total = parseFloat(_id("sell_price").value) * parseFloat(_id("sell_amount").value);
  if (isNaN(total) || typeof total == "undefined") total = 0;
  _id("sell_total").value = total;
},

getBalance: function() {
  console.log("Getting balance");
  setTimeout(Functions.getBalance,15000);
  if (typeof coinbase == "undefined") return;
  Functions.balanceOf(0,coinbase);
  Functions.balanceOf(GXVCTokenAdd,coinbase);
},

  availableVolume: function(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s) {
    var _tokenGet      = document.getElementById("availableVolume_tokenGet").value;
    var _amountGet       = document.getElementById("availableVolume_amountGet").value;
    var _tokenGive = document.getElementById("availableVolume_tokenGive").value;
    var _amountGive = document.getElementById("availableVolume_amountGive").value;
    var _expires = document.getElementById("availableVolume_expires").value;
    var _nonce = 4;//document.getElementById("availableVolume_nonce").value;
    var _user = document.getElementById("availableVolume_user").value;
    var _v = 1;//document.getElementById("availableVolume_v").value;
    var _r = 2;//document.getElementById("availableVolume_r").value;
    var _s = 3;//document.getElementById("availableVolume_s").value;
    console.log("availableVolume: " , _tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s);
    GenevExch.availableVolume.call(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s
                     );
  },

  amountFilled: function(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s) {
    var _tokenGet      = document.getElementById("amountFilled_tokenGet").value;
    var _amountGet       = document.getElementById("amountFilled_amountGet").value;
    var _tokenGive = document.getElementById("amountFilled_tokenGive").value;
    var _amountGive = document.getElementById("amountFilled_amountGive").value;
    var _expires = document.getElementById("amountFilled_expires").value;
    var _nonce = 4;//document.getElementById("availableVolume_nonce").value;
    var _user = document.getElementById("availableVolume_user").value;
    var _v = 1;//document.getElementById("availableVolume_v").value;
    var _r = 2;//document.getElementById("availableVolume_r").value;
    var _s = 3;//document.getElementById("availableVolume_s").value;
    console.log("amountFilled: " , _tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s);
    GenevExch.amountFilled.call(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s
                     );
  },

  deposit : function() {
    if ( parseFloat(_id("deposit_eth").value) > 0 && parseFLoat(_id("deposit_gxvc") > 0)) {
      var _amount = _id("deposit_eth").value;
      GenevExch.deposit.sendTransaction({from:web3.eth.accounts[0],value:web3.toWei(_amount,"ether")},function(err,result){
      if(!err)
          console.log(result);

      else
          console.error(err);
      });
      } else {
          Functions.depositToken();
        }

  },

  withdraw : function(_amount) {
    var _amount      = document.getElementById("withdraw_amount").value;
   // console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    GenevExch.withdraw.sendTransaction(_amount,
                      {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  },

  depositToken : function() {
    var _token = GXVCTokenAdd;
    var _amount = _id("deposit_gxvc").value;
    GenevExch.depositToken.sendTransaction(_token,
                    _amount,
                    {gas:500000, from:web3.eth.accounts[0]},function(err,result){
    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  },

  withdrawToken : function(_token , _amount) {
    var _token         = document.getElementById("withdrawToken_token").value;
    var _amount          = document.getElementById("withdrawToken_amount").value;
    // console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ newAppointmentDateTime.value);
    GenevExch.withdrawToken.sendTransaction(_token,
                                     _amount,
                                     {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  },

  balanceOf : function(_token , _user) {
    // console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ newAppointmentDateTime.value);
    GenevExch.balanceOf.call(_token,
               _user,
               {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err) {
        if ( _token == 0 ) {
        _id("eth_balance").innerText = web3.fromWei(result);
        _id("eth_bal_buy").innerText = web3.fromWei(result);
        } else {
            _id("gxvc_balance").innerText = web3.fromWei(result,'nano') / 10;
            _id("gxvc_bal_sell").innerText = web3.fromWei(result,'nano') / 10;
        }
      }
    else
        console.error(err);
    });
  },

  order_buy : function() {
    _tokenGet = GXVCTokenAdd;
    _amountGet = _id("buy_amount").value;
    _tokenGive = 0;
    _amountGive = _amountGet / _id("buy_price").value;
    _expires = 200;
    Functions.order(_tokenGet, _amountGet, _tokenGive , _amountGive , _expires);
  },

  order_sell : function() {
    _tokenGet = 0;
    _amountGet = _id("sell_amount").value;
    _tokenGive = GXVCTokenAdd;
    _amountGive = _amountGet * _id("sell_price").value;
    _expires = 200;
    Functions.order(_tokenGet, _amountGet, _tokenGive , _amountGive , _expires);
  },

  order : function(_tokenGet, _amountGet, _tokenGive , _amountGive , _expires ) {
    var _nonce = 120;
    //console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    GenevExch.order.sendTransaction(_tokenGet, _amountGet, _tokenGive , _amountGive , _expires , _nonce,
                                                       {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  },

  trade : function(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s , _amount ) {
    var _tokenGet      = document.getElementById("trade_tokenGet").value;
    var _amountGet       = document.getElementById("trade_amountGet").value;
    var _tokenGive = document.getElementById("trade_tokenGive").value;
    var _amountGive = document.getElementById("trade_amountGive").value;
    var _expires = document.getElementById("trade_expires").value;
    var _nonce = 4;//document.getElementById("availableVolume_nonce").value;
    var _user = document.getElementById("availableVolume_user").value;
    var _v = 1;//document.getElementById("availableVolume_v").value;
    var _r = 2;//document.getElementById("availableVolume_r").value;
    var _s = 3;//document.getElementById("availableVolume_s").value;
    var _amount = document.getElementById("trade_amount").value;
    // console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    GenevExch.trade.sendTransaction(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s , _amount,
                                            {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  },


  testTrade : function(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s , _amount ) {
    var _tokenGet      = document.getElementById("testTrade_tokenGet").value;
    var _amountGet       = document.getElementById("testTrade_amountGet").value;
    var _tokenGive = document.getElementById("testTrade_tokenGive").value;
    var _amountGive = document.getElementById("testTrade_amountGive").value;
    var _expires = document.getElementById("testTrade_expires").value;
    var _nonce = 4;//document.getElementById("availableVolume_nonce").value;
    var _user = document.getElementById("availableVolume_user").value;
    var _v = 1;//document.getElementById("availableVolume_v").value;
    var _r = 2;//document.getElementById("availableVolume_r").value;
    var _s = 3;//document.getElementById("availableVolume_s").value;
    var _amount = document.getElementById("testTrade_amount").value;
    // console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    GenevExch.testTrade.sendTransaction(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _user , _v , _r , _s , _amount,
                                            {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  },

  cancelOrder : function(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _v , _r , _s ) {
    var _tokenGet      = document.getElementById("cancelOrder_tokenGet").value;
    var _amountGet       = document.getElementById("cancelOrder_amountGet").value;
    var _tokenGive = document.getElementById("cancelOrder_tokenGive").value;
    var _amountGive = document.getElementById("cancelOrder_amountGive").value;
    var _expires = document.getElementById("cancelOrder_expires").value;
    var _nonce = 4;//document.getElementById("availableVolume_nonce").value;
    var _v = 1;//document.getElementById("availableVolume_v").value;
    var _r = 2;//document.getElementById("availableVolume_r").value;
    var _s = 3;//document.getElementById("availableVolume_s").value;
    // console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    GenevExch.cancelOrder.sendTransaction(_tokenGet , _amountGet , _tokenGive , _amountGive , _expires , _nonce , _v , _r , _s,
                                            {gas:500000, from:web3.eth.accounts[0]},function(err,result){

    if(!err)
        console.log(result);
    else
        console.error(err);
    });
  }



}


/*********************************************************************************
 *
 * end of source
 *
 ********************************************************************************/


