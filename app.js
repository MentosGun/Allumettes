let app = {
  playerInput: null,
  playerButton: document.querySelector('#playerButton'),
  players: document.querySelector('.players'),
  divPlayers: document.querySelector('.divPlayers'),
  divMatches: document.querySelector('.divMatches'),
  init: function() {
    // Je cible l'input "players"
    app.playerInput = document.querySelector('#playerInput')
    app.playerInput.onkeyup = function(event){
      if (event.keyCode === 13) {
        app.checkPlayerInput()
      }
    }
    app.playerButton.onclick = function() {
      app.checkPlayerInput()
    }
  },
  checkPlayerInput: function() {
    let inputValue = app.playerInput.value.replace(/[^a-zA-Z0-9]/g, '')
    app.createPlayer(inputValue)
  },
  createPlayer: function(inputValue) {
    app.players = document.querySelector('.players')
    let player = document.createElement('div')
    player.className = 'onePlayer'
    player.innerHTML = inputValue
    app.players.appendChild(player)
    app.playerInput.value = ''
    app.playersNumberCheck()
  },
  playersNumberCheck: function() {
    let numberOfPlayer = document.querySelectorAll('.onePlayer')
    if (numberOfPlayer.length >= 3) {
      app.playerButton.onclick = null
      app.divPlayers.style.display = "none"
      app.divMatches.style.display = "block"
    }
  }
}

app.init()
