var questionData = [];
var users = [];
var questionEl = document.querySelector("#question");
var currentAnswer = 0;
var scoreEl = document.querySelector(".score");
var footerEI = document.querySelector('footer');
var finalScoreEl = document.querySelector("#final-score");
var btnListner = document.querySelector(".btn");
var btnBackClear = document.querySelector(".btn-score");
var viewHighScore = document.querySelector("#score-time .score");
var highScoreEl = document.querySelector(".high-score");
var welcomePageEl = document.querySelector(".welcome-page");
var score = 0;
var totalRecords = 0;
var sec = 0;
var timeCheck;


var init = function () {
    score = totalRecords = currentAnswer = 0;
    if (questionData.length <= 0) {
        getDataLocalStorage("questions");
    }
    var timeColor = document.querySelector('.time').style.color;
    if(timeColor === "red"){
        document.querySelector('.time').style.color ="";
    }
    showHide([welcomePageEl]);
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
    questionEl.innerHTML = "";
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
    questionEl.appendChild(questionHeadingE1);
    questionEl.appendChild(questionListE1);
};

// Selected option by the user /  
var btnClick = function (event) {

    var eventText = event.target.textContent.trim().toLowerCase();

    if (eventText === "start quiz") {
        viewHighScore.removeEventListener("click", highScore, false);
        welcomePage();
    } else if (eventText === "go back") {
        showHide([welcomePageEl]);
    } else if (eventText === "clear high score") {
        users = [];
        localStorage.removeItem("users");
        setDataLocalStorage("users", users);
        highScore();
    } else if (eventText !== "submit") {

        selectedAnswer = event.target;
        if (selectedAnswer.parentElement.getAttribute('disabled') === 'disabled') {
            return false;
        } else {

            // disabling the click event
            if (event.target.getAttribute(['data-item-id']) != null) {
                selectedAnswer.parentElement.setAttribute('disabled', 'disabled');
                event.target.style.backgroundColor = "blue";
                isRight(event.target.getAttribute(['data-item-id']));
            }
        }
    } else {
        var userIntial = document.querySelector('input[name="name"]');
        let reg = new RegExp('^[a-zA-Z]{2}$');

        if (userIntial.value === '' || userIntial.value === null) {
            alert("Input your Initals");
            return false;
        } else {
            if (reg.test(userIntial.value)) {
                var user = {
                    name: userIntial.value,
                    score: score < 0 ? 0 : score
                }
            if(users === null){
                users=[];
            }
                users.push(user);
                setDataLocalStorage("users", users);
                userIntial.value = "";
                score = 0;
            } else {
                alert("The length of the name should be 2 characters only & only letter are accepted . Try again!!");
                return false;
            }
        }
        init();
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
            sec -= 10;
        }

        footerEI.innerHTML = "<h3>" + message + "</h3>";
        totalRecords += 1;

        // Pause for the next question to come in 
        setTimeout(() => { totalQuestion() }, 500);
    } else
        return false;
};

// Total number of questions to be presented
var totalQuestion = function () {

    if (questionData[totalRecords] !== null) {
        if (totalRecords === questionData.length) {
            footerEI.innerHTML = "";
            viewHighScore.addEventListener("click", highScore, false);
            userFinalScore();
        } else {
            createQuestion(questionData[totalRecords]);
        }
    }
};

//user Score
var userFinalScore = function () {
    showHide([finalScoreEl]);
    finalScoreEl.innerHTML = "<h2>All Done</h2>";
    var finalSc = document.createElement("p");
    finalSc.innerText = `Your final Score is ${score = score < 0 ? 0 : score}`;
    finalScoreEl.appendChild(finalSc);

    var userInitials = document.createElement("div");
    userInitials.className = "player-info";
    userInitials.innerHTML = "<label>Enter Initial</label>";
    userInitials.innerHTML += "<input type='text' name='name' id='name'>";
    userInitials.innerHTML += "<button class='btn on-submit' onclick='btnClick(event)'>Submit</button>";

    finalScoreEl.appendChild(userInitials);
}

// Timer Function
var updateTimer = function () {
    if (sec <= 0 || totalRecords === questionData.length) {

        var message = sec <= 0 ? "Time Up" : "End of Questions. You have attempted all the questions";
        document.querySelector('.time').innerHTML = "0" + "sec left";
        clearInterval(timeCheck);
        footerEI.innerHTML = "";
        window.alert(message);
        userFinalScore();
    } else {
        sec--;
        if (sec <= 10) {
            document.querySelector('.time').style.color = 'red';
        }else{
            document.querySelector('.time').style.color = '';
        }
        document.querySelector('.time').innerHTML = sec + "sec left";
    }
};

// Welcome Page
var welcomePage = function () {
    totalRecords = 0;
    sec = questionData.length * 10;
    timeCheck = setInterval(updateTimer, 1000);    
    showHide([questionEl]);
    totalQuestion();
};

//View High Score
var highScore = function (event) {
    showHide([highScoreEl]);
    getDataLocalStorage("users");

    var userTable = document.querySelector("#score-table");
    document.querySelector("#score-table").innerHTML = "";
    if (sortByScore()) {
        var Rank = 1;
        users.forEach(user => {
            var createInput = document.createElement("INPUT");
            createInput.setAttribute("disabled", "disabled");
            var cretendials = Rank++ + "." + `${user.name}` + " " + `${user.score}`;
            createInput.setAttribute("placeholder", cretendials);
            userTable.appendChild(createInput);
        });
    } else {
        var createInput = document.createElement("input");
        createInput.setAttribute("disabled", "disabled");
        createInput.setAttribute("placeholder", "No data to show!!");
        userTable.appendChild(createInput);
    }
}

//Sorting the user by highest score
var sortByScore = function () {
    var temp;
    if (users !== null && users.length > 0) {
        for (var i = 0; i < users.length; i++) {
            for (j = i + 1; j < users.length; j++) {

                if (users[i].score < users[j].score) {
                    temp = users[j];
                    users[j] = users[i];
                    users[i] = temp;
                }
            }
        }
        return true;
    } else {
        return false;
    }
};

//Add & remove Sections
var showHide = function (show) {

    var hideAll = [welcomePageEl, finalScoreEl, highScoreEl, questionEl];

    //hide all the elements
    hideAll.forEach(element => {
        element.style.display = "none";
    });

    if (show !== null || show !== "") {
        //show all
        show.forEach(element => {
            element.style.display = "flex";
        });
    }
}

//Setting data to Local Storage
var setDataLocalStorage = function (key, value) {
    if ((key === null || key === '') && (value.lenght < 0)) {
        window.alert("Input the right key and dataset for DB");
    } else {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

setDataLocalStorage("questions", questions);

init();
btnListner.addEventListener("click", btnClick);
questionEl.addEventListener("click", btnClick);
btnBackClear.addEventListener("click", btnClick);
viewHighScore.addEventListener("click", highScore);