$('#telefone').mask('(00) 00000-0000');
const options = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['000.000.000-000', '00.000.000/0000-00'];
        $('#cpfCnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
    }
}

$('#cpfCnpj').length > 11 ? $('#cpfCnpj').mask('00.000.000/0000-00', options) : $('#cpfCnpj').mask('000.000.000-00#', options);


document.getElementById('btnSalvar').addEventListener('click', (e) => {
    e.preventDefault()

    removeInvalidForm()
    if (document.getElementById('uuid').value == "")
        salvarCliente()
    else
        editarCliente()
})

function salvarCliente() {
    const data = {
        nome: document.getElementById('nome').value,
        cpfCnpj: document.getElementById('cpfCnpj').value,
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
            document.getElementById('uuid').value = response.data.id
            swal("Cliente salvo com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function editarCliente() {
    const data = {
        nome: document.getElementById('nome').value,
        cpfCnpj: document.getElementById('cpfCnpj').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
    }
    const id = document.getElementById('uuid').value
    api.put('/Cliente/' + id, data)
        .then((response) => {
            swal("Cliente editado com sucesso.", "", "success");
        }).catch((error) => {
            if (error.response.data.validacoes)
                return invalidForm(error.response.data.validacoes)

            swal("Ocorreu um erro, entre em contato com a empresa", "", "warning");
        })
}

function deletarCliente(uuid) {
    swal({
        title: "Tem certeza que quer deletar este registro?",
        text: "O registro será deletado definitivamente!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((isConfirm) => {
        if (isConfirm) {
            api.delete('/Cliente/' + uuid)
            limparForm()
            $("#TableCliente tbody").empty()
        }
    })
}

function limparForm() {
    document.getElementById('frmCliente1').reset()
    document.getElementById('frmCliente2').reset()
}

function selectGridCliente(id = null) {
    api.get('/Cliente/' + id)
        .then((response) => {
            const { cliente } = response.data
            for (const key in cliente) {
                const value = cliente[key]
                document.getElementById(key).value = value
            }
        })
}

function Grid(coluna, text) {
    if (!text)
        text = ''

    axios.get(`/Cliente/Search/${coluna}/${text}`)
        .then(async (response) => {
            const { data } = response.data;
            $("#TableCliente tbody").empty()
            for (const item of data) {
                $("#TableCliente tbody").append(`
                    <tr onclick="selectGridCliente('${item.uuid}')"> 
                        <td>${item.nome}</td> 
                        <td>${item.cpfCnpj || ''}</td>
                        <td>${item.cidade || ''}</td>
                    </tr>
                `);
            }
        })
}

document.getElementById('txtPesquisa').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let texto = document.getElementById('txtPesquisa').value || 'null';
        let coluna = document.getElementById('selectColuna').value;
        Grid(coluna, encodeURIComponent(texto));
    }

    $("#TableCliente tbody").empty()
});

document.getElementById('btnNovo').addEventListener('click', (e) => {
    e.preventDefault()
    limparForm()
})

document.getElementById('btnDeletar').addEventListener('click', (e) => {
    e.preventDefault()
    const uuid = document.getElementById('uuid').value
    deletarCliente(uuid)
})