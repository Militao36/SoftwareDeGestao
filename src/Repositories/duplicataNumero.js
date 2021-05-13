import knex from '../Config/conn';

class DuplicataNumero {
    async addNumero(idEmpresa) {
        const numeroDuplicata = await knex.table('duplicataNumero')
            .select(['numero']).where('idEmpresa', '=', idEmpresa)
            .first()

        console.log(numeroDuplicata)
        if (!numeroDuplicata) {
            await this.saveNumero(idEmpresa)
            return { numero: 1 }
        }

        await this.sumOne(idEmpresa, numeroDuplicata.numero)
        return { numero: ++numeroDuplicata.numero }
    }

    async saveNumero(idEmpresa) {
        await knex.table('duplicataNumero').insert({
            idEmpresa,
            numero: 1
        })
    }

    async sumOne(idEmpresa, numero) {
        const numeracao = numero + 1
        await knex.table('duplicataNumero').update({ numero: numeracao }).where('idEmpresa', '=', idEmpresa)
    }
}

export default new DuplicataNumero();
