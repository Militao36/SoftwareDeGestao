const { resolve } = require('path')
const fs = require('fs')


String.prototype.capitalize = function () {
    return this.charAt(0).toLowerCase() + this.substr(1);
}

const [, , ...args] = process.argv

const [handle] = args

const [, name] = handle.split('=').map(v => v.replace(/\-\-/ig, ''))

const handlesPath = resolve(__dirname, '..', 'src', 'Handlers')
fs.mkdirSync(`${handlesPath}\\${name}`)

const value = `
    import { v4 } from 'uuid';
    import { DateTime } from 'luxon';

    class Handle${name} {
        async Handler(${name.capitalize()}, idEmpresa) {
            
        }
    }

    export default new Handle${name}();
`
fs.writeFileSync(`${handlesPath}\\${name}\\${name}Save.js`, value)
fs.writeFileSync(`${handlesPath}\\${name}\\${name}Update.js`, value)
