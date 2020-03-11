var ongoing;
var userHealth = 100;
var oppHealth = 100;



function openHT(){
    
    var modal = document.getElementById("$newMatch");
    var btn = document.getElementById("newMatch");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
      modal.style.display = "block";
    }

    span.onclick = function() {
      modal.style.display = "none";
    }
}

function chooseHeads(){ /* 0 for Heads */
    
    userHealth = 100;
    oppHealth = 100;
    document.getElementById("character").src = 'images/PlayerDef.png';
    document.getElementById("opponent").src = 'images/OppDef.png';
    document.getElementById("displayUserHealth").innerHTML = "Health: " + userHealth;
    document.getElementById("displayOppHealth").innerHTML = "Health: " + oppHealth;
    document.getElementById("oppLog").innerHTML = "";
    document.getElementById("userLog").innerHTML = "";
    
    var modal = document.getElementById("$newMatch");
    var choice=0;
    var coin = randomInt();
    var win;
    
    if(choice==coin) win=1;
    else win=0;
    
    modal.style.display = "none";
    gameProper(win, coin);
    
}

function chooseTails(){ /* 1 for Tails */
    
    userHealth = 100;
    oppHealth = 100;
    document.getElementById("character").src = 'images/PlayerDef.png';
    document.getElementById("opponent").src = 'images/OppDef.png';
    document.getElementById("displayUserHealth").innerHTML = "Health: " + userHealth;
    document.getElementById("displayOppHealth").innerHTML = "Health: " + oppHealth;
    document.getElementById("oppLog").innerHTML = "";
    document.getElementById("userLog").innerHTML = "";
    
    var modal = document.getElementById("$newMatch");
    var choice=1;
    var coin = randomInt();
    var win;
    
    if(choice==coin) win=1;
    else win=0;
    
    modal.style.display = "none";
    gameProper(win, coin);
    
}

function gameProper(win, coin){
    
    
    
    if(win==1){
        if(coin==0) alert("The coin landed on: HEADS. You won the coin flip! You go first.");
        else alert("The coin landed on: TAILS. You won the coin flip! You go first.");
    }
    else{
        if(coin==0) alert("The coin landed on: HEADS. You lost the coin flip! Your opponent goes first.");
        else alert("The coin landed on: TAILS. You lost the coin flip! Your opponent goes first.");
        opponentTurn(0);
    }
    
    ongoing=1;
    
}

function attack(){
    
    if(ongoing!=1){
        alert("Press [New Match!] first.");
        return;
    }
    
    document.getElementById("character").src = 'images/PlayerAtt.png';
    
    var damage = Math.round(Math.random()*5);
    opponentTurn(damage);
    oppHealth -= damage;
    document.getElementById("displayOppHealth").innerHTML = "Health: " + oppHealth;
    document.getElementById("userLog").innerHTML = "You dealt " + damage + " damage!";
    
    check();
    
}

function defend(){
    
    if(ongoing!=1){
        alert("Press [New Match!] first.");
        return;
    }
    
    document.getElementById("character").src = 'images/PlayerDef.png';
    var action = randomInt(); /* 0 for Defend, 1 for Attack */
    if(action==1){
        
        document.getElementById("opponent").src = 'images/OppAtt.png'
        var oppdamage = Math.round(Math.random()*5);
        
        if(oppdamage>3){
            userHealth -= oppdamage;
            userHealth += 3;
            document.getElementById("userLog").innerHTML = "You defended, deflecting 3 damage!";
            document.getElementById("displayUserHealth").innerHTML = "Health: " + userHealth;
            document.getElementById("oppLog").innerHTML = "Your opponent dealt " + oppdamage + " damage!";
        }
        else if(damage<=3){
            userHealth -= oppdamage;
            userHealth += oppdamage;
            document.getElementById("userLog").innerHTML = "You defended, deflecting all damage!";
            document.getElementById("displayUserHealth").innerHTML = "Health: " + userHealth;
            document.getElementById("oppLog").innerHTML = "Your opponent dealt " + oppdamage + " damage!";
        }
    }
    else if(action==0){
        document.getElementById("opponent").src = 'images/OppDef.png';
        document.getElementById("userLog").innerHTML = "You both defended!";
        document.getElementById("oppLog").innerHTML = "You both defended!";
    }
    
    check();
    
}

function opponentTurn(damage){
    
    var action = randomInt(); /* 0 for Defend, 1 for Attack */
    if(action==1){
        document.getElementById("opponent").src = 'images/OppAtt.png'
        var oppdamage = Math.round(Math.random()*5);
        userHealth -= oppdamage;
        document.getElementById("displayUserHealth").innerHTML = "Health: " + userHealth;
        document.getElementById("oppLog").innerHTML = "Your opponent dealt " + oppdamage + " damage!";
    }
    else if(action==0){
        document.getElementById("opponent").src = 'images/OppDef.png';
        if(damage>3){
            oppHealth += 3;
            document.getElementById("oppLog").innerHTML = "Your opponent defended, deflecting 3 damage!";
        }
        else if(damage<=3){
            oppHealth += damage;
            document.getElementById("oppLog").innerHTML = "Your opponent defended, deflecting all damage!";
        }
    }
    
    check();
    
}

function randomInt(){
    
    var rand = Math.round(Math.random()*500);
    if(rand>250) return 0; /* HEADS OR DEFEND */
    else return 1; /* TAILS OR ATTACK */
    
}

function check(){
    if(userHealth<=0){
        document.getElementById("character").src = 'images/PlayerLose.png';
        document.getElementById("displayUserHealth").innerHTML = "Health: 0";
        document.getElementById("result").innerHTML = "You lost! You just lost the Championship Belt!";
        ongoing=0;
    }
    else if(oppHealth<=0){
        document.getElementById("opponent").src = 'images/OppLose.png';
        document.getElementById("displayOppHealth").innerHTML = "Health: 0";
        document.getElementById("result").innerHTML = "You beat your opponent! You remain world champion!";
        ongoing=0;
    }
    
}