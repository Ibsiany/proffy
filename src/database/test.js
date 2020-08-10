const Database = require('./db') 
// ./ significa que estou na pasta local
// foi possível exportar o arquivo a partir do require no qual solicitamos tal pasta
const createProffy = require('./createProffy') 
//importanto uma função

Database.then(async (db) => { //o db é o que o then está passando após a execução do code na aba db.js
    //inserir dados

        proffyValue = { // um atalho para receber um objeto
            //name:'Cibelle Stéfany',    propriedades do objeto
            name : "Ibsiany Dias", 
            avatar:"https://avatars3.githubusercontent.com/u/69012623?s=460&u=60c5c8aeebdf6a7014f684b9c8b29a5808ddcdc0&v=4", 
            whatsapp:"31962931212", 
            bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        }

        classValue = { //objeto simples
            subject: 6, 
            cost:"20", 
            // o proffy id virá pelo banco de dados
        }

        classScheduleValues = [ // agrupando os dados pois é mais de um
            //class_id virá pelo banco de dados após cadastramos a class
            {
                weekday: 1, 
                time_from: 720, 
                time_to: 1220
            },
            {
                weekday: 0, 
                time_from: 520, 
                time_to: 1220
            }
        ] 

        //await createProffy (db, { proffyValue, classValue, classScheduleValues}) //foi criado o import da função lá em cima no const e aqui será chamado a função que foi importada 
         //consultar os dados inseridos


         //todos os proffys
         const selectedProffys = await db.all("SELECT * FROM proffys") //aguarde e eecute o ("selecione tudo de proffys")
        //console.log(selectedProffys)

        //consultar as classes de um determinado professor
        //e trazer junto os dados do professor
        const selectClassesAndProffys = await db.all(`
            SELECT classes.*, proffys.*
            FROM proffys
            JOIN classes ON (classes.proffy_id = proffys.id)
            WHERE classes.proffy_id = 1;
        `)
        //console.log(selectClassesAndProffys)

        //o horário que a pessoa trablha, por exemplo é das 8h até 18h
        //o horpario do time_from(8h) precisa ser menor ou igual ao horário solicitado
        //o time_to precisa ser acima
        const selectClassesSchedules = await db.all(`
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = 1
            AND class_schedule.weekday = "0"
            AND class_schedule.time_from <= "520"
            AND class_schedule.time_to > "520"
        `)
        //console.log(selectClassesSchedules)

})

//await createProffy ({db, proffyValue, classValue, classScheduleValue}) nessa linha ele irá aguardar criar o proffy e levar para o banco de dados os objetos citados levando para a pasta createProffy todos os valores
//SELECT classes.*, proffys.* estou unindo duas tabelas procurando todas de classes e todas de proffys
//FROM proffys necessário chamar a primeira tabela
//JOIN irá unir as tabelas, juntando a tabela x ON(na)(e aqui eu falo qual o campo para se unirem)
//JOIN classes ON (classes.proffy_id = proffy.id) juntar a tabela classes caso (nome da tabela.id do relacionamento = id da outra tabela)
//WHERE classes.proffy_id = 1 eu estou falando que irá unir as tabelas e mostrar os o classes.proffy_id for igual a 1 que é valor do id da tabela proffys a rspeito de um proffy