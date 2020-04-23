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
          // inizio operazioni handlebars
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          // fine operazioni handlebars

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

              // salvo lista degli oggetti
              var listaFilms = data.results;

              // richiamo la funzione assegnando la lista degli oggetti ed il parametro per i film
              generaOutput(listaFilms, "film");
              // nascondo i dati dei film
              $(".foundedFilms").hide();
              // creo hover


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
              // salvo lista degli oggetti
              var listaFilms = data.results;

              // richiamo la funzione assegnando la lista degli oggetti ed il parametro per le serie
              generaOutput(listaFilms, "tv");
              // nascondo i dati dei film
              $(".foundedFilms").hide();
              $(".poster-div").hover(function(){
                $(this).hide();
                $(this).siblings().show();
              },function(){
                $(this).show();
                $(this).siblings().hide();

              })
              }
          })


          // creo funzione per stampare in pagina
          function generaOutput(listaOggetti, tipo) {
            for (var i = 0; i < listaOggetti.length; i++){
              // salvo ogni singolo oggetto della lista
              var ogniOggetto = listaOggetti[i];

              // INIZIO OPERAZIONI PER IL VOTO
              // salvo il voto in una var
              var voto = ogniOggetto.vote_average;
              // divido il voto per 2 portandolo in scala 1 a 5
              var diviso = voto / 2;
              // arrotondo il risultato a numero intero
              var stellaPiena = Math.ceil(diviso);
              // salvo il numero di stelle vuote
              var stellaVuota = 5 - stellaPiena;
              // salvo l'icona per la stellaVuota e la stellaPiena
              var stellinaPiena = '<i class="fas fa-star"></i>';
              var stellinaVuota = '<i class="far fa-star"></i>';
              // FINE OPERAZIONI PER IL VOTO
              // creo variabili per titolo e titolo originale
              var title, originalTitle;
              if (tipo === "film"){
                title = ogniOggetto.title;
                originalTitle = ogniOggetto.original_title;
              } else if (tipo === "tv"){
                title = ogniOggetto.name;
                originalTitle = ogniOggetto.original_name;
              }
              // salvo stringa mancante ogni poster
              var ogniPoster = ogniOggetto.poster_path;

              var context = {
                  title: ("Titolo del film : " + title),
                  origTitle : ("Titolo originale : " + originalTitle),
                  language : ("lingua: " + stampaBandiere(ogniOggetto.original_language)),
                  vote : stellinaPiena.repeat(stellaPiena) + stellinaVuota.repeat(stellaVuota),
                  locandina : "https://image.tmdb.org/t/p/w185" + ogniPoster
              };
              var risultatoDaAggiungere = template(context);
              $(".contenitor").append(risultatoDaAggiungere);




            }
          }
          // funzione per stampare le bandiere del original_language
          function stampaBandiere(codiceLang) {
            // creo e salvo array con riferimenti ai .png nella cartella flags del progetto
            var codici = ["de","en","es","fr","it","ja","pt","zh"];
            // creo var appoggio per la bandiera creata
            var imgGenerata;
            // se il codice estrapolato dall'oggetto è incluso tra i codici dei .png allora aggiungo bandiere
            if(codici.includes(codiceLang)){
              imgGenerata = '<img src="flags/' + codiceLang + '.png" alt="">'
              return imgGenerata;
            }
            return codiceLang;
          }

        }
      }
    )


});
// prendere il valore del voto, dividerlo per 2 ed arrotondarlo ad intero
//
