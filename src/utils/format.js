const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física", 
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]
const weekdays = [
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira", 
    "Sexta-Feira",
    "Sábado",
    "Domingo",
]

//Funcionalidades

function convertHoursToMinutes (time){
    const [hour, minutes] = time.split(":")  //estou separando dentro de duas variáveis a partir da string que eu falei que é :
    return Number((hour * 60) + minutes)    // com o number ele irá me retornar em formato de números e não de string
}

function getSubject(subjectNumber) { //transformando o número que estamos pegando no nome do objeto
    const position = +subjectNumber - 1 //essa expressão retorna um número que vou passar menos um número, pois começa a contr a partir da linha 0 e o loop que fiz é a partir do 1
    return subjects[position] //vai retornar o subjects na posição da função, ou seja, se ele pegar o número um vai retornar Artes que é a posição do número
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}