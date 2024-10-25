var gameTime = 30;  
var totalTargets = 0;
var targetsClicked = 0;
var missedTargets = 0; 
var targetInterval = null; 
var gameTimer = null;  
var remainingTime = gameTime; 

// Start button
var startButton = document.getElementById("startGame");
startButton.addEventListener('click', startGame); 

// Scoreboard elements
var totalTargetsDisplay = document.getElementById("totalTargets");
var targetsClickedDisplay = document.getElementById("targetsClicked");
var missedTargetsDisplay = document.getElementById("missedTargets");
var finalScoreDisplay = document.getElementById("finalScore");
var scoreboard = document.getElementById("scoreboard");


//Start game function
function startGame() {
    resetGame();
    targetInterval = setInterval(spawnTarget, 1000);  
    gameTimer = setInterval(updateTimer, 1000);  
    setTimeout(endGame, gameTime * 1000);  
}

//Creating targets
function spawnTarget() {
    totalTargets++;
    var target = document.createElement("div");
    target.classList.add("target");

    
    //Randomizing target locations
    var maxX = gameArea.offsetWidth - 200;  
    var maxY = gameArea.offsetHeight - 200;  
    var randomX = randomValue(200, maxX);
    var randomY = randomValue(200, maxY);

   
   //Target styling
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.width = "50px";  
    target.style.height = "50px";  
    target.style.backgroundColor = "red";  
    target.style.position = "absolute"; // Ensure targets are positioned absolutely
    target.style.transition = "transform 0.5s";  

    document.body.appendChild(target);

     //grow target
     target.style.transform = "scale(1.5)";  
     setTimeout(() => {
     
        //shrink target
         target.style.transform = "scale(0.5)";  
     }, 500); 

    target.addEventListener('click', () => {
        targetsClicked++;
        document.body.removeChild(target);  
    });

    setTimeout(() => {
        if (document.body.contains(target)) {
            missedTargets++;
            document.body.removeChild(target);  
        }
    }, 1500);  
}

//Resetting Game
function resetGame() {
    totalTargets = 0;
    targetsClicked = 0;
    missedTargets = 0; 
    clearTargets(); 

    //Resetting Time
    remainingTime = gameTime;  
    document.getElementById("timerDisplay").textContent = `Time left: ${remainingTime}s`; 
}

//Updating Timer Throughout Game
function updateTimer() {
    remainingTime--; 
    document.getElementById("timerDisplay").textContent = `Time left: ${remainingTime}s`; 

   //Ending Timer
    if (remainingTime <= 0) {
        clearInterval(gameTimer); 
    }
}

//Ending Games
function endGame() {
    clearTargets();
    displayScore(); 
    clearInterval(gameTimer);
    clearInterval(targetInterval); 
}

//Clearing targets
function clearTargets() {
    var targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());
}

//Score display
function displayScore() {
    
   totalTargetsDisplay.textContent= `Total targets: ${totalTargets}`;
   targetsClickedDisplay.textContent= `Targets clicked: ${targetsClicked}`;
   missedTargetsDisplay.textContent= `Missed targets: ${missedTargets}`;
   finalScoreDisplay.textContent= `Final score: ${calculateScore()}`;
   scoreboard.classList.remove("hidden"); 
}

//Score Calculation
function calculateScore() {
   return Math.floor((100* targetsClicked / totalTargets)); 
}

//Claire's Class Notes???
function randomValue(min, max) {
   return Math.random() * (max - min) + min; 
}