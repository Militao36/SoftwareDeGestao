
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import DuplicataRepo from '../../Repositories/DuplicatasReceber'

class HandleDuplicatasReceber {
    async Handler(duplicatasReceber, idEmpresa) {
        const duplicata = {
            ...duplicatasReceber, idEmpresa,
            uuid: v4(),
            createAt: DateTime.local().toSQLDate(),
        }

        await DuplicataRepo.save(duplicata)
        return duplicata.uuid
    }
}

export default new HandleDuplicatasReceber();


