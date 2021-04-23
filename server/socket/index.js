module.exports = io => {
  // client: emit a joinRoom event
  // server: listen for joinRoom and checks the following
  // - does the room already exist
  //   - yes? do the next check
  //   - no? create room, add user to room, render lobby for user
  // - does the room have space for a new player?
  //   - yes? add user to the room and start the game
  //   - no? send the user back to the splash screen with text indicating room is full

  // every time we render a view, we need to emit
  // createLobby
  //   emit: indicate player1 sent to lobby
  //   listener: render the lobbyContainer
  // startGame
  //   emit: indicate the game is ready to start
  //   listener: render the gameBoard

  //! allow player to join another game after gameOver, will have to take a look at why that functinoality initially didn't work
  //! handle case where a player tries to join a game that is already full and in progress
  let rooms = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('joinRoom', roomName => {
      console.log('roomName', roomName)
      // if the room does not already exist
      if (!rooms[roomName]) {
        // if room doesn't exist, create the room as player1
        rooms[roomName] = {
          name: roomName,
          inProgress: false,
          currentTurn: 'player1',
          actionsRemaining: 0,
          currentPlayers: {
            //initializes player1 object in room object
            player1: {
              id: socket.id,
              playerName: 'player1',
              faction: 'Federation'
            }
          }
        }
        //updates socket info
        socket.roomName = roomName
        socket.myName = 'player1'
        socket.join(roomName).emit('createLobby', roomName)
      } else if (rooms[roomName] && !rooms[roomName].currentPlayers.player2) {
        // if room exists and has 1 player inside, join room and start the game
        rooms[roomName].currentPlayers.player2 = {
          //initializes player2 object in room object
          id: socket.id,
          playerName: 'player2',
          faction: 'Empire'
        }
        rooms[roomName].inProgress = true
        socket.roomName = roomName
        socket.myName = 'player2'

        socket.join(roomName).emit('startGame', rooms[roomName], 'player2')
        socket.to(roomName).emit('startGame', rooms[roomName], 'player1')
      } else if (rooms[roomName] && rooms[roomName].inProgress) {
        // if room exists and the game has already started
        socket.emit('roomFull', 'that room is already full')
      }

      socket.to(socket.roomName).on('setPointsToWin', pointsToWin => {
        rooms[roomName].pointsToWin = pointsToWin
      })

      socket
        .to(socket.roomName)
        .on('updateUnits', (actionType, unit, actionsRemaining) => {
          console.log(`${roomName.currentTurn} has acted!: `, unit)

          io
            .to(socket.roomName)
            .emit(
              'actionBroadcast',
              actionType,
              unit,
              actionsRemaining,
              rooms[roomName]
            )
          //socket.to(socket.id).emit('actionBroadcast', unit, room, socket.myName )
        })

      socket.to(socket.roomName).on('victory', winningFaction => {
        io.to(socket.roomName).emit('gameOver', winningFaction)
      })

      //! handle player leaving the room by first popping up a warning message in their window
      // ask them to confirm if they wanna leave page
      // if they leave the other player wins the game by default
      socket.to(socket.roomName).on('disconnect', () => {
        let winner = ''
        if (rooms[roomName] && rooms[roomName].inProgress) {
          // hnadle players leaving after game has started
          const player1 = rooms[roomName].currentPlayers.player1
          const player2 = rooms[roomName].currentPlayers.player2
          if (socket.id === player1.id) {
            console.log('remaining', player2.playerName, player2.id)
            winner = player2.faction
          } else if (socket.id === player2.id) {
            console.log('remaining', player1.playerName, player1.id)
            winner = player1.faction
          }
          console.log('the winner by default is:', winner)
          io.to(socket.roomName).emit('gameOver', winner)
          delete rooms[roomName]
          console.log('rooms after someone leaves:', rooms)
        } else if (rooms[roomName] && !rooms[roomName].inProgress) {
          // handle player1 leaving while in the lobby
          delete rooms[roomName]
          console.log('rooms after player1 leaves the lobby', rooms)
        }
      })

      socket.on('disconnect', () => {
        console.log(`Connection ${socket.id} has left the building`)
      })
    })
  })
}
