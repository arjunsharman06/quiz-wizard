var questionData = [];
var users = [];
var questionE1 = document.querySelector("#question");
var currentAnswer = 0;
var scoreEl = document.querySelector(".score");
var footerEI = document.querySelector('footer');
var finalScore = document.querySelector("#final-score");
var welBtn = document.querySelector(".start-quiz");
var viewHighScore = document.querySelector("#score-time");
var highScoreEI =  document.querySelector(".high-score");
var score = 0;
var totalRecords = 0;
var sec = 0;


var init = function () {
    hideAll();
    document.querySelector(".welcome-page").style.display = "flex";
    // finalScore.style.display = "none";
    // highScoreEI.style.display = "none";
};

// Getting Data from Local storage
var getDataLocalStorage = function (key) {
    if (key === "questions") {
        questionData = JSON.parse(window.localStorage.getItem(key));
        sec = questionData.length * 10;
    } else {
        users = [];
        users = JSON.parse(window.localStorage.getItem(key));
    }
};

// Question Creation
var createQuestion = function (questionObject) {
    questionE1.innerHTML = "";
    footerEI.innerHTML = "";

    var questionHeadingE1 = document.createElement("h2");
    questionHeadingE1.textContent = questionObject.heading;

    var questionListE1 = document.createElement("ul");
    questionListE1.className = "question-list";

    for (var i = 1; i <= questionObject.options.length; i++) {

        var questionListItemE1 = document.createElement("li");
        questionListItemE1.className = "question-list-item";
        questionListItemE1.innerText = questionObject.options[i - 1];
        questionListItemE1.setAttribute("data-item-id", i);
        questionListE1.appendChild(questionListItemE1);
    }

    currentAnswer = parseInt(questionObject["answer"]);
    questionE1.appendChild(questionHeadingE1);
    questionE1.appendChild(questionListE1);
};

// Selected option by the user /  
var btnClick = function (event) {
    var eventType = event.type;

    if (eventType !== "submit") {

        selectedAnswer = event.target;
        if (selectedAnswer.parentElement.getAttribute('disabled') === 'disabled') {
            return false;
        } else {

            // disabling the click event /  
            selectedAnswer.parentElement.setAttribute('disabled', 'disabled');
            event.target.style.backgroundColor = "blue";
            isRight(event.target.getAttribute(['data-item-id']));
        }
    } else {

        var userIntial = document.querySelector('input[name="name"]');
        if (userIntial.value === '' || userIntial.value === null) {
            alert("Input your Initals");
            return false;
        } else {
            var user = {
                name: userIntial.value,
                score: score
            }
            users.push(user);
            setDataLocalStorage("users", users);
            userIntial.value = "";
            score = 0;
        }
        finalScore.style.display="none"
    }
};

// Checking if the selected value is right or not/ 
var isRight = function (dataID) {

    var message = "";

    if (currentAnswer > 0 && dataID !== null) {

        if (currentAnswer === parseInt(dataID)) {
            message = "Right Answer!";
            score += 10;
        } else {
            message = "Wrong Answer!";
            score -= 10;
            sec -= 10;
        }

        footerEI.innerHTML = " <h3>  " + message + "</h3>";
        totalRecords += 1;

        // Pause for the next question to come in 
        setTimeout(() => { totalQuestion() }, 1000);
    } else
        return false;
};

// Total number of questions to be presented
var totalQuestion = function () {
    getDataLocalStorage("questions");

    if (questionData[totalRecords] !== null) {
        if (totalRecords === questionData.length) {
            userFinalScore();
        } else {
            createQuestion(questionData[totalRecords]);
        }
    }
};

var userFinalScore = function () {
    questionE1.style.display = "none";
    footerEI.style.display = "none";
    finalScore.style.display = "flex";

    finalScore.innerHTML = "<h2>All Done</h2>";
    var finalSc = document.createElement("p");
    finalSc.innerText = `Your final Score is ${score}`;
    finalScore.appendChild(finalSc);

    var userInitials = document.createElement("div");
    userInitials.className = "player-info";
    userInitials.innerHTML = "<label>Enter Initial</label>";
    userInitials.innerHTML += "<input type='text' name='name' id='name'>";
    userInitials.innerHTML += "<button class='btn on-submit' onclick='btnClick(this)'>Submit</button>";

    finalScore.appendChild(userInitials);
}

// Timer Function
var updateTimer = function () {
    sec--;
    if (sec <= -1 || totalRecords === questionData.length) {
        document.querySelector('.time').innerHTML = "0" + "sec left";
        clearInterval(timeCheck);
        setTimeout(() => { alert("Time out!! :("); }, 100);
        userFinalScore();
    } else {
        document.querySelector('.time').innerHTML = sec + "sec left";
    }
};

// Welcome Page
var welcomePage = function (event) {
    event.target.parentElement.style.display = "none"
    totalQuestion();
};

var highScore = function () {
    hideAll();
    debugger;
    getDataLocalStorage("users");
    sortByScore();

    var userTable = document.querySelector("#score-table");
    userTable.parentElement.style.display="flex";
    var Rank = 1 ;
    users.forEach(user => { 
        var createInput = document.createElement("input");
        createInput.setAttribute("disabled","disabled");
        createInput.setAttribute("placeholder", Rank++ + ". " + `${user.name}` + " " + `${user.score}`);
        userTable.appendChild(createInput);
    });
}

var sortByScore = function(){
    var temp;

    for (var i = 0; i < users.length; i++) {
        for (j = i + 1; j < users.length; j++) {
            
            if(users[i].score < users[j].score){
                temp = users[j];
                users[j] = users[i];
                users[i] = temp;
            }
        }
    }
};

var hideAll = function(){
    document.querySelector(".welcome-page").style.display = "none";
    document.querySelector(".final-score").style.display = "none";
    document.querySelector(".high-score").style.display = "none";
}

init();
welBtn.addEventListener("click",welcomePage);
questionE1.addEventListener("click", btnClick);
debugger;
viewHighScore.addEventListener("click",highScore);

// var timeCheck = setInterval(updateTimer, 1000);