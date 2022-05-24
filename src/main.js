import './scss/index.scss';

class Usuario {
    #nombre = 'Sergio';
    #apellido = 'Jurado';
    #edad = 32;
    constructor() {
        this.greet();
    }

    greet() {
        console.log(
            `Hola, my name is ${this.#nombre} ${this.#apellido} and I'm ${
                this.#edad
            } years old.`
        );
    }
}

const usuario = new Usuario();

usuario.greet();

console.log('Main.js is running!');
