//browserify index.js > bundle.js
const arraySort = require('array-sort');
const request = require('request')
function createTable(htmlElement,finalArray){
    var table = document.createElement("table");
    table.border = "1" ;
    var columnCount = finalArray[0].length
    var row = table.insertRow (-1)
    for(var i=0; i <columnCount; i ++) {
        var headerCell = document.createElement ("th")
        headerCell.innerHTML = finalArray[0][i]
        row.appendChild(headerCell)
    }
    for(var i=1; i <finalArray.length; i ++) {
        row = table.insertRow (-1)
            for(var j = 0; j <columnCount; j ++) {
                    var cell = row.insertCell (-1)
                    cell.innerHTML = finalArray[i][j]
                }
            } 
    var dvTable = document.getElementById ( htmlElement )
        dvTable.innerHTML = "" 
        dvTable.appendChild(table)
}
var buttonTableFilms = document.getElementById("button-table-films").addEventListener("click", function generateTableFilms(){
    request('https://swapi.co/api/films/', function (error, response, body) {
        console.log('error:', error) 
        console.log('statusCode:', response && response.statusCode) 
        //console.log('body:', body) 
        var content = []
        content = JSON.parse(body)
        var resultRequest = content.results
        var result = []
        var resultFilms = []
        var posters = ["http://br.web.img3.acsta.net/c_215_290/medias/nmedia/18/91/98/26/20172772.jpg",
                        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Attackoftheclones_novel.jpg/220px-Attackoftheclones_novel.jpg",
                        "https://upload.wikimedia.org/wikipedia/pt/thumb/0/05/Star_Wars_Phantom_Menace_-_P%C3%B4ster.jpg/250px-Star_Wars_Phantom_Menace_-_P%C3%B4ster.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/512K3DWTQ0L._SY445_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/61EBQbgRFvL._SX335_BO1,204,203,200_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51QvoX064kL._SX303_BO1,204,203,200_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/814X0lSCJQL._SY445_.jpg"
                        ]
        var sinopses = ["A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader. Luke Skywalker e o capitão Han Solo precisam libertá-la e restaurar a liberdade e a justiça na galáxia.",
                        "Tentado por promessas de poder, Anakin Skywalker se aproxima de Darth Sidious e participa de um plano para acabar com os Cavaleiros Jedi.",
                        "Obi-Wan e seu mentor embarcam em uma perigosa aventura na tentativa de salvar o planeta das garras de Darth Sidious. Durante a viagem, eles conhecem um habilidoso menino e decidem treiná-lo para se tornar um Jedi. Mas o tempo irá revelar que as coisas nem sempre são o que aparentam ser.",
                        "As Guerras Clônicas estão em pleno andamento e Anakin Skywalker mantém um elo de lealdade com Palpatine, ao mesmo tempo em que luta para que seu casamento com Padmé Amidala não seja afetado por esta situação. Seduzido por promessas de poder, Anakin se aproxima cada vez mais de Darth Sidious até se tornar o temível Darth Vader. Juntos eles tramam um plano para aniquilar de uma vez por todas com os cavaleiros jedi.",
                        "Uma nova Estrela da Morte está sendo construída e supervisionada pelo imperador. Han Solo e a Princesa Leia são libertados das mãos de Jabba por Luke Skywalker, que só se tornará um Jedi quando destruir Darth Vader, que deseja atraí-lo para o lado sombrio da Força.",
                        "Yoda treina Luke Skywalker para ser um cavaleiro Jedi. Han Solo corteja a Princesa Leia enquanto Darth Vader retorna para combater as forças rebeldes que tentam salvar a galáxia.",
                        "A queda de Darth Vader e do Império levou ao surgimento de uma nova força sombria: a Primeira Ordem. Eles procuram o jedi Luke Skywalker, desaparecido. A resistência tenta desesperadamente encontrá-lo antes para salvar a galáxia."
        ]
        //pegando apenas os dados que me interessam do body 
        for(var i=0; i<resultRequest.length; i++){
            result.push({ 
                nome : resultRequest[i].title,
                lancamento : resultRequest[i].release_date,
                diretor : resultRequest[i].director,
                sinopse : sinopses[i],
                poster: posters[i]
                
            })
        }
        var resultSort = (arraySort(result,'lancamento'))
        for (var i = 0; i < resultSort.length; i++) {
            resultFilms.push(Object.values(resultSort[i]))
        }

        resultFilms.unshift(["Nome","Lançamento","Diretor","Sinopse","Poster"])
        
        var table = document.createElement("table");
        table.border = "1" ;
        var columnCount = resultFilms[0].length
        var row = table.insertRow (-1)
        for(var i=0; i <columnCount; i ++) {
            var headerCell = document.createElement ("th")
            headerCell.innerHTML = resultFilms[0][i]
            row.appendChild(headerCell)
        }
        //não fiz a chamada da função pois neste caso tem imagens
        for(var i=1; i <resultFilms.length; i ++) {
            row = table.insertRow (-1)
                for(var j = 0; j <columnCount; j ++) {
                    if( j == 4){
                        var url = resultFilms[i][j]
                        var img = `<img src=${url} width="150px" heigth="150px" >`
                        var cell = row.insertCell(-1)
                        cell.innerHTML = img
                    }else{
                        var cell = row.insertCell (-1)
                        cell.innerHTML = resultFilms[i][j]
                    }
                } 
        }
        var dvTable = document.getElementById ( "dvTable" )
            dvTable.innerHTML = "" 
            dvTable.appendChild(table)
    })
}
)

