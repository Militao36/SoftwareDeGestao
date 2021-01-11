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