
    let products = [
{
name : "Ocaml Questions and answers pdf",
price :100,
img:"ocaml.JPG"
},
{
name : "DSA-I",
price :100,
img :"ocaml.JPG"
},
{
name : "DSA-II",
price :100,
img :"ocaml.JPG"}
,
{
name : "C project-I",
price :100,
img : "ocaml.JPG"
}
,
{
name : "C project-II",
price :100,
img :"ocaml.JPG"
}
,
{
name : "Electronics-I",
price :100,
img :"ocaml.JPG"
}
,{
name : "Electronics-II",
price :100,
img :"ocaml.JPG"
}

];

    let params = new
    URLSearchParams(window.location.search);
    let id = Number(params.get("id"));
     
     document.getElementById("pname").innerText = "Preview " + products[id].name;
    document.getElementById("pimg").src =  products[id].img;
    document.getElementById("pdf_features").innerText = "Features : All in one book for " + products[id].name;


let add = document.getElementById("Add");
  
add.addEventListener("click" , function(){
    window.location.href = "index.html?id=" + id;
   
} )
