import { Conteudo, Serie, Usuario } from "./modelo.js";
import { delay, carregarCatalogo, organizaConteudo, calcularCompatb, calcularIdade } from "./functions.js";

async function mensagemBoasVindas(usuario){
   
    if(usuario === "estranho"){
        const welcomeMessage = document.querySelector('.welcomeMessage');
        welcomeMessage.innerHTML = `<p>Seja bem vind@ ao CINEMATCH WEB!</p>
            <p>Faça seu cadastro para buscarmos indicações de séries e filmes para você!</p>`;
        welcomeMessage.classList.add('ativo');
    }else{
        const aviso = document.getElementById("popup");
        aviso.innerHTML = `<button id="btnFecharPopup" class="fechar">&times;</button>
            <div id="aviso"><p>Seja bem vind@, ${usuario}!</p>
            <p>Veja essas indicações que temos para você:</p></div>
            <button class="btnOk" id="btnOk">OK</button>`;
        aviso.classList.add('ativo');
        const btnFechar = document.querySelector("#btnFecharPopup");
        const btnOk = document.querySelector("#btnOk");

        btnFechar.addEventListener("click", () => {
            aviso.classList.remove('ativo');
        });

        btnOk.addEventListener("click", () => {
            aviso.classList.remove('ativo');
        });

        await delay(3000);
        aviso.classList.remove('ativo');
    }
}

async function mostrarErroCarregarAPI() {
    const aviso = document.getElementById("popup");
        aviso.innerHTML = `
            <div id="aviso"><h2>Ops, algo deu errado!</h2>
            <p>Sentimos muito. Parece que houve algum problema ao carregar nosso catálogo.</p>
            <p>Aguarde um instante e tente novamente.</p></div>
            <button class="btnOk" id="Reload">Tentar novamente</button>`;
        aviso.classList.add('ativo');
        const btnOk = document.querySelector("#Reload");

        btnOk.addEventListener("click", () => {
            window.location.reload();
        });
}

async function mostrarCatalogo(conteudo) {

    document.querySelector('.catalogo').style.display = 'flex';
    const listaSeries = document.querySelector("#lista_series");

    listaSeries.innerHTML = "";
    
    conteudo.sort((a,b)=>b.perc_afinid-a.perc_afinid)
    .forEach((serie) => {

        let afinidade;
        if(serie.perc_afinid > 0 && serie.perc_afinid <40){
            afinidade = "Baixa";
        }else if (serie.perc_afinid >= 40 && serie.perc_afinid < 60){
            afinidade = "Média";
        }else if (serie.perc_afinid >= 60){
            afinidade = "Alta";
        }
        
        const card = document.createElement("div");
        const summary_short = (serie.summary.length > 150) ?
            serie.summary.substring(0, 150) : serie.summary;

        card.classList.add("cardSerie");
        
        card.innerHTML = `
            <img
                src="${serie.image}"
                alt="Poster da série ${serie.name}"
            >

            <div class="infoSerie">
                ${afinidade ? `<h4>Afinidade: ${afinidade}</h4>` : ''}

                <h3>${serie.name}</h3>
                
                ${summary_short.includes("</p>") ? 
                    summary_short : 
                    summary_short + `
                    <button class='btnResumo' data-id='${serie.id}'>...</button></p>`
                }

                <p class="generos">
                    ${serie.generosCompatb ?'<strong>Gêneros Compatíveis:</strong>':'<strong>Gêneros:</strong>'}
                    ${serie.generosCompatb ? serie.generosCompatb.join(", ") : serie.genres}
                </p>

                <p>
                    <strong>Duração:</strong>
                    ${serie.averageRuntime} minutos
                </p>

                <p class="nota">
                    ⭐ ${serie.rating ?? "Sem avaliação"}
                </p>
                ${serie.incompat ? `
                    <p class="generos">
                        <strong>Explore os gêneros:</strong>
                        ${serie.incompat.join(", ")}
                    </p>` : ""
                }
                <p>
                    <strong>Estreia:</strong>
                    ${serie.premiered}
                </p>

                <p class="status">
                    ${serie.status}
                </p>

            </div>
        `;

        listaSeries.appendChild(card);
        
        if(card.querySelector('.btnResumo')){
            const botao = card.querySelector('.btnResumo');
            botao.dataset.resumo = serie.summary;
            botao.dataset.name=serie.name;
        
        }
    });
}

export { mensagemBoasVindas, mostrarCatalogo, mostrarErroCarregarAPI };