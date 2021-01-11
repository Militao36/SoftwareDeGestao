import request from "supertest";
import app from '../../src/app';

describe("Test api fornecedor", () => {
  let data = null
  let id = null

  beforeEach(() => {
    data = {
      razaoSocial: 'BMS LTDA',
      nomeFantasia: 'GRUPO BMS',
      logradouro: 'Travessa são judas',
      numero: '40',
      complemento: 'Casa 2',
      bairro: 'Fatima',
      cep: '36570-000',
      cidade: 'Viçosa',
      uf: 'MG',
      telefone: '3138919414',
      celular: '',
      cnpjCpf: '03.054.436/0001-51',
      ie: '',
      email: 'bms@gmail.com.br'
    }
  });

  test("[GET] Pagina de fornecedor", async () => {
    const response = await request(app)
      .get("/Fornecedor")
    expect(response.statusCode).toBe(200);
  });

  test("[POST] Salvar novo Fornecedor", async () => {
    const response = await request(app)
      .post("/Fornecedor")
      .send(data)
    id = response.body.id
    expect(typeof (response.body.id)).toBe('number');
    expect(response.statusCode).toBe(201);
  })

  test("[PUT] Atualizar Fornecedor", async () => {
    const response = await request(app)
      .put("/Fornecedor/" + id)
      .send(data)
    expect(response.statusCode).toBe(204);
  })

  test("[DELETE] Deletar Fornecedor", async () => {
    const response = await request(app)
      .delete("/Fornecedor/" + id)
    expect(response.statusCode).toBe(204);
  })
});