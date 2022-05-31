document.body.innerHTML=`
<div class="container-fluid">
<h1>Find Nationality</h1>
<input type="text" id="searchtext" placeholder=" enter the name" size="40" onkeyup="getdata()"><br><br>
<input type="button" value="search" id="btn" class="btn btn-primary">
<input type="button" value="reset" id="resetbtn" class="btn btn-danger">
</div>
<div class=" container-fluid resultdiv">
<h4>Top Two Countries<br></h4>
<h4 id=result></h4><br><br>
</div>`

let searchingtext=document.querySelector("#searchtext");
let resultdata=document.querySelector("#result");
let searchbtn=document.querySelector("#btn");
let resetbtn=document.querySelector("#resetbtn");

searchbtn.addEventListener("click", async ()=>{
    let searchedtext=document.getElementById("searchtext").value;
    if(searchedtext.length==0||searchedtext.includes(" ")){
         alert("Please enter the valid name without any spaces");

    }
else {
      
        try{
            let respose=await fetch(`https://api.nationalize.io/?name=${searchedtext}`);
           let responseresult= await respose.json();
           console.log(responseresult);
           for(let i=0;i<2;i++){
          resultdata.innerHTML+=
             `
                countrycode:${responseresult.country[i].country_id}<br>
                Probability :${responseresult.country[i].probability}<br><br>`
           }
           
        }
        catch(error){
            resultdata.innerHTML=error;
        }
        
    }
});
resetbtn.addEventListener("click",()=>{
resultdata.innerHTML="";
searchingtext.value="";
});