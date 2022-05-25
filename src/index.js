import './css/index.css';

console.log('Run class Usuario');
export class Usuario {
    #name = 'John';

    constructor() {
        this.name;
    }

    get name() {
        return this.#name;
    }
}

const usuario = new Usuario();

usuario.name;
