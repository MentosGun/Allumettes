let app = {
  playerInput: null,
  playerButton: document.querySelector('#playerButton'),
  players: document.querySelector('.players'),
  init: function() {
    // Je cible l'input "players"
    app.playerInput = document.querySelector('#playerInput')
    app.playerButton.onclick = function() {
      app.createPlayer()
    }
  },
  createPlayer: function() {
    app.players = document.querySelector('.players')
    let player = document.createElement('div')
    player.className = 'onePlayer'
    player.innerHTML = app.playerInput.value
    app.players.appendChild(player)
    app.playerInput.value = ''
    app.playersNumberCheck()
  },

  playersNumberCheck: function() {
    let numberOfPlayer = document.querySelectorAll('.onePlayer')
    /*if (numberOfPlayer.length >= 3) {
      app.
    }*/
  }
}

app.init()
