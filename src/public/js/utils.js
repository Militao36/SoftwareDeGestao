function dateTransformHttp(data = "") {
    if (data === '')
        return null
    const [day, month, year] = data.split('/')

    return `${year}-${month}-${day}`
}

function dateTransformDateValid(data = "") {
    if (data === null)
        return ''

    const [year, month, day] = data.split('-')

    return `${day.substr(0, 2)}/${month}/${year}`
}

function valueModify(valor) {
    if (valor == 0)
        valor = ''

    return valor
}


function invalidForm(data = []) {
    data.forEach(v => {
        const key = Object.keys(v)
        const value = Object.values(v)
        document.getElementById(key[0]).classList.add('is-invalid')
        const item = document.getElementById(`I${key[0]}`)
        item.style.display = 'block'
        item.classList.add("invalid-feedback");
        item.innerHTML = value.join('%')
    })
}

function removeInvalidForm() {
    const elements = document.getElementsByClassName('invalid-feedback')
    if (elements.length == 0)
        return

    for (let index = 0; index <= elements.length; index++) {
        let input = null
        input = elements[0].parentElement.getElementsByTagName('input')[0]
        if (!input)
            input = elements[0].parentElement.getElementsByTagName('select')[0]
        elements[0].style.display = 'none'
        input.classList.remove('is-invalid')
        elements[0].classList.remove('invalid-feedback')
    }
}