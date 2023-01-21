let account = document.querySelector("#account")
let ss = 1;
account.addEventListener("click",()=>{
    if(ss==1){
        ss=0;
        document.querySelector("#acc").style.display = "block"
    }else{
        ss=1;
        document.querySelector("#acc").style.display = "none"
    }
})

// -----------------------------------------------------------------------

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '85f3a2b75dmsh7b81e77607b8697p1d9af6jsn45f407131aa7',
		'X-RapidAPI-Host': 'v1-sneakers.p.rapidapi.com'
	}
};

fetch('https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=%3CREQUIRED%3E', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));