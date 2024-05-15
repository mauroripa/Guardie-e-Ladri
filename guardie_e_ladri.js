
//dichiaro per ogni button un evento
document.getElementById("nord").addEventListener("click", nord);
document.getElementById("est").addEventListener("click", est);
document.getElementById("sud").addEventListener("click", sud);
document.getElementById("ovest").addEventListener("click", ovest);

let mossa = 20;
//variabile per decrementare di 2 tentativi quando si vince
let mossaAfter = mossa;
document.addEventListener("keydown", logkey);
//qui creiamo la funzione per utilizzare anche le frecce direzionali
function logkey(e) {
    console.log(guardia.style.left);
    console.log(guardia.style.top);
    let tasto = e.keyCode;
    
    if (mossa >= 0) {
        if (tasto == 39 && parseInt(guardia.style.left) <= 400) {
            est();
            conteggio();
        }else if (tasto == 37 && parseInt(guardia.style.left) > 0) {
            ovest();
            conteggio();
        }
        else if (tasto == 40 && parseInt(guardia.style.top) < 450) {
            sud();
            conteggio();
        }
        else if (tasto == 38 && parseInt(guardia.style.top) > 0) {
            nord();
            conteggio();
        }
    }
}
//definisco la variabile globale "mossa" per fare il decremento ad ogni tentativo

//per prendere i risultati dei button creo una variabile globale con all'interno gli elementi del tagName,
//in questo caso uso "Elements" invece di "Element"
let tasti = document.getElementsByTagName("button");

//qui mando in rassegna i risultati dei pulsanti in una variabile chiamata element, 
//questi element hanno una funzione legata a loro, "conteggio".
for (let i = 0; i < tasti.length; i++) {
    const element = tasti[i];
    element.addEventListener("click", conteggio);
}

//la funzione conteggio decrementa mossa, stampa i tentativi restanti
//inoltre vede se le posizioni di guardia e ladro sono uguali e in quel caso stampa "Hai vinto", e disabilita i pulsanti
//nell'altro caso se i tentativi sono finiti e non è riuscito ad avere la stessa posizione del ladro, stampa "Hai perso"
function conteggio() {
    mossa--;
    document.getElementById("esito").innerHTML = "<h1>hai ancora " + mossa + " tentativi</h1>"
    if (guardia.style.top == ladro.style.top && guardia.style.left == ladro.style.left) {

        document.getElementById("esito").innerHTML = "<h1>Hai vinto!</h1>";
        //resetto le posizioni del guardio e del ladro
        guardia.style.top = 200 + "px";
        guardia.style.left = 50 + "px";
        ladro.style.top = 250 + "px";
        ladro.style.left = 400 + "px";
        mossaAfter -= 2;
        mossa = mossaAfter;
        if (mossaAfter <= 3) {
            for (let i = 0; i < tasti.length; i++) {
                tasti[i].disabled = true;
            }

        }
    }
    if (mossa <= 0 && (guardia.style.top !== ladro.style.top || guardia.style.left !== ladro.style.left)) {
        document.getElementById("esito").innerHTML = "<h1>Hai perso</h1>";

    }
}
//questa funzione muove il ladro, assegnando una variabile "NumCasuale" ci ricaviamo un numero random tra 1 e 4,
//che sono i numeri delle posizioni.
function muoviLadro() {
    let NumCasuale = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    console.log(NumCasuale);
    //qui una serie di condizioni per far sì che quando si verifichino i case all'estremità dei lati
    //il ladro non vada ulteriormente fuori dal box dello scatolo, siccome ogni case è corrispondente
    //ad una direzione di 50 px random.
    if (parseInt(ladro.style.top) == 0 && NumCasuale == 1) {
        NumCasuale = 2;
    }
    if (parseInt(ladro.style.top) == 450 && NumCasuale == 2) {
        NumCasuale = 1;
    }
    if (parseInt(ladro.style.left) == 450 && NumCasuale == 3) {
        console.log(NumCasuale, ladro.style.left);
        NumCasuale = 4;
    }
    if (parseInt(ladro.style.left) == 0 && NumCasuale == 4) {
        NumCasuale = 3;
    }

    //qui i case per muovere il ladro
    switch (NumCasuale) {
        case 1:

            ladro.style.top = parseInt(ladro.style.top) - 50 + "px";

            break;
        case 2:
            ladro.style.top = parseInt(ladro.style.top) + 50 + "px";


            break;
        case 3:
            ladro.style.left = parseInt(ladro.style.left) + 50 + "px";
            break;
        case 4:
            ladro.style.left = parseInt(ladro.style.left) - 50 + "px";

            break;
        default:
            break;
    }
}
//Funzioni per muovere la guardia, ogni volta che la guardia si muove anche il ladro di 50 px.
//ogni funzione disabilita il tasto che potrebbe portare la guardia fuori dal container, quando si trova all'estremità
function nord() {

    guardia.style.top = parseInt(guardia.style.top) - 50 + "px";

    if (mossa <= 1) {
        for (let i = 0; i < tasti.length; i++) {
            tasti[i].disabled = true;
        }
    } else {
        if (parseInt(guardia.style.top) <= 0) {
            document.getElementById("nord").disabled = true;
        }
        if (parseInt(guardia.style.top) < 450) {
            document.getElementById("sud").disabled = false;
        }
    }
    muoviLadro();

}
function sud() {
    guardia.style.top = parseInt(guardia.style.top) + 50 + "px";

    if (mossa <= 1) {
        for (let i = 0; i < tasti.length; i++) {
            tasti[i].disabled = true;

        }
    } else {
        if (parseInt(guardia.style.top) == 450) {
            document.getElementById("sud").disabled = true;
        }
        if (parseInt(guardia.style.top) > 0) {
            document.getElementById("nord").disabled = false;
        }

    }
    muoviLadro();
}

function est() {
    guardia.style.left = parseInt(guardia.style.left) + 50 + "px";
    if (mossa <= 1) {
        for (let i = 0; i < tasti.length; i++) {
            tasti[i].disabled = true;

        }
    } else {
        if (parseInt(guardia.style.left) == 450) {
            document.getElementById("est").disabled = true;
        }
        if (parseInt(guardia.style.left) > 0) {
            document.getElementById("ovest").disabled = false;
        }
    }
    muoviLadro();
}
function ovest() {
    guardia.style.left = parseInt(guardia.style.left) - 50 + "px";
    if (mossa <= 1) {
        for (let i = 0; i < tasti.length; i++) {
            tasti[i].disabled = true;

        }
    } else {
        if (parseInt(guardia.style.left) == 0) {
            document.getElementById("ovest").disabled = true;
        }
        if (parseInt(guardia.style.left) <= 450) {
            document.getElementById("est").disabled = false;
        }
    }
    muoviLadro();
}
