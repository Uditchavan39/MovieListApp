var movie_identity="";
function movie_description(){
    const queryString=window.location.search;
    const urlParam=new URLSearchParams(queryString);
    const movie_id=urlParam.get('movie_id');
    movie_identity=movie_id;
    fetch_single_movie_info(movie_id);
    show_comments(movie_id);
    show_rating();
}

async function fetch_single_movie_info(id){
    const response=await fetch("https://www.omdbapi.com/?i="+id+"&apikey=14081cd5&");
    const movies=await response.json();
    if(movies.Response="True")
    push_movie_details_in_view(movies);
    else
    console.log(movies);
}
function push_movie_details_in_view(movies){
         let movie_poster_id=document.getElementById("movie_poster_id");
         let movie_title_id=document.getElementById("movie_heading_id");
         let movie_info_id=document.getElementById("movie_info_id");
         let movie_img=document.createElement("img");
         let movie_title=document.createElement("h2");
         movie_title.textContent=movies.Title;
         movie_img.src=movies.Poster;
         movie_poster_id.appendChild(movie_img);
         movie_title_id.appendChild(movie_title);
 
        let movie_Genre=document.createElement("h4");
            movie_Genre.textContent="Genre : "+movies.Genre;
        movie_info_id.appendChild(movie_Genre);
        let movie_Type=document.createElement("h4");
        movie_Type.textContent="Type : "+movies.Type;
    movie_info_id.appendChild(movie_Type);
    
        let movie_Language=document.createElement("h4");
        movie_Language.textContent="Langugage : "+movies.Language;
    movie_info_id.appendChild(movie_Language);

        let movie_Releasedate=document.createElement("h4");
            movie_Releasedate.textContent="Release Date : "+movies.Released;
        movie_info_id.appendChild(movie_Releasedate);
 
        let movie_Rated=document.createElement("h4");
            movie_Rated.textContent="Rating : "+movies.Rated;
            movie_info_id.appendChild(movie_Rated);

        let movie_Runtime=document.createElement("h4");
        movie_Runtime.textContent="RunTime : "+movies.Runtime;
    movie_info_id.appendChild(movie_Runtime);

    let movie_plot_head=document.createElement("h4");
    let movie_plot=document.createElement("p");
    movie_plot_head.textContent="Plot :";
    movie_plot.textContent=movies.Plot;
    movie_plot_head.appendChild(movie_plot);
    movie_info_id.appendChild(movie_plot_head);
    }

    function add_comment(){
      let read_comment=document.getElementById("comment_movie_here_input");
        var getcomment=localStorage.getItem(movie_identity)==null?[]:JSON.parse(localStorage.getItem(movie_identity));
        if(read_comment.value!=""){  
            getcomment.unshift(read_comment.value); 
            localStorage.setItem(movie_identity,JSON.stringify(getcomment));
        }
        read_comment.value="";
        show_comments();
    }
    
    function show_comments(movie_id){
        var getcomment=localStorage.getItem(movie_identity)==null?[]:JSON.parse(localStorage.getItem(movie_identity));
      let comm_show=document.getElementById("movie_comments_show");
      comm_show.innerHTML=""; 
      for(i=0;i<getcomment.length;i++){
        let movie_Comments=document.createElement("h4");
        movie_Comments.textContent="Comment "+i+" : "+getcomment[i];
        comm_show.appendChild(movie_Comments);
       }

    }
function add_rating_to_movie(){
    let star0=document.getElementById("star_0");
    let star1=document.getElementById("star_1");     
    let star2=document.getElementById("star_2");
    let star3=document.getElementById("star_3");
    let star4=document.getElementById("star_4");
localStorage.setItem("star0"+movie_identity,star0.checked);
localStorage.setItem("star1"+movie_identity,star1.checked);
localStorage.setItem("star2"+movie_identity,star2.checked);
localStorage.setItem("star3"+movie_identity,star3.checked);
localStorage.setItem("star4"+movie_identity,star4.checked);

}
 function show_rating(){
    let generate_star_here=document.getElementById("generate_star_here");
    generate_star_here.innerHTML='';
    for(i=0;i<5;i++){
      let che=localStorage.getItem("star"+i+movie_identity);
      if(che=="true")  
    generate_star_here.innerHTML+="<input class=star type=checkbox checked id=star_"+i+">";    
        else{
            generate_star_here.innerHTML+="<input class=star type=checkbox  id=star_"+i+">";    
        }
}
}