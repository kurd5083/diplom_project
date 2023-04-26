let btnRecord = document.querySelector('.btn-record');
let btnSave = document.querySelector('.btn-save');
let heading = document.querySelector('.heading');
let checkboxOne = document.getElementById('checkbox-one');
let checkboxTwo = document.getElementById('checkbox-two');
let checkboxThree = document.getElementById('checkbox-three');
let error = document.getElementById('error');
let sliderLorem;
let slider = document.querySelector('.slider');
let DATA = [];
let n = 1;
let arrayNumberName = 0;
let id1 = 1; let id2 = 2; let id3 = 3; let idDifference = 3;

btnRecord.addEventListener('click', function () {
    heading.innerHTML = `Вопрос ${n}`
    class Questions {
        constructor() {
        {
            this.question = document.fi.question.value,
            this.answers = [{
                id: id1,
                value: document.fi.answerOne.value,
                correct: checkboxOne.checked,
            },
            {
                id: id2,
                value: document.fi.answerTwo.value,
                correct: checkboxTwo.checked,
            },
            {
                id: id3,
                value: document.fi.answerThree.value,
                correct: checkboxThree.checked
            }]
        }
    }
}
    DATA.push(new Questions);
    console.log(DATA);
    document.fi.question.value = '';
    document.fi.answerOne.value = '';
    document.fi.answerTwo.value = '';
    document.fi.answerThree.value = '';
    checkboxOne.checked = false;
    checkboxTwo.checked = false;
    checkboxThree.checked = false;
    id1 += idDifference;
    id2 += idDifference;
    id3 += idDifference;
    n++;
    heading.innerHTML = `Вопрос ${n}`
})

let inputName = document.querySelector('.inputName');
btnSave.addEventListener('click', function(){
    if (DATA.length >= 1 && (inputName.value != '')){
    const updateLocal = () => {
        localStorage.setItem(`DATA${arrayNumberName}`, JSON.stringify(DATA));
    }
    let recordeName = inputName.value;
    arrayNumberName++;
    updateLocal();
    sliderLorem = slider.value;
    localStorage.setItem('arrayNumberName', JSON.stringify(arrayNumberName));
    localStorage.setItem(`sliderLorem${arrayNumberName}`, JSON.stringify(sliderLorem));
    localStorage.setItem(`testName${arrayNumberName}`, JSON.stringify(recordeName));
    window.location.href = './passTest.html';
} 
})

arrayNumberName = JSON.parse(window.localStorage.getItem('arrayNumberName'));   