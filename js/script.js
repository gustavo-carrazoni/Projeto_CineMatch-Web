import { Conteudo, Serie, Usuario } from "./modelo.js";


const form_cadastro = document.getElementById("form-perfil");
const botao_cadastro = document.getElementsByName("cadastro_user");
const menuNav = document.getElementById("menuUsuario");
const mensagem = document.getElementById("mensagem");

async function verificaPerfilSalvo(){
    const dados_user = localStorage.getItem("usuario");

    console.log(dados_user);

    if (dados_user === null) {
        console.log("Usuário não cadastrado.");
        return true;
    }else{
        const usuario = JSON.parse(dados_user);
        console.log(usuario);


        menuNav.style.display = "flex";
        form_cadastro.style.display = "none";

        mensagemBoasVindas(usuario.nome);
        return false;
    }
}

async function cadastrarUsuario(){
    await form_cadastro.addEventListener("submit", (event) => {
            event.preventDefault();

            const dados_user = new FormData(form_cadastro);
            const usuario = Object.fromEntries(dados_user);
            usuario.genero = dados_user.getAll("genero");

            console.log(usuario);
            console.log(usuario.nome);
            console.log(usuario.data_nascimento);

            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.reload();
        });
}

function mensagemBoasVindas(usuario){
   
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

        setTimeout(() => {
            aviso.classList.remove('ativo');
        }, 3000);
    }
}

async function carregarCatalogo() {
    try{
        const response = await fetch("https://api.tvmaze.com/shows");
            if(!response.ok){
                throw new Error(`Erro HTTP: ${response.status}`);
                return;
            }
        const dados_catalogo = await response.json();

        return dados_catalogo;
    }catch (erro){
        console.error("Falha: ", erro);
    }
    
}

async function mostrarCatalogo(conteudo) {

    document.querySelector('.catalogo').style.display = 'flex';
    const listaSeries = document.querySelector("#listaSeries");

    listaSeries.innerHTML = "";

    conteudo.forEach((serie) => {

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

                <h3>${serie.name}</h3>
                
                ${summary_short.includes("</p>") ? 
                    summary_short : 
                    summary_short + `
                    <button class='btnResumo' data-id='${serie.id}'>...</button></p>`
                }

                <p class="generos">
                    <strong>Gêneros:</strong>
                    ${serie.genres.join(", ")}
                </p>

                <p>
                    <strong>Duração:</strong>
                    ${serie.averageRuntime} minutos
                </p>

                <p class="nota">
                    ⭐ ${serie.rating ?? "Sem avaliação"}
                </p>

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


function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

document.addEventListener("DOMContentLoaded", async () => {
    if(await verificaPerfilSalvo()){
        mensagemBoasVindas("estranho");
        await cadastrarUsuario();
    }else{
        const conteudo_API = await carregarCatalogo();

        let series = [];
        await conteudo_API.forEach((dado) => { 
            series.push(new Serie(dado.id, dado.url, dado.name, dado.summary, dado.runtime, dado.genres, dado.image.medium, dado.rating.average, dado.premiered, dado.status));
        })

        console.log(series);
        mostrarCatalogo(series);

        document.addEventListener("click", (clickBotaoResumo) => {

            if (clickBotaoResumo.target.classList.contains("btnResumo")) {

                const titulo = clickBotaoResumo.target.dataset.name;
                const resumo = clickBotaoResumo.target.dataset.resumo;
                
                const aviso = document.getElementById('popupResumo');

                aviso.innerHTML = `<button id="btnFecharResumo" class="fechar">&times;</button>
                    <div id="aviso"><p>${titulo}</p>
                    <p>${resumo}</p></div>
                    <button class="btnOk" id="btnOkResumo">OK</button>`;

                aviso.classList.add("ativo");
                
                const btnFecharResumo = document.querySelector("#btnFecharResumo");
                const btnOkResumo = document.querySelector("#btnOkResumo");

                btnFecharResumo.addEventListener("click", () => {
                    aviso.classList.remove('ativo');
                });

                btnOkResumo.addEventListener("click", () => {
                    aviso.classList.remove('ativo');
                });
            }

        });

        }
    }
);


