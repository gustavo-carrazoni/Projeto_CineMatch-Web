import { Conteudo, Serie, Usuario } from "./modelo.js";
import { mensagemBoasVindas, mostrarCatalogo, mostrarErroCarregarAPI } from "./ui.js";

function primeiraMaiusc(string){
    const palavras = string.map(gen => gen.toLocaleLowerCase().charAt(0).toUpperCase() + gen.toLocaleLowerCase().slice(1));
    return palavras;
}

function nomeMaiusc(string){
    const nome = string.toLowerCase().split(' ').map((u) => u.charAt(0).toLocaleUpperCase()+u.slice(1)).join(' ');
    return nome;
}

function calcularIdade(data){
    const hoje = new Date();
    const data_nasc = new Date(data);
    

    let anos = hoje.getFullYear() - data_nasc.getFullYear();

    const fezAniversario =
    hoje.getMonth() < data_nasc.getMonth() ||
        (hoje.getMonth() === data_nasc.getMonth() &&
        hoje.getDate() < data_nasc.getDate());

    if (fezAniversario){
        anos--;
    }
    
    return anos;
}

async function carregarCatalogo() {
    try{
        const response = await fetch("https://api.tvmaze.com/shows");
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
                mostrarErroCarregarAPI();
                return;
            }else{
                const dados_catalogo = await response.json();
                return dados_catalogo;
            }
    }catch (erro){
        console.error("Falha: ", erro);
    }
    
}

async function organizaConteudo(conteudo){
    
    const catalogo = conteudo.filter(s => s.genres.length > 0 && s.status && s.url && s.rating.average)
    .map(a => ({
        id: a.id,
        name: a.name,
        url: a.url,
        language: a.language,
        genres: a.genres,
        runtime: a.averageRuntime,
        premiered: a.premiered,
        rating: a.rating.average,
        status: a.status,
        image: a.image.medium,
        summary: a.summary
    }));
    
    let series = [];
    catalogo.forEach((dado) => { 
        series.push(new Serie(dado.id, dado.url, dado.name, dado.summary, dado.runtime, dado.genres, dado.image, dado.rating, dado.premiered, dado.status)
    )});
    return series;
}

async function calcularCompatb(series, usuario) {
    
    let generosCompativeis = [];
    
    series.forEach((serie) => {
        const compativeis = serie.genres.filter(a => usuario.generos.includes(a));
        const incompativeis = serie.genres.filter(a => !compativeis.includes(a));
        if(compativeis.length >0){
            const percentual = Number(((compativeis.length / serie.genres.length)*100).toFixed(0));
            
            generosCompativeis.push({id: serie.id, generos: compativeis, incompat: incompativeis, perc_afinid: percentual});
        }
        });
    
    return generosCompativeis;
}

function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

/* const conteudo = await carregarCatalogo();
const catalogo = await organizaConteudo(conteudo);

const titulosCompativeis = await calcularCompatb(catalogo, user);

console.log(titulosCompativeis.length);
console.log(titulosCompativeis.sort((a,b)=>b.perc_afinid-a.perc_afinid)); */


export { delay, carregarCatalogo, organizaConteudo, calcularCompatb, calcularIdade, primeiraMaiusc, nomeMaiusc };