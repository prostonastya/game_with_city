var container = document.getElementsByClassName('container')[0];
var yourCity = document.getElementsByClassName('text-1')[0];
var compCity = document.getElementsByClassName('text-2')[0];
var okBtn = document.getElementsByClassName('ok-btn')[0];
var cityBlock = document.getElementsByClassName('city-block')[0];
var result = document.getElementsByClassName('result')[0];
var notification = document.getElementsByClassName('notification')[0];

localStorage.setItem('val_1', 'архангельск');
localStorage.setItem('val_2', 'киев');
localStorage.setItem('val_3', 'бердянск');
localStorage.setItem('val_4', 'харьков');
localStorage.setItem('val_5', 'винница');
localStorage.setItem('val_6', 'ровны');
localStorage.setItem('val_7', 'нижний новгород');

okBtn.addEventListener('click', write);

function write(){

    // var all = cityBlock.getElementsByTagName('p');
    // console.log(all);
    var p = document.createElement('p');
    p.innerHTML = yourCity.value;



    cityBlock.appendChild(p);
    var answer = opponent(yourCity.value);

    if (answer) {
        var next = document.createElement('p');
        next.innerHTML = answer;
        setTimeout(()=> {
            cityBlock.appendChild(next);
            compCity.value = answer;

        }, 1500);    
    } else {
       setTimeout(()=> {result.innerHTML = 'I do not know'}, 1500);
    };

    checkLocal(yourCity.value);
    yourCity.value = '' ;
    
};
// ------------------------
function checkLocal(value){
       
    var string = JSON.stringify(localStorage);    
    
    var regexp = new RegExp(value);    
    if (string.match(regexp)){
        console.log('check');
    } else {
        console.log('wrong');
        try {
            localStorage.setItem(`val_${localStorage.length+1}`, value);
        } catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
             alert('Превышен лимит');
            }
        }      
    }    
}

function opponent(str){    
    if (str[str.length-1] == 'ы' || str[str.length-1] == 'й' || str[str.length-1] == 'ь' || str[str.length-1] == 'ъ'){
       var first = str[str.length-2];
       return opponentAnswer(first); 
    } else {
       var first = str[str.length-1];
       return opponentAnswer(first);
    }
}

function opponentAnswer(first){
    for (let i = 1; i <= localStorage.length; i++){
       var name = localStorage.getItem(`val_${i}`);       

        if(name[0] == first){            
            return name
        }
    }
}
