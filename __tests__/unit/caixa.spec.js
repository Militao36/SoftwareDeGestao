import request from "supertest";
import app from '../../src/app';

describe("Test api caixa", () => {
  let data = null
  let id = null

  beforeEach(() => {
    data = {
        idTipoPagamento: '4410b74556854f278e682cff9ede67a2',
        tipo: 'entrada',
        valor: 10.20,
        descricao: 'teste',
    }
  });

  test("[GET] Pagina de Caixa", async () => {
    const response = await request(app)
      .get("/Caixa")
    expect(response.statusCode).toBe(200);
  });

  test("[POST] Salvar novo Caixa", async () => {
    const response = await request(app)
      .post("/Caixa")
      .send(data)
    id = response.body.id
    expect(typeof (response.body.id)).toBe('string');
    expect(response.statusCode).toBe(201);
  })

  test("[PUT] Atualizar Caixa", async () => {
    const response = await request(app)
      .put("/Caixa/" + id)
      .send(data)
    expect(response.statusCode).toBe(204);
  })

  test("[GET] Buscar Caixa", async () => {
    const response = await request(app)
      .get("/Caixa/" + id)
    expect(response.statusCode).toBe(200);
  })

  test("[DELETE] Deletar Caixa", async () => {
    const response = await request(app)
      .delete("/Caixa/" + id)
    expect(response.statusCode).toBe(204);
  })
});