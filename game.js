var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value; // defineerime vajakikud muutujad

var Game = {

    preload : function() {
        game.load.image('snake', 'madu.png'); // laeme ussi pildi 'madu.png'
        game.load.image('apple', 'oun.png'); // laeme õuna pildi 'oun.png'
    },

    create : function() {


        snake = [];                     // massiiv, mis säilitab ussi osi
        apple = {};                     // õuna objekt
        squareSize = 15;                // ruudu külgede suurus
        score = 0;                      // mängu skoor
        speed = 0;                      // mängu kiirus
        updateDelay = 0;                // muutuja, mis defineerib muutuste kiirstus
        direction = 'right';            // ussi 'suund'
        new_direction = null;           // puhver, et säilitad uue suuna infot
        addNew = false;                 // muutuja, mida kasutatakse, kui õun ära süüakse

        cursors = game.input.keyboard.createCursorKeys(); // aktiveerimine klaviatuuriklahvide kasutamise

        game.stage.backgroundColor = '#008000'; // mängu taustavärv

        for(var i = 0; i < 10; i++){ // esialgse ussi elementide loomine (esialgne uss on 10 elementi pikk
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  // lisatakse 15*15 pikslit element (X-koordinaat, Y-koordinaat, pilt)
        }
		
        this.generateApple(); // tekitatakse esimene õun (pöördutakse funktsiooni 'generateApple' poole

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#2aff2a", align: "center" }; // märksõna teksti seaded
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#ffff00", align: "center" }; // väärtuse teksti seaded

        game.add.text(30, 20, "Tulemus: ", textStyle_Key); // tulemuse teksti kuvamine
        scoreTextValue = game.add.text(95, 18, score.toString(), textStyle_Value);
        game.add.text(515, 20, "Kiirus: ", textStyle_Key); // kiiruse teksti kuvamine
        speedTextValue = game.add.text(563, 18, speed.toString(), textStyle_Value);

    },

    update: function() {

        // suuna muutmine selliselt, et mäng ei lõpeks koheselt

        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }


        speed = Math.min(10, Math.floor(score/5)); // arvutame kiiruse sõltuvalt skoorist, maksimaalne kiirus on 10
        speedTextValue.text = '' + speed; // uuendatakse kiiruse väärtust ekraanil

        // Kuna Phaseri 'update' funktsiooni uuendatakse väga sageli - 60 kaadrit sekundis,
        // siis on vaja seda aeglasemaks muuta, et mäng oleks mängitav
        
        // suurendame hilistumise loendurit
        updateDelay++; //

        // mänguga seotud tegesi teostatakse ainult siis, kui updateDelay jagub (10 - the game speed) väärtusega ilma jäägita.
        // mida suurem on kiirus, seda tihedamini neid tegevusi teostatakse,
        // muutes ussi kiiremaks
        if (updateDelay % (10 - speed) == 0) { // kui 'updateDelay' jagamisel '10-speed'iga on jääk 0
 

            // ussi liikumise osa algus

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            // kui klaviatuurilt valitakse uus suund, muudetakse see uueks ussi liikumise suunaks
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            // muudetakse ussi viimase osa asukohta sõltuvalt ussi liikumise suunast

            if(direction == 'right'){

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }


            // viimane ussiosa paigutatakse kõige esimeseks,
            // muutes selle esimeseks

            snake.push(lastCell);
            firstCell = lastCell;

            // ussi liikumise osa lõpp



            // suurendatakse ussi pikkust, kui õun on ära söödud
            // tekitatakse ussi lõppu üks ussiosa juurde, senise viimase osa asukohaga
            if(addNew){
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            // kontrollitakse, kas toimus kokkupuude õunaga
            this.appleCollision();

            // kontrollitakse, kas toimus kokkupuude iseendaga, parameetriks on ussi pea
            this.selfCollision(firstCell);

            // kontrollitakse, kas toimus kokkupuude mängu seinaga, parameetriks on ussi pea
            this.wallCollision(firstCell);
        }


    },

    generateApple: function(){

        // valitakse juhuslik koht mängualal
        // X on vahemikus 0 ja 585 (39*15)
        // Y on vahemikus 0 ja 435 (29*15)

        var randomX = Math.floor(Math.random() * 40 ) * squareSize, // kasutatakse juhuslikkuse funktsiooni Math.random (mis tekitab numbri 0 ja 1 vahel) ja seejärel ümardamisfunktsiooni Math.Floot, mis annab täisarvu
            randomY = Math.floor(Math.random() * 30 ) * squareSize; // kasutatakse juhuslikkuse funktsiooni Math.random (mis tekitab numbri 0 ja 1 vahel) ja seejärel ümardamisfunktsiooni Math.Floot, mis annab täisarvu

        // lisatakse õun eelnevalt leitud asukohta
        apple = game.add.sprite(randomX, randomY, 'apple'); 
    },

    appleCollision: function() {

        // kontrollitakse, kas ussi osa kattub õuna asukohaga
        // seda on vaja siis, kui õun neelatakse ussi sisse
        for(var i = 0; i < snake.length; i++){ // kontrollitakse terve ussi ulatuses
            if(snake[i].x == apple.x && snake[i].y == apple.y){ // kui ussi konkreetse osa x- ja y-koordinaadid vastavad õuna x- ja y-koordinaatidele
 
                // järgmine kord, kui uss liigub, lisatakse talle uus osa
                addNew = true;

                // eemaldatakse olemasolev õun
                apple.destroy();

                // tehakse uus õun
                this.generateApple();

                // suurendatakse tulemust
                score++;

                // uuendatakse tulemuse väärtust mängualal
                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function(head) {

        // kontrollitakse, kas ussi pea kattub ussi endaga
        for(var i = 0; i < snake.length - 1; i++){ //kontrollitakse ussi ulatust, välja arvatud pea 
            if(head.x == snake[i].x && head.y == snake[i].y){ // kui pea x- ja y-koordinaadid vastavad ussi konkreetse osa x- ja y-koordinaatidele

                // aktiveeritakse mängufaas 'Game_Over'
                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) {

        // kontrollitakse, kas ussi pea puutub kokku mänguala servadega

        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){ // pea x-koordinaat on suurem võrdne 600ga VÕI väiksem 0ist VÕI y-koordinaat on suurem võrdne 450ga VÕI väiksem 0ist 


            // aktiveeritakse mängufaas 'Game_Over'
            game.state.start('Game_Over');
        }

    }

};