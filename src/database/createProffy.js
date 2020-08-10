module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){ 
    //inserir dados na table de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys(
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
        "${proffyValue.name}",
        "${proffyValue.avatar}",
        "${proffyValue.whatsapp}",
        "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID //aqui será uma variável que guardará o ID, lastID será o último ID inserido
    //ele vai entrar no banco e cadastrar e irá retornar na const proffy_id o ID cadastrado
    
    //inserir dados na tabela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schedule, nesse caso será necessário fazer um laço de repetição

    const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
       //o return irá retornar todos os db.run do classSchedule
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    

    //o const insertedAllClassesScheduleValues irá guardar o return do map

    //aqui vou executar todos os db.runs() das class_schedules
    await Promise.all(insertedAllClassesScheduleValues) //ele irá conseguir executar no () uma array de muitas promessas, aguardando todos serem inseridos antes

    
}
//exportanto uma função com os mesmos nomes
 //db.run().then() o then novamente para esperar a inserção do bd ser executada
//run é para fazer a inserção e dentro do () é colocado o que será inserido
// para utilizar o await precisa ter uma palavra chave na frente da função que é async
//await = esperar, espere nessa linha, nesse caso o await fará com que espere a inserção de dados serem feitas para ir para a próima linha
// utilizando o sql será inserido os valores
//   INSERT INTO proffys() VALUES (); => inserir dentro de proffys os valores
//${} utilizado para colocar variável dentro dos valores
//o map irá mapiar o array, possui uma funcionalidade como argumento
//o map irá iterar sobre cada elemento, ou seja, navegar sobre cada elemento pegando o elemento e colocando dentro da função, porém não faz o retorno e para fazer isso é necessário colocar dentro de um novo []
//  ${classScheduleValue.weekday}, aqui eu irei pegar o valor e o objeto
// classScheduleValues.map((value) => {
    //    return ??
//})
    //[??, ??] // caso o [] tenha dois elementos o map irá fazer primeiro a função e retornar e depois fazer novamente para o segundo elemento e fazer quantas vezes for necessárias