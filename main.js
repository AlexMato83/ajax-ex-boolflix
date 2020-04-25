$(document).ready(function() {



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
              generaOutput(listaFilms, "FILM");

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
              generaOutput(listaFilms, "SERIE TV");



            }
          })


          // creo funzione per stampare in pagina
          function generaOutput(listaOggetti, tipo) {
            for (var i = 0; i < listaOggetti.length; i++){
              // salvo ogni singolo oggetto della lista
              var ogniOggetto = listaOggetti[i];
              // nascondo i dati sotto i poster
              $(".foundedFilms").hide();

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
              if (tipo === "FILM"){
                title = ogniOggetto.title;
                originalTitle = ogniOggetto.original_title;
              } else if (tipo === "SERIE TV"){
                title = ogniOggetto.name;
                originalTitle = ogniOggetto.original_name;
              }
              // salvo stringa mancante ogni poster
              var ogniPoster = ogniOggetto.poster_path;

              var context = {
                  title: ("Titolo del film : " + title),
                  origTitle : ("Titolo originale : " + originalTitle),
                  language : ("Lingua: " + stampaBandiere(ogniOggetto.original_language)),
                  vote : stellinaPiena.repeat(stellaPiena) + stellinaVuota.repeat(stellaVuota),
                  // locandina : "https://image.tmdb.org/t/p/w342" + ogniPoster,
                  locandina: stampaPoster(ogniPoster),
                  type : tipo,
                  overview : stampaOverview(ogniOggetto.overview)
              };
              var risultatoDaAggiungere = template(context);
              $(".contenitor").append(risultatoDaAggiungere);



              // funzione per stampare i poster
              function stampaPoster(fineUrl){
                var posterStampato;
              if (fineUrl){
                var urlCompleto = "https://image.tmdb.org/t/p/w342" + fineUrl;
                posterStampato =  '<img src="' + urlCompleto + '" alt="">';
              } else {
                posterStampato = '<img src="logo/null.jpg" alt="">';
              }
              return posterStampato;
              }
            }
          }
          // inizio funzione per stampare le bandiere del original_language
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
          // fine funzione per stampare le bandiere del original_language

          // inizio gestione dell'hover tra poster e dati
           $(".contenitor").on("mouseenter", ".elemento",function(){
             $(this).find(".poster-div").hide();
             $(this).find(".foundedFilms").show();
           });

           $(".contenitor").on("mouseleave", ".elemento",function(){
             $(this).find(".poster-div").show();
             $(this).find(".foundedFilms").hide();
           });
           // fine gestione dell'hover tra poster e dati

           // inizio funzione dell'Overview
           function stampaOverview(dati) {
             var risultato;
             if (dati == ""){
               risultato = "Siamo spiacenti, overview non disponibile.";
             } else {
               risultato = dati;
             }
             return risultato;
           }
        }
      }
    )
});
