if (!(window.innerWidth/window.innerHeight === 1440/732)) {
    var wc = document.getElementById("EverythingFitter")
    if (window.innerWidth < 1440) {
        wc.style.width = window.innerWidth
        wc.style.height = (window.innerWidth/(1440/732)).toString()+"px"
    }
}
function loadData(datakey) {
    var dataArray;
    if (localStorage.getItem(datakey) === null) {
        dataArray = null;
    }
    else {
        dataArray = JSON.parse(localStorage.getItem(datakey));
    }
    return dataArray;
}
function UpdateData(newdata, datakey) {
    localStorage.setItem(datakey, JSON.stringify(newdata));
}
wc = document.getElementById("EverythingFitter");
HighScore = loadData("HighScore");
if (HighScore == null) {
    HighScore = "No wave yet";
}
bt = document.getElementById("BonusText")
bt.innerHTML = "Highest wave you've reached: "+HighScore;
wc.style.width = window.innerWidth.toString()+"px";
wc.style.height = (window.innerWidth/(1440/732)).toString()+"px";
function sound(source) {
    this.sound = document.createElement("audio");
    this.sound.src = source;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.muted = false;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.reset = function(){
        this.sound.currentTime = 0;
    }
    this.loop = function(){
        this.sound.setAttribute("loop", "loop");
    }
}
function MusicFade(soundA,soundB) {
    if (document.getElementById("LoadSettings") != null) {
        document.getElementById("LoadSettings").remove();
    }
    document.getElementById("SettingsButton").onclick = function() {
        return;
    }
    fadetime = 250; /*base this off of turn time*/
    fadeframes = 50;
    soundB.sound.volume = 0;
    soundA.sound.volume = currentVolume;
    countAmount = currentVolume/fadeframes; 
    soundB.play();
    function slowfade() {
        soundA.sound.volume = soundA.sound.volume - countAmount;
        soundB.sound.volume = soundB.sound.volume + countAmount;
        if (soundA.sound.volume.toFixed(2) == countAmount.toFixed(2) && soundB.sound.volume.toFixed(2) == (currentVolume-countAmount).toFixed(2)) {
            document.getElementById("SettingsButton").onclick = LoadSettings;
            clearInterval(fade);
            soundA.sound.volume = 0;
            soundB.sound.volume = currentVolume;
            soundA.stop();
        }
    }
    var fade = setInterval(slowfade, fadetime/fadeframes);
}
function StopAllSounds() {
    for (s in SoundArray) {
        SoundArray[s].stop();
        SoundArray[s].reset();
        SoundArray[s].sound.volume = currentVolume;
    }
}
loss = new sound("Loss.mp3"); 
win = new sound("Win.mp3");
Ultwin = new sound("BossWin.mp3");
LogoSound = new sound("EvilLaugh.mp3");
FightSound = new sound("FightSounds.mp3"); 
ZombieTurnTheme = new sound("ZombieTheme.mp3");
PlantTurnTheme = new sound("PlantTheme.mp3");
MenuTheme = new sound("MenuTheme.mp3");
CriticalTheme = new sound("CriticalTheme.mp3")
MenuTheme.loop();
PlantTurnTheme.loop();
ZombieTurnTheme.loop();
CriticalTheme.loop();
CriticalStage = false;
IsBossWave = false;
TheBossWave = "";
SettingData = loadData("SettingData");
if (SettingData == null) {
    SettingData = [1,(1500-150)/18.5]
}
currentVolume = SettingData[0];
turntime = (18.5*SettingData[1])+150;
SoundArray = [loss, win, Ultwin, LogoSound, FightSound, ZombieTurnTheme, PlantTurnTheme, MenuTheme];
News = "Version 1.8.1 is out now, I think it's probably the biggest update yet<br><br> \
New features:<br> \
 Boss waves! Every 5 waves, you have to fight a boss wave. Boss waves are uniquely designed waves with new zombies that are designed to be extra challenging! Can you beat all 5 boss waves?<br>\
New zombie for normal waves: Disco Zombie! Disco Zombie is to replace Gargantuar, as Gargantuar is now a boss zombie and will no longer appear in normal waves.<br>\
Zombie AI updated again, zombies will now use expert coordination and highly complex tactical techniques in order to defeat you.<br>\
A secret interaction happens if you do a certain thing to a certain zombie - can you find out what it is?<br>\
Other small changes that I won’t bother mentioning.<br>\
<br>\
Bug fixes:<br>\
Fixed bug where chomper could move twice in one turn if he ate a zombie.<br>\
Fixed bug where player could skip chomper’s chewing phase by reloading the game.<br>\
Fixed bug where you would not be able to move if you tried to escape the grid.<br>\
Fixed bug where zombies would not visually rotate.<br>\
Fixed bug where attack menu would not automatically close after usage if you had another menu open.<br>\
<br>\
Balance changes:<br>\
Peashooter health increased from 125 to 150<br>\
Peashooter pea accuracy increased from 95% to 100%<br>\
Pea Gatling cooldown time decreased from 3 turns to 2 turns<br>\
Pea Gatling accuracy increased from 90% chance for each pea to hit to 95% chance for each pea to hit<br>\
Armor Chomper’s goop now does splash damage, but at the cost of a slower cooldown.<br>\
Armor Chomper seed spit accuracy increased from 85% chance for each seed to hit to 90% chance for each seed to hit<br>\
Armor Chomper goop accuracy increased from 95% to 100%<br>\
Newspaper Zombie is now more common.<br>\
Gargantuar now has a new ability: Phone Friends.<br>\
Gargantuar now has 400 health instead of 350.<br>";
function RemoveBlocker() {
    wc.removeChild(document.getElementById("MenuBlocker"))
    wc.removeChild(document.getElementById("MenuLoader"))
    MenuTheme.sound.volume = currentVolume;
    MenuTheme.play();
}
function LoadInstructions() { 
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadGame";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "I guess I have to update this again..";
    Message.appendChild(MessageText);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("LoadGame").remove();
    }
    Message.appendChild(CloseButton);
    TrollFace = document.createElement("img"); 
    TrollFace.src = "Instructions.PNG";
    TrollFace.style.width = "100%";
    Message.appendChild(TrollFace);
}
function LoadNew() {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadGame";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "55%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("LoadGame").remove();
    }
    Message.appendChild(CloseButton);
    MessageHeader = document.createElement("p");
    MessageHeader.className = "MessageHeader";
    MessageHeader.innerHTML = "What's new in Version 1.8.1";
    Message.appendChild(MessageHeader);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = News;
    Message.appendChild(MessageText);
}
function LoadSettings() {
    SettingData = loadData("SettingData");
    if (SettingData == null) {
        SettingData = [currentVolume,(turntime-150)/18.5]
    }
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "LoadSettings";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("LoadSettings").remove(); 
        currentVolume = VolumeSlider.value/100;
        turntime = (18.5*TurnSlider.value)+150;
        UpdateData([currentVolume,(turntime-150)/18.5],"SettingData")
    }
    Message.appendChild(CloseButton);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "Music Volume<br>";
    Message.appendChild(MessageText);
    VolumeSlider = document.createElement("input"); 
    VolumeSlider.className = "slider";
    VolumeSlider.type = "range";
    VolumeSlider.value = SettingData[0]*100;
    Message.appendChild(VolumeSlider);
    VolumeSlider.oninput = function() {
        currentVolume = this.value/100;
        for (theme in SoundArray) {
            theme = SoundArray[theme];
            theme.sound.volume = currentVolume;
        }
    }
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "<br>Zombie's Turn Time (Use this to make the game faster or slower)<br>";
    Message.appendChild(MessageText);
    TurnSlider = document.createElement("input");
    TurnSlider.className = "slider";
    TurnSlider.type = "range";
    TurnSlider.value = SettingData[1]; //150 turntime to 2000 turntime
    Message.appendChild(TurnSlider);
    TurnSlider.oninput = function() {
        turntime = (18.5*TurnSlider.value)+150;
    }
    BTM = document.createElement("button");
    BTM.className = "MessageButton";
    BTM.innerHTML = "Back to Menu";
    BTM.onclick = function() {
        currentVolume = VolumeSlider.value/100;
        turntime = (18.5*TurnSlider.value)+150;
        UpdateData([currentVolume,(turntime-150)/18.5],"SettingData")
        BackToMenu();
    }
    Message.appendChild(BTM);
}
function BackToMenu() {
    HighScore = loadData("HighScore");
    if (HighScore == null) {
        HighScore = "No wave yet";
    }
    StopAllSounds();
    MenuTheme.play();
    IsPlayerTurn = false;
    CanMove = false;
    CriticalStage = false;
    IsBossWave = false;
    TheBossWave = "";
    wc = document.getElementById("EverythingFitter");
    wc.innerHTML = '';
    vc = document.createElement("div");
    vc.id="VersionCount";
    vc.innerHTML="Beta Version 1.8.1";
    wc.appendChild(vc);
    tc = document.createElement("div");
    tc.id="TitleContainer";
    wc.appendChild(tc);
    t = document.createElement("header");
    t.id="title";
    t.innerHTML="ARMOR CHOMPER (AND CO)'S ZOMBIE ADVENTURE!";
    tc.appendChild(t);
    lc = document.createElement("p");
    lc.innerHTML="Highest wave you've reached: "+HighScore;
    lc.id="BonusText";
    wc.appendChild(lc);
    acl = document.createElement("img")
    acl.src = "PlantLeft.PNG"; 
    acl.id="PlantLeft"
    wc.appendChild(acl);
    acr = document.createElement("img")
    acr.src = "PlantRight.PNG";
    acr.id="PlantRight"
    wc.appendChild(acr);
    sb = document.createElement("button");
    sb.id="start-button";
    sb.innerHTML="Start New Game";
    sb.onclick=function() {ChoosePlant()};
    wc.appendChild(sb);
    lb = document.createElement("button");
    lb.id="load-button";
    lb.innerHTML="Load Game";
    lb.onclick=function() {LoadGame()};
    wc.appendChild(lb);
    htp = document.createElement("button");
    htp.id="how-to-play";
    htp.innerHTML="How to play";
    htp.onclick=function() {LoadInstructions()};
    wc.appendChild(htp);
    ln = document.createElement("button");
    ln.id="load-new";
    ln.innerHTML="What's New";
    ln.onclick=function() {LoadNew()};
    wc.appendChild(ln);
    vs = document.createElement("button");
    vs.id="settings";
    vs.innerHTML="Settings";
    vs.onclick=function() {LoadSettings()};
    wc.appendChild(vs);
}
function ChoosePlant() {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "ChoosePlant";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "40%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("ChoosePlant").remove(); 
    }
    Message.appendChild(CloseButton);
    MessageText = document.createElement("p");
    MessageText.className = "MessageText";
    MessageText.innerHTML = "Choose your character for this game!";
    Message.appendChild(MessageText);
    for (plant in plantArray) {
        plant = plantArray[plant];
        MessageImage = document.createElement("img");
        MessageImage.id = plant.name;
        MessageImage.src = plant.aliveSprite;
        MessageImage.onclick = function(event) {
            for (p in plantArray) {
                if (event.target.id === plantArray[p].name) {
                    currentPlant = plantArray[p];
                    StartGame();
                }
            }
        }
        MessageImage.onmouseover = function(event) {
            for (p in plantArray) {
                if (event.target.id === plantArray[p].name) {
                    event.target.src = "Chosen"+plantArray[p].aliveSprite;
                }
            }
        }
        MessageImage.onmouseout = function(event) {
            for (p in plantArray) {
                if (event.target.id === plantArray[p].name) {
                    event.target.src = plantArray[p].aliveSprite;
                }
            }
        }
        Message.appendChild(MessageImage);
        MessageImage.style.width = "25%";
    }
}
function StartGame() { /*add lawn background so chomper is defending house*/
    for (theme in SoundArray) {
        theme = SoundArray[theme];
        theme.sound.volume = currentVolume;
    }
    MenuTheme.stop();
    wc = document.getElementById("EverythingFitter")
    wc.innerHTML = '';
    pl = document.createElement("img")
    pl.src = currentPlant.aliveSprite;
    pl.id="currentPlant";
    pl.className="Fighter";
    wc.appendChild(pl);
    turnc = document.createElement("header");
    turnc.id="TurnCounter";
    wc.appendChild(turnc);
    tc = document.createElement("div");
    tc.id="AttackContainer";
    wc.appendChild(tc);
    t = document.createElement("header");
    t.id="AttackLabel";
    t.innerHTML="Attacks:";
    tc.appendChild(t);
    ab = document.createElement("div");
    ab.id="AbilityButtons";
    wc.appendChild(ab);
    et = document.createElement("button");
    et.className="AbilityButton";
    et.id="EndTurn";
    et.innerHTML="End Turn";
    ab.appendChild(et);
    ha = document.createElement("div");
    ha.id="HealthArea";
    wc.appendChild(ha);
    hi = document.createElement("img");
    hi.src="HealthIcon1.PNG";
    hi.id="HealthIcon";
    ha.appendChild(hi);
    ham = document.createElement("p");
    ham.innerHTML=currentPlant.health.toString();
    ham.id="HealthAmount";
    ha.appendChild(ham);
    lc = document.createElement("p");
    lc.innerHTML="Wave 1";
    lc.id="LevelCount";
    wc.appendChild(lc);
    sb = document.createElement("button");
    sb.id="SettingsButton";
    sb.innerHTML="Settings";
    sb.onclick=function() {LoadSettings()};
    wc.appendChild(sb);
    ctc = document.createElement("div");
    ctc.id="ConsoleTextContainer";
    wc.appendChild(ctc);
    ctb = document.createElement("button");
    ctb.id="ConsoleTextButton";
    ctb.innerHTML="View Console History";
    ctb.onclick=function(){ViewConsoleHistory()};
    wc.appendChild(ctb);
    consolemessages = [];
    ConsoleHistory = [];
    cps = document.getElementById("currentPlant");
    wc.style.width = window.innerWidth.toString()+"px";
    wc.style.height = (window.innerWidth/(1440/732)).toString()+"px";
    turnbutton = document.getElementById("EndTurn");
    turncounter = document.getElementById("TurnCounter");
    abilitybuttons = document.getElementById("AbilityButtons");
    planthealth = document.getElementById("HealthAmount");
    for (a in currentPlant.attacks) {
        currentPlant.attacks[a].TimeUntilReady = 0;
        atak = currentPlant.attacks[a];
        attackbutton = document.createElement("button");
        attackbutton.className = "AbilityButton";
        attackbutton.innerHTML = atak.name;
        attackbutton.id = atak.name;
        abilitybuttons.appendChild(attackbutton);
        attackbutton.onclick = function(event) {
            for (a in currentPlant.attacks) {
                if (event.target.id == currentPlant.attacks[a].name) {
                    attack = currentPlant.attacks[a];
                }
            }
            currentProjectile = attack;
            CD = 0;
            CreateModal((attack.name+"Info"),attack.name,attack.desc,attack.displaySprite,[["Use",FireProjectile],["Rotate Attack",SwitchAD]]);
            for (is in phygriditems) {
                phygriditems[is].remove();
            }
            phygriditems = [];
            griditemarray = [];
            currentx = 0;
            currenty = 0;
            fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
            for (i = 0; i < gridx*gridy; i++) {
                currentx += 1;
                ItemSprite = document.createElement("img");
                newgi = new griditem();
                newgi.codx = currentx;
                newgi.cody = currenty;
                newgi.sprite = "BlankTile.PNG"
                griditemarray.push(newgi);
                ItemSprite.src = "BlankTile.PNG";
                wc.appendChild(ItemSprite);
                ItemSprite.style.position = "absolute";
                ItemSprite.className = "gridTile";
                ItemSprite.onclick = tryToMove;
                ItemSprite.style.height = (8*gridsize).toString()+"%";
                ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
                ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
                for (f in fighterArray) {
                    fighter = fighterArray[f];
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                        newgi.sprite = "GreenTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "GreenTile.PNG";
                    }
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                        newgi.sprite = "PurpleTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "PurpleTile.PNG";
                    }
                }
                if((currentPlant.coords[0]+1 <= currentx && currentx <= currentPlant.coords[0]+attack.range) && currenty === currentPlant.coords[1]) {
                    if (newgi.sprite == "PurpleTile.PNG") {
                        newgi.sprite = "RedTile.PNG";
                        ItemSprite.src = "RedTile.PNG";
                    }
                    else {
                        newgi.sprite = "BlueTile.PNG";
                        ItemSprite.src = "BlueTile.PNG";
                    }
                }
                phygriditems.push(ItemSprite);
                if (currentx%gridx == 0) {
                    currenty += 1;
                    currentx = 0;
                }
            }
        }
    }
    turnbutton.onclick = function() {
        turncounter.innerHTML = "Zombie's Turn";
        abilitybuttons.style.display = "none";
        IsPlayerTurn = false;
        CanMove = false;
        if (!(CriticalStage) && !(IsBossWave)) {
            ZombieTurnTheme.sound.currentTime = PlantTurnTheme.sound.currentTime;
            MusicFade(PlantTurnTheme,ZombieTurnTheme);
        }
        CreateConsoleText(currentPlant.name+" has ended their turn.")
        ConsoleHistory.push("~ Zombie's Turn ~");
        for (attack in currentPlant.attacks) {
            attack = currentPlant.attacks[attack];
            if (attack.TimeUntilReady > 0) {
                attack.TimeUntilReady -= 1; 
            }
        }
        ZombieArray = SortZArray();
        ZombieTurn(0);
    }
    fighterPhysArray = [cps];
    tz = Browncoat;
    fighterArray = [currentPlant, tz];
    ZombieArray = [tz];
    tz.coords = [7,2];
    zhealtharray = [];
    zhealthbararray = [];
    currentPlant.coords = [2,2];
    difficultylevel = 1;
    StopTurn = false;
    planthealth.innerHTML = Object.assign(currentPlant.health);
    for (z in ZombieArray) {
        ZombieArray[z].health = 50;
        prevzposes.push(ZombieArray[z].coords);
        CanZAbility.push(true);
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = ZombieArray[z].height;
        zombi.src = ZombieArray[z].aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (ZombieArray[z].underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
            zhealthbar.id = "Armor";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
            zhealthbar.id = "Heart";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
    }
    fighterPhysArray[fighterArray.indexOf(tz)].style.transform = "scaleX(1)";
    IsPlayerTurn = true;
    ConsoleHistory.push("~ Plant's Turn ~");
    CanMove = true;
    CanAbility = [true, true];
    UpdateTurnCount();
    updategrid();
    PlantTurnTheme.play();
}
function randomint(start, end) {
    end = end + 0.5
    start = start - 0.5
    var randomnum = (Math.random() * end);
    while (randomnum < start) {
        var randomnum = (Math.random() * end);  
    }
    return Math.round(randomnum);
}
function CreateModal(modalID,modalheader,modaltext,modalimage,modalbuttons) { //first one is necessary, other 3 are optional to not have them use ""
        MessageContainer = document.createElement("div");
        wc.appendChild(MessageContainer);
        MessageContainer.className = "MessageContainer";
        MessageContainer.style.display = "block";
        MessageContainer.id = "atakmodal";
        Message = document.createElement("div");
        Message.className = "Message";
        Message.style.width = "30%";
        MessageContainer.appendChild(Message);
        SpecialButton = document.createElement("span");
        SpecialButton.className= "close";
        SpecialButton.innerHTML = "&times;"
        if (CanMove) {
            SpecialButton.onclick = function() {
                CanMove = true;
                updategrid();
                UpdateTurnCount();
                document.getElementById("atakmodal").remove();
            }
        }
        else {
            SpecialButton.onclick = function() {
                updategrid();
                document.getElementById("atakmodal").remove();
            }
        }
        CanMove = false;
        Message.appendChild(SpecialButton);
        MessageImage = document.createElement("img");
        MessageImage.src = modalimage;
        Message.appendChild(MessageImage);
        MessageImage.style.width = "25%";
        MessageImage.style.float = "right"; 
        MessageHeader = document.createElement("p");
        MessageHeader.className = "MessageHeader";
        MessageHeader.style.display = "inline";
        MessageHeader.innerHTML = modalheader;
        Message.appendChild(MessageHeader); 
        for (b in modalbuttons) {
            if (currentProjectile.TimeUntilReady > 0 && modalbuttons[b][0] == "Use") {
                MessageText = document.createElement("p");
                MessageText.className = "MessageText";
                MessageText.style.display = "block";
                if (currentProjectile.TimeUntilReady == currentProjectile.reloadTime+1) {
                    MessageText.innerHTML = "You've just used this ability.";
                }
                else {
                    MessageText.innerHTML = "This ability will be ready in "+currentProjectile.TimeUntilReady+" turn(s).";
                }
                Message.appendChild(MessageText);
            }
            else {
                MessageButton = document.createElement("button");
                MessageButton.innerHTML = modalbuttons[b][0];
                MessageButton.style.display = "block";
                MessageButton.className = "MessageButton";
                MessageButton.onclick = modalbuttons[b][1];
                Message.appendChild(MessageButton);
            }
        }
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = modaltext;
        Message.appendChild(MessageText);
}
function RemoveZombie(zombie) {
    wc.removeChild((fighterPhysArray[fighterArray.indexOf(zombie)]));
    fighterPhysArray.splice(fighterArray.indexOf(zombie), 1);
    fighterArray.splice(fighterArray.indexOf(zombie), 1);
    zhealtharray[ZombieArray.indexOf(zombie)].remove();
    zhealtharray.splice(ZombieArray.indexOf(zombie), 1);
    zhealthbararray[ZombieArray.indexOf(zombie)].remove();
    zhealthbararray.splice(ZombieArray.indexOf(zombie), 1);
    ZombieArray.splice(ZombieArray.indexOf(zombie), 1);
    if (zombie.underShield != "") {
        USZ = zombie.underShield;
        USZ.health = USZ.permhealth;
        CreateConsoleText(zombie.name+" has left behind "+USZ.name+".");
        USZ.coords = zombie.coords;
        ZombieArray.push(USZ);
        for (attack in USZ.attacks) {
            USZ.attacks[attack].TimeUntilReady = USZ.attacks[attack].STUP;
        }
        for (support in USZ.supports) {
            USZ.supports[support].TimeUntilReady = USZ.supports[support].STUP;
        }
        prevzposes.push(USZ.coords)
        CanZAbility.push(true);
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = USZ.height;
        zombi.src = USZ.aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (USZ.underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
        fighterArray.push(USZ);
        CheckZindexes();
    }
}
function DoDamage(zombie, damageprojectile) {
    zombiedead = false;
    if (damageprojectile.name == Swallow.name) {
        if (zombie.canBeEaten) {
            CanAbility = [false,false];
            zombiedead = true;
            UpdateTurnCount();
            CreateConsoleText("Armor Chomper has ate "+zombie.name+".");
            currentPlant.chewing = true;
            currentPlant.chewingtime = zombie.chewingtime+1;
            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";
            currentPlant.allergy = zombie.allergy;
            RemoveZombie(zombie);
            if (!(CheckForWin())) {
                CreateConsoleText("Armor Chomper will be chewing for "+(currentPlant.chewingtime-1)+" turn(s).");
            }
        }
        else {
            CreateConsoleText("Armor Chomper is unable to eat "+zombie.name+"s.");
            if (!CanAbility[0]) {
                CanAbility[0] = true;
            }
            else if (!CanAbility[1]) {
                CanAbility[1] = true;
            }
        }
    }
    else {
        CreateConsoleText(currentPlant.name+" has hit "+zombie.name+" for "+ damageprojectile.damage+" damage.",true);
        zombie.health -= damageprojectile.damage;
        if (zombie.health <= 0) {
            CreateConsoleText(currentPlant.name+" has vanquished "+zombie.name+".") 
            RemoveZombie(zombie);
            zombiedead = true;
            CheckForWin();
        }
        else if (Math.random()*100 < damageprojectile.stunChance) {
            CreateConsoleText(currentPlant.name+" has stunned "+zombie.name+" for one turn.") 
            fighterPhysArray[fighterArray.indexOf(zombie)].src = damageprojectile.name+(fighterPhysArray[fighterArray.indexOf(zombie)].src).split("/")[(fighterPhysArray[fighterArray.indexOf(zombie)].src).split("/").length-1]
            zombie.stunned = true;
        }
        if (damageprojectile.splashRadius != 0) {
            zombiecoords = [];
            for (z in ZombieArray) {
                zombiecoords.push(ZombieArray[z].coords);
            }
            for (x = -(damageprojectile.splashRadius-1)/2; x <= (damageprojectile.splashRadius-1)/2; x++) {
                for (y = -(damageprojectile.splashRadius-1)/2; y <= (damageprojectile.splashRadius-1)/2; y++) {
                    if (!(x == 0 && y == 0)) {
                        for (z in ZombieArray) {
                            if (ZombieArray[z].coords[0] == zombie.coords[0]+x && ZombieArray[z].coords[1] == zombie.coords[1]+y) {
                                CreateConsoleText(currentPlant.name+" has hit "+ZombieArray[z].name+" for "+ damageprojectile.splashDamage+" splash damage.");
                                ZombieArray[z].health -= damageprojectile.splashDamage;
                                if (ZombieArray[z].health <= 0) {
                                    CreateConsoleText(currentPlant.name+" has vanquished "+ZombieArray[z].name+".")
                                    RemoveZombie(ZombieArray[z]);
                                    zombiedead = true;
                                    CheckForWin();
                                    break;
                                }
                                else if (Math.random()*100 < damageprojectile.stunChance) {
                                    CreateConsoleText(currentPlant.name+" has stunned "+ZombieArray[z].name+" for one turn.") 
                                    fighterPhysArray[fighterArray.indexOf(ZombieArray[z])].src = damageprojectile.name+(fighterPhysArray[fighterArray.indexOf(ZombieArray[z])].src).split("/")[(fighterPhysArray[fighterArray.indexOf(ZombieArray[z])].src).split("/").length-1]
                                    ZombieArray[z].stunned = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (zombiedead) {
        zombie = "";
    }
    return zombiedead;
}
function FireProjectile() { 
    willhit = false;
    for (g in griditemarray) {
        if (griditemarray[g].sprite == "RedTile.PNG") {
            willhit = true;
        }
    }
    if (!(CanAbility[0]) && !(CanAbility[1])) {
        CreateConsoleText("You cannot use any more abilities this turn.",false,false);
    }
    else if (currentProjectile.TimeUntilReady > 0) {
        if (currentProjectile.TimeUntilReady == currentProjectile.reloadTime+1) {
            CreateConsoleText("This ability will be ready in "+(parseInt(currentProjectile.TimeUntilReady)-1)+" turn(s).",false,false); 
        }
        else {
            CreateConsoleText("This ability will be ready in "+currentProjectile.TimeUntilReady+" turn(s).",false,false); 
        }
    }
    else if (!(willhit)) {
        CreateConsoleText(currentPlant.name+" did not use this ability, because there are no zombies in range.",false,false);
    }
    else {
        CreateConsoleText(currentPlant.name+" has used "+currentProjectile.name+".");
        currentProjectile.TimeUntilReady = currentProjectile.reloadTime+1; 
        currentProjectile.shotsLeft = currentProjectile.shots;
        missedshots = 0;
        for (shot = 0; shot < currentProjectile.shots; shot++) {
            if (Math.random()*100 > currentProjectile.accuracy) {
                missedshots += 1;
                currentProjectile.shotsLeft -= 1;
                if (currentProjectile.shots == 1) {
                    CreateConsoleText(currentPlant.name+" has missed.");
                }
            }
        }
        if (currentProjectile.shots > 1) {
            CreateConsoleText(currentPlant.name+" has missed "+missedshots+" out of their "+currentProjectile.shots+" shots.");
        }
        if (CanAbility[0]) {
            CanAbility[0] = false;
        }
        else if (CanAbility[1]) {
            CanAbility[1] = false;
        }
        g =0;
        while (g <= griditemarray.length-1) {
            if (CD == 0 || CD == 1) {
                gi = griditemarray[g];
            }
            if (CD == 2 || CD == 3) {
                gi = griditemarray[griditemarray.length-1-g];
            }
            if (gi.sprite == "RedTile.PNG") {
                if (currentProjectile.name == Swallow.name) {
                    DoDamage(gi.character,currentProjectile);
                    break;
                }
                if (currentProjectile.shotsLeft == 0) {
                    break;
                }
                else {
                    for (shot = 0; shot < (currentProjectile.shots-missedshots); shot++) {
                        currentProjectile.shotsLeft -= 1;
                        US = gi.character.underShield;
                        if (DoDamage(gi.character,currentProjectile)) { 
                            updatecharactergrid();
                            if (US != "" && currentProjectile.shotsLeft != 0) {
                                DoDamage(US,currentProjectile);
                                currentProjectile.shotsLeft -= 1;
                            }
                            else {
                                break;
                            }
                        }
                        if (currentProjectile.shotsLeft == 0) {
                            break
                        }
                    }
                }
            }
            g++
        }
        updategrid();
        UpdateTurnCount();
    }
    SpecialButton.click();     
}
function SaveGame() {
    //what to save: 
    //Armor chompers' ability cooldown times
    //Armor Chomper's coordinates
    //Armor chomper's health
    //whether chomper is frozen or not
    //whether chomper is chewing or not
    cooldowns = [];
    for (attack in currentPlant.attacks) {
        cooldowns.push(currentPlant.attacks[attack].TimeUntilReady);
    }
    UpdateData([cooldowns, currentPlant.coords, planthealth.innerHTML, currentPlant.stunned, currentPlant.chewingtime, currentPlant],"PlantData");

    //what zombies there are
    //coordinates of said zombies
    //health of zombies
    //zombie ability cooldown times
    //whethre zombies is goop
    UpdateData([ZombieArray, CanZAbility],"ZombieData");

    //what wave you're on
    //posititon in the music
    //crtiical theme or not
    //boss wave or not
    //console messages
    UpdateData([difficultylevel, PlantTurnTheme.sound.currentTime, CriticalStage, TheBossWave, ConsoleHistory],"MiscData");
}
function LoadGame() {
    PlantData = loadData("PlantData");
    ZombieData = loadData("ZombieData");
    MiscData = loadData("MiscData");
    if (PlantData === null) {
        wc = document.getElementById("EverythingFitter");
        MessageContainer = document.createElement("div");
        wc.appendChild(MessageContainer);
        MessageContainer.className = "HTP";
        MessageContainer.style.display = "block";
        MessageContainer.id = "NoGame";
        Message = document.createElement("div");
        Message.className = "Message";
        Message.style.width = "55%";
        MessageContainer.appendChild(Message);
        CloseButton = document.createElement("span");
        CloseButton.className= "close";
        CloseButton.innerHTML = "&times;"
        CloseButton.onclick = function() {
            document.getElementById("NoGame").remove();
        }
        Message.appendChild(CloseButton);
        MessageHeader = document.createElement("p");
        MessageHeader.className = "MessageHeader";
        MessageHeader.innerHTML = "Oh No!";
        Message.appendChild(MessageHeader);
        MessageText = document.createElement("p");
        MessageText.className = "MessageText";
        MessageText.innerHTML = "There is no game to load.";
        Message.appendChild(MessageText);
        return
    }
    currentPlant = PlantData[5];
    if (MiscData[3] != "") {
        IsBossWave = true;
        TheBossWave = MiscData[3];
        BossTheme = new sound(TheBossWave.theme);
        SoundArray.push(BossTheme); 
        BossTheme.loop();
        BossTheme.reset();
        BossTheme.play();
    }
    else if (MiscData[2]) {
        CriticalStage = true;
        SoundArray.push(CriticalTheme);
        CriticalTheme.reset();
        CriticalTheme.play();
    }
    else {
        PlantTurnTheme.play();
    }
    PlantTurnTheme.reset();
    ZombieTurnTheme.reset();
    for (theme in SoundArray) {
        theme = SoundArray[theme];
        theme.sound.volume = currentVolume;
    }
    MenuTheme.stop();
    wc = document.getElementById("EverythingFitter")
    wc.innerHTML = '';
    ac = document.createElement("img")
    pl = document.createElement("img")
    pl.src = currentPlant.aliveSprite;
    pl.id="currentPlant";
    pl.className="Fighter";
    wc.appendChild(pl);
    turnc = document.createElement("header");
    turnc.id="TurnCounter";
    wc.appendChild(turnc);
    tc = document.createElement("div");
    tc.id="AttackContainer";
    wc.appendChild(tc);
    t = document.createElement("header");
    t.id="AttackLabel";
    t.innerHTML="Attacks:";
    tc.appendChild(t);
    ab = document.createElement("div");
    ab.id="AbilityButtons";
    wc.appendChild(ab);
    et = document.createElement("button");
    et.className="AbilityButton";
    et.id="EndTurn";
    et.innerHTML="End Turn";
    ab.appendChild(et);
    ha = document.createElement("div");
    ha.id="HealthArea";
    wc.appendChild(ha);
    hi = document.createElement("img");
    hi.src="HealthIcon1.PNG";
    hi.id="HealthIcon";
    ha.appendChild(hi);
    ham = document.createElement("p");
    ham.innerHTML=currentPlant.health.toString();
    ham.id="HealthAmount";
    ha.appendChild(ham);
    lc = document.createElement("p");
    lc.innerHTML="Wave 1";
    lc.id="LevelCount";
    wc.appendChild(lc);
    sb = document.createElement("button");
    sb.id="SettingsButton";
    sb.innerHTML="Settings";
    sb.onclick=function() {LoadSettings()};
    wc.appendChild(sb);
    ctc = document.createElement("div");
    ctc.id="ConsoleTextContainer";
    wc.appendChild(ctc);
    ctb = document.createElement("button");
    ctb.id="ConsoleTextButton";
    ctb.innerHTML="View Console History";
    ctb.onclick=function(){ViewConsoleHistory()};
    wc.appendChild(ctb);
    cps = document.getElementById("currentPlant");
    wc.style.width = window.innerWidth.toString()+"px";
    wc.style.height = (window.innerWidth/(1440/732)).toString()+"px";
    turnbutton = document.getElementById("EndTurn");
    turncounter = document.getElementById("TurnCounter");
    abilitybuttons = document.getElementById("AbilityButtons");
    planthealth = document.getElementById("HealthAmount");
    for (a in currentPlant.attacks) {
        atak = currentPlant.attacks[a];
        attackbutton = document.createElement("button");
        attackbutton.className = "AbilityButton";
        attackbutton.innerHTML = atak.name;
        attackbutton.id = atak.name;
        abilitybuttons.appendChild(attackbutton);
        attackbutton.onclick = function(event) {
            for (a in currentPlant.attacks) {
                if (event.target.id == currentPlant.attacks[a].name) {
                    attack = currentPlant.attacks[a];
                }
            }
            currentProjectile = attack;
            CD = 0;
            CreateModal((attack.name+"Info"),attack.name,attack.desc,attack.displaySprite,[["Use",FireProjectile],["Rotate Attack",SwitchAD]]);
            for (is in phygriditems) {
                phygriditems[is].remove();
            }
            phygriditems = [];
            griditemarray = [];
            currentx = 0;
            currenty = 0;
            fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
            for (i = 0; i < gridx*gridy; i++) {
                currentx += 1;
                ItemSprite = document.createElement("img");
                newgi = new griditem();
                newgi.codx = currentx;
                newgi.cody = currenty;
                newgi.sprite = "BlankTile.PNG"
                griditemarray.push(newgi);
                ItemSprite.src = "BlankTile.PNG";
                wc.appendChild(ItemSprite);
                ItemSprite.style.position = "absolute";
                ItemSprite.className = "gridTile";
                ItemSprite.onclick = tryToMove;
                ItemSprite.style.height = (8*gridsize).toString()+"%";
                ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
                ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
                for (f in fighterArray) {
                    fighter = fighterArray[f];
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                        newgi.sprite = "GreenTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "GreenTile.PNG";
                    }
                    if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                        newgi.sprite = "PurpleTile.PNG"
                        newgi.character = fighter;
                        ItemSprite.src = "PurpleTile.PNG";
                    }
                }
                if((currentPlant.coords[0]+1 <= currentx && currentx <= currentPlant.coords[0]+attack.range) && currenty === currentPlant.coords[1]) {
                    if (newgi.sprite == "PurpleTile.PNG") {
                        newgi.sprite = "RedTile.PNG";
                        ItemSprite.src = "RedTile.PNG";
                    }
                    else {
                        newgi.sprite = "BlueTile.PNG";
                        ItemSprite.src = "BlueTile.PNG";
                    }
                }
                phygriditems.push(ItemSprite);
                if (currentx%gridx == 0) {
                    currenty += 1;
                    currentx = 0;
                }
            }
        }
    }
    turnbutton.onclick = function() {
        turncounter.innerHTML = "Zombie's Turn";
        abilitybuttons.style.display = "none";
        IsPlayerTurn = false;
        CanMove = false;
        if (!(CriticalStage) && !(IsBossWave)) {
            ZombieTurnTheme.sound.currentTime = PlantTurnTheme.sound.currentTime; 
            MusicFade(PlantTurnTheme,ZombieTurnTheme);
        }
        CreateConsoleText(currentPlant.name+" has ended their turn.")
        ConsoleHistory.push("~ Zombie's Turn ~");
        for (attack in currentPlant.attacks) {
            attack = currentPlant.attacks[attack];
            if (attack.TimeUntilReady > 0) {
                attack.TimeUntilReady -= 1; 
            }
        }
        ZombieArray = SortZArray();
        ZombieTurn(0);
    }
    difficultylevel = MiscData[0];
    if (IsBossWave) {
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel+" (Boss Wave)";
    }
    else {
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel;
    }
    ZombieArray = ZombieData[0]; 
    currentPlant.coords = PlantData[1]; 
    prevzposes = [];
    zhealtharray = [];
    zhealthbararray = [];
    fighterPhysArray = [cps];
    ctc.innerHTML = "";
    ConsoleHistory = MiscData[4];
    planthealth.innerHTML = Object.assign(PlantData[2]);
    CanZAbility = ZombieData[1];
    for (z in ZombieArray) {
        prevzposes.push(ZombieArray[z].coords);
        ZombieArray[z].stunned = false;
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = ZombieArray[z].height;
        zombi.src = ZombieArray[z].aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (ZombieArray[z].underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
    }
    fighterArray = [currentPlant].concat(ZombieArray);
    for (attack in currentPlant.attacks) {
        currentPlant.attacks[attack].TimeUntilReady = PlantData[0][attack];
    }
    IsPlayerTurn = true; 
    CanMove = true;
    CanAbility = [true, true];
    currentPlant.chewingtime = PlantData[4];
    currentPlant.chewing = false;
    if (PlantData[4] != 0) {
        currentPlant.chewing = true;
        currentPlant.aliveSprite = "chewy.gif";
        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";
        CanAbility = [false, false];
    }
    else {
        currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
    }
    prevppos = currentPlant.coords.slice(0);
    currentProjectile = "";
    consolemessages = [];
    abilitybuttons.style.display = "block";
    SaveGame();
    UpdateTurnCount();
    CheckZindexes();
    updategrid();
}
function ResetGame() {
    difficultylevel += 1;
    ConsoleHistory.push("~ Wave "+difficultylevel+" ~");
    if (loadData("HighScore") == null) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    if (loadData("HighScore").replace(/\D/g,'') < difficultylevel) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    if (difficultylevel%5 == 0) {
        ConsoleHistory.push("~ Boss Wave ~");
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel+" (Boss Wave)";
        IsBossWave = true;
        ABW = [];
        for (bw in BossWaves) {
            if (BossWaves[bw].availablewaves.includes(difficultylevel)) {
                ABW.push(BossWaves[bw]);
            }
        }
        CBW = ABW[Math.floor(Math.random() * ABW.length)];
        TheBossWave = CBW;
        ZombieArray = CBW.zombies;
        availablecoords = CBW.availablecoords;
        if (CBW.randomizecoords) {
            ZTS = [];
            CPL = 0;
            while (CPL != difficultylevel) {
                NZ = clone(ZombieArray[Math.floor(Math.random() * ZombieArray.length)])
                if (!(NZ.powerLevel + CPL > difficultylevel)) {
                    coordchosen = availablecoords[Math.floor(Math.random() * availablecoords.length)];
                    NZ.coords = coordchosen;
                    availablecoords.splice(availablecoords.indexOf(coordchosen), 1);
                    ZTS.push(NZ);
                    CPL += NZ.powerLevel;
                }
            }
            ZombieArray = ZTS;
        }
        else {
            for (z in ZombieArray) {
                ZombieArray[z].coords = availablecoords[z];
            }
        }
    }
    else {
        ZTS = [];
        CPL = 0;
        ZombieArray = [Browncoat, Conehead, Imp, Buckethead, Yeti, GunZomb, FootballZomb, Screendoor, Newspaper, Disco]; 
        //ZombieArray = [Disco];
        availablecoords = [];
        for (x=4; x<10; x++) {
            for (y=0; y<5; y++) {
                availablecoords.push([x,y]);
            }
        }
        while (CPL != difficultylevel) {
            NZ = clone(ZombieArray[Math.floor(Math.random() * ZombieArray.length)])
            if (!(NZ.powerLevel + CPL > difficultylevel)) {
                coordchosen = availablecoords[Math.floor(Math.random() * availablecoords.length)];
                NZ.coords = coordchosen;
                availablecoords.splice(availablecoords.indexOf(coordchosen), 1);
                ZTS.push(NZ);
                CPL += NZ.powerLevel;
            }
        }
        ZombieArray = ZTS;
        PlantTurnTheme.reset();
        PlantTurnTheme.play();
        document.getElementById("LevelCount").innerHTML = "Wave "+difficultylevel;
    }
    currentPlant.coords = [2,2]; 
    prevzposes = [];
    zhealtharray = [];
    zhealthbararray = [];
    fighterPhysArray = [cps];
    ctc.innerHTML = "";
    planthealth.innerHTML = Object.assign(currentPlant.health);
    CanZAbility = [];
    for (z in ZombieArray) {
        for (attack in ZombieArray[z].attacks) {
            ZombieArray[z].attacks[attack].TimeUntilReady = ZombieArray[z].attacks[attack].STUP;
        }
        for (support in ZombieArray[z].supports) {
            ZombieArray[z].supports[support].TimeUntilReady = ZombieArray[z].supports[support].STUP;
        }
        ZombieArray[z].health = ZombieArray[z].permhealth;
        prevzposes.push(ZombieArray[z].coords)
        CanZAbility.push(true);
        var zombi = document.createElement("img");
        zombi.className = "Fighter";
        zombi.style.height = ZombieArray[z].height;
        zombi.src = ZombieArray[z].aliveSprite;
        wc.appendChild(zombi);
        fighterPhysArray.push(zombi);
        zombi.style.transform = "scaleX(1)";
        var zhealth = document.createElement("p")
        var zhealthbar = document.createElement("img")
        if (ZombieArray[z].underShield != "") {
            zhealthbar.src = "ArmorHeartIcon.PNG";
        }
        else {
            zhealthbar.src = "HeartIcon.PNG";
        }
        zhealthbar.style.position = "absolute";
        zhealthbar.style.width = "4%";
        zhealthbar.style.zIndex = 9001;
        wc.appendChild(zhealthbar);
        zhealth.style.position = "absolute";
        zhealth.style.fontFamily =  'Marker Felt';
        zhealth.style.fontSize = "1.7vw";
        zhealth.style.zIndex = 9002;
        wc.appendChild(zhealth)
        zhealtharray.push(zhealth);
        zhealthbararray.push(zhealthbar);
    }
    fighterArray = [currentPlant].concat(ZombieArray);
    for (attack in currentPlant.attacks) {
        currentPlant.attacks[attack].TimeUntilReady = 0;
    }
    StopAllSounds();
    IsPlayerTurn = true;
    ConsoleHistory.push("~ Plant's Turn ~");
    CanMove = true;
    CanAbility = [true, true];
    currentPlant.chewing = false;
    currentPlant.chewingtime = 0;
    fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
    currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
    prevppos = currentPlant.coords.slice(0);
    currentProjectile = "";
    consolemessages = [];
    abilitybuttons.style.display = "block";
    UpdateTurnCount();
    CheckZindexes();
    updategrid();
    SaveGame(); 
    if (IsBossWave) {
        LogoSound.reset();
        LogoSound.play();
        Blocker = document.createElement("img"); 
        Blocker.src = "LogoBackground.gif"; 
        Blocker.style.width = "100%";
        Blocker.style.zIndex = 9999;
        Blocker.style.position = "absolute";
        wc.appendChild(Blocker);
        TrollFace = document.createElement("img"); 
        TrollFace.src = "GunZombies.gif";
        TrollFace.style.zIndex = 10000;
        TrollFace.style.width = "50%";
        TrollFace.style.left = "30%";
        TrollFace.style.position = "absolute"
        wc.appendChild(TrollFace);
        setTimeout(function() {
            TrollFaces = document.createElement("img"); 
            TrollFaces.src = "Sunglasses.gif";
            TrollFaces.style.width = "50%";
            TrollFaces.style.left = "30%";
            TrollFaces.style.zIndex = 10000;
            TrollFaces.style.position = "absolute"
            wc.appendChild(TrollFaces);
            setTimeout(function() {
                TrollFacess = document.createElement("img"); 
                TrollFacess.src = "GargFall.gif";
                TrollFacess.style.width = "50%";
                TrollFacess.style.left = "30%";
                TrollFacess.style.zIndex = 10000;
                TrollFacess.style.position = "absolute"
                wc.appendChild(TrollFacess);
                setTimeout(function() {
                    TrollFacesss = document.createElement("img"); 
                    TrollFacesss.src = "GargSunglasses.gif";
                    TrollFacesss.style.width = "50%";
                    TrollFacesss.style.left = "30%";
                    TrollFacesss.style.zIndex = 10000;
                    TrollFacesss.style.position = "absolute"
                    wc.appendChild(TrollFacesss);
                    setTimeout(function() {
                        FightSound.reset();
                        FightSound.play();
                        wc.removeChild(Blocker)
                        wc.removeChild(TrollFace)
                        wc.removeChild(TrollFaces)
                        wc.removeChild(TrollFacess)
                        wc.removeChild(TrollFacesss)
                        FB = document.createElement("img"); 
                        FB.src = "FightingBackground.PNG"; 
                        FB.style.width = "100%";
                        FB.style.zIndex = 9999;
                        FB.style.position = "absolute";
                        wc.appendChild(FB);
                        PI = document.createElement("img"); 
                        PI.src = currentPlant.iconSprite;
                        PI.style.width = "30%";
                        PI.style.zIndex = 10000;
                        PI.style.left = "-10%";
                        PI.style.position = "absolute";
                        wc.appendChild(PI);
                        PT = document.createElement("p");
                        PT.innerHTML = currentPlant.name;
                        PT.id = "PlantFightText";
                        wc.appendChild(PT);
                        ZI = document.createElement("img"); 
                        ZI.src = TheBossWave.image;
                        ZI.style.width = TheBossWave.imageWidth;
                        ZI.style.zIndex = 10000;
                        ZI.style.left = TheBossWave.imageLeft;
                        ZI.style.top = "40%";
                        ZI.style.position = "absolute";
                        wc.appendChild(ZI);
                        ZT = document.createElement("p");
                        ZT.innerHTML = TheBossWave.name;
                        ZT.id = "ZombieFightText"
                        wc.appendChild(ZT);
                        setTimeout(function() {
                            wc.removeChild(FB);
                            wc.removeChild(PI);
                            wc.removeChild(PT);
                            wc.removeChild(ZI);
                            wc.removeChild(ZT);
                            LoadGame();
                        }, 4000)
                    },2500)
                },500)
            },150)
        },200)
    }
    else {
        LoadGame();
    }
}
function CheckForWin() {
    if (ZombieArray.length == 0) {
        abilitybuttons.style.display = "none";
        if (IsBossWave) {
            BossTheme.stop();
            Ultwin.reset();
            Ultwin.play();
        }
        else if (CriticalStage) {
            CriticalTheme.stop();
            win.reset();
            win.play();
        }
        else {
            PlantTurnTheme.stop();
            win.reset();
            win.play();
        }
        CriticalTheme.reset();
        ZombieTurnTheme.reset();
        PlantTurnTheme.reset();
        if (IsBossWave) {
        }
        IsPlayerTurn = false;
        CanMove = false;
        CriticalStage = false;
        IsBossWave = false;
        TheBossWave = "";
        currentPlant.chewing = false;
        CreateConsoleText(currentPlant.name+" has beat wave "+difficultylevel+"!")
        endtext = document.createElement("p");
        endtext.id = "EndText";
        endtext.innerHTML = "Wave Complete!";
        wc.appendChild(endtext);
        retrybutton = document.createElement("button");
        retrybutton.id = "RetryButton";
        retrybutton.innerHTML = "Next wave";
        retrybutton.onclick = function() {
            wc.removeChild(endtext);
            wc.removeChild(retrybutton);
            ResetGame();
        }
        wc.appendChild(retrybutton);
        return true;
    }
}
function CheckForLoss() { 
    if (planthealth.innerHTML <= 0) {
        planthealth.innerHTML = 0;
        wc.removeChild(fighterPhysArray[fighterArray.indexOf(currentPlant)]);
        abilitybuttons.style.display = "none";
        if (IsBossWave) {
            BossTheme.stop();
        }
        else if (CriticalStage) {
            CriticalTheme.stop();
        }
        else {
            ZombieTurnTheme.stop();
        }
        CriticalTheme.reset();
        ZombieTurnTheme.reset();
        PlantTurnTheme.reset();
        IsPlayerTurn = false;
        CanMove = false;
        CriticalStage = false;
        IsBossWave = false;
        TheBossWave = "";
        UpdateData(null, "PlantData");
        //UpdateData(null, "ZombieData");
        //UpdateData(null, "MiscData");
        currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
        fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
        CreateConsoleText(currentPlant.name+" has died on wave "+difficultylevel+".")
        if (loadData("HighScore") == null) {
            UpdateData("Wave "+difficultylevel.toString(),"HighScore");
        }
        if (loadData("HighScore").replace(/\D/g,'') < difficultylevel) {
            UpdateData("Wave "+difficultylevel.toString(),"HighScore");
        }
        endtext = document.createElement("p");
        endtext.id = "EndText";
        endtext.innerHTML = "You Lose";
        wc.appendChild(endtext);
        retrybutton = document.createElement("button");
        retrybutton.id = "RetryButton";
        retrybutton.innerHTML = "Back to Menu";
        retrybutton.onclick = function() {
            BackToMenu();
        }
        wc.appendChild(retrybutton);
        loss.reset();
        loss.play();
        return true;
    }
    else if (planthealth.innerHTML <= currentPlant.health/3 && !(CriticalStage) && !(IsBossWave)) {
        CriticalStage = true;
        CriticalTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
        MusicFade(ZombieTurnTheme, CriticalTheme);
        SoundArray.push(CriticalTheme);
    }
    return false;
}
function DeathByAllergy(allergen) {
    planthealth.innerHTML = 0;
    wc.removeChild(fighterPhysArray[fighterArray.indexOf(currentPlant)]);
    abilitybuttons.style.display = "none";
    if (IsBossWave) {
        BossTheme.stop();
    }
    else if (CriticalStage) {
        CriticalTheme.stop();
    }
    else {
        ZombieTurnTheme.stop();
    }
    CriticalTheme.reset();
    ZombieTurnTheme.reset();
    PlantTurnTheme.reset();
    IsPlayerTurn = false;
    CanMove = false;
    CriticalStage = false;
    IsBossWave = false;
    TheBossWave = "";
    UpdateData(null, "PlantData");
    //UpdateData(null, "ZombieData");
    //UpdateData(null, "MiscData");
    currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
    CreateConsoleText(currentPlant.name+" has died on wave "+difficultylevel+" from a "+allergen+" allergy.")
    if (loadData("HighScore") == null) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    if (loadData("HighScore").replace(/\D/g,'') < difficultylevel) {
        UpdateData("Wave "+difficultylevel.toString(),"HighScore");
    }
    endtext = document.createElement("p");
    endtext.id = "EndText";
    endtext.innerHTML = "Don't Eat Nuts";
    wc.appendChild(endtext);
    retrybutton = document.createElement("button");
    retrybutton.id = "RetryButton";
    retrybutton.innerHTML = "Back to Menu";
    retrybutton.onclick = function() {
        BackToMenu();
    }
    wc.appendChild(retrybutton);
    loss.reset();
    loss.play();
}
function CreateConsoleText(text, conjoin=false, ATH=true) { 
    ctc = document.getElementById("ConsoleTextContainer");
    if (conjoin && (text.replace(/[0-9]/g, '') == consolemessages[consolemessages.length-1].innerHTML.replace(/[0-9]/g, ''))) {
        newnum = parseInt(text.replace(/\D/g,''))
        nindex = text.indexOf(newnum);
        edittext = text.replace(/[0-9]/g, '')
        edittext = edittext.slice(0, nindex)+(newnum+parseInt(consolemessages[consolemessages.length-1].innerHTML.replace(/\D/g,'')))+edittext.slice(nindex);
        consolemessages[consolemessages.length-1].innerHTML = edittext;
        ConsoleHistory[ConsoleHistory.length-1] = edittext;
        
    }
    else {
        if (consolemessages.length > 3) {
            ctc.removeChild(consolemessages[0]);
            consolemessages.shift();
        }
        Message = document.createElement("div");
        Message.className = "consoletext";
        Message.innerHTML = text;
        consolemessages.push(Message);
        if (ATH) {
            ConsoleHistory.push(text);
        }
        ctc.appendChild(Message);
    }
}
function ViewConsoleHistory() {
    wc = document.getElementById("EverythingFitter");
    MessageContainer = document.createElement("div");
    wc.appendChild(MessageContainer);
    MessageContainer.className = "HTP";
    MessageContainer.style.display = "block";
    MessageContainer.id = "ConsoleHistory";
    Message = document.createElement("div");
    Message.className = "Message";
    Message.style.width = "50%";
    MessageContainer.appendChild(Message);
    CloseButton = document.createElement("span");
    CloseButton.className= "close";
    CloseButton.innerHTML = "&times;"
    CloseButton.onclick = function() {
        document.getElementById("ConsoleHistory").remove();
    }
    Message.appendChild(CloseButton);
    MessageHeader = document.createElement("p");
    MessageHeader.className = "MessageHeader";
    MessageHeader.innerHTML = "History of the console for this game";
    MessageHeader.style.display = "block";
    Message.appendChild(MessageHeader);
    MessageButton = document.createElement("button");
    MessageButton.style.display = "block";
    MessageButton.innerHTML = "Jump to bottom";
    MessageButton.className = "MessageButton"; 
    MessageButton.onclick = function() {
        MessageContainer.scrollTop = MessageContainer.scrollHeight - MessageContainer.clientHeight;
    };
    Message.appendChild(MessageButton);
    for (message in ConsoleHistory) {
        if (ConsoleHistory[message][0] == '~') {
            MessageText = document.createElement("b");
        }
        else {
            MessageText = document.createElement("p");
        }
        MessageText.className = "MessageText";
        MessageText.innerHTML = ConsoleHistory[message];
        Message.appendChild(MessageText);
    }
    ScrollUp = document.createElement("button");
    ScrollUp.style.display = "block";
    ScrollUp.innerHTML = "Jump to top";
    ScrollUp.className = "MessageButton";
    ScrollUp.onclick = function() {
        MessageContainer.scrollTop = 0;
    };
    Message.appendChild(ScrollUp);
}
function UpdateTurnCount() {
    if (IsPlayerTurn) {
        al = 0;
        ml = 0;
        if (CanAbility[0]) {
            al += 1;
        }
        if (CanAbility[1]) {
            al += 1;
        }
        if (CanMove) {
            ml = 1;
        }
        turncounter.innerHTML = currentPlant.name+"'s Turn: "+ml+" move left and "+al+" ability left";
    }
    else {
        turncounter.innerHTML = currentPlant.name+"'s Turn: 0 move left and 0 ability left";
    }
}
class griditem {
    constructor() {
        this.codx = 0; //x pos in terms of the grid
        this.cody = 0;//y pos in terms of the grid
        this.sprite = "";
        this.character = ""; //the character on the grid spot
    }
}
class AttackType {
    constructor() {
        this.damage = 0;
        this.splashDamage = 0;
        this.name = "";
        this.desc = ""; //only for chomper's abilities
        this.range = 0; //how many squares it travels
        this.splashRadius = 0; //the radius of the splash damage
        this.shots = 1; //how many times the attack triggers
        this.shotsLeft = 1;
        this.accuracy = 101; //percentage
        this.reloadTime = -1; //how many turns it takes until it's ready again
        this.TimeUntilReady = 0;
        this.STUP = 0;
        this.stunChance = 0; //percent chance to stun
        this.displaySprite = ""; //sprite displaying ability
    }
}
class SupportType {
    constructor() {
        this.type = "";
        this.name = "";
        this.zombie = ""; //the zombie to summon
        this.coords = []; //the coordinates of the zombies in comparision to the base zombie
        this.reloadTime = -1; //how many turns it takes until it's ready again
        this.TimeUntilReady = 0;
    }
}
class Fighter {
    constructor() {
        this.name = "";
        this.plant = false; //determine if it's a plant or zombie, boolean because idk :/
        this.health = 0;
        this.permhealth = 0;
        this.height = 0; //how tall it is
        this.wb = 1; //for garg ang gun
        this.chewing = false; //onlu applies to ac
        this.canBeEaten = true;
        this.allergy = false;
        this.chewingtime = 1;
        this.underShield = "";
        this.powerLevel = 0; //To compare strengths between fighters
        this.movement = 1; //how many squares it can move
        this.stunned = false; //if the fighter is stunned or not
        this.coords = []; //x and y positions on the grid
        this.attacks = []; //what attacks this character has
        this.supports = [];
        this.movesLeft = 0;
        this.aliveSprite = ""; //hmm why is this specified to be alive? unless..
        this.iconSprite = "";

    }
}
function clone(obj) {
    return Object.create(
      Object.getPrototypeOf(obj), 
      Object.getOwnPropertyDescriptors(obj) 
    );
}
fighterArray = [];
BossWaves = [];
//armor chomper things
Goop = new AttackType();
Goop.name = "Goop";
Goop.desc = "Spit your slobber at a zombie to cover them in sticky goop that stops them from moving or attacking. <br>Direct hit dmg: 25 ∫ Splash dmg: 15 ∫ Splash dmg radius: 3 by 3 ∫ Range: 4 spaces ∫ Cooldown: 2 turns ∫ Stuns for 1 turn";
Goop.damage = 25;
Goop.range = 4;
Goop.reloadTime = 2;
Goop.stunChance = 101;
Goop.splashDamage = 15;
Goop.splashRadius = 3;
Goop.displaySprite = "GoopIcon.PNG";
Chomp = new AttackType();
Chomp.name = "Chomp";
Chomp.desc = "Bite a zombie with your sharp metal teeth. <br>Dmg: 75 ∫ Range: Melee (1 space) ∫ No cooldown";
Chomp.damage = 75;
Chomp.range = 1;
Chomp.displaySprite = "ChompIcon.PNG";
Seed = new AttackType();
Seed.name = "Seed Spit";
Seed.desc = "Armor Chomper chews up some seeds and spits them out at the zombies. <br>Dmg: 25 per seed ∫ fires 3 seeds ∫ Range: 6 spaces ∫ Cooldown: 2 turns ∫ 90% chance for each seed to hit";
Seed.damage = 25;
Seed.range = 6;
Seed.accuracy = 90;
Seed.reloadTime = 2;
Seed.shots = 3;
Seed.displaySprite = "SeedSpitIcon.PNG";
Swallow = new AttackType();
Swallow.name = "Swallow";
Swallow.desc = "Open up your mouth and eat the zombie in front of you. <br>Dmg: Infinite ∫ Range: Melee (1 space) ∫ Cooldown: 1 turn ∫ Armor Chomper cannot attack for 1 turn";
Swallow.damage = 2001;
Swallow.range = 1;
Swallow.reloadTime = 1;
Swallow.displaySprite = "SwallowIcon.PNG";
AC = new Fighter();
AC.plant = true;
AC.name = "Armor Chomper";
AC.health = 225;
AC.powerLevel = 9001;
AC.height = "30%";
AC.chewingtime = 0;
AC.attacks.push(Goop,Chomp,Seed,Swallow); 
AC.aliveSprite = "ArmorChomper.PNG";
AC.iconSprite = "PlantLeft.PNG";
//peashitter
Pea = new AttackType();
Pea.name = "Pea";
Pea.desc = "Peashooter shoots a large pea that splats on a zombie. <br>Dmg: 50 ∫ Range: 4 spaces ∫ No cooldown ∫";
Pea.damage = 50;
Pea.range = 4;
Pea.displaySprite = "PeaIcon.PNG";
Gatling = new AttackType();
Gatling.name = "Pea Gatling";
Gatling.desc = "Peashooter puts on his gatling helmet and fires a bunch of small peas at the zombies. <br>Dmg: 10 per pea ∫ Fires 10 peas ∫ Range: 7 spaces ∫ Cooldown: 2 turns ∫ 95% chance for each pea to hit";
Gatling.damage = 10;
Gatling.range = 7;
Gatling.accuracy = 95;
Gatling.shots = 10;
Gatling.reloadTime = 2;
Gatling.displaySprite = "GatlingIcon.PNG";
Bean = new AttackType();
Bean.name = "Bean Bomb";
Bean.desc = "Peashooter tosses out an explosive bean that is sure to reduce the zombies to ash. <br>Direct hit dmg: 150 ∫ Splash dmg: 75 ∫ Splash dmg radius: 3 by 3 ∫ Range: Melee (2 spaces) ∫ Cooldown: 3 turns";
Bean.damage = 150;
Bean.splashDamage = 75;
Bean.splashRadius = 3;
Bean.range = 2;
Bean.reloadTime = 3;
Bean.displaySprite = "BeanIcon.PNG";
Peashoot = new Fighter();
Peashoot.plant = true;
Peashoot.name = "Peashooter";
Peashoot.health = 150;
Peashoot.powerLevel = 9001;
Peashoot.height = "26%";
Peashoot.chewingtime = 0;
Peashoot.attacks.push(Pea,Gatling,Bean); 
Peashoot.aliveSprite = "Peashooter.PNG";
Peashoot.iconSprite = "PlantRight.PNG";
currentPlant = Peashoot;
plantArray = [AC,Peashoot];
//zombie attacks /*add ability sounds*/
Bite = new AttackType();
Bite.name = "Bite";
Bite.damage = 25;
Bite.range = 1;
AnkBite = new AttackType();
AnkBite.name = "Ankle Bite";
AnkBite.damage = 20;
AnkBite.range = 1;
Rock = new AttackType();
Rock.name = "Rock";
Rock.damage = 10;
Rock.range = 3;
Rock.accuracy = 75;
Rock.reloadTime = 1;
Gun = new AttackType();
Gun.name = "Bullet Fire";
Gun.damage = 20;
Gun.range = 5;
Gun.shots = 2;
Gun.accuracy = 60;
Gun.reloadTime = 1;
Fists = new AttackType();
Fists.name = "Fist Fight";
Fists.damage = 35;
Fists.range = 1;
Snowball = new AttackType();
Snowball.name = "Snowball";
Snowball.damage = 10;
Snowball.range = 4;
Snowball.stunChance = 20;
Snowball.accuracy = 90;
FrostTouch = new AttackType();
FrostTouch.name = "Frosty Touch";
FrostTouch.damage = 20;
FrostTouch.range = 1;
FrostTouch.stunChance = 101;
FrostTouch.reloadTime = 2;
PoleSmash = new AttackType();
PoleSmash.name = "Pole Smash";
PoleSmash.damage = 75;
PoleSmash.range = 2;
PoleSmash.reloadTime = 1;
ImpThrow = new AttackType();
ImpThrow.name = "Exploding Imp Toss";
ImpThrow.damage = 35;
ImpThrow.range = 6;
ImpThrow.reloadTime = 2;
ImpThrow.accuracy = 85;
Football = new AttackType();
Football.name = "Football Fling";
Football.damage = 25;
Football.range = 5;
Football.reloadTime = 1;
Football.accuracy = 85;
Door = new AttackType();
Door.name = "Screen Door Smack";
Door.damage = 30;
Door.range = 1;
Door.reloadTime = 1;
Paper = new AttackType();
Paper.name = "Paper Ball";
Paper.damage = 5;
Paper.accuracy = 95;
Paper.range = 4;
RageBite = new AttackType();
RageBite.name = "Angry Bite"
RageBite.damage = 50;
RageBite.range = 1;
//zombies 
Browncoat = new Fighter();
Browncoat.name = "Browncoat Zombie";
Browncoat.health = 50;
Browncoat.permhealth = 50;
Browncoat.powerLevel = 1;
Browncoat.coords = [7,2];
Browncoat.height = "25%";
Browncoat.attacks.push(Bite, Rock);
Browncoat.aliveSprite = "RegZomb.PNG";
Conehead = new Fighter();
Conehead.name = "Conehead Zombie";
Conehead.health = 125;
Conehead.permhealth = 125;
Conehead.height = "30%";
Conehead.powerLevel = 2;
Conehead.attacks.push(Bite, clone(Rock));
Conehead.aliveSprite = "Conehead.PNG";
Buckethead = new Fighter();
Buckethead.name = "Buckethead Zombie";
Buckethead.health = 175;
Buckethead.permhealth = 175;
Buckethead.height = "28%";
Buckethead.powerLevel = 3;
Buckethead.attacks.push(Bite, clone(Rock));
Buckethead.aliveSprite = "Buckethead.PNG";
Yeti = new Fighter();
Yeti.name = "Yeti Zombie";
Yeti.health = 150;
Yeti.permhealth = 150;
Yeti.height = "32%";
Yeti.powerLevel = 5;
//Yeti.chewingtime = 2;
Yeti.attacks.push(FrostTouch,Snowball);
Yeti.aliveSprite = "YetiZombie.PNG";
GunZomb = new Fighter();
GunZomb.name = "Gangsta Zombie";
GunZomb.health = 100;
GunZomb.permhealth = 100;
GunZomb.height = "28%";
GunZomb.powerLevel = 4;
GunZomb.wb = 1.4;
GunZomb.attacks.push(Fists,Gun);
GunZomb.aliveSprite = "GunZombie.PNG";
Imp = new Fighter();
Imp.name = "Imp";
Imp.health = 25;
Imp.permhealth = 25;
Imp.powerLevel = 0.5;
Imp.movement = 2;
Imp.height = "15%";
Imp.attacks.push(AnkBite)
Imp.aliveSprite = "Imp.PNG";
Phone = new SupportType();
Phone.type = "summon";
Phone.name = "Phone Friends";
Phone.zombie = [Browncoat];
Phone.coords = [[0,-1],[0,1]];
Phone.reloadTime = 3;
Gargantuar = new Fighter();
Gargantuar.name = "Gargantuar";
Gargantuar.health = 400;
Gargantuar.permhealth = 400;
Gargantuar.powerLevel = 10;
Gargantuar.height = "40%";
Gargantuar.wb = 1.6;
Gargantuar.canBeEaten = false;
Gargantuar.supports.push(Phone);
Gargantuar.attacks.push(PoleSmash,ImpThrow);
Gargantuar.aliveSprite = "Gargantuar.PNG";
FootballZomb = new Fighter();
FootballZomb.name = "Football Zombie";
FootballZomb.health = 200;
FootballZomb.permhealth = 200;
FootballZomb.powerLevel = 6;
FootballZomb.height = "28%";
FootballZomb.movement = 2;
//FootballZomb.chewingtime = 2;
FootballZomb.attacks.push(Bite,Football);
FootballZomb.aliveSprite = "FootballZomb.PNG";
FootballZomb.wb = 1.2;
Screendoor = new Fighter(); 
Screendoor.name = "Screen Door Zombie";
Screendoor.health = 100;
Screendoor.permhealth = 100;
Screendoor.powerLevel = 3;
Screendoor.height = "27%";
Screendoor.underShield = clone(Browncoat);
Screendoor.attacks.push(Door,clone(Rock));
Screendoor.aliveSprite = "Screendoor.PNG";
MadNews = new Fighter();
MadNews.name = "Enraged Newspaper Zombie";
MadNews.health = 125;
MadNews.permhealth = 125;
MadNews.powerLevel = 4;
MadNews.wb = 1.2;
MadNews.height = "28%";
MadNews.movement = 2;
MadNews.attacks.push(RageBite);
MadNews.aliveSprite = "NewspaperMad.PNG";
Newspaper = new Fighter();
Newspaper.name = "Newspaper Zombie";
Newspaper.health = 50;
Newspaper.permhealth = 50;
Newspaper.powerLevel = 4;
Newspaper.wb = 1.2;
Newspaper.height = "27%";
Newspaper.underShield = clone(MadNews);
Newspaper.attacks.push(Bite,Paper);
Newspaper.aliveSprite = "Newspaper.PNG";
Backup = new Fighter();
Backup.name = "Backup Dancer";
Backup.health = 50;
Backup.permhealth = 50;
Backup.powerLevel = 1;
Backup.movement = 1.5;
Backup.height = "25%";
Backup.attacks.push(Bite);
Backup.aliveSprite = "BackupDancer.PNG";
Dancers = new SupportType();
Dancers.type = "summon";
Dancers.name = "Summon Backup";
Dancers.zombie = [Backup]
Dancers.coords = [[-1,0],[1,0],[0,-1],[0,1]];
Dancers.reloadTime = 2;
Dancers.STUP = 2;
Disco = new Fighter();
Disco.name = "Disco Zombie";
Disco.health = 150;
Disco.permhealth = 150;
Disco.movement = 0.5;
Disco.powerLevel = 7;
Disco.height = "28%";
Disco.attacks.push(Bite);
Disco.supports.push(Dancers);
Disco.aliveSprite = "DiscoZombie.PNG";
griditemarray = [];
phygriditems = [];
ZombieArray = [];
//Boss waves
GrowZombie = new SupportType();
GrowZombie.type = "summon";
GrowZombie.name = "Raise Zombie";
GrowZombie.zombie = [Browncoat,Imp]
GrowZombie.coords = [[-1,0]];
GrowZombie.reloadTime = 2;
CreateImps = new SupportType();
CreateImps.type = "summon";
CreateImps.name = "Impish Necromancy";
CreateImps.zombie = [Imp]
CreateImps.coords = [[-1,1],[-1,-1]];
CreateImps.reloadTime = 3;
GigaPhone = new SupportType();
GigaPhone.type = "summon";
GigaPhone.name = "Phone Friends";
GigaPhone.zombie = [GunZomb];
GigaPhone.coords = [[-1,0]];
GigaPhone.reloadTime = 4;
GigaPhone.STUP = 2;
Mitosis = new SupportType();
Mitosis.type = "summon";
Mitosis.name = "Mitosis";
Mitosis.coords = [[0,1]];
Mitosis.reloadTime = 3;
Mitosis.STUP = 3;
Mitosis.zombie = ["Parent"];
Mitosis2 = new SupportType();
Mitosis2.type = "summon";
Mitosis2.name = "Mitosis";
Mitosis2.coords = [[0,-1]];
Mitosis2.reloadTime = 3;
Mitosis2.STUP = 3;
Mitosis2.zombie = ["Parent"];
Mitosis3 = new SupportType();
Mitosis3.type = "summon";
Mitosis3.name = "Mitosis";
Mitosis3.coords = [[1,0]];
Mitosis3.reloadTime = 3;
Mitosis3.STUP = 3;
Mitosis3.zombie = ["Parent"];
Mitosis4 = new SupportType();
Mitosis4.type = "summon";
Mitosis4.name = "Mitosis";
Mitosis4.coords = [[-1,0]];
Mitosis4.reloadTime = 3;
Mitosis4.STUP = 3;
Mitosis4.zombie = ["Parent"];
ImpWand = new AttackType();
ImpWand.name = "Impish Powers";
ImpWand.damage = 35;
ImpWand.range = 2;
ImpWand.reloadTime = 2;
Lightning = new AttackType();
Lightning.name = "Pole Lightning";
Lightning.damage = 45;
Lightning.range = 5;
Lightning.reloadTime = 1;
NastyPea = new AttackType();
NastyPea.name = "Nasty Pea";
NastyPea.damage = 10;
NastyPea.range = 10;
NastyPea.accuracy = 85;
Squash = new AttackType();
Squash.name = "Squash";
Squash.damage = 300;
Squash.range = 1;
NastyGatling = new AttackType();
NastyGatling.name = "Nasty Gatling";
NastyGatling.damage = 10;
NastyGatling.shots = 4;
NastyGatling.range = 10;
NastyGatling.accuracy = 95;
NastyGatling.reloadTime = 1;
Fashion = new AttackType();
Fashion.name = "Mock";
Fashion.damage = 1;
Fashion.shots = 50;
Fashion.accuracy = 55;
Fashion.range = 1;
Fashion.reloadTime = 1;
Fashion.STUP = 1;
ConeGun = new AttackType();
ConeGun.name = "Cone Appétit";
ConeGun.damage = 20;
ConeGun.range = 4;
ConeGun.accuracy = 95;
ConeGun.reloadTime = 1;
ConeGun.STUP = 1;
ImpKing = new Fighter();
ImpKing.name = "Imp King";
ImpKing.health = 125;
ImpKing.permhealth = 125;
ImpKing.movement = 1.75;
ImpKing.powerLevel = 5.5;
ImpKing.height = "22%";
ImpKing.supports.push(CreateImps);
ImpKing.attacks.push(ImpWand);
ImpKing.aliveSprite = "ImpKing.PNG";
Gravestone = new Fighter();
Gravestone.name = "Gravestone";
Gravestone.health = 75;
Gravestone.permhealth = 75;
Gravestone.movement = 0;
Gravestone.powerLevel = 3;
Gravestone.height = "20%";
Gravestone.supports.push(GrowZombie);
Gravestone.aliveSprite = "Gravestone.PNG";
GigaGarg = new Fighter();
GigaGarg.name = "Giga Gargantuar";
GigaGarg.health = 500;
GigaGarg.permhealth = 500;
GigaGarg.movement = 1.25;
GigaGarg.powerLevel = 20;
GigaGarg.canBeEaten = false;
GigaGarg.wb = 1.6;
GigaGarg.height = "43%";
GigaGarg.supports.push(GigaPhone);
GigaGarg.attacks.push(clone(PoleSmash),Lightning);
GigaGarg.aliveSprite = "GigaGarg.PNG";
Zompea = new Fighter();
Zompea.name = "Peashooter Zombie";
Zompea.health = 50;
Zompea.permhealth = 50;
Zompea.powerLevel = 1;
Zompea.wb = 1.2;
Zompea.height = "24%";
Zompea.attacks.push(Bite,NastyPea);
Zompea.aliveSprite = "Zompea.PNG";
Zomgatling = new Fighter();
Zomgatling.name = "Gatling Zombie";
Zomgatling.health = 75;
Zomgatling.permhealth = 75;
Zomgatling.powerLevel = 4;
Zomgatling.wb = 1.2;
Zomgatling.height = "26%";
Zomgatling.attacks.push(NastyGatling,Bite);
Zomgatling.aliveSprite = "Zomgatling.PNG";
Zomnut = new Fighter();
Zomnut.name = "Wallnut Zombie";
Zomnut.health = 150;
Zomnut.permhealth = 150;
Zomnut.allergy = "nut";
Zomnut.powerLevel = 2;
Zomnut.height = "28%";
Zomnut.attacks.push(Bite);
Zomnut.aliveSprite = "Zomnut.PNG";
Zomsquash = new Fighter();
Zomsquash.name = "Squash Zombie";
Zomsquash.health = 50;
Zomsquash.permhealth = 50;
Zomsquash.powerLevel = 3;
Zomsquash.movement = 1.75;
Zomsquash.height = "27%";
Zomsquash.attacks.push(Squash);
Zomsquash.aliveSprite = "Zomsquash.PNG";
ConeCrab = new Fighter();
ConeCrab.name = "Cone Crab";
ConeCrab.health = 10;
ConeCrab.permhealth = 10;
ConeCrab.powerLevel = 1;
ConeCrab.wb = 0.1;
ConeCrab.movement = 2.5;
ConeCrab.height = "8%";
ConeCrab.attacks.push(AnkBite);
ConeCrab.supports.push(Mitosis,Mitosis2,Mitosis3,Mitosis4);
ConeCrab.aliveSprite = "ConeCrab.PNG";  
Coneoisseur = new Fighter();
Coneoisseur.name = "Cone-oisseur";
Coneoisseur.health = 50;
Coneoisseur.permhealth = 50;
Coneoisseur.powerLevel = 4;
Coneoisseur.height = "35%";
Coneoisseur.wb = 0.8;
Coneoisseur.attacks.push(Fashion,ConeGun);
Coneoisseur.aliveSprite = "Coneoisseur.PNG"; 
Coneoisseur5 = clone(Coneoisseur);
Coneoisseur5.underShield = "";
Coneoisseur5.aliveSprite = "Coneoisseur5.PNG";
Coneoisseur4 = clone(Coneoisseur);
Coneoisseur4.underShield = clone(Coneoisseur5);
Coneoisseur4.aliveSprite = "Coneoisseur4.PNG";
Coneoisseur3 = clone(Coneoisseur);
Coneoisseur3.underShield = clone(Coneoisseur4);
Coneoisseur3.aliveSprite = "Coneoisseur3.PNG";
Coneoisseur2 = clone(Coneoisseur);
Coneoisseur2.underShield = clone(Coneoisseur3);
Coneoisseur2.aliveSprite = "Coneoisseur2.PNG";
Coneoisseur.underShield = clone(Coneoisseur2);
class BossWave {
    constructor() {
        this.name = ""; //name of boss wave
        this.zombies = []; //zombies in boss wave
        this.image = ""; //image for
        this.imageWidth = 0; //Dr Image, at   
        this.imageLeft = 0; //1337 Imago St
        this.availablewaves = []; //what waves the boss wave can appear on
        this.availablecoords = []; //what coordinates the zombies can spawn on
        this.randomizecoords = false; //if the zombies spawn on a random of the given coordinates or if they are always in one spot
        this.theme = ""; //theme to play during the boss wave
    }
} //3 waves on turn 5, 4 waves on turn 10, 4 waves on turn 15, 3 waves on turn 20, 3 waves on turn 25
AllImps = new BossWave();
AllImps.name = "Wave of Imps";
AllImps.zombies = [Imp, ImpKing, clone(Imp)];
AllImps.image = "ImpGang.PNG";   
AllImps.imageWidth = "25%";
AllImps.imageLeft = "80%";
AllImps.availablewaves = [5,10,15,20,25];
for (x=4; x<10; x++) {
    for (y=0; y<5; y++) {
        AllImps.availablecoords.push([x,y]);
    }
}
AllImps.randomizecoords = true;
AllImps.theme = "ImpTheme.mp3"; 
BossWaves.push(AllImps);
Garg = new BossWave();
Garg.name = "Gaggling Gargantuars";
Garg.zombies = [Gargantuar];
Garg.image = "GargBoss.PNG";
Garg.imageWidth = "35%";
Garg.imageLeft = "65%"; //*add  
Garg.availablewaves = [10];
Garg.availablecoords = [[5,2],[6,2],[7,2],[8,2]];
Garg.randomizecoords = true;
Garg.theme = "GargTheme.mp3"; 
BossWaves.push(Garg);
Gargs = new BossWave();
Gargs.name = "One Big Bad Zombie";
Gargs.zombies = [GigaGarg];
Gargs.image = "GigaGargBoss.PNG"; 
Gargs.imageWidth = "40%";
Gargs.imageLeft = "60%";
Gargs.availablewaves = [20];
Gargs.availablecoords = [[5,2],[6,2],[7,2],[8,2]];
Gargs.randomizecoords = true;
Gargs.theme = "GigaGargTheme.mp3"; 
BossWaves.push(Gargs);
Graves = new BossWave();
Graves.name = "Grave Danger";
Graves.zombies = [clone(Gravestone),clone(Gravestone),clone(Gravestone),clone(Gravestone),clone(Gravestone)];
Graves.image = "Graves.PNG"; 
Graves.imageWidth = "30%";
Graves.imageLeft = "70%";
Graves.availablewaves = [15];
Graves.availablecoords = [[9,0],[9,1],[9,2],[9,3],[9,4]];
Graves.randomizecoords = false;
Graves.theme = "GraveTheme.mp3"; 
BossWaves.push(Graves);
Zombotany = new BossWave();
Zombotany.name = "Zombotany!";
Zombotany.zombies = [Zompea,Zomnut,clone(Zompea)];
Zombotany.image = "Zombotany.PNG";
Zombotany.imageWidth = "40%";
Zombotany.imageLeft = "60%";
Zombotany.availablewaves = [5,10];
Zombotany.randomizecoords = true;
for (x=5; x<10; x++) {
    for (y=0; y<5; y++) {
        Zombotany.availablecoords.push([x,y]);
    }
}
Zombotany.theme = "ZombotanyTheme.mp3";
BossWaves.push(Zombotany);
Zombotany2 = new BossWave();
Zombotany2.name = "Zombotany!";
Zombotany2.zombies = [Zomgatling,Zompea,Zomnut,Zomsquash,clone(Zompea)];
Zombotany2.image = "Zombotany.PNG";
Zombotany2.imageWidth = "40%";
Zombotany2.imageLeft = "60%";
Zombotany2.availablewaves = [15,20,25];
Zombotany2.randomizecoords = true;
for (x=5; x<10; x++) {
    for (y=0; y<5; y++) {
        Zombotany2.availablecoords.push([x,y]);
    }
}
Zombotany2.theme = "ZombotanyTheme.mp3";
BossWaves.push(Zombotany2);
ConeZone = new BossWave();
ConeZone.name = "The Cone Zone";
ConeZone.zombies = [ConeCrab,Conehead,clone(ConeCrab),clone(ConeCrab),clone(Conehead),Coneoisseur];
ConeZone.image = "ConeZone.PNG";
ConeZone.imageWidth = "35%";
ConeZone.imageLeft = "65%";
ConeZone.availablewaves = [5,10,15,25];
ConeZone.randomizecoords = true;
for (x=4; x<10; x++) {
    for (y=0; y<5; y++) {
        ConeZone.availablecoords.push([x,y]);
    }
}
ConeZone.theme = "ConeZoneTheme.mp3";
BossWaves.push(ConeZone);

gridx = 9
gridy = 5
gridsize = 1.45
currentx = 0
currenty = 0
prevzposes = [];
difficultylevel = 1; /*sandbox mode*/
wc = document.getElementById("EverythingFitter");
zhealtharray = [];
zhealthbararray = [];
CanZAbility = [];
StopTurn = false;
prevppos = currentPlant.coords.slice(0);
currentProjectile = "";
CD = 0;
consolemessages = [];
ConsoleHistory = [];
function updategrid() { 
    for (is in phygriditems) {
        phygriditems[is].remove();
    }
    phygriditems = [];
    griditemarray = [];
    currentx = 0
    currenty = 0
    for (i = 0; i < gridx*gridy; i++) {
        currentx += 1;
        ItemSprite = document.createElement("img");
        newgi = new griditem();
        newgi.codx = currentx;
        newgi.cody = currenty;
        newgi.sprite = "BlankTile.PNG"
        newgi.character = "";
        griditemarray.push(newgi);
        ItemSprite.src = "BlankTile.PNG";
        wc.appendChild(ItemSprite);
        ItemSprite.className = "gridTile";
        ItemSprite.onclick = tryToMove;
        ItemSprite.style.height = (8*gridsize).toString()+"%";
        ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
        ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
        for (f in fighterArray) {
            fighter = fighterArray[f];
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                newgi.sprite = "GreenTile.PNG"
                newgi.character = fighter;
                fighterPhysArray[f].style.height = currentPlant.height;
                fighterPhysArray[f].style.top = (parseInt(ItemSprite.style.top)-0.088*fighterPhysArray[f].height).toString()+"%";
                fighterPhysArray[f].style.left = (parseInt(ItemSprite.style.left)+0.4*fighterPhysArray[f].width).toString()+"px";
                ItemSprite.src = "GreenTile.PNG";
            }
            else if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                newgi.sprite = "PurpleTile.PNG"
                newgi.character = fighter;
                fighterPhysArray[f].style.top = (((30-parseInt(fighter.height))/10)+parseInt(ItemSprite.style.top)-0.088*fighterPhysArray[f].height).toString()+"%";             
                fighterPhysArray[f].style.left = ((3*(30-(fighter.wb*parseInt(fighter.height))))+parseInt(ItemSprite.style.left)).toString()+"px";
                zhealtharray[f-1].style.top = parseInt(ItemSprite.style.top).toString()+"%";
                zhealtharray[f-1].style.left = (parseInt(ItemSprite.style.left)+51.942).toString()+"px";
                zhealtharray[f-1].innerHTML = fighter.health;
                zhealthbararray[f-1].style.top = parseInt(ItemSprite.style.top).toString()+"%";
                zhealthbararray[f-1].style.left = (parseInt(ItemSprite.style.left)+39.35).toString()+"px";
                zhealthbararray[f-1].src = "HeartIcon.PNG";
                if (fighter.underShield != "") {
                    zhealthbararray[f-1].src = "ArmorHeartIcon.PNG";
                }
                ItemSprite.src = "PurpleTile.PNG";
            }
        }
        phygriditems.push(ItemSprite);
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function updatecharactergrid() { 
    currentx = 0
    currenty = 0
    for (i in griditemarray) {
        currentx += 1;
        griditemarray[i].character = "";
        for (f in fighterArray) {
            fighter = fighterArray[f];
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1]) {
                griditemarray[i].character = fighter;
            }
        }
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function CheckIfCollision(p,zombi) {
    for (z in ZombieArray) {
        if ((ZombieArray[z].coords[0] == currentPlant.coords[0]) && (ZombieArray[z].coords[1] == currentPlant.coords[1])) {
            if (p == "plant") {
                CreateConsoleText("You cannot move on top of a zombie.",false,false)
                CanMove = true;
                currentPlant.coords = prevppos.slice(0);
                updategrid();
                return true;
            }
            else {
                ZombieArray[z].coords = prevzposes[z].slice(0);
                updategrid();
                return true;
            }
        }
        if (p == "Zombie") {
            for (zom in ZombieArray) {
                if (zom == z) {
                    continue;
                }
                if (ZombieArray[z].coords[0] == ZombieArray[zom].coords[0] && ZombieArray[z].coords[1] == ZombieArray[zom].coords[1]) {
                    zombi.coords = prevzposes[ZombieArray.indexOf(zombi)].slice(0);
                    updategrid();
                    return true;
                }
            }
        }
    }
    return false;
}
function SwitchAD() {
    for (is in phygriditems) {
        phygriditems[is].remove();
    }
    if (CD < 3) {
        CD += 1;
    }
    else {
        CD = 0;
        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
    }
    if (CD == 1) {
        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(-1)";
    }
    else if (CD == 3) {
        fighterPhysArray[fighterArray.indexOf(currentPlant)].style.transform = "scaleX(1)";
    }
    phygriditems = [];
    griditemarray = [];
    currentx = 0
    currenty = 0
    for (i = 0; i < gridx*gridy; i++) {
        currentx += 1;
        ItemSprite = document.createElement("img");
        newgi = new griditem();
        newgi.codx = currentx;
        newgi.cody = currenty;
        newgi.sprite = "BlankTile.PNG"
        griditemarray.push(newgi);
        ItemSprite.src = "BlankTile.PNG";
        wc.appendChild(ItemSprite);
        ItemSprite.style.position = "absolute";
        ItemSprite.className = "gridTile";
        ItemSprite.onclick = tryToMove;
        ItemSprite.style.height = (8*gridsize).toString()+"%";
        ItemSprite.style.top = (gridsize*(12+(currenty)*8)).toString()+"%";
        ItemSprite.style.left = (window.innerWidth*((gridsize*currentx)+gridy/(gridsize*2)-currenty*gridsize*0.7)*(1/18)).toString()+"px"
        for (f in fighterArray) {
            fighter = fighterArray[f];
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && fighter.plant) {
                newgi.sprite = "GreenTile.PNG"
                newgi.character = fighter;
                ItemSprite.src = "GreenTile.PNG";
            }
            if (currentx === fighter.coords[0] && currenty === fighter.coords[1] && !(fighter.plant)) {
                newgi.sprite = "PurpleTile.PNG"
                newgi.character = fighter;
                ItemSprite.src = "PurpleTile.PNG";
            }
        }
        if (CD == 0) {
            if((currentPlant.coords[0]+1 <= currentx && currentx <= currentPlant.coords[0]+attack.range) && currenty === currentPlant.coords[1]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        else if (CD == 1) {
            if((currentPlant.coords[1]+1 <= currenty && currenty <= currentPlant.coords[1]+attack.range) && currentx === currentPlant.coords[0]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        else if (CD == 2) {
            if((currentPlant.coords[0]-1 >= currentx && currentx >= currentPlant.coords[0]-attack.range) && currenty === currentPlant.coords[1]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        else if (CD == 3) {
            if((currentPlant.coords[1]-1 >= currenty && currenty >= currentPlant.coords[1]-attack.range) && currentx === currentPlant.coords[0]) {
                if (newgi.sprite == "PurpleTile.PNG") {
                    newgi.sprite = "RedTile.PNG";
                    ItemSprite.src = "RedTile.PNG";
                }
                else {
                    newgi.sprite = "BlueTile.PNG";
                    ItemSprite.src = "BlueTile.PNG";
                }
            }
        }
        phygriditems.push(ItemSprite);
        if (currentx%gridx == 0) {
            currenty += 1;
            currentx = 0;
        }
    }
}
function CheckAttack(zombie, attack) {
    if (!(CanZAbility[ZombieArray.indexOf(zombie)])) {
        return;
    }
    currentay = 0;
    currentax = 0;
    for (ia = 0; ia < gridx*gridy; ia++) {
        currentax += 1;
        hitarea = false;
        if ((zombie.coords[0]-1 >= currentax && currentax >= zombie.coords[0]-attack.range) && currentay === zombie.coords[1]) {
            hitarea = true;
        }
        else if ((zombie.coords[0]+1 <= currentax && currentax <= zombie.coords[0]+attack.range) && currentay === zombie.coords[1]) {
            hitarea = true;
        }
        else if ((zombie.coords[1]+1 <= currentay && currentay <= zombie.coords[1]+attack.range) && currentax === zombie.coords[0]) {
            hitarea = true;
        }
        else if ((zombie.coords[1]-1 >= currentay && currentay >= zombie.coords[1]-attack.range) && currentax === zombie.coords[0]) {
            hitarea = true;
        }
        if (hitarea) {
            if (griditemarray[ia].sprite == "GreenTile.PNG" && attack.TimeUntilReady <= 0) {
                return true;
            }
        }
        if (currentax%gridx == 0) {
            currentay += 1;
            currentax = 0;
        }
    }
    return false;
}
function TestSupport(zombie,support) {
    if (!(CanZAbility[ZombieArray.indexOf(zombie)])) {
        console.log("you can't abiltu")
        return;
    }
    if (support.TimeUntilReady > 0) { 
        console.log("it noeed to recharg")
        return;
    }
    willhit = false;
    summoncount = 0;
    console.log("make something")
    if (support.type == "summon") {
        updatecharactergrid();
        for (g in griditemarray) {
            for (s in support.coords) {
                if (griditemarray[g].codx == zombie.coords[0]+support.coords[s][0] && griditemarray[g].cody == zombie.coords[1]+support.coords[s][1] && griditemarray[g].character == "") {
                    willhit = true;
                    summoncount += 1;
                    if (support.zombie[0] == "Parent") {
                        NZ = clone(zombie);
                    }
                    else {
                        NZ = clone(support.zombie[Math.floor(Math.random() * support.zombie.length)]);
                    }
                    NZ.health = NZ.permhealth;
                    NZ.coords = [zombie.coords[0]+support.coords[s][0],zombie.coords[1]+support.coords[s][1]];
                    ZombieArray.push(NZ);
                    for (a in NZ.attacks) {
                        NZ.attacks[a].TimeUntilReady = NZ.attacks[a].STUP+1;
                    }
                    for (sup in NZ.supports) {
                        NZ.supports[sup].TimeUntilReady = NZ.supports[sup].STUP+1;
                    }
                    prevzposes.push(NZ.coords)
                    CanZAbility.push(true);
                    var zombi = document.createElement("img");
                    zombi.className = "Fighter";
                    zombi.style.height = NZ.height;
                    zombi.src = NZ.aliveSprite;
                    wc.appendChild(zombi);
                    fighterPhysArray.push(zombi);
                    zombi.style.transform = "scaleX(1)";
                    var zhealth = document.createElement("p")
                    var zhealthbar = document.createElement("img")
                    if (NZ.underShield != "") {
                        zhealthbar.src = "ArmorHeartIcon.PNG";
                    }
                    else {
                        zhealthbar.src = "HeartIcon.PNG";
                    }
                    zhealthbar.style.position = "absolute";
                    zhealthbar.style.width = "4%";
                    zhealthbar.style.zIndex = 9001;
                    wc.appendChild(zhealthbar);
                    zhealth.style.position = "absolute";
                    zhealth.style.fontFamily =  'Marker Felt';
                    zhealth.style.fontSize = "1.7vw";
                    zhealth.style.zIndex = 9002;
                    wc.appendChild(zhealth)
                    zhealtharray.push(zhealth);
                    zhealthbararray.push(zhealthbar);
                    fighterArray.push(NZ);
                    griditemarray[g].character = NZ;
                    CheckZindexes();
                }
            }
        }
    }
    if (willhit) {
        CreateConsoleText(zombie.name+" has used "+support.name+".")
        support.TimeUntilReady = support.reloadTime+1;
        CanZAbility[ZombieArray.indexOf(zombie)] = false;
        updategrid();
    }
    if (summoncount > 0) {
        if (summoncount > 1) {
            CreateConsoleText(zombie.name+" has summoned "+summoncount+" "+NZ.name+"s.")
        }
        else {
            CreateConsoleText(zombie.name+" has summoned "+summoncount+" "+NZ.name+".")
        }
    }
}
function TestAttack(zombie, attack) {
    if (!(CanZAbility[ZombieArray.indexOf(zombie)])) {
        return;
    }
    willhit = false;
    hitarea = false;
    currentay = 0;
    currentax = 0;
    missedshots = 0;
    TZD = -1;
    ZD = -1;
    for (ia = 0; ia < gridx*gridy; ia++) {
        currentax += 1;
        hitarea = false;
        if ((zombie.coords[0]-1 >= currentax && currentax >= zombie.coords[0]-attack.range) && currentay === zombie.coords[1]) {
            TZD = 0;
            hitarea = true;
        }
        else if ((zombie.coords[0]+1 <= currentax && currentax <= zombie.coords[0]+attack.range) && currentay === zombie.coords[1]) {
            TZD = 1;
            hitarea = true;
        }
        else if ((zombie.coords[1]+1 <= currentay && currentay <= zombie.coords[1]+attack.range) && currentax === zombie.coords[0]) {
            TZD = 2;
            hitarea = true;
        }
        else if ((zombie.coords[1]-1 >= currentay && currentay >= zombie.coords[1]-attack.range) && currentax === zombie.coords[0]) {
            TZD = 3;
            hitarea = true;
        }
        if (hitarea) {
            if (griditemarray[ia].sprite == "GreenTile.PNG" && attack.TimeUntilReady == 0) {
                ZD = TZD;
                if (ZD == 0 || ZD == 2) {
                    if (fighterPhysArray[fighterArray.indexOf(zombie)].style.transform == "scaleX(-1)") {
                        fighterPhysArray[fighterArray.indexOf(zombie)].style.transform = "scaleX(1)";
                        zombie.wb += 0.5;
                    }
                }
                else if (ZD == 1 || ZD == 3) {
                    if (fighterPhysArray[fighterArray.indexOf(zombie)].style.transform == "scaleX(1)") {
                        fighterPhysArray[fighterArray.indexOf(zombie)].style.transform = "scaleX(-1)";
                        zombie.wb -= 0.5;
                    }
                }
                willhit = true;
                griditemarray[ia].sprite = "RedTile.PNG";
                phygriditems[ia].src = "RedTile.PNG";
                CreateConsoleText(zombie.name+" has used "+attack.name+".")
                for (shot = 0; shot < attack.shots; shot++) {
                    if (Math.random()*100 > attack.accuracy) {
                        missedshots += 1;
                        if (attack.shots == 1) {
                            CreateConsoleText(zombie.name+" has missed.");
                        }
                    }
                }
                if (attack.shots > 1) {
                    CreateConsoleText(zombie.name+" has missed "+missedshots+" out of their "+attack.shots+" shots.");
                }
                if (missedshots != attack.shots) {
                    planthealth.innerHTML = (parseInt(planthealth.innerHTML) - attack.damage*(attack.shots-missedshots)).toString();
                    CreateConsoleText(zombie.name+" has hit "+currentPlant.name+" for "+(attack.damage*(attack.shots-missedshots)).toString()+" damage.",true);
                    if (!(CheckForLoss())) {
                        if (Math.random()*100 < attack.stunChance) {
                            CreateConsoleText(zombie.name+" has stunned "+currentPlant.name+" for one turn.");
                            if (currentPlant.chewing) {
                                currentPlant.aliveSprite = "FrozenChewy.PNG";
                                fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "FrozenChewy.PNG";
                            }
                            else {
                                currentPlant.aliveSprite = "Frozen"+currentPlant.name.replace(/\s/g, '')+".PNG";
                                fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "Frozen"+currentPlant.name.replace(/\s/g, '')+".PNG";
                            }
                            currentPlant.stunned = true;
                        }
                    }
                    else {
                        if (!(CriticalTheme)) {
                            ZombieTurnTheme.stop();
                        }
                        else {
                            CriticalTheme.stop();
                        }
                        StopTurn = true;
                    }
                }
                attack.TimeUntilReady = attack.reloadTime+1;
                CanZAbility[ZombieArray.indexOf(zombie)] = false;

            }
            else {
                griditemarray[ia].sprite = "BlueTile.PNG";
                phygriditems[ia].src = "BlueTile.PNG";
            }
        }
        if (currentax%gridx == 0) {
            currentay += 1;
            currentax = 0;
        }
    }
    if (!(willhit)) {
        updategrid();
    }
    currentay = 0;
    currentax = 0;
    for (i = 0; i < gridx*gridy; i++) {
        currentax += 1;
        if ((zombie.coords[0]-1 >= currentax && currentax >= zombie.coords[0]-attack.range) && currentay === zombie.coords[1] && ZD != 0) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if ((zombie.coords[0]+1 <= currentax && currentax <= zombie.coords[0]+attack.range) && currentay === zombie.coords[1] && ZD != 1) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if ((zombie.coords[1]+1 <= currentay && currentay <= zombie.coords[1]+attack.range) && currentax === zombie.coords[0] && ZD != 2) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if ((zombie.coords[1]-1 >= currentay && currentay >= zombie.coords[1]-attack.range) && currentax === zombie.coords[0] && ZD != 3) {
            if (griditemarray[i].character == "") {
                griditemarray[i].sprite = "BlankTile.PNG";
                phygriditems[i].src = "BlankTile.PNG";
            }
            else if (griditemarray[i].character != currentPlant) {
                griditemarray[i].sprite = "PurpleTile.PNG";
                phygriditems[i].src = "PurpleTile.PNG";
            }
            else {
                griditemarray[i].sprite = "GreenTile.PNG";
                phygriditems[i].src = "GreenTile.PNG";
            }
        }
        if (currentax%gridx == 0) {
            currentay += 1;
            currentax = 0;
        }
    }
    return willhit;
}
function CheckZindexes() {
    fc = [];
    zindex = 666;
    tempvar = 0;
    issorted = false;
    for (f in fighterArray) {
        fighter = fighterArray[f];
        fc.push(fighter);
    }
    while (issorted == false) {
        issorted = true;
        for (c in fc) {
            if (!(c >= fc.length-1)) {
                if (fc[c].coords[1] > fc[(parseInt(c)+1)].coords[1]) {
                    tempvar = fc[c];
                    fc[c] = fc[(parseInt(c)+1)];
                    fc[(parseInt(c)+1)] = tempvar;
                    issorted = false;
                }
            }
        }
    }
    for (yc in fc) { 
      fyc = fc[yc];
      fighterPhysArray[fighterArray.indexOf(fyc)].style.zIndex = (parseInt(zindex) + parseInt(yc));
    }
}
function CalculateMoves(zombie) { 
    TestMoves = [[-1,0],[1,0],[0,1],[0,-1]];
    //If zombie can already hit chomper, do normal move
    //If zombie can move and then hit chomper, do that move
    //if zombie cannot hit chomper from any move, do normal move
    MA = false;
    MAM = [0,0];
    AA = false;
    SM = true;
    for (a in zombie.attacks) {
        if (CheckAttack(zombie,zombie.attacks[a])) {
            AA = true;
            if (a == 0) {
                SM = false;
            }
            break;
        }
    }
    for (a in zombie.attacks) {
        for (m in TestMoves) {
            invalidmove = false;
            move = TestMoves[m];
            zombie.coords[0] += move[0];
            zombie.coords[1] += move[1];
            for (zom in ZombieArray) {
                for (z in ZombieArray) {
                    if (zom == z) {
                        continue;
                    }
                    if (ZombieArray[z].coords[0] == ZombieArray[zom].coords[0] && ZombieArray[z].coords[1] == ZombieArray[zom].coords[1]) {
                        invalidmove = true;
                    }
                }
            }
            if (invalidmove) {
                zombie.coords[0] -= move[0];
                zombie.coords[1] -= move[1];
                continue;
            }
            if (CheckAttack(zombie,zombie.attacks[a])) {
                MA = true;
                MAM = move;
                zombie.coords[0] -= move[0];
                zombie.coords[1] -= move[1];
                break;
            }
            zombie.coords[0] -= move[0];
            zombie.coords[1] -= move[1];
        }
        if (MA) {
            break;
        }
    }
    if (SM && (AA ||(!AA && !MA))) {
        if (zombie.coords[1] != currentPlant.coords[1]) {
            if (Math.abs(currentPlant.coords[1]-zombie.coords[1]) > 1) {
                if (!(MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])]))) {
                    if (zombie.coords[0] > currentPlant.coords[0]) {
                        MoveZombie(zombie, [-1,0])
                    }
                    else if (zombie.coords[0] < currentPlant.coords[0]) {
                        MoveZombie(zombie, [1,0]) 
                    }
                } 
            }
            else {
                if (zombie.coords[0] > currentPlant.coords[0]) {
                    if (!(MoveZombie(zombie, [-1,0]))) {
                        MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])])
                    }
                }
                else if (zombie.coords[0] < currentPlant.coords[0]) {
                    if (!(MoveZombie(zombie, [1,0]))) {
                        MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])])
                    }
                }
                else {
                    if (!(MoveZombie(zombie,[0, RoundToOne(currentPlant.coords[1]-zombie.coords[1])]))) {
                        if (Math.random() > 0.5) { 
                            MoveZombie(zombie,[-1, 0])
                        }
                        else {
                            MoveZombie(zombie,[1, 0])
                        }
                    }
                }
            }
        }
        else {
            if (zombie.coords[0] > currentPlant.coords[0]) { 
                if (!(MoveZombie(zombie, [-1,0]))) { 
                    if (Math.random() > 0.5) { 
                        MoveZombie(zombie,[0, -1])
                    }
                    else {
                        MoveZombie(zombie,[0, 1])
                    }
                }
            }
            else {
                if (!(MoveZombie(zombie, [1,0]))) {
                    if (Math.random() > 0.5) { 
                        MoveZombie(zombie,[0, -1])
                    }
                    else {
                        MoveZombie(zombie,[0, 1])
                    }
                }
            }
        }
    }
    else if (MA && SM) {
        MoveZombie(zombie, MAM);
    }
    CheckZindexes();
}
function MoveZombie(zombie, direction) {
    if (zombie.movesLeft >= 1) {
        zombie.movesLeft -= 1;
        prevzposes[ZombieArray.indexOf(zombie)] = zombie.coords.slice(0);
        zombie.coords[0] += direction[0];
        zombie.coords[1] += direction[1];
        // if (currentPlant.coords[0] > 1) {
        // if (currentPlant.coords[1] > 0) {
        // if (currentPlant.coords[0] < gridx) {
        // if (currentPlant.coords[1] < gridy-1
        if (zombie.coords[0] <= 0 || zombie.coords[0] > gridx || zombie.coords[1] < 0 || zombie.coords[1] >= gridy) {
            zombie.coords[0] = prevzposes[ZombieArray.indexOf(zombie)][0]; 
            zombie.coords[1] = prevzposes[ZombieArray.indexOf(zombie)][1];
            zombie.movesLeft += 1;
            updategrid();
            return false;
        }
        if (CheckIfCollision("Zombie",zombie)) {
            zombie.movesLeft += 1;
            updategrid();
            return false;
        }
        if (direction[1] > 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) down.",true)
        }
        else if (direction[1] < 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) up.",true)
        }
        if (direction[0] > 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) right.",true)
        }
        else if (direction[0] < 0) {
            CreateConsoleText(zombie.name+" has moved 1 unit(s) left.",true)
        }
        if (zombie.movesLeft >= 1) {
            CalculateMoves(zombie);
        }
        updategrid();
        return true;
    }
}
function RoundToOne(num) {
    if (num > 0) {
        return 1;
    }
    else {
        return -1;
    }
}
function ZombieTurn(z) {
    zombie = ZombieArray[z];
    CanZAbility[z] = true;
    updategrid();
    setTimeout(function()  {
        CreateConsoleText(zombie.name+" is thinking..");
        if (zombie.stunned) {
            setTimeout(function() {
                CreateConsoleText(zombie.name+" did not do anything as they are gooped.")
                zombie.stunned = false;
                for (a in zombie.attacks) {
                    if (zombie.attacks[a].TimeUntilReady > 0) {
                        zombie.attacks[a].TimeUntilReady -= 1;
                    }
                }
                for (s in zombie.supports) {
                    if (zombie.supports[s].TimeUntilReady > 0) {
                        zombie.supports[s].TimeUntilReady -= 1;
                    }
                }
                fighterPhysArray[fighterArray.indexOf(zombie)].src = (fighterPhysArray[fighterArray.indexOf(zombie)].src).split("/")[(fighterPhysArray[fighterArray.indexOf(zombie)].src).split("/").length-1].substring(4);

                setTimeout(function() {
                    CreateConsoleText(zombie.name+" has ended their turn.")
                    if (z == ZombieArray.length-1) {
                        if (currentPlant.stunned == true) {
                            setTimeout(function() {
                                CreateConsoleText(currentPlant.name+" did not do anything as they are frozen.")
                                for (attack in currentPlant.attacks) {
                                    attack = currentPlant.attacks[attack];
                                    if (attack.TimeUntilReady > 0) {
                                        attack.TimeUntilReady -= 1;
                                    }
                                }
                                currentPlant.stunned = false;
                                ZombieTurn(0);
                                if (currentPlant.chewing) {
                                    currentPlant.aliveSprite = "chewy.gif";
                                    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";   
                                }
                                else {
                                    currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
                                    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
                                }
                            }, 1500);
                        }
                        else if (currentPlant.chewing == true) {
                            setTimeout(function() {
                                currentPlant.chewingtime -= 1;
                                if (currentPlant.chewingtime == 0) {
                                    currentPlant.chewing = false;
                                    if (currentPlant.allergy == false) {
                                    currentPlant.aliveSprite = "ArmorChomper.PNG";
                                    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                    CreateConsoleText("Armor Chomper has finished chewing.");
                                    if (!(CriticalStage) && !(IsBossWave)) {
                                        PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                        MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                    }
                                    setTimeout(function() {
                                        IsPlayerTurn = true;
                                        ConsoleHistory.push("~ Plant's Turn ~");
                                        CanMove = true;
                                        CanAbility = [true, true];
                                        abilitybuttons.style.display = "block";
                                        UpdateTurnCount();
                                        SaveGame();
                                    }, 500)
                                    currentPlant.aliveSprite = "ArmorChomper.PNG";
                                    fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                    }
                                    else {
                                        DeathByAllergy(currentPlant.allergy);
                                    }
                                }
                                else {
                                    if (!(CriticalStage) && !(IsBossWave)) {
                                        PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                        MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                    }
                                    setTimeout(function() {
                                        IsPlayerTurn = true;
                                        ConsoleHistory.push("~ Plant's Turn ~");
                                        CanMove = true;
                                        abilitybuttons.style.display = "block";
                                        UpdateTurnCount();
                                        SaveGame();
                                    }, 500)
                                    CreateConsoleText("Armor Chomper cannot attack as they are chewing.");
                                }
                            }, turntime);
                        }
                        else {
                            if (!(CriticalStage) && !(IsBossWave)) {
                                PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                MusicFade(ZombieTurnTheme,PlantTurnTheme);
                            }
                            setTimeout(function() {
                                IsPlayerTurn = true;
                                ConsoleHistory.push("~ Plant's Turn ~");
                                CanMove = true;
                                CanAbility = [true, true];
                                abilitybuttons.style.display = "block";
                                UpdateTurnCount();
                                SaveGame();
                            }, 500)
                        }
                        updategrid();
                    }
                    else {
                        ZombieTurn(z+1);
                    }
                }, turntime);
            }, turntime);
        }
        else {
            if (zombie.movesLeft < 1) {
                zombie.movesLeft += zombie.movement;
            }
            else {
                zombie.movesLeft = zombie.movement;
            }
            setTimeout(function() {
                for (a in zombie.attacks) {
                    if (zombie.attacks[a].TimeUntilReady > 0) {
                        zombie.attacks[a].TimeUntilReady -= 1;
                    }
                }
                for (s in zombie.supports) {
                    if (zombie.supports[s].TimeUntilReady > 0) {
                        zombie.supports[s].TimeUntilReady -= 1;
                    }
                }
                CalculateMoves(zombie);
                setTimeout(function() {
                    for (s in zombie.supports) {
                        TestSupport(zombie,zombie.supports[s]); 
                    }
                    for (a in zombie.attacks) {
                        TestAttack(zombie,zombie.attacks[a]); 
                        if (StopTurn) {
                            break;
                        }
                    }
                }, turntime);
                setTimeout(function() {
                    if (!(StopTurn)) {
                        setTimeout(function() {
                            CreateConsoleText(zombie.name+" has ended their turn.")
                            if (z == ZombieArray.length-1) {
                                if (currentPlant.stunned == true) {
                                    setTimeout(function() {
                                        CreateConsoleText(currentPlant.name+" did not do anything as they are frozen.")
                                        for (attack in currentPlant.attacks) {
                                            attack = currentPlant.attacks[attack];
                                            if (attack.TimeUntilReady > 0) {
                                                attack.TimeUntilReady -= 1;
                                            }
                                        }
                                        currentPlant.stunned = false;
                                        ZombieTurn(0);
                                        if (currentPlant.chewing) {
                                            currentPlant.aliveSprite = "chewy.gif";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "chewy.gif";   
                                        }
                                        else {
                                            currentPlant.aliveSprite = currentPlant.name.replace(/\s/g, '')+".PNG";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = currentPlant.name.replace(/\s/g, '')+".PNG";
                                        }
                                    }, 1500);
                                }
                                else if (currentPlant.chewing == true) {
                                    setTimeout(function() {
                                        currentPlant.chewingtime -= 1;
                                        if (currentPlant.chewingtime == 0) {
                                            currentPlant.chewing = false;
                                            if (currentPlant.allergy == false) {
                                            currentPlant.aliveSprite = "ArmorChomper.PNG";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                            CreateConsoleText("Armor Chomper has finished chewing.");
                                            if (!(CriticalStage) && !(IsBossWave)) {
                                                PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                                MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                            }
                                            setTimeout(function() {
                                                IsPlayerTurn = true;
                                                ConsoleHistory.push("~ Plant's Turn ~");
                                                CanMove = true;
                                                CanAbility = [true, true];
                                                abilitybuttons.style.display = "block";
                                                UpdateTurnCount();
                                                SaveGame();
                                            }, 500)
                                            currentPlant.aliveSprite = "ArmorChomper.PNG";
                                            fighterPhysArray[fighterArray.indexOf(currentPlant)].src = "ArmorChomper.PNG";
                                            }
                                            else {
                                                DeathByAllergy(currentPlant.allergy);
                                            }
                                        }
                                        else {
                                            if (!(CriticalStage) && !(IsBossWave)) {
                                                PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                                MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                            }
                                            setTimeout(function() {
                                                IsPlayerTurn = true;
                                                ConsoleHistory.push("~ Plant's Turn ~");
                                                CanMove = true;
                                                abilitybuttons.style.display = "block";
                                                UpdateTurnCount();
                                                SaveGame();
                                            }, 500)
                                            CreateConsoleText("Armor Chomper cannot attack as they are chewing.");
                                        }
                                    }, turntime);
                                }
                                else {
                                    if (!(CriticalStage) && !(IsBossWave)) {
                                        PlantTurnTheme.sound.currentTime = ZombieTurnTheme.sound.currentTime;
                                        MusicFade(ZombieTurnTheme,PlantTurnTheme);
                                    }
                                    setTimeout(function() {
                                        IsPlayerTurn = true;
                                        ConsoleHistory.push("~ Plant's Turn ~");
                                        CanMove = true;
                                        CanAbility = [true, true];
                                        abilitybuttons.style.display = "block";
                                        UpdateTurnCount();
                                        SaveGame();
                                    }, 500)
                                }
                                updategrid();
                            }
                            else {
                                ZombieTurn(z+1);
                            }
                        }, turntime);
                    }
                }, turntime);
            }, turntime);
        }
    }, turntime);
}
function SortZArray() {
    sa = [];
    tempvar = 0;
    issorted = false;
    for (z in ZombieArray) {
        zombie = ZombieArray[z];
        sa.push(zombie);
    }
    while (issorted == false) {
        issorted = true;
        for (z in sa) {
            if (!(z >= sa.length-1)) {
                if (sa[z].coords[0] > sa[(parseInt(z)+1)].coords[0]) {
                    tempvar = sa[z];
                    sa[z] = sa[(parseInt(z)+1)];
                    sa[(parseInt(z)+1)] = tempvar;
                    issorted = false;
                }
            }
        }
    }
    return sa;
}

