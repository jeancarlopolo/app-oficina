import { Carro, Checklist } from './Carro.js';

class Proprietario {
    // possui uma lista de carros
    // CRUD de carros
    // é possível listar todos os carros
    // é possível pesquisar um carro por placa

    constructor(nome) {
        this.id = Math.random().toString(16).slice(2)
        this.nome = nome;
        this.carros = [];
    }


    adicionarCarro(carro) {
        this.carros.push(carro);
    }

    removerCarro(carro) {
        let index = this.carros.indexOf(carro);
        if (index > -1) {
            this.carros.splice(index, 1);
        }
    }

    listarCarros() {
        return this.carros;
    }

    adicionarProprietario(proprietarioService) {
        proprietarioService.adicionarProprietario(this);
    }

    pesquisarCarroPorPlaca(placa) {
        placa = placa.toUpperCase();
        return this.carros.find(carro => carro.placa === placa);
    }

    editarCarro(carro) {
        let index = this.carros.findIndex(c => c.placa === carro.placa);
        if (index > -1) {
            this.carros[index] = carro;
        }
    }
}


class ProprietarioService {
    // CRUD de proprietários
    // é possível listar todos os proprietários
    // é possível pesquisar um proprietário por nome

    constructor() {
        this.proprietarios = [];
    }

    adicionarProprietario(proprietario) {
        if (this.proprietarios.includes(proprietario)) {
            return;
        }
        if (proprietario.nome === '' || proprietario.nome === undefined) {
            return;
        }
        this.proprietarios.push(proprietario);
    }

    removerProprietario(proprietario) {
        let index = this.proprietarios.indexOf(proprietario);
        if (index > -1) {
            this.proprietarios.splice(index, 1);
        }
    }

    listarProprietarios() {
        return this.proprietarios;
    }

    editarProprietario(proprietario) {
        let index = this.proprietarios.findIndex(p => p.id === proprietario.id);
        if (index > -1) {
            for (let carro of this.proprietarios[index].carros) {
                carro.proprietario = proprietario;
            }
            this.proprietarios[index] = proprietario;
        }
    }
}

export { Proprietario, ProprietarioService };