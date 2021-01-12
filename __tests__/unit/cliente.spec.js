import request from "supertest";
import app from '../../src/app';

describe("Test api cliente", () => {
  let data = null
  let id = null

  beforeEach(() => {
    data = {
      nome: 'Matheus Moreira',
      cpfCnpj: '14361347654',
      ie: '',
      subTributario: '',
      endereco: 'Travessa são judas',
      numero: '40',
      complemento: 'Casa 2',
      bairro: 'Grota dos camilos',
      cidade: 'Viçosa',
      uf: 'MG',
      email: 'matheus@gmail.com',
      telefone: '3138919414'
    }
  });

  test("[GET] Pagina de cliente", async () => {
    const response = await request(app)
      .get("/Cliente")
    expect(response.statusCode).toBe(200);
  });

  test("[POST] Salvar novo cliente", async () => {
    const response = await request(app)
      .post("/Cliente")
      .send(data)
    id = response.body.id
    expect(typeof (response.body.id)).toBe('string');
    expect(response.statusCode).toBe(201);
  })

  test("[PUT] Atualizar cliente", async () => {
    const response = await request(app)
      .put("/Cliente/" + id)
      .send(data)
    expect(response.statusCode).toBe(204);
  })

  test("[GET] Buscar cliente", async () => {
    const response = await request(app)
      .get("/Cliente/" + id)
    expect(response.statusCode).toBe(200);
  })

  test("[DELETE] Deletar cliente", async () => {
    const response = await request(app)
      .delete("/Cliente/" + id)
    expect(response.statusCode).toBe(204);
  })
});