arrayNumberName = JSON.parse(window.localStorage.getItem('arrayNumberName'));
let btnBack = document.getElementById('btn-back');
let listTest = document.querySelector('.list-test');
let passTest = document.querySelector('.pass-test');
let form = document.querySelector('.form');
let n = 1;
let delet = [];
let line = [];
console.log(listTest);
console.log(arrayNumberName);

if (arrayNumberName == null) {
    form.innerHTML += `<img class="imgCat" src="./img/cat.png">
    <p>Здесь пока ничего нет,<br>
    Заглядывайте позже.</p> `;
}
if (arrayNumberName !== 0) {
    for (let i = 0; i < arrayNumberName; i++) {
        testName = JSON.parse(window.localStorage.getItem(`testName${n}`));
        listTest.innerHTML += `<div class="line">
        <p>Тест ${n}: ${testName}</p>
        <div class="btn">
        <a href="questionPass.html"><button class="btn-pass-delet pass"><img class="img-pass-delet" src="../img/passTest.png"></button></a>
        <button class="btn-pass-delet delet"><img class="img-pass-delet" src="../img/deletTest.png"></button></div></div>`;
        delet = document.querySelectorAll('.delet');
        pass = document.querySelectorAll('.pass');
        console.log(pass);
        line = document.querySelectorAll('.line');
        n++;
    }
}
function pas() {
    for (let i = 0; i < pass.length; i++) {
        pass[i].onclick = function () {
            DATA = JSON.parse(window.localStorage.getItem(`DATA${i+1}`));
            localStorage.setItem('DATA', JSON.stringify(DATA));
        }
    }
}
pas();
function deletIndex() {
    for (let i = 0; i < delet.length; i++) {
        delet[i].onclick = function () {
            line[i].innerHTML = '';
            line[i].classList.remove('line');
            window.localStorage.removeItem(`testName${i+1}`);
            window.localStorage.removeItem(`sliderLorem${i+1}`);
            window.localStorage.removeItem(`DATA${i+1}`);
            arrayNumberName -= 1;
            localStorage.setItem('arrayNumberName', JSON.stringify(arrayNumberName));
            if (arrayNumberName == 0) {
                window.localStorage.removeItem('arrayNumberName');
                form.innerHTML += `<img class="imgCat" src="./img/cat.png">
                <p>Здесь пока ничего нет,<br>
                Заглядывайте позже.</p> `;
            }
        }
    }

}

deletIndex();