function tryToMove() {
    if (CanMove && IsPlayerTurn) {
        prevppos = currentPlant.coords.slice(0);
        newspot = [griditemarray[phygriditems.indexOf(event.target)].codx,griditemarray[phygriditems.indexOf(event.target)].cody];
        gs = false;
        currentPlant.coords[0] = newspot[0];
        currentPlant.coords[1] = newspot[1];
        CanMove = false;
        if (CheckIfCollision("plant","")) {
            return;
        }
        currentPlant.coords = prevppos.slice(0);
        if (newspot[0] == currentPlant.coords[0]) {
            if (newspot[1]-1 == currentPlant.coords[1]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit down.");
                gs = true;
            }
            if (newspot[1]+1 == currentPlant.coords[1]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit up.");
                gs = true;
            }
        }
        else if (newspot[1] == currentPlant.coords[1]) {
            if (newspot[0]-1 == currentPlant.coords[0]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the right.");
                gs = true;
            }
            if (newspot[0]+1 == currentPlant.coords[0]) {
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the left.");
                gs = true;
            }
        }
        if (!(gs)) {
            CreateConsoleText("You cannot move there.",false,false);
            CanMove = true;
        }
        else {
            currentPlant.coords[0] = newspot[0];
            currentPlant.coords[1] = newspot[1];
            updategrid();
            UpdateTurnCount();
            CheckZindexes();
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (CanMove && IsPlayerTurn) {
        prevppos = currentPlant.coords.slice(0);
        if(event.keyCode == 37) {
            if (currentPlant.coords[0] > 1) {
                currentPlant.coords[0] = currentPlant.coords[0]-1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the left.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            }        
        }
        else if(event.keyCode == 38) {
            if (currentPlant.coords[1] > 0) {
                currentPlant.coords[1] = currentPlant.coords[1]-1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit up.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            } 
        }
        else if(event.keyCode == 39) {
            if (currentPlant.coords[0] < gridx) {
                currentPlant.coords[0] = currentPlant.coords[0]+1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit to the right.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            } 
        }
        else if(event.keyCode == 40) {
            if (currentPlant.coords[1] < gridy-1) {
                currentPlant.coords[1] = currentPlant.coords[1]+1;
                if (CheckIfCollision("plant","")) {
                    return;
                }
                CreateConsoleText(currentPlant.name+" has moved 1 unit down.");
            }
            else {
                CreateConsoleText("You cannot go outside of the grid.",false,false);
                return;
            } 
        }
        if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
            CanMove = false;
            UpdateTurnCount();
            CheckZindexes();
            updategrid();
        }
    }
});
