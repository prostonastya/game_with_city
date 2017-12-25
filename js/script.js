var container = document.getElementsByClassName('container')[0];
var yourCity = document.getElementsByClassName('text-1')[0];
var compCity = document.getElementsByClassName('text-2')[0];
var okBtn = document.getElementsByClassName('ok-btn')[0];
var giveUpBtn = document.getElementsByClassName('give-up-btn')[0];
var cityBlock = document.getElementsByClassName('city-block')[0];
var result = document.getElementsByClassName('result')[0];
var notification = document.getElementsByClassName('notification')[0];
var all;
// массив ответов:
var checkAllArr = [];

if (localStorage.length == 0){
    localStorage.setItem('val_1', 'архангельск');
    localStorage.setItem('val_2', 'киев');
    localStorage.setItem('val_3', 'бердянск');
    localStorage.setItem('val_4', 'харьков');
    localStorage.setItem('val_5', 'винница');
    localStorage.setItem('val_6', 'ровны');
    localStorage.setItem('val_7', 'нижний новгород');
}


okBtn.addEventListener('click', write);
giveUpBtn.addEventListener('click', pass);

function write(){

    let p = document.createElement('p');
    p.innerHTML = yourCity.value;
    
    // проверка 1й буквы пользователя
    if (compCity.value){        
        var letter_1 = opponent(compCity.value);
        if(yourCity.value[0] == letter_1){

            if(checkDouble(p)) {
                checkAllArr.push(p);
                cityBlock.appendChild(p);
                makeComputerAnswer();
            } else {
                notify(`Слова не должны дублироваться !!!`);
            }
            
        } else {
            notify(`Слово должно начинаться с буквы ${letter_1} !!!`);
        }
    } else{
        checkDouble(p);
        checkAllArr.push(p);
        cityBlock.appendChild(p);
        makeComputerAnswer()
    }    
};

function makeComputerAnswer(){
    let letter = opponent(yourCity.value);
    let answer = opponentAnswer(letter);
   
    if (answer) {
        var next = document.createElement('p');
        next.innerHTML = answer;
        setTimeout(()=> {
            checkDouble(next);
            checkAllArr.push(next);
            cityBlock.appendChild(next);
            compCity.value = answer;

        }, 1500);    
    } else {
       setTimeout(()=> {result.innerHTML = 'User, I don\'t know the right answer. <br> Game over!!!'}, 1500);
    };

    checkLocal(yourCity.value);
    yourCity.value = '' ;
}

// проверка есть ли такой  города в локал сторадж, если нет, добавляет

function checkLocal(value){
       
    var string = JSON.stringify(localStorage);    
    var regexp = new RegExp(value);    
    if (string.match(regexp)){
        // console.log('check');
    } else {
        // console.log('wrong');
        try {
            localStorage.setItem(`val_${localStorage.length+1}`, value);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
             alert('Превышен лимит');
            }
        }      
    }    
}

// определяет последнюю букву
function opponent(str){    
    if (str[str.length-1] == 'ы' || str[str.length-1] == 'й' || str[str.length-1] == 'ь' || str[str.length-1] == 'ъ'){
        var first = str[str.length-2];
        return first;
    } else {
        var first = str[str.length-1];
        return first;
    }
}

// по первой букве возвращает город из локал
function opponentAnswer(first){
    for (let i = 1; i <= localStorage.length; i++){
       var name = localStorage.getItem(`val_${i}`);       

        if(name[0] == first &&  checkDouble(name) == true){
            console.log('checkAllArr', checkAllArr);
            console.log('name', name);

            return name
        } 
    }
}

function pass(){
    result.innerHTML = 'Computer, I do not know the right answer! <br> Game over!!!'
}


// для проверки на задвоение в ответах
function checkDouble(item) {
    var check = true;
    for (let i =0; i< checkAllArr.length; i++){
        if (checkAllArr[i].innerText == item.innerText || checkAllArr[i].innerText == item){
            check = false;
        }
    }
    return check;
}

function notify(str) {
    var par = document.createElement('p');
    par.innerHTML = str;
    notification.appendChild(par);
    setTimeout(()=> { par.innerHTML = ''}, 3000);
}