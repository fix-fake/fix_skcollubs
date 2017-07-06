fix_skcollubs = function(obj, words) {
    for (var p in obj) {
        if (obj[p].innerHTML) {
            fix_skscollubs_words(obj[p], words)
        }
    }
}

fix_skscollubs_words = function(obj, words) {
    words.forEach(function(word) {
        this.innerHTML = this.innerHTML.replace(new RegExp(word, 'ig'), 'CNN')
    }, obj)
}
words = [
    'FraudNewsCNN',
    'CrapNewsNetwork',
]
fix_skcollubs(document.getElementsByClassName('contents'), words)
fix_skcollubs(document.getElementsByClassName('quote'), words)
