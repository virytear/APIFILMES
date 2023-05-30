const form = document.querySelector('#CatalogoForm')
const tituloInput = document.querySelector('#tituloInput')
const diretorInput = document.querySelector('#diretorInput')
const ano_lancamentoInput = document.querySelector('#ano_lancamentoInput')
const generoInput = document.querySelector('#generoInput')
const URL = 'http://localhost:8080/filmes.php'


const tableBody = document.querySelector('#catalogoTable')

function carregarcatalogo() {
    fetch(URL, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(catalogo => {
        tableBody.innerHTML = ''

        for (let i = 0; i < catalogo.length; i++) {
            const tr = document.createElement('tr');
            const filme = catalogo[i]
            tr.innerHTML =`
            <td>${filme.id}</td>
            <td>${filme.titulo}</td>
            <td>${filme.diretor}</td>
            <td>${filme.ano_lancamento}</td>
            <td>${filme.genero}</td>
            <td>
            <button data-id="${filme.id}" onclick="atualizarfilme(${filme.id})">editar</button>
            <button onclick="excluirfilme(${filme.id})">excluir</button>
            </td>`

            tableBody.appendChild(tr)
        }
    })
}

function adiconarfilme(event) {
    event.preventDefault()
    const titulo         = tituloInput.value
    const diretor        = diretorInput.value
    const ano_lancamento = ano_lancamentoInput.value
    const genero         = generoInput.value

    fetch(URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
        `titulo=${encodeURIComponent(titulo)}&diretor=${encodeURIComponent(diretor)}
        &ano_lancamento=${encodeURIComponent(ano_lancamento)}&genero=${encodeURIComponent(genero)}`
    })
    .then(response => {
        if(response.ok){
            carregarcatalogo()
            tituloInput.value         = ''
            diretorInput.value        = ''
            ano_lancamentoInput.value = ''
            generoInput.value         = ''
        }else{
            console.error('Error ao add filme')
            alert('Error ao add filme')
        }
    })
}

function atualizarfilme(id){
    const novoTitulo        = prompt("Digite o novo titulo")
    const novoDiretor       = prompt("Digite o novo Autor")
    const novoAnolancamento = prompt("Digite o novo ano")
    const novoGenero        = prompt("Digite o genero ano")
    if (novoTitulo && novoAnolancamento && novoDiretor && novoGenero){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `titulo=${encodeURIComponent(novoTitulo)}&diretor=${encodeURIComponent(novoDiretor)}&ano_lancamento=${encodeURIComponent(novoAnolancamento)}&genero=${encodeURIComponent(novoGenero)}`
        })
            .then(response => {
                if(response.ok){
                    carregarcatalogo()
                } else {
                    console.error('Erro ao att filme')
                    alert('erro ao att filme')
                }
            })
    }
}

function excluirfilme(id) {
    if (confirm('Deseja excluir esse filme')) {
        fetch(`${URL}?id=${id}`,{
            method: 'DELETE',
        })
           .then(response => {
            if(response.ok){
                carregarcatalogo()
            } else {
                console.error('Erro ao att filme')
                alert('erro ao att filme')
            }
        })
        
    }
}




form.addEventListener('submit', adiconarfilme)
carregarcatalogo()
