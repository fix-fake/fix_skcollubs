fix_skcollubs = function(obj) {
    for (var p in obj) {
        if (obj[p].innerHTML) {
            obj[p].innerHTML = obj[p].innerHTML.replace(/FraudNewsCNN/ig, 'CNN')
            console.log(obj[p].innerHTML)
        }
    }
}

fix_skcollubs(document.getElementsByClassName('contents'))
fix_skcollubs(document.getElementsByClassName('quote'))