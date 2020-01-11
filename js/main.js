let money = 0;
let repair = 0;
let robot = 0;

let prestige = 0;

let health = 0;
let maxHealth = 100;

function clickerClick(number){
    money = money + number;
    document.getElementById('clicker-number').innerHTML = prettify(money);
}

function prettify(input){

    let output = Math.round(input * 1000000)/1000000;
    return output.toString();
}

/**
 * All of the upgrades go here, so any of the ability upgrades
 */


function buyItem(item, id){
    let itemCost = Math.floor(10 * Math.pow(1.1, item));
    let nextCost = 0;

    console.log('this is the id of the div:', id);

    if(money >= itemCost){

        if(id === repair){
            repair = repair + 1;
        } else if(id === robot){
            robot = money + 1;
        }

        money = money - itemCost;
        document.getElementById(toString().id).innerHTML = prettify(item);
        document.getElementById('clicker-number').innerHTML = prettify(money);
    } else {
        console.log('You dont have enough money');
    }
    nextCost = Math.floor(10 * Math.pow(1.1,item));
    document.getElementById(toString().id + 'Cost').innerHTML = nextCost.toString();

}


/**
 * Load and Save functions to store the data
 */

function save(){

    try{

        var save={
            money: money,
            repair: repair,
            prestige: prestige
        };

        localStorage.setItem("save", JSON.stringify(save));

    } catch(err){

        console.log(err);
    }

}

function load(){

    let saveGame = JSON.parse(localStorage.getItem("save"));

    if(typeof saveGame.money !== "undefined") money = saveGame.money;
    if(typeof saveGame.repair !== "undefined") repair = saveGame.repair;

}

function deleteSave(){
    localStorage.removeItem("save");
}


/**
 * The Simulate game loop that happens ever 1 second.
 */


//This stays at the bottom

window.setInterval(function(){

    clickerClick(repair);

}, 1000);
