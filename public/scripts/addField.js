//document.querySelector('#container').style.backgroundColor = "red"  selecionando o id container e atribuindo um valor

//Procurar o botão
document.querySelector("#add-time")
//Quando clicar no botão
.addEventListener('click', cloneField) // Essa funcionalidade adiciona um evento, qual o tipo do evento e depois quando executar o primeiro evento


//Executar uma ação
function cloneField(){ //function é para adicionar uma ação, o () é que pode ou não receber um argumento
    //console.log("cheguei")  o console log colocará dentro da parte de console a mensagem que eu colocar dentro, o evento addEventListener ao ser clicado irá buscar a função citada e executar o que está sendo feito, nesse caso irá aparecer a mensagem no console "cheguei"
    //Duplicar os campos, quais campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //no js sempre será usado Node para elementos html, cloneNode irá duplicar o arquivo
                                                            // ao color o true dentro do () eu falo que quero pegar todos os elementos dentro do documento referenciado
                                                            // Boolean - true ou false
    //pegar os campos: Quais campos?
    const fields = newFieldContainer.querySelectorAll('input') //o All significa que pegará todos os inputs que ele encontrar lá dentro e colocar no fields

    //console.log(fields[0]) utilizado para ver no console e ver se está tudo certo até então
   // Se eu quiser acessar um elemento eu coloco o [] com a posição do elemento dentro dele, a posição começa a contar sempre de 0
   //fields[0].value ="" quando eu coloco o value eu estou atribuindo um valor e quando coloco "" vazio estou limpando o campo
   //fields[1].value =""

   //para cada campo, limpar
    fields.forEach(function(field) { //forEach significa para cada e irá executar a função dentro, podendo colocar o nome ou criar a função dentro do próprio ()
        //pegar o field do momento
        field.value = ""
    }) 

    // como havia sido criado a variável fields e ele pegou cada input na função forEach ele pegou cada elemento daquele arquivo e limpou com a função dentro do {}

   //Colocar na página: Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer) //nesse caso o documento irá colocar no docmumento referenciado um filho que estiver dentro dos parenteses
    //fields = é uma variável. const significa que eu estou falando que fields é sempre esse valor, uma variável constante
    

}
    