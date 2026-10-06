import { Conteudo, Serie, Usuario } from "./modelo.js";
import { mensagemBoasVindas, mostrarCatalogo, mostrarErroCarregarAPI } from "./ui.js";
import { delay, carregarCatalogo, organizaConteudo, calcularCompatb, calcularIdade, primeiraMaiusc, nomeMaiusc } from './functions.js';


async function verificaPerfilSalvo(){
    const dados_user = localStorage.getItem("usuario");
    console.log(dados_user);

    if (dados_user === null) {
        console.log("Usuário não cadastrado.");
        return false;
    }else{
        const dados_usuario = JSON.parse(dados_user);

        document.getElementById('menu_usuario').style.display = "block";
        document.getElementById('form-perfil').style.display = "none";

        mensagemBoasVindas(nomeMaiusc(dados_usuario.nome.trim()).split(' ')[0]);
        return true;
    }
}

async function cadastrarUsuario(){
    await document.getElementById('form-perfil').addEventListener("submit", (event) => {
            event.preventDefault();

            const dados_user = new FormData(document.getElementById('form-perfil'));

            const usuario = Object.fromEntries(dados_user);
            usuario.genero = dados_user.getAll("genero");

            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.reload();
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const sessaoInic = await verificaPerfilSalvo();

    if(!sessaoInic){
        mensagemBoasVindas("estranho");
        await cadastrarUsuario();
    }else{
        const dados_user = localStorage.getItem("usuario");
        const dados_usuario = JSON.parse(dados_user);
        const userSession = new Usuario(dados_usuario.email.trim(), nomeMaiusc(dados_usuario.nome.trim()), dados_usuario.data_nascimento, calcularIdade(dados_usuario.data_nascimento), dados_usuario.genero);
        const conteudo_API = await carregarCatalogo();

        let series = [];
        await conteudo_API.forEach((dado) => { 
            series.push(new Serie(dado.id, dado.url, dado.name, dado.summary, dado.runtime, dado.genres, dado.image.medium, dado.rating.average, dado.premiered, dado.status));
        })


        if(userSession.generos.length == 0) {
            mostrarCatalogo(series);
        }else{

            const titulosCompativeis = await calcularCompatb(series, userSession);

            const seriesCompativeis = series.filter((s) => titulosCompativeis.find(x => x.id === s.id))
            .map((s) => {
                const tituloCompativel = titulosCompativeis.find((x) => x.id === s.id);
                if(!tituloCompativel){
                    return null;
                }else{
                    return {
                        id: s.id,
                        url: s.url,
                        name: s.name,
                        summary: s.summary,
                        generosCompatb: tituloCompativel.generos,
                        incompat: tituloCompativel.incompat,
                        image: s.image,
                        averageRuntime: s.averageRuntime,
                        rating: s.rating,
                        premiered: s.premiered,
                        status: s.status,
                        perc_afinid: tituloCompativel.perc_afinid
                    }
                }
            });
                
            console.log(seriesCompativeis);

            mostrarCatalogo(seriesCompativeis);
        }

        document.addEventListener("click", (clickBotaoResumo) => {

            if (clickBotaoResumo.target.classList.contains("btnResumo")) {

                const titulo = clickBotaoResumo.target.dataset.name;
                const resumo = clickBotaoResumo.target.dataset.resumo;
                
                const aviso = document.getElementById('popup_resumo');

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

        document.getElementById('trocar_usuario').addEventListener("click", (clickTrocarUsuario) => {
            localStorage.clear();
            window.location.reload();
        });

        
        document.getElementById('mostrar_catalogo_comp').addEventListener("click", (clickMostrarCatalogoComp) => {
            
            mostrarCatalogo(series);
        
        });
    }
});
