document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        uuid: document.getElementById('uuid').value,
        quantidade: document.getElementById('quantidade').value,
    }

    const tipo = document.getElementById('tipo').value

    if (tipo == 'entrada')
        return entrada(data)
    else if (tipo == 'saida')
        return saida(data)
})

document.getElementById('btnNovo').addEventListener('click', (e) => {
    document.getElementById('frmEstoque').reset()
})

function entrada(data) {
    api.post('/Estoque/entrada', data)
        .then((response) => {
            swal("Entrada de produto efetuada com sucesso", "", "success");
        }).catch((error) => {
            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function saida(data) {
    api.post('/Estoque/saida', data)
        .then((response) => {
            swal("Saída de produto efetuada com sucesso", "", "success");
        }).catch((error) => {
            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}