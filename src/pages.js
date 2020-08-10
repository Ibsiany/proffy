const Database = require('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')//vou tirar do format o objeto inteiro utilizando o {} e desestruturar, ou seja, retirar ele de lá e colocar em cada variável com seu respectivo nome
//const createProffy = require('./database/createProffy')

function pageLanding(req, res) {
    return res.render("index.html") //render => ele vai renderizar o arquivo
}

async function pageStudy(req, res){
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){ //se não tem filters.subject ou não tem filters.weekday ou não tem filters.time, ou seja, qualquer um desses que for vazio ele irá entrar
        return res.render("study.html", {filters, subjects, weekdays})
    } //só será mostrada a página caso não esteja com os campos vazios

    //converter horas em minutos

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject ='${filters.subject}'
    `

    //caso haja erro na hora da consulta do banco de dados
    try {   //você vai tentar o código daqui de dentro
        const db = await Database
        const proffys = await db.all(query) //esperar o db fazer o all e passar a variável query

        proffys.map((proffy)=> {
            proffy.subject = getSubject(proffy.subject)
        })
        return res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch (error) {   //caso de algum erro você vai capturar aqui e falar o erro
        console.log(error)
    }

}

function pageGiveClasses (req, res) {
    return res.render( "give-classes.html", {subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require ('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.wahtsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index)=> {
        
        return {
            weekday, 
            time_from: convertHoursToMinutes (req.body.time_from[index]),
            time_to: convertHoursToMinutes (req.body.time_to[index])
        }
    })

    try {
    const db = await Database
    await createProffy (db, {proffyValue, classValue, classScheduleValues})
    
    let queryString ="?subject=" + req.body.subject //let é modificavel 
    queryString +=  "&weekday=" + req.body.weekday[0] // ele vai receber ele mesmo mais algum valor que colocar ali dentro
    queryString +=  "&time=" + req.body.time_from[0]

    return res.redirect("/study" + queryString)  //redirect quero redirecionar a resposta para outra coisa
    } catch (error) {
        console.log(error)
    }
    
    //const data = req.body = body configuração para os dados da pessoa cadastrada não ficar aparecer na URL 
    //estou pegando as {}chaves e transformando em [name, avatar etc]array
    //const isNotEmpty = Object.keys(data).length > 0 = em [] eu consigo ver o total de elementos que possui nele com o lenght 
    // com o > 0 ele não é vazio
    //com o lenght == 0 ele é vazio
    //se tiver dados adicionar
    //if (isNotEmpty){
      //  data.subject = getSubject(data.subject)
      //adicionar dados a lista de proffys
    //proffys.push(data) //ele irá pegar os dados(variável) com o push e adicionar no proffys
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}