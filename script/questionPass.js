arrayNumberName = JSON.parse(window.localStorage.getItem('arrayNumberName'));   
sliderLorem = JSON.parse(window.localStorage.getItem(`sliderLorem${arrayNumberName}`));   

DATA = JSON.parse(window.localStorage.getItem('DATA'));   

let localResults = {
};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');
let clockTime = document.getElementById('clock-time');


let sec = 60;
let min = (sliderLorem - 1);
let t;
function tick(){

 
}
function stop(){
    clockTime.innerHTML =  '00:00';
    clearTimeout(t);
}

function add(){
    sec--;
    t = setTimeout(add, 1000);
    if(clockTime.innerHTML == '00:00'){
        alert('Время вышло');
        clearTimeout(t);
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('indicator--visible');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');
            renderResults();
        return;
    }  
    clockTime.innerHTML = (min > 9 ? min: "0" + min)
    + ":" +(sec > 9 ? sec: "0" + sec);
    console.log(sec)
    if(sec == 0){
        sec = 60;
        min--; 
    } 
}
add();

if(min == 0 && sec == 0){
    alert('Время вышло');
}
const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;
    console.log(questions.dataset.currentStep);
    const renderAnswers = () =>DATA[index].answers
    .map((answer) =>`
<li>
    <label>
        <input class="answer-input" type="radio" name=${index} value=${answer.id}>
            ${answer.value}
        </label>
    </li>
    `)
    .join('');
    questions.innerHTML = `
    <div class="quiz-questions-item">
        <div class="quiz-questions-item-questions">${DATA[index].question}</div>
        <ul class="quiz-questions-item-answers">${renderAnswers()}</ul>
    </div>
    `;

};
 
let a = 0;
const renderResults  = () =>{
    let content = '';
    const getClassname = (answers, questionIndex) => {
        let classname = '';
        if(!answers.correct && answers.id == localResults[questionIndex]){
            classname = 'answer--invalid';

        }if(answers.correct && answers.id == localResults[questionIndex]){
            classname = 'answer--valid';
            a++;
        }
 
        return classname;
    };

    
    const getAnswers = (questionIndex) => DATA[questionIndex].answers
    .map((answer) =>`<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
    .join('');
    DATA.forEach((question, index)=>{
        content += `
        <div class="quiz-results-item">
            <div class="quiz-results-item-questions">${question.question}</div>
            <ul class="quiz-questions-item-answers">${getAnswers(index)}<ul>
        </div>`
      
    });

    content += `<div class="quiz-indicator" id="indicator">Правильных ответов: ${a}/${DATA.length}</div>`;
    results.innerHTML = content;
    console.log(results);
    let quizResultsItem = document.querySelectorAll('.quiz-results-item');
    console.log(quizResultsItem)
    for(let i = 0; i < DATA.length; i++){
        if(localResults[i]== null){
            classname = 'answer--invalid';
            quizResultsItem[i].innerHTML += '<p id="answer-incorrect">Ответ не выбран</p>';
        }
    }
};

const renderIndicator  = (currentStep) =>{
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};
btnNext.disabled = true;
quiz.addEventListener('change', (event) =>{
 if (event.target.classList.contains('answer-input')){
     localResults[event.target.name] = event.target.value;
     btnNext.disabled = false;
     console.log(localResults);
    }
});
quiz.addEventListener('click', (event) =>{
    if (event.target.classList.contains('btn-next')){
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;
        if (DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('indicator--visible');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');
            stop();
            renderResults();
        }else {
            renderQuestions(nextQuestionIndex);
        }
        btnNext.disabled = true;
        
    }
    if (event.target.classList.contains('btn-restart')){
        localResults = {};
        results.innerHTML = '';
        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden')
        results.classList.remove('indicator--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        renderQuestions(0);
        sec = 60;
        min = (sliderLorem - 1);
        clockTime.innerHTML = (min > 9 ? min: "0" + min)
        + ":" +(sec > 9 ? sec: "0" + sec);
        add();
    }
});

renderQuestions(0);
