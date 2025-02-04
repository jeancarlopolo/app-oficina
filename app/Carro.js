class Carro {
    // possui placa, modelo, cor, proprietário, motorista, lista de checklists
    // CRUD de checklists

    constructor(placa, modelo, cor, idProprietario, motorista) {
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
        this.idProprietario = idProprietario;
        this.motorista = motorista;
        this.checklists = [];
    }

    adicionarChecklist(checklist) {
        this.checklists.push(checklist);
    }

    corPTpraHex() {
        let cores = {
            "azul": "#0000FF",
            "vermelho": "#FF0000",
            "verde": "#008000",
            "amarelo": "#FFFF00",
            "preto": "#000000",
            "branco": "#FFFFFF",
            "prata": "#C0C0C0",
        }
        return cores[this.cor.toLowerCase()];
    }

    corHexPraPT(hex) {
        let cores = {
            "#0000FF": "azul",
            "#FF0000": "vermelho",
            "#008000": "verde",
            "#FFFF00": "amarelo",
            "#000000": "preto",
            "#FFFFFF": "branco",
            "#C0C0C0": "prata",
        }
        return cores[hex.toUpperCase()];
    }



    editarChecklist(checklist) {
        let index = this.checklists.findIndex(c => c.dataCriacao === checklist.dataCriacao);
        if (index > -1) {
            this.checklists[index] = checklist;
        }
    
    }

    removerChecklist(checklist) {
        let index = this.checklists.indexOf(checklist);
        if (index > -1) {
            this.checklists.splice(index, 1);
        }
    }
}

class Checklist {
    // pastilhas, sistema de freio, suspensão, pneus, água, óleo, mangueiras
    // cada um tem um status de ok ou não ok e um comentário opcional
    // a checklist possui uma data e hora de criação
    // é possível exportar a checklist para uma string formatada no clipboard
    constructor(suspensao, pneus, agua, oleo, mangueiras) {
        this.suspensao = suspensao;
        this.pneus = pneus;
        this.agua = agua;
        this.oleo = oleo;
        this.mangueiras = mangueiras;
        this.id = Math.floor(Math.random() * 1000);
        this.dataCriacao = new Date().toLocaleString();
    }

    atualizarDataCriacao() {
        this.dataCriacao = new Date();
    }

    exportarClipboard(placa) {


        let suspensao = this.suspensao["status"] === 'ok' ? '✅' : '❌';
        let pneus = this.pneus["status"] === 'ok' ? '✅' : '❌';
        let agua = this.agua["status"] === 'ok' ? '✅' : '❌';
        let oleo = this.oleo["status"] === 'ok' ? '✅' : '❌';
        let mangueiras = this.mangueiras["status"] === 'ok' ? '✅' : '❌';

        // se o comentário for vazio, não exibir

        if (!this.suspensao["comentario"]) {
            this.suspensao["comentario"] = 'Sem comentários';
        }
        if (!this.pneus["comentario"]) {
            this.pneus["comentario"] = 'Sem comentários';
        }
        if (!this.agua["comentario"]) {
            this.agua["comentario"] = 'Sem comentários';
        }
        if (!this.oleo["comentario"]) {
            this.oleo["comentario"] = 'Sem comentários';
        }
        if (!this.mangueiras["comentario"]) {
            this.mangueiras["comentario"] = 'Sem comentários';
        }

        let clipboard = `Data da check-list: ${this.dataCriacao.toLocaleString()}\n`;
        clipboard += 'Placa: ' + placa + '\n';
        clipboard += `Suspensão: ${suspensao} - ${this.suspensao["comentario"]}\n`;
        clipboard += `Pneus: ${pneus} - ${this.pneus["comentario"]}\n`;
        clipboard += `Água: ${agua} - ${this.agua["comentario"]}\n`;
        clipboard += `Óleo: ${oleo} - ${this.oleo["comentario"]}\n`;
        clipboard += `Mangueiras: ${mangueiras} - ${this.mangueiras["comentario"]}\n`;

        return clipboard;
    }
}

export { Carro, Checklist };