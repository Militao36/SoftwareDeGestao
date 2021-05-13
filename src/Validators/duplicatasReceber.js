export default (duplicata) => {
  const erros = [];

  if (!duplicata.idCliente) {
    erros.push({
      idCliente: 'O campo cliente não pode ficar em branco.'
    })
  }

  if (!duplicata.idTipoPagamento) {
    erros.push({
      idTipoPagamento: 'O campo tipo pagamento não pode ficar em branco.'
    })
  }

  if (!duplicata.idFuncionario) {
    erros.push({
      idFuncionario: 'O campo funcionario não pode ficar em branco.'
    })
  }

  if (!duplicata.dataEmissao) {
    erros.push({
      idFuncionario: 'O campo data emissão não pode ficar em branco.'
    })
  }

  if (!duplicata.dataVencimento) {
    erros.push({
      idFuncionario: 'O campo data vencimento não pode ficar em branco.'
    })
  }

  if (!duplicata.dataVencimento) {
    erros.push({
      idFuncionario: 'O campo data vencimento não pode ficar em branco.'
    })
  }

  if (!duplicata.valorTotal || duplicata.valorTotal < 0) {
    erros.push({
      valorTotal: 'O campo valor total não pode ficar em branco.'
    })
  }

  return erros;
};
