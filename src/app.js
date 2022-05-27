import "/public/static/app.css";

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
