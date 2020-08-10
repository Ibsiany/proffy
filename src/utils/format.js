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

function convertHoursToMinutes (time){
    const [hour, minutes] = time.split(":")  
    return Number((hour * 60) + minutes)  
}

function getSubject(subjectNumber) { 
    const position = +subjectNumber - 1 
    return subjects[position] 
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}