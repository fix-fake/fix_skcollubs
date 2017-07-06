function add_option() {
    misspellings = options_list()
    misspelling = document.getElementById('inputfield').value
    minLength = 2

    if (misspelling.length < minLength) {
        set_status('Woord is te kort, voer minimaal ' + minLength + ' karakters in', 'error')
    } else if(misspellings.find(function(existing){
        return this.valueOf().toUpperCase() === existing.toUpperCase()
    }, misspelling)) {
        set_status('Het woord dat je wil toevoegen bestaat al in de lijst')
    } else {
        display_option(misspelling)
        save_options()
    }
}

function remove_option(misspelling) {
    hide_option(misspelling)
    save_options()

}
function options_list() {
    divs = Array.from(document.getElementsByClassName('misspelling'))
    return divs.map(function(div) {
        return div.firstChild.innerText
    }).filter(function(div, idx, divArr) { return idx === divArr.indexOf(div)})
}

function set_status(text, className) {
    var status = document.getElementById('status');
    status.innerText = text;
    status.className = className
    setTimeout(function() {
        status.innerHTML = '<br/>';
    }, 750);

}

function save_options() {
    chrome.storage.sync.set({
        misspellings: options_list(),
    }, function() {
        set_status('Woordenlijst is opgeslagen', 'info')
    });
}

function display_option(misspelling) {
    div = document.createElement('div')
    div.className = 'misspelling'
    div.id="option_" + misspelling

    text = document.createElement('span')
    text.className="word"
    text.id="misspelling_" + misspelling
    text.append(document.createTextNode(misspelling))

    trash = document.createElement('span')
    trash.misspelling=misspelling
    trash.append(document.createTextNode(' [x]'))
    trash.addEventListener('click', function(event) {
        remove_option(event.srcElement.misspelling)
    })

    div.append(text)
    div.append(trash)
    document.getElementById('misspellings').appendChild(div)
}

function hide_option(misspelling) {
    document.getElementById('misspellings').removeChild(document.getElementById("option_" + misspelling))
}

function restore_options() {
    chrome.storage.sync.get({
        misspellings: [
            'FraudNewsCNN',
            'CrapNewsNetwork',
            'CNNFraudMedia',
            'CNNisFakeNews',
        ]
    }, function(config) {
        config['misspellings'].forEach(function(misspelling) {
            display_option(misspelling)
        })
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', add_option);
document.getElementById('inputfield').addEventListener('keypress', function(event, data) {
    if ("Enter" == event.key) { add_option() }
})
