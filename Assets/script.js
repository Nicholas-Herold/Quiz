var questionString = document.querySelector("#buttons");
var list = document.querySelector("#Button-list");
var quest = document.querySelector("#quiz");
var buttonslist = document.querySelectorAll(".aswButtons");
let submitScore = document.querySelector("#submitScore")
let rules = document.querySelector("#rules");
let timer = document.querySelector("#timeLeft");
let submitbtn = document.querySelector("#subScore");
let displayScore = document.querySelector("#display-score")
let listScore = document.querySelector("#score-list")
let resetScore = document.querySelector("#reset-scores")
let scored =document.querySelector("#scoring")
let listAnswer = [];
var press = "";
var indexpos = 0;
let score = 0;
let time = 60;
let sTime = '';
let plus1 = "";
let finalScore = '';
let scoreBoard = JSON.parse(localStorage.getItem("scoreBoard")) || [];




var questionAnswers = [
    {
        question: 'What does HTML stand for?',
        choices: ["Hyperlinks and Text Markup Language","HyperText Markup Language","Home Tool Markup Language","None of the above"],
        correct: "HyperText Markup Language",
    },
    {
        question: 'Choose the correct HTML tag for the largest heading?',
        choices: ["h6","h1","php","heading"],
        correct: "h1",
    },
    {
        question: 'What is the correct HTML tag for inserting a line break?',
        choices: ["br","bl","break"],
        correct: "br",
    },
    {
        question: 'Which one is not an Semantic HTML?',
        choices: ["time","main","article","div"],
        correct: "div",
    },
] 

// Start quiz and rest variables
function int(){
    indexpos = 0;
    score = 0;
    listScore.innerHTML= "";
    displayScore.style.display = "none";
    resetScore.style.display = "none";
    button1.style.display = "none";
stime= setInterval(startTimer,1000)
  cycleQuestions();  
};

// Timer function
function startTimer(){
    if(time === 0){
        Timerend();
        GameOver();
    }
    else {
    time--
    timer.textContent = time;
    }

}

// Stop Timer
function Timerend(){
clearInterval(stime)
};

// happens when game over
function GameOver(){
    list.innerHTML=''; 
    timer.style.display = "none";

    finalScore = score + time;
    rules.textContent = "Score = " + finalScore;
    submitScore.style.display ='block';

    if(time==0){
        quest.textContent = 'Times Up'
         
    }
    else{
    quest.textContent = 'Game Complete'
    list.innerHTML='';
    }
}
// Submit high scores
function scoreSubmit(){
    let initals = document.getElementById("initials").value;
    let submitFinal = {
        final: finalScore,
        name: initals,
    }

    scoreBoard.push(submitFinal);
    scoreBoard.sort((a,b) => b.final - a.final)
    scoreBoard.splice(10);

    localStorage.setItem('scoreBoard',JSON.stringify(scoreBoard))
    
    location.reload()

    
}

// Cycles question when called
function cycleQuestions(){
    // console.log(score);
    // console.log(indexpos);
    if(indexpos === questionAnswers.length){
      GameOver();
      Timerend();
    }
    else{
        plus1 = "";
        quest.textContent = questionAnswers[indexpos].question;
        listAnswer = questionAnswers[indexpos].choices;
        plus1 = questionAnswers[indexpos].correct;
        indexpos++;
        CycleAnswers(listAnswer);
        
    }
};

// Created buttons for answers
function CycleAnswers (choice){
        list.innerHTML='';
        for (let i = 0; i < choice.length; i++) {
            let createButton = document.createElement("button");
            createButton.innerHTML = choice[i];
            createButton.setAttribute("class","aswButtons")
            createButton.setAttribute("id",choice[i])
            list.appendChild(createButton); 
        }
    }



    // compare anwers
        list.addEventListener('click', function (event) { 
        let data = event.target.id;
        
        
      if (data !== plus1) { 
        time = time-5;
        cycleQuestions();         
      }
      else{
        score++;
        cycleQuestions();  
        }
    });

    // turns on and off high score section
function scoreDisplay(){
    if(listScore.getElementsByTagName("li").length === 0){

 scoreBoard.forEach(function(sc){
     var li =document.createElement('li');
     li.textContent = "Initials: "+sc.name + "  Score: "+sc.final;
     listScore.appendChild (li);
 })
}
else {
    listScore.innerHTML = '';
}
}
function clearStorage(){
    localStorage.clear();
    location.reload();
}


// button to submit high score
submitbtn.addEventListener("click",scoreSubmit)
// button to start quiz
button1.addEventListener("click",int)
// show high score list
displayScore.addEventListener("click",scoreDisplay)
// reset high score list
resetScore.addEventListener("click", clearStorage)