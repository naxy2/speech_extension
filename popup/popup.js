function click(){
    chrome.runtime.sendMessage({
        value: document.getElementById("input").checked
    });
}

window.onload = function(){
    document.getElementById("input").addEventListener('click', click);
}