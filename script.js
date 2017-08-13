var host = "ws://10.10.100.254:81";	
var socket;
var receivedConfig;

function connect(){
	try{
		socket = new WebSocket(host);
        console.log('Socket Status: '+socket.readyState);

        socket.onopen = function(){
       		 console.log('Socket Status: '+socket.readyState+' (open)');
        }

        socket.onmessage = function(msg){
        	if (msg.data.length) {
        	  receivedConfig = msg.data;
			  console.log("message", receivedConfig);
       		  updateConfig();
        	} else {
        	  console.log("received empty string");
        	}
        }

        socket.onclose = function(){
       		 console.log('Socket Status: '+socket.readyState+' (Closed)');
        }			

    } catch(exception){
   		 console.log('Error: '+ exception);
    }
}


function send() {
	var command = document.getElementById('command').value;
	var payload = document.getElementById("config").value;
	var response = command + ":" + payload;
	socket.send(response);
	console.log(response);
}

function updateConfig() {
	document.getElementById("config").innerHTML = JSON.parse(JSON.stringify(receivedConfig, undefined, 2));
	document.getElementById("configpre").innerHTML = JSON.stringify(receivedConfig, undefined, 2);
}



// {
//   "wifi" : {
//     "ssid"     : "FARADAY200",
//     "port"     : 8899,
//     "ip"       : [10, 10, 100, 254],
//     "subnet"   : [255, 255, 255, 0],
//     "channel"  : 11,
//     "pass"     : "faraday200"
//   },
//   "websocket" : {
//     "port" : 81
//   }
// }