var buttonPeople = document.getElementById("button-people").addEventListener("click",function(){
    request('https://swapi.co/api/people/',function(error,response,body){
        console.log('error:', error) 
        console.log('statusCode:', response && response.statusCode) 
        //console.log('body:', body) 
        var response = []
        response = JSON.parse(body)
        response = response.results
        var responseRequest = []
        for(var i=0; i<response.length; i++){
            responseRequest.push({
                nome: response[i].name,
                aniversario: response[i].birth_year,
                corOlhos: response[i].eye_color,
                genero: response[i].gender,
                corCabelo: response[i].hair_color,
                tamanho:response[i].height,
                peso: response[i].mass,
                corPele: response[i].skin_color
            })
        }
        var resultPeople =[]
        for(var i=0; i<responseRequest.length; i++){
            resultPeople.push(Object.values(responseRequest[i]))
        }
        resultPeople.unshift(["Nome","Aniversario","Cor dos Olhos","Gênero","Cor do Cabelo","Tamanho","Peso","Cor da pele"])
        console.log(resultPeople)
        createTable("dvPeople",resultPeople)
    })
})

var buttonPlanet = document.getElementById("button-planets").addEventListener("click",function(){
    request('https://swapi.co/api/planets/',function(error,response,body){
        console.log('error:', error) 
        console.log('statusCode:', response && response.statusCode) 
        //console.log('body:', body) 
        var response = []
        response = JSON.parse(body)
        var response = response.results
        var resultPlanet = []
        for(var i=0; i<response.length; i++){
            resultPlanet.push({
                nome: response[i].name,
                rotacao: response[i].rotation_period,
                orbita:  response[i].orbital_period,
                diametro:  response[i].diameter,
                clima:  response[i].climate,
                gravidade:  response[i].gravity,
                populacao:  response[i].population,
                agua: response[i].surface_water,
                terreno: response[i].terrain
            })
        }
        resultPlanet.unshift(["Nome","Rotação","Orbita","Diametro","Clima","Gravidade","População","Água da superfície","Terreno"])
        var finalResult = []
        for(var i=0; i<resultPlanet.length; i++){
            finalResult.push(Object.values(resultPlanet[i]))
        }
        createTable("dvPlanets",finalResult)
    })

})

var buttonSpecies = document.getElementById("button-species").addEventListener("click", function(){
    
    request('https://swapi.co/api/species/',function(error,response,body){
        console.log('error:', error) 
        console.log('statusCode:', response && response.statusCode) 
        //console.log('body:', body) 
        var response = []
        response = JSON.parse(body)
        var response = response.results
        var resultSpecies = []
        for(var i=0; i<response.length; i++){
            resultSpecies.push({
                nome: response[i].name,
                lingua: response[i].language,
                corCabelo: response[i].hair_colors,
                corOlhos:  response[i].eye_colors,
                designacao: response[i].designation,
                classificacao: response[i].classification,
                tempoVida: response[i].average_lifespan,
                peso: response[i].average_height,
                corPele: response[i].skin_colors
    
            })
        }
        console.log(resultSpecies)
        resultSpecies.unshift(["Nome","Lingua","Cor do cabelo","Cor dos olhos","Designação","Classificação","Tempo de vida","Peso","Cor da pele"])
        var finalResult = []
        for(var i=0; i<resultSpecies.length; i++){
            finalResult.push(Object.values(resultSpecies[i]))
        }
        createTable("dvSpecies",finalResult)
    })
})

var buttonStarShips = document.getElementById("button-star-ships").addEventListener("click", function(){
    request('https://swapi.co/api/starships/',function(error,response,body){
        console.log('error:', error) 
        console.log('statusCode:', response && response.statusCode)
        //console.log('body:', body) 
        var response = []
        response = JSON.parse(body)
        var response = response.results
        var resultStarShips = []
        for(var i=0; i<response.length; i++){
            resultStarShips.push({
                nome: response[i].name,
                modelo: response[i].model,
                capacidade: response[i].cargo_capacity,
                passageiros: response[i].passengers,
                classe: response[i].starship_class,
                consumiveis: response[i].consumables,
                custo: response[i].cost_in_credits,
                tripulacao: response[i].crew,
                mglt: response[i].MGLT,
                classificação_hyperdrive: response[i].hyperdrive_rating,
                tamanho: response[i].length,
                manofatura: response[i].manufacturer,
                max_velo_atm: response[i].max_atmosphering_speed,
            })
        }
        resultStarShips.unshift(["Nome","Modelo","Capacidade","Passageiros","Classe","Consumiveis","Custo em creditos","Tripulacao","MGLT","Classificação","Tamanho","Manofatura","Velocidade Máxima"])
        var finalResult = []
        for(var i=0; i<resultStarShips.length; i++){
            finalResult.push(Object.values(resultStarShips[i]))
        }
        createTable("dvStarShips",finalResult)
    })
})