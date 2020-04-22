$(document).ready(function() {
     $("input").add("#login_submit").bind("keypress click", function(){});
    // creo evento click collegato al button
    $("#search-button").click(
      function(){
        // salvo valore testo inserito nell'input
        var searchMovie = $("#search").val();
        if (searchMovie != ""){
          // azzero l'input
          $("#search").val("");
          // cancello l'html già esistente in pagina
          $(".contenitor").html("");



          console.log(searchMovie);
          // richiamo API per i film
          $.ajax({
            url : "https://api.themoviedb.org/3/search/movie",
            method : "GET",
            data: {
              api_key : "5bb55649ec151524f12d940e4df95515",
              language : "it-IT",
              query : searchMovie
            },
            success: function(data){
              console.log(data.results);
              // inizio handlebars
              var source = $("#entry-template").html();
              var template = Handlebars.compile(source);
              var listaFilms = data.results;
              // fine handlebars
              for (var i = 0; i < listaFilms.length; i++){
                console.log(listaFilms[i]);
                var ogniFilms = listaFilms[i];


                // INIZIO OPERAZIONI PER IL VOTO
                // salvo il voto in una var
                var voto = ogniFilms.vote_average;
                console.log(voto);
                // divido il voto per 2 portandolo in scala 1 a 5
                var diviso = voto / 2;
                // arrotondo il risultato a numero intero
                var arrotondato = Math.round(diviso);
                console.log(arrotondato);
                // FINE OPERAZIONI PER IL VOTO

                var context = {
                    title: ("Titolo del film : " + ogniFilms.title),
                    origTitle : ("Titolo originale : " + ogniFilms.original_title),
                    language : ("Linguaggio: " + ogniFilms.original_language),
                    vote : ("voto del film: " + arrotondato)
                };
                var risultatoDaAggiungere = template(context);
                $(".contenitor").append(risultatoDaAggiungere);
              }

            }


          })
          // richiamo API per le serie
          $.ajax({
            url : "https://api.themoviedb.org/3/search/tv",

            method : "GET",
            data: {
              api_key : "5bb55649ec151524f12d940e4df95515",
              language : "it-IT",
              query : searchMovie
            },
            success: function(data){
              console.log(data.results);
              // inizio handlebars
              var source = $("#entry-template").html();
              var template = Handlebars.compile(source);
              var listaFilms = data.results;
              // fine handlebars
              for (var i = 0; i < listaFilms.length; i++){
                console.log(listaFilms[i]);
                var ogniFilms = listaFilms[i];

                // INIZIO OPERAZIONI PER IL VOTO
                // salvo il voto in una var
                var voto = ogniFilms.vote_average;
                console.log(voto);
                // divido il voto per 2 portandolo in scala 1 a 5
                var diviso = voto / 2;
                // arrotondo il risultato a numero intero
                var arrotondato = Math.round(diviso);
                console.log(arrotondato);
                // FINE OPERAZIONI PER IL VOTO

                var context = {
                    title: ("Titolo del film : " + ogniFilms.name),
                    origTitle : ("Titolo originale : " + ogniFilms.original_name),
                    language : ("Linguaggio: " + ogniFilms.original_language),
                    vote : ("voto del film: " + arrotondato)
                };
                var risultatoDaAggiungere = template(context);
                $(".contenitor").append(risultatoDaAggiungere);
              }

            }


          })



        }

      }
    )


});
// prendere il valore del voto, dividerlo per 2 ed arrotondarlo ad intero
//
