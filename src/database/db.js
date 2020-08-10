const Database = require('sqlite-async') //abrindo o banco de dados que instalamos pelo npm install sqlite-async

function execute(db) { // o argumento é o banco de dados
    //criar as tabelas do banco de dados   
    return db.exec(`  
            CREATE TABLE IF NOT EXISTS proffys (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT,
                avatar TEXT,
                whatsapp TEXT,
                bio TEXT
            );

            CREATE TABLE IF NOT EXISTS classes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                subject INTEGER,
                cost TEXT,
                proffy_id INTEGER
            );

            CREATE TABLE IF NOT EXISTS class_schedule (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                class_id INTEGER, 
                weekday INTEGER,
                time_from INTEGER,
                time_to INTEGER
            );
       `) 
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute) //abrindo o Database e pegando onde ele está e contatenando para x pasta
//Database você vai abrir esse arquivo e então(then) execute a função

//está sendo utilizado o then pois o banco de dados demora um pouco para abrir e então a função que precisariamos seria executada antes dele abrir, então por isso é utilizado o then para a função ser executada após o bd abrir
//exec é executar e dentro do () coloca-se o código sql no qual toda vez que eu chamar o arquivo db as funções serão executadas
//REATE TABLE IF NOT EXISTS = criar tabela x se não existir
//id é o nome da coluna e INTEGER  é um número inteiro e o PRIMARY KEY significa que o id é o identificar primário 
// com o autoincrement o sql irá criar o ID de forma automática
// e na linha abaixo vem os dados que possui nas colunas
// para criar outra tabela começa a partir do CREATE TABLE IF NOT EXISTS classes 
// proffy_id INTEGER está referenciando um professor, falando que um professor pode ter muitas classes, 1:n e a classe só cadastra no banco de dados se tiver um proffy
//INTEGER = NÚMERICO, TEXT=TEXTO
//class_id INTEGER está relacionado a classes, tanto quanto o proffy_id está relacionado ao proffy pois significa que é um ID daquela tabela
//module.exports module é um objeto que tem a propriedade exports que consegue receber diversos dados