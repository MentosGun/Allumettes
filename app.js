let app = {
  playerNumber: 0,
  playerInput: null,
  matchesInput: null,
  playerButton: document.querySelector('#playerButton'),
  matchesButton: document.querySelector('#matchesButton'),
  players: document.querySelector('.players'),
  errorLength: document.querySelector('#length'),
  divPlayers: document.querySelector('.divPlayers'),
  divMatches: document.querySelector('.divMatches'),
  game: document.querySelector('.game'),
  status: document.querySelector('#status'),
  gameButton: null,
  remainingMatches: null,
  instantPlayer: null,
  playerName: null,
  restartGame: function() {
    app.playerInput.value = ""
    if (app.matchesInput) {
      app.matchesInput.value = ""
    }
    while (app.players.firstChild) {
      app.players.removeChild(app.players.firstChild)
    }
    if (app.divPlayers.style.display == "none") {
      app.divPlayers.style.display = "block"
    }
    if (app.gameButton != null) {
      app.gameButton.remove()
    }
    if (app.divMatches.style.display != "none") {
      app.divMatches.style.display = "none"
    }
    if (document.querySelector('#selectMatches') != null) {
      document.querySelector('#selectMatches').remove()
    }
    app.playerNumber = 0
    app.status.innerHTML = ""
    app.init()
  },
  init: function() {
    document.querySelector('#restart').onclick = function() {
      app.restartGame()
    }
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
    if (inputValue != '') {
      if (inputValue.length > 15) {
        app.errorLength.style.display = "block"
        app.errorLength.innerHTML = 'Pseudo trop long. 15 caractères Maximum!'
      }
      else {
        app.createPlayer(inputValue)
      }
    }
  },
  createPlayer: function(inputValue) {
    app.errorLength.style.display = "none"
    let player = document.createElement('span')
    player.className = 'onePlayer'
    app.playerNumber++
    player.id = 'player' + app.playerNumber
    player.setAttribute("name", inputValue)
    player.innerHTML = app.playerNumber + " - " + inputValue
    app.players.appendChild(player)
    app.playerInput.value = ''
    app.playersNumberCheck()
  },
  playersNumberCheck: function() {
    if (document.querySelectorAll('.onePlayer').length >= 3) {
      app.playerButton.onclick = null
      app.divPlayers.style.display = "none"
      app.divMatches.style.display = "block"
      app.playerNumber = 1
      app.selectingNumberOfMatches()
    }
  },
  selectingNumberOfMatches: function() {
    app.matchesInput = document.querySelector('#matchesInput')
    app.matchesInput.onkeyup = function(event){
      if (event.keyCode === 13) {
        app.checkMatchesInput()
      }
    }
    app.matchesButton.onclick = function() {
      app.checkMatchesInput()
    }
  },
  checkMatchesInput: function() {
    let inputValue = Math.floor(app.matchesInput.value)
    app.status.style.color = "red"
    app.status.style.fontSize = "2em"
    if(!inputValue) {
      app.status.innerHTML = "Je t'ai dis de rentrer un nombre Patate!"
    }
    else if (inputValue < 15) {
      app.status.innerHTML = inputValue + ", ce n'est pas assez. 15 Minimum!"
    }
    else if (inputValue > 60) {
      app.status.innerHTML = inputValue + ", c'est trop. 60 Maximum!"
    }
    else {
      app.startGame()
    }
  },
  startGame: function() {
    app.divMatches.style.display = "none"
    app.status.style.marginBottom = "0.5em"
    app.status.style.color = "black"
    app.status.style.fontSize = "1.5em"
    app.status.innerHTML = app.matchesInput.value + " Allumettes restantes"
    app.createRadioInputs()
  },
  createRadioInputs: function() {
    app.matchesInput.value = ""
    let selectMatches = document.createElement('div')
    selectMatches.id = "selectMatches"
    let playerName = document.createElement('span')
    playerName.id = "playerName"
    app.playerName = playerName
    selectMatches.appendChild(playerName)
    let index = 1
    do {
      let radio = document.createElement('input')
      radio.className = "radio"
      radio.id = "radio" + index
      radio.setAttribute("type", "radio")
      radio.setAttribute("name", "radio")
      radio.setAttribute("value", index)
      if (index === 1) {
        radio.setAttribute("checked", "checked")
      }
      let label = document.createElement('label')
      label.setAttribute("for", "radio" + index)
      label.innerHTML = index
      selectMatches.appendChild(radio)
      selectMatches.appendChild(label)
      index++
    } while (index <= 3);
    app.game.appendChild(selectMatches)
    let gameButton = document.createElement('button')
    gameButton.className = "buttonValidate"
    gameButton.id = "gameButton"
    gameButton.setAttribute("name", "game")
    app.game.appendChild(gameButton)
    app.gameButton = document.querySelector('#gameButton')
    app.gameButton.innerHTML = "Retirer allumettes"
    app.remainingMatches = app.status.textContent.substr(0, 2)
    app.gameLoops()
  },
  gameLoops: function() {
    app.changePlayer()
    app.gameButton.onclick = function() {
      app.oneLoop()
    }
  },
  changePlayer: function() {
    app.instantPlayer = document.querySelector('#player' + app.playerNumber).textContent.substr(4)
    app.playerName.innerHTML = "Tour: " + app.instantPlayer
  },
  oneLoop: function() {
    let recoveredValue = null
    let children = document.querySelectorAll('.radio')
    for (var i = 0; i < children.length; i++) {
      if (children[i].checked) {
        recoveredValue = i+1
      }
    }
    app.remainingMatches -= recoveredValue
    if (app.remainingMatches === 1) {
      app.status.innerHTML = app.remainingMatches + ' Allumette restante'
      app.gameButton.innerHTML = "Dernière allumette"
    }
    else {
      app.status.innerHTML = app.remainingMatches + ' Allumettes restantes'
    }
    app.playerNumber++
    app.checkPlayerNumber()
  },
  checkPlayerNumber: function() {
    if (app.remainingMatches <= 0) {
      app.endGame()
    }
    else if (app.playerNumber > 3) {
      app.playerNumber = 1
      app.changePlayer()
    }
    else {
      app.changePlayer()
    }
  },
  endGame: function() {
    app.gameButton.remove()
    document.querySelector('#selectMatches').remove()
    app.playerNumber = 0
    app.showWinner()
  },
  showWinner: function() {
    app.status.innerHTML = "YOU LOSE " + app.instantPlayer
    app.status.style.fontFamily = "serif"
    app.status.style.fontSize = "3em"
  }
}

app.init()
