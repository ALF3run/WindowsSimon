window.onload = function() {
  //Defining variables.
  var moves = [];
  var j = 0;
  var start = document.getElementById('start');
  var strict = false;
  var bSq = document.getElementById('b-sq');
  var rSq = document.getElementById('r-sq');
  var gSq = document.getElementById('g-sq');
  var ySq = document.getElementById('y-sq');
  
  //Defining handler for the click event. This allows me to remove the eventListener when player win.
  //It isn't possible to remove an eventListener which triggers an anonymous function, such as function() {...}.
  var bClick = function() {
    document.getElementById('b-au').play();
    chkSequence(1);
    }
  var rClick = function() {
    document.getElementById('r-au').play();
    chkSequence(2);
    }
  var gClick = function() {
    document.getElementById('g-au').play();
    chkSequence(3);
    }
  var yClick = function() {
    document.getElementById('y-au').play();
    chkSequence(4);
    }
  
  document.getElementById('strict').addEventListener('click', function() {
    //Toggle between normal and strict mode. It also modify the look of the strict button.
    if(strict === false) {
      strict = true;
      document.getElementById('strict').style.background = 'linear-gradient(#1565C0 80%, #42A5F5)';
    }
    else {
      strict = false;
      document.getElementById('strict').style.background = 'linear-gradient(#42A5F5, #1565C0)';
    }
  });
  
  start.addEventListener('click', function() {
    //Start the game and enable the gameboard.
    moves.length = 0;
    
    bSq.addEventListener('click', bClick);
    rSq.addEventListener('click', rClick);
    gSq.addEventListener('click', gClick);
    ySq.addEventListener('click', yClick);
    
    newSequence();
  });
  
  function chkSequence(sq) {
    var playerMoves = sq;
    
    //Check if the current palyer move is correct.
    if(playerMoves === moves[j]) j++;
    else {
      document.getElementById('lose').play();
      document.body.style.background = 'linear-gradient(#C62828 10%, #EF5350 80%, #EF9A9A)';
      setTimeout(function() {document.body.style.background = 'linear-gradient(#1565C0 10%, #42A5F5 80%, #90CAF9)';}, 1000);
      if(strict === true) {
        //In strict mode, if player fail the game will reset and start over.
        setTimeout(function() {
          moves.length = 0;
          newSequence();
        }, 2500);
      }
      //In normal mode, if player fail the game will start over with the same button sequence.
      else setTimeout(function() {sequence(0);}, 2000);
    }
    
    if(j === 20) {
      //If player win, background set to green for 4s, the gameboard is illuminated, disabled and reset.
      moves.length = 0;
      document.getElementById('win').play();
      
      bSq.style.fill = '#0091EA';
      rSq.style.fill = '#FF4081';
      gSq.style.fill = '#00C853';
      ySq.style.fill = '#FFD600';
      document.body.style.background = 'linear-gradient(#2E7D32 10%, #66BB6A 80%, #A5D6A7)';
      
      bSq.removeEventListener('click', bClick);
      rSq.removeEventListener('click', rClick);
      gSq.removeEventListener('click', gClick);
      ySq.removeEventListener('click', yClick);
      
      setTimeout(function() {
        bSq.style.fill = '#1565C0';
        rSq.style.fill = '#F44336';
        gSq.style.fill = '#4CAF50';
        ySq.style.fill = '#F9A825';
        document.body.style.background = 'linear-gradient(#1565C0 10%, #42A5F5 80%, #90CAF9)';
        document.getElementById('count').innerHTML = '--';
      }, 4000);
    }
    else if(moves.length === j) {
      setTimeout(newSequence, 1000);
    }
    
    return 0;
  }
  
  function newSequence() {
    //Add a new element to the previous sequence of button, increase the 'count'.
    moves.push(Math.ceil(Math.random()*4));
    document.getElementById('count').innerHTML = moves.length;
    
    sequence(0);
    return 0;
  }
  
  function sequence(i) {
    //Play the sequence, flashing the buttons and playing the sounds. Reset player moves.
    j = 0;
    
    if(moves[i] === 1) {
      document.getElementById('b-au').play();
      bSq.style.fill = '#0091EA';
      setTimeout(function() {
        bSq.style.fill = '#1565C0';
        i++;
        setTimeout(function() {sequence(i)}, 300+500/moves.length);
      }, 500+500/moves.length);
    }
    else if(moves[i] === 2) {
      document.getElementById('r-au').play();
      rSq.style.fill = '#FF4081';
      setTimeout(function() {
        rSq.style.fill = '#F44336';
        i++;
        setTimeout(function() {sequence(i)}, 300+500/moves.length);
      }, 500+500/moves.length);
    }
    else if(moves[i] === 3) {
      document.getElementById('g-au').play();
      gSq.style.fill = '#00C853';
      setTimeout(function() {
        gSq.style.fill = '#4CAF50';
        i++;
        setTimeout(function() {sequence(i)}, 300+500/moves.length);
      }, 500+500/moves.length);
    }
    else if(moves[i] === 4) {
      document.getElementById('y-au').play();
      ySq.style.fill = '#FFD600';
      setTimeout(function() {
        ySq.style.fill = '#F9A825';
        i++;
        setTimeout(function() {sequence(i)}, 300+500/moves.length);
      }, 500+500/moves.length);
    }
    return 0;
  }
}
