var host = "ws://10.10.100.254:81"; 
var socket;
var receivedConfig;
var lastCommand;

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
            
            if (lastCommand == 8008) { // Asked for the id of the active controller; 
              var chars = msg.data.split(":");
              receivedConfig = '';
              for (var i = 0; i < chars.length; i++) {
                receivedConfig = receivedConfig + String.fromCharCode(chars[i]);
              }
            }
            
            if (lastCommand == 8011) {
              receivedConfig = '';
              var controllers = msg.data.split("|");
              for (a = 0; a < controllers.length; a++ ) {
                var chars = controllers[a].split(":");
                for (var i = 0; i < chars.length; i++) {
                  receivedConfig = receivedConfig + String.fromCharCode(chars[i]);
                }
                receivedConfig = receivedConfig + "\n";
              }

            }
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
  var request = command + ":" + payload;
  lastCommand = command;
  socket.send(request);
  console.log(request);
}

function updateConfig() {
  document.getElementById("config").innerHTML = JSON.parse(JSON.stringify(receivedConfig, undefined, 2));
}
