let apiKey = 'eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k'
let nowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
let popular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
let topRated =`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
let trending=`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
let upcomoing=`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;


let movies = [];
async function getNowPlaying() {
    let response = await fetch(nowPlaying);
    let result = await response.json();
    movies = result.results;
    $( "li:first" ).css( "color", "red" );
    $("li:first").siblings().css("color","white");
    display();
}
async function getPopular() {
  let response = await fetch(popular);
  let result = await response.json();
  movies = result.results;
  display();
}
async function getTrending() {
  let response = await fetch(trending);
  let result = await response.json();
  movies = result.results;
  display();
}
async function getTopRated() {
  let response = await fetch(topRated);
  let result = await response.json();
  movies = result.results;
  display();
}
async function getupcoming() {
  let response = await fetch(upcomoing);
  let result = await response.json();
  movies = result.results;
  display();
}
async function search(searchWord) {
  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchWord}&language=en-US&page=1&include_adult=false`);
  let result = await response.json();
  movies = result.results;
  display();
}




function display() {
    var str = '';
    movies.forEach(movie => {
        str += `
        <div class="col-md-6 col-lg-4 mb-3">
        <div class="movie">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" srcset="">
          <div class="description">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rate : ${movie.vote_average}</p>
            <p>${movie.release_date}</p>
          </div>
        </div>
        </div>`
    });
    $('#movies').html(str);
}
getNowPlaying();




$('li').click(function(){

  $(this).css({color:"red"});
  $(this).siblings().css({color:"white"});

  switch(this.id){
    case 'now-playing':
      getNowPlaying();
      break;
    case 'popular':
      getPopular();
      break;
    case 'top-rated':
      getTopRated();
      break;
    case 'trending':
      getTrending();
       break;
    case 'upcoming':
      getupcoming();
      break;
  }

})

$('#search').keyup(function(){
  var word =$(this).val();
  if(word !='')
    search(word);
  else
    getNowPlaying();
})

$('#searchPage').keyup(function(){
  var str = '';
  var word =$(this).val();
  movies.forEach(movie => {
    if(movie.title.toLowerCase().includes(word))
    str += `
    <div class="col-md-6 col-lg-4 mb-3">
    <div class="movie">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" srcset="">
      <div class="description">
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
        <p>Rate : ${movie.vote_average}</p>
        <p>${movie.release_date}</p>
      </div>
    </div>
    </div>`
});
$('#movies').html(str);
})

$('#close').click(function(){
  var navOffset = $('nav').offset().left;
  if(navOffset==0){
    $('nav').css({left: '-250px'})
    $(this).html('<i class="fas fa-bars"></i>');
  }
  else{
    $('nav').css({left: 0});
    $(this).html('<i class="fas fa-times"></i>');
    $('.menu li').animate({padding:'10px'},2000)
  }

});


var nameFlag , ageFlag , emailFlag , passwordFlag , confirmFlag , phoneFlag ;
nameFlag = ageFlag = emailFlag = passwordFlag = confirmFlag = phoneFlag =false

$('#name').keyup(function(){
  var value = $(this).val();
  if(/^[a-zA-Z0-9]+$/.test(value)){
    $(this).next().css({display:'none'});
    nameFlag= true;
  }
  else{
    $(this).next().css({display:'block'});
    nameFlag= false;
  }
})
$('#email').keyup(function(){
  var value = $(this).val();
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
    $(this).next().css({display:'none'});
    emailFlag= true;
  }
  else{
    $(this).next().css({display:'block'});
    emailFlag= false;
  }
})
$('#phone').keyup(function(){
  var value = $(this).val();
  if(/(01)[0-9]{9}/.test(value)){
    $(this).next().css({display:'none'});
    phoneFlag= true;
  }
  else{
    $(this).next().css({display:'block'});
    phoneFlag= false;
  }
})

$('#age').keyup(function(){
  var value = $(this).val();
  if( /^[1-9][0-9]?$|^100$/.test(value)){
    $(this).next().css({display:'none'});
    ageFlag= true;
  }
  else{
    $(this).next().css({display:'block'});
    ageFlag= false;
  }
})
$('#password').keyup(function(){
  var value = $(this).val();
  if( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)){
    $(this).next().css({display:'none'});
    passwordFlag= true;
  }
  else{
    $(this).next().css({display:'block'});
    passwordFlag= false;
  }
})

validConfirmation = $('#rePassword').keyup(function(){
  var value = $(this).val();
  if(value == $('#password').val()){
    $(this).next().css({display:'none'});
    confirmFlag= true;
  }
  else{
    $(this).next().css({display:'block'});
    confirmFlag= false;
  }
})

$('#submitBtn').click(function(){
  if(nameFlag&&phoneFlag&&ageFlag&&emailFlag&&passwordFlag&&confirmFlag){
    $(this).next().html('Submitted Successfuly');
    $(this).next().attr("class","text-success pt-2");
  }

  else{
    $(this).next().html('Check the form again');
    $(this).next().attr("class","text-danger pt-2");
  }

})




