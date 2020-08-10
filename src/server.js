//require('express')() //buscando uma dependencia de um projeto usa-se o require e dentro o nome do que eu quero, o express é uma função 
//Servidor
const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,  //nesse caso é não guardar ou guardar as coisas, desativado nesse caso
})

//Inicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({ extended: true})) // com isso eu consigo receber os dados que estão no req.body

//configurar arquivos estáticos (css, scripts imagens)
.use(express.static("public")) //configuração do servidor, uma funcionalidade
//rotas da aplicação
.get("/", pageLanding) //  => função curta substitui apenas o function antes dos ()
.get("/study", pageStudy) 
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//Start no servidor
.listen(5000) 
    //return res.sendFaile(__dirname + "/views/index.html") buscando o arquivo e mostrando a resposta
    //get é uma ferramenta do express, informando a barra e pela função eu falo o que eu quero que ele retorne
    //req é o que que acompanha o pedido, ele irá trazer os dados pra mim como formulários e res é o que ele irá mostrar na tela
    // uma função pode retornar um objeto
    //return  significa que está retornando algo dali de dentro, {} = é um objeto
    // quando busco a dependencia e coloco o nome dela(junto com os () pois é uma função) e coloco a opção .listen e o número da porta começa a rodar um servidor
    //__dirname é a pasta src
    // o / é a rota
    // static estou falando qual a pasta que eu quero que arrume, foi separado o request pois para utilizar o use e o static não seria necessário retornar a função do express
    //posso fazer o get com somente o nome da função ou a função dentro dela