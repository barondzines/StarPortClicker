let money = 0;
let power = 0;

let repair = 0;
let robot = 0;

let prestige = 0;

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

function buyRobot(id){
    let robotCost = Math.floor(10 * Math.pow(1.1, robot));
    if(money >= robotCost){
        robot = robot + 1;
        money = money - robotCost;
        document.getElementById('robots').innerHTML = prettify(robot);
        document.getElementById('clicker-number').innerHTML = prettify(money);
        nextCost = Math.floor(10 * Math.pow(1.1,robot));
        document.getElementById('robotCost').innerHTML = nextCost.toString();
    } else {
        console.log('You dont have enough money');
    }

}




/**
 * Load and Save functions to store the data
 */

function save(){

    try{

        var save={
            money: money,
            repair: repair,
            robot: robot,
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
    if(typeof saveGame.robot !== "undefined") robot = saveGame.robot;

}

function deleteSave(){
    localStorage.removeItem("save");
}


/**
 * The Simulate game loop that happens ever 1 second.
 */


//This stays at the bottom

window.setInterval(function(){

    clickerClick(robot);

}, 1000);
