
var total_results=0;
var total_pages=1;
var fetching=false;
var movie_id_data=[];
var search_field=document.getElementById("search_movie_here_input");
function add_movies_view_in_page(search_item,page_num){
    let movie_list_view=document.getElementById("add_10_movie_in_it");
    movie_list_view.innerHTML='';
    if(!fetching)
    fetch_movie_list(search_item,page_num);

    for(i=0;i<10;i++){
        let movie_box=create_single_movie_elem(i);
    movie_list_view.appendChild(movie_box);
   }
   
  //fill_poster_and_movie_name(movie_requested);
}
function create_single_movie_elem(id){
    let single_movie=document.createElement("div");
    single_movie.className="single_movie";
    single_movie.setAttribute("onclick","single_movie_clicked("+id+")");
    let movie_poster=document.createElement("div");
    movie_poster.className="poster_image";
    let movie_name=document.createElement("div");
    movie_name.className="movie_name";
    movie_name.id="movie_name_"+id;
    movie_poster.id="movie_poster_"+id;
    single_movie.appendChild(movie_poster);
    single_movie.appendChild(movie_name);
    return single_movie;
}
async function fetch_movie_list(search,page_num){
    fetching=true;
    const response=await fetch("https://www.omdbapi.com/?s="+search+"&page="+page_num+"&apikey=14081cd5&");
    const movies=await response.json();
    console.log(movies);
    if(movies["Response"]=='True'){
    update_movie_in_view(movies);
    total_results=movies["totalResults"];
    total_pages=Math.floor(total_results/10);
    present_item_on_page=movies["Search"].length;
    for(i=0;i<movies["Search"].length;i++){
        movie_id_data[i]=movies["Search"][i].imdbID;
    }
}
    fetching=false;

}
function update_movie_in_view(movies){
   const len= movies["Search"].length;
    for(i=0;i<len;i++){
        let movie_poster_id=document.getElementById("movie_poster_"+i);
        let movie_title_id=document.getElementById("movie_name_"+i);
        let movie_img=document.createElement("img");
        let movie_title=document.createElement("h5");
        movie_title.textContent=movies["Search"][i].Title;
        movie_img.src=movies["Search"][i].Poster;
                movie_img.className="poster_image";
        movie_poster_id.appendChild(movie_img);
        movie_title_id.appendChild(movie_title);
    }
}


function go_to_next_page(){
    let current_page=document.getElementById("current_page_shown");
    const num= parseInt(current_page.innerText);
   if(num<=total_pages){
    current_page.innerText=num+1; 
    add_movies_view_in_page(search_field.value,num+1);
   }
}
function go_to_prev_page(){
    let current_page=document.getElementById("current_page_shown");
    const num= parseInt(current_page.innerText);
    if(num>1){
    current_page.innerText=num-1; 
    add_movies_view_in_page(search_field.value,num+1);
 
}
}
function search_on_key_up(){
    search_field.addEventListener("keyup",function(){
       if(search_field.value.length>2 && !fetching){
        console.log(search_field.value);

            add_movies_view_in_page(search_field.value,1);
       }
    });
    if(search_field.value.length>2){
        add_movies_view_in_page(search_field.value,1);
    }
}
function search_movie(){
    if(search_field.value.length>2 && !fetching)
        add_movies_view_in_page(search_field.value,1);
}

//----------------------------------on movie click---------------------------

function single_movie_clicked(id) {
  console.log(id+" "+movie_id_data[id]);  
  window.location.href="movie.html?movie_id="+movie_id_data[id];

};

