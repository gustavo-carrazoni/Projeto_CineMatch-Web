class Conteudo{
    constructor(id, url, nome, resumo, duracaoMin, genero, image, avaliacao, lancamento){
        this.id = id;
        this.url = url;
        this.name = nome;
        this.summary = resumo;
        this.averageRuntime = duracaoMin;
        this.genres = genero;
        this.image = image;
        this.rating = avaliacao;
        this.premiered = lancamento;
    }
}

class Serie extends Conteudo{
    constructor(id, url, nome, resumo, duracaoMin, genero, image, avaliacao, lancamento, status){
        super(id, url, nome, resumo, duracaoMin, genero, image, avaliacao, lancamento);
        this.status = status;
    }

    mostrarResumo(){
        console.log(`Serie - ID: ${this.id}\nNome: ${this.name}\nDuração Ep.: ${this.averageRuntime}\nGênero: ${this.genres}\nStatus: ${this.status}\nAvaliação: ${this.rating}\nLançamento: ${this.premiered}\n\n`);
    }
}

class Usuario{
    constructor(email, nome, idade, genero){
        this.email = email;
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
    }
}

export { Conteudo, Serie, Usuario };