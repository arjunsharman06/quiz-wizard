const questions = [
    {
        heading: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<scripting>", "<script>", "<js>"],
        answer: "3"
    },
    {
        heading: "What is the correct JavaScript syntax to change the content of the HTML element below?<p id='demo'>This is a demonstration.</p>",
        options: ["document.getElement('p').innerHTML = 'Hello World!';", "document.getElementByName('p').innerHTML = 'Hello World!';", "#demo.innerHTML = 'Hello World!';", "document.getElementById('demo').innerHTML = 'Hello World!';"],
        answer: "4"
    },
    // {
    //     question:"What is the correct JavaScript syntax to change the content of the HTML element below?<p id='demo'>This is a demonstration.</p>",
    //     option1:"document.getElement('p').innerHTML = 'Hello World!';",
    //     option2:"document.getElementByName('p').innerHTML = 'Hello World!';",
    //     option3:"#demo.innerHTML = 'Hello World!';",
    //     option4:"document.getElementById('demo').innerHTML = 'Hello World!';",
    //     answer:"4"
    // },
    // {
    //     question:"Which method returns the character at the specified index?",
    //     option1:"characterAt()",
    //     option2:"getCharAt()",
    //     option3:"charAt()",
    //     option4:"None of the above",
    //     answer:"3"
    // },
    // {
    //     question:"Which of the following is not a mouse event?",
    //     option1:"onmousescroller",
    //     option2:"onclick",
    //     option3:"onmouseover",
    //     option4:"onmousemove",
    //     answer:"1"
    // },
    // {
    //     question:" How to know the number of elements of a form?",
    //     option1:"document.myform.elements.count",
    //     option2:"document.myform.length",
    //     option3:"document.myform.count",
    //     option4:"document.myform.elements.length",
    //     answer:"4"
    // },

];

var setDataLocalStorage = function (key,value) {
    if( (key === null || key === '') && (value.lenght < 0)){
        window.alert("Input the right key and dataset for DB");
    }else {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

setDataLocalStorage("questions",questions);