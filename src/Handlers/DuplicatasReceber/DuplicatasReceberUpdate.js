
import { DateTime } from 'luxon';
import DuplicataRepo from '../../Repositories/DuplicatasReceber'

class HandleDuplicatasReceber {
    async Handler(duplicatasReceber, idEmpresa) {
        const duplicata = {
            ...duplicatasReceber, idEmpresa,
            updateAt: DateTime.local().toSQLDate(),
        }

        await DuplicataRepo.update(duplicata)
        return true
    }
}

export default new HandleDuplicatasReceber();


