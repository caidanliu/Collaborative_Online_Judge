module.exports = function(io) {
    // collaboration sessions
    var collaborations = [];

    var socketIdToSessionId = [];
    io.on('connection', (socket) => {
        // console.log(socket);
        // var message = socket.handshake.query['message'];
        // console.log(message);
        // io.to(socket.id).emit('message', 'hahahaha from server');

        var sessionId = socket.handshake.query['sessionId'];
        socketIdToSessionId[socket.id] = sessionId;

        // add socket.id to corresponding collaboration session participants
        if (!(sessionId in collaborations)) {
            collaborations[sessionId] = {
                'participants': []
            }
        }
        collaborations[sessionId]['participants'].push(socket.id);

        // add change event listener
        socket.on('change', delta => {
            console.log('change ' + socketIdToSessionId[socket.id] + ' ' + delta);
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit('change', delta);
                    }
                }
            } else {
                console.log('WARNING!!!!!');
            }
        });
    });
}