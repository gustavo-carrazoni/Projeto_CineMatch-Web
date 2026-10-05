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

}

class Usuario{
    constructor(email, nome, data_nasc, idade, genero){
        this.email = email;
        this.nome = nome;
        this.data_nasc = data_nasc;
        this.idade = idade;
        this.generos = genero;
    }
}

export { Conteudo, Serie, Usuario };