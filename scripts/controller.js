const { resolve } = require('path')
const fs = require('fs')


String.prototype.capitalize = function () {
    return this.charAt(0).toLowerCase() + this.substr(1);
}

const [, , ...args] = process.argv

const [handle] = args

const [, name] = handle.split('=').map(v => v.replace(/\-\-/ig, ''))

const controllersPath = resolve(__dirname, '..', 'src', 'Controllers')

const value = `
class ${name.split('.')[0]} {
    async post(req, res) {
        try {
            
        } catch (error) {
            return res.status(500).send('MESSAGE');
        }
    }

    async put(req, res) {
        try {
           
        } catch (error) {
            return res.status(500).send('MESSAGE');
        }
    }

    async delete(req, res) {
        try {
            
        } catch (error) {
            return res.status(500).send('MESSAGE');
        }
    }

    async findById(req, res) {
        try {
           
        } catch (error) {
            return res.status(500).send('MESSAGE');
        }
    }

    async buscarFiltro(req, res) {
        try {
            
        } catch (error) {
            return res.status(500).send('MESSAGE');
        }
    }
}

export default CaixaController;
`
fs.writeFileSync(`${controllersPath}\\${name}.js`, value)
