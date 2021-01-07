document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    removeInvalidForm()
    if (document.getElementById('idCliente').value == "")
        salvarCliente()
    else
        editarCliente()
})

function salvarCliente() {
    const data = {
        nome: document.getElementById('nome').value,
        cpfcnpj: document.getElementById('cpfcnpj').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
    }

    api.post('/Cliente', data)
        .then((response) => {
            document.getElementById('idCliente').value = response.data.id
            swal("Cliente salvo com sucesso.", "", "success");
        }).catch((error) => {
            invalidFormClient(error.response.data.validacoes)
        })
}

function editarCliente() {
    const data = {
        nome: document.getElementById('nome').value,
        cpfcnpj: document.getElementById('cpfcnpj').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
    }
    const id = document.getElementById('idCliente').value
    api.put('/Cliente/' + id, data)
        .then((response) => {
            swal("Cliente editado com sucesso.", "", "success");
        }).catch((error) => {
            console.log(error)
        })
}

function invalidFormClient(data = []) {
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
        const input = elements[0].parentElement.getElementsByTagName('input')[0]
        elements[0].style.display = 'none'
        input.classList.remove('is-invalid')
        elements[0].classList.remove('invalid-feedback')
    }
}