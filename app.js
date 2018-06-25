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
    if (inputValue.length > 15) {
      app.errorLength.style.display = "block"
      app.errorLength.innerHTML = 'Pseudo trop long. 15 caractères Maximum!'
    }
    else {
      app.createPlayer(inputValue)
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
    // console.log(app.playerInput.value.substr(app.playerInput.value.length - 1));
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
    app.status.style.margin = "auto"
    app.status.style.color = "black"
    app.status.style.fontSize = "1.5em"
    app.status.innerHTML = app.matchesInput.value + " Allumettes"
    let select = document.createElement('div')
    select.className = "select"
    app.createRadioInputs()
  },
  createRadioInputs: function() {
    let selectMatches = document.createElement('div')
    selectMatches.id = "selectMatches"
    selectMatches.innerHTML = '<span class="playing"></span>'
    let index = 1
    do {
      let radio = document.createElement('input')
      radio.className = "radio"
      radio.id = "radio" + index
      radio.setAttribute("type", "radio")
      radio.setAttribute("name", "radio")
      radio.setAttribute("value", index)
      let label = document.createElement('label')
      label.setAttribute("for", "radio" + index)
      label.innerHTML = index
      selectMatches.appendChild(radio)
      selectMatches.appendChild(label)
      index++
    } while (index <= 3);
    app.game.appendChild(selectMatches)
  },
  gameLoops: function() {
    /*do {

    } while (true);*/
  }
}

app.init()
