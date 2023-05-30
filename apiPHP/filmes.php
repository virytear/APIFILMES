<?php
//catalogo.php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//GET recebe/pega informações
//Post envia info
//PUT alterações/edita infos "update"
//delete apaga, Options 

header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;
} 

include 'conexao.php';

//rota para obter todos os catalogo

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    //criar o comando de selecionar 
    $stmt = $conn->prepare("SELECT * FROM catalogo");
    //aqui eu executo o select
    $stmt->execute();
    //aqui eu recebo os dados do banco por meio pdo
    $catalogo = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($catalogo);
}

//rota para inserir dados 

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $titulo            = $_POST['titulo'];
    $diretor           = $_POST['diretor'];
    $ano_lancamento    = $_POST['ano_lancamento'];
    $genero            = $_POST['genero'];

    $stmt = $conn ->prepare("INSERT INTO catalogo (titulo, diretor, ano_lancamento, genero)
     VALUES (:titulo, :diretor, :ano_lancamento, :genero )");

     $stmt->bindParam(':titulo', $titulo);
     $stmt->bindParam(':diretor', $diretor);
     $stmt->bindParam(':ano_lancamento', $ano_lancamento);
     $stmt->bindParam(':genero', $genero);

     if ($stmt->execute()){
        echo"Livro criado com sucesso!!";
     }else{
        echo"Erro ao criar livro!!";
     }
}


//rota para excluir um livro

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset ($_GET['id'])) {
    $id = $_GET ['id'];
    $stmt = $conn->prepare("DELETE FROM catalogo WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo "filme excluido com sucesso";
    }else{
        echo"erro ao excluir filme";
    }

}


//rota para atualizar um livro existente

//put atuliza
//Rota para atualizar um livro existente
if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_GET['id'];
    $novoTitulo = $_PUT['titulo'];
    $novoDiretor = $_PUT['diretor'];
    $novoAnoLancamento = $_PUT['ano_lancamento'];
    $novoGenero = $_PUT['genero'];
    //add novos campos caso necessario 
    $stmt = $conn->prepare("UPDATE catalogo SET titulo = :titulo, diretor = :diretor, ano_lancamento = :ano_lancamento, genero = :genero WHERE id = :id");
    $stmt->bindParam(':titulo', $novoTitulo);
    $stmt->bindParam(':diretor', $novoDiretor);
    $stmt->bindParam(':ano_lancamento', $novoAnoLancamento);
    $stmt->bindParam(':genero', $novoGenero);
    $stmt->bindParam(':id', $id);
    //add novos campos caso necessario
    if($stmt->execute()){
        echo "Livro atualizado!!";
    }else {
        echo "erro ao atualizar livro :(";
    }
}













?>