var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var turnTracker = "";

var numsToLetters = ["", "A", "B", "C"];

var model = 
{
    //The 'Spots' arrays hold the positions that both player and opponent occupy
    playerSpots: [],

    opponentSpots: []
}

var view = 
{
    showPlayerX: function(){

    },

    showOpponentO: function(){

    }
}

var controller = 
{
    startGame: function(){
        var playButton = document.getElementById("playButton");
        var turnDisplay = document.getElementById("turnDisplay");

        playButton.style.display = "none";
        turnDisplay.style.display = "block";

        this.playerTurn();
    },

    activateCell: function(cellID){
        var cell = document.getElementById(cellID);
        cell.style.cursor = "default";
        cell.onclick = null;

        if(turnTracker != "") //If the game has started
        {
            if(turnTracker == "player")
            {
                cell.style.background = "url(Images/x.png) no-repeat center";
                cell.style.backgroundSize = "50px";

                model.playerSpots.push(cellID); //Add this cell to the player's list
                
                if(this.checkIfPlayerWon())
                {
                    var allContentBlocker = document.getElementById("ALLCONTENT_BLOCKER");
                    allContentBlocker.style.display = "block";

                    var victoryBox = document.getElementById("victoryBox");
                    victoryBox.style.top = "100%";

                    var endOfGamePrompt = document.getElementById("endOfGamePrompt");
                    endOfGamePrompt.style.top = "50%";

                    endOfGamePrompt.getElementsByTagName("h3")[0].innerHTML = "CONGRATULATIONS, YOU WON!";
                }
                else
                    this.opponentTurn();
            }
            else //turnTrackker == "opponent"
            {
                cell.style.background = "url(Images/o.png) no-repeat center";
                cell.style.backgroundSize = "50px";

                model.opponentSpots.push(cellID); //Add this cell to the player's list

                if(this.checkIfOpponentWon())
                {
                    var allContentBlocker = document.getElementById("ALLCONTENT_BLOCKER");
                    allContentBlocker.style.display = "block";

                    var endOfGamePrompt = document.getElementById("endOfGamePrompt");
                    endOfGamePrompt.style.top = "50%";

                    endOfGamePrompt.getElementsByTagName("h3")[0].innerHTML = "OH NO, YOU LOST!";
                }
                else
                    this.playerTurn();
            }
        }
    },

    playerTurn: function(){
        turnTracker = "player";

        var turnDisplay = document.getElementById("turnDisplay");
        turnDisplay.innerHTML = "Your turn";

        var allContentBlocker = document.getElementById("ALLCONTENT_BLOCKER");
        allContentBlocker.style.display = "none";
    },

    opponentTurn: function(){
        turnTracker = "opponent";

        var turnDisplay = document.getElementById("turnDisplay");
        turnDisplay.innerHTML = "Opponent's turn";

        var allContentBlocker = document.getElementById("ALLCONTENT_BLOCKER");
        allContentBlocker.style.display = "block";

        var cellLetter; //Determines the 'Letter' of the cell
        var cellNumber; //Determines the number of the cell
        var opponentChoice; //The appended string of the two values above

        do{
            var rand1 = Math.ceil(Math.random() * 3);
            var rand2 = Math.ceil(Math.random() * 3);

            console.log("Rand1 = " + rand1);
            console.log("Rand2 = " + rand2);

            cellLetter = numsToLetters[rand1];
            cellNumber = rand2;

            opponentChoice = cellLetter + cellNumber;
            console.log(opponentChoice);

        }while(model.playerSpots.indexOf(opponentChoice) >= 0 || model.opponentSpots.indexOf(opponentChoice) >= 0);
        
        setTimeout(function(){
            controller.activateCell(opponentChoice);
        }, 1250);
    },

    checkIfPlayerWon(){
        var playerSpots = model.playerSpots;

        //Set 'boolean' values for each grid cell
        var hasA1 = playerSpots.indexOf("A1");
        var hasA2 = playerSpots.indexOf("A2");
        var hasA3 = playerSpots.indexOf("A3");
        var hasB1 = playerSpots.indexOf("B1");
        var hasB2 = playerSpots.indexOf("B2");
        var hasB3 = playerSpots.indexOf("B3");
        var hasC1 = playerSpots.indexOf("C1");
        var hasC2 = playerSpots.indexOf("C2");
        var hasC3 = playerSpots.indexOf("C3");

        if(hasA1 >= 0 && hasA2 >= 0 && hasA3 >= 0)
            return true;
        else if(hasB1 >= 0 && hasB2 >= 0 && hasB3 >= 0)
            return true;
        else if(hasC1 >= 0 && hasC2 >= 0 && hasC3 >= 0)
            return true;
        else if(hasA1 >= 0 && hasB1 >= 0 && hasC1 >= 0)
            return true;
        else if(hasA2 >= 0 && hasB2 >= 0 && hasC2 >= 0)
            return true;
        else if(hasA3 >= 0 && hasB3 >= 0 && hasC3 >= 0)
            return true;
        else if(hasA1 >= 0 && hasB2 >= 0 && hasC3 >= 0)
            return true;
        else if(hasA3 >= 0 && hasB2 >= 0 && hasC1 >= 0)
            return true;
        else
            return false;
    },

    checkIfOpponentWon(){
        var opponentSpots = model.opponentSpots;

        //Set 'boolean' values for each grid cell
        var hasA1 = opponentSpots.indexOf("A1");
        var hasA2 = opponentSpots.indexOf("A2");
        var hasA3 = opponentSpots.indexOf("A3");
        var hasB1 = opponentSpots.indexOf("B1");
        var hasB2 = opponentSpots.indexOf("B2");
        var hasB3 = opponentSpots.indexOf("B3");
        var hasC1 = opponentSpots.indexOf("C1");
        var hasC2 = opponentSpots.indexOf("C2");
        var hasC3 = opponentSpots.indexOf("C3");

        if(hasA1 >= 0 && hasA2 >= 0 && hasA3 >= 0)
            return true;
        else if(hasB1 >= 0 && hasB2 >= 0 && hasB3 >= 0)
            return true;
        else if(hasC1 >= 0 && hasC2 >= 0 && hasC3 >= 0)
            return true;
        else if(hasA1 >= 0 && hasB1 >= 0 && hasC1 >= 0)
            return true;
        else if(hasA2 >= 0 && hasB2 >= 0 && hasC2 >= 0)
            return true;
        else if(hasA3 >= 0 && hasB3 >= 0 && hasC3 >= 0)
            return true;
        else if(hasA1 >= 0 && hasB2 >= 0 && hasC3 >= 0)
            return true;
        else if(hasA3 >= 0 && hasB2 >= 0 && hasC1 >= 0)
            return true;
        else
            return false;
    }
}


function setGameDimensions()
{
    var allContent = document.getElementById("ALLCONTENT");
    var playButton = document.getElementById("playButton");
    var turnDisplay = document.getElementById("turnDisplay");
    var allContentBlocker = document.getElementById("ALLCONTENT_BLOCKER");

    var gameHeight = (screenHeight * (3/4));
    var gamewidth = gameHeight;

    allContent.style.height = gameHeight + "px";
    allContent.style.width = gamewidth + "px";

    playButton.style.width = gamewidth + "px";

    turnDisplay.style.width = gamewidth + "px";

    allContentBlocker.style.height = gameHeight + "px";
    allContentBlocker.style.width = gamewidth + "px";
    allContentBlocker.style.marginLeft = -gamewidth/2 + "px";
}

