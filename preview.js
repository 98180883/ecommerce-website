
    let products = [
{
name : "ocaml",
price :100,
img:"card1.webp"
},
{
name : "python",
price :100,
img:"card2.webp"
},
{
name : "HTMl & CSS",
price :100,
img:"card3.webp"}
,
{
name : "JavaScript part-I",
price :100,
img:"card4.webp"
}
,
{
name : "C++ Project part-I",
price :100,
img:"card5.webp"
}
,
{
name : "Electronics-I",
price :100,
img:"card6.webp"
}
,{
name : "Electronics-II",
price :100,
img:"card7.webp"
}

];

    let params = new
    URLSearchParams(window.location.search);
    let id = Number(params.get("id"));
     
     document.getElementById("pname").innerText = "Get started with  " + products[id].name;
    document.getElementById("pimg").src =  products[id].img;
    document.getElementById("pdf_features").innerText = "Features : All in one book for " + products[id].name;


let add = document.getElementById("Add");
  
add.addEventListener("click" , function(){
    window.location.href = "index.html?id=" + id;
   
} )
