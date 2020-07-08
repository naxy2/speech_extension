var ultimaLettura = new Date();
var speech;
var loop;
var val = false;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    switch (msg.text){
        case "premuto":
            if (!val){
                loop = setInterval(controlla, 2500);
                console.log("inizio");

                speech = new p5.Speech();
                speech.onLoad = imposta;
                speech.onLoad();
            }else{
                speech.stop();
                speech = undefined;
                clearInterval(loop);
                console.log("fine");
            }
            val = !val;
            break;
        
        case "ragguaglio":
            sendResponse(val);
            break;

        case "pitch":
            speech.setPitch(msg.value);
            break;
    }
});


function leggi(messaggi){
    for (let messaggio of messaggi){
        if (new Date(messaggio.time) > ultimaLettura){
            let msg = messaggio.nick + " dice: " + messaggio.text;
            speech.speak(msg);
            console.log(msg);
        }
    }
    ultimaLettura = new Date();
}


function controlla(){
    fetch('https://messaggiapi.herokuapp.com/messaggi')
        .then(response => response.json())
        .then(data => leggi(data.messages));
}

function imposta(){
    speech.setVoice("Google italiano");
    speech.setPitch(2);
}