var io = require('socket.io');

exports.RealTime = function(io){

    var socketIO = io.listen();

    socketIO.set('log level', 1);

    var root = this;

    this.onLogin = function(pushTo){
        root.loginFunction = pushTo;

        return root;
    };

    this.run = function(){
        socketIO.sockets.on('connection', function(socket){
            console.log("Connessione");

            socket.on("disconnect", function(){
                console.log("Bye!");
            });

            root.loginFunction(root.push);
        });

        return this;
    };

    this.push = function(data) {
        socketIO.sockets.json.emit("data", data);
    }
};