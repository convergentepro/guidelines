// import "/public/css/index.css";

export class Usuario {
	#name = "John";

	constructor() {
		this.name;
	}

	get name() {
		return this.#name;
	}
}

const usuario = new Usuario();

usuario.name;
