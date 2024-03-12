let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "text": "Your enter the town square. You can see a sign that says \"store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy " + weapons[(currentWeapon + 1) % weapons.length].name + " (20 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "text": "Welcome to the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        "text": "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "text": "You are fighting a " + monsters[fighting].name +  "."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        "text": "The monster dies. You find gold and gain experience."
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        "text": "You died."
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        "text": "You defeat the dragon! You win the game :))"
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];

	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    text.innerText = location.text;    
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else text.innerText = "You don't have enough gold to buy health.";
}

function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 20){
            gold -= 20;
            currentWeapon++;
            goldText.innerText = gold;
            if(currentWeapon == weapons.length - 1){
                button2.innerText = "Sell the weakest weapon for 15.";
                button2.onclick = sellWeapon;
            }
            else button2.innerText = "Buy " + weapons[(currentWeapon + 1) % weapons.length].name + " (20 gold)";
            text.innerText = "Your new weapon is " + weapons[currentWeapon].name + ".";
            inventory.push(weapons[currentWeapon].name);
        }
        else text.innerText = "You don't have enough gold to buy this weapon.";
    }
    else{
        text.innerText = "You already have the best weapon " + weapons[currentWeapon].name + ".";
        button2.innerText = "Sell the weakest weapon for 15.";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += "In your inventory you have: " + inventory;
    }
    else text.innerText = "Don't sell your only weapon!";
}

function goFight(){
    update(locations[3]);
    monterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText = monterHealth;
    if(health <= 0) lose();
    else{
        if(monsterHealth <= 0){
            if(fighting == 2) winGame();
            else defeatMonster();
        }
    }
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6])
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown;
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    goldText.innerText = gold;
    xp += monsters[fighting].level;
    xpText.innerText = xp;
    update(locations[4]);
}

function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}


function fightDragon(){
    fighting = 2;
    goFight();
}