var attivato = false;

function click(){
    chrome.runtime.sendMessage({
        text: "premuto"
    });
    attivato = !attivato
    if (attivato){
        document.getElementById("input").value = "DISATTIVA";
    }else{
        document.getElementById("input").value = "ATTIVA"
    }
}

function inviaPitch(){
    chrome.runtime.sendMessage({
        text: "pitch",
        value: parseFloat(document.getElementById("pitch").value)
    });
}

window.onload = function(){
    chrome.runtime.sendMessage({
        text: "ragguaglio"
    }, res=>{
        if (res){
            document.getElementById("input").value = "DISATTIVA"
            attivato = true;
        }
    });
    document.getElementById("input").addEventListener('click', click);

    document.getElementById("pitchButton").addEventListener('click', inviaPitch);
}