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

// -----------create account-------------------------------------------------------------

let register = async () => {

    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#pass").value;


    const payload = {
        name,
        age,
        email,
        password
    }

    await fetch("https://localhost:4300/user/signup", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((result) => {
            if (result.ok) {
                alert("Registration successful");
                window.location.href = "login.html"
            }
        }).catch((err) => {
            console.log(err);
            alert(err)
        });
}


// ----------------------------------------------------------------------------
// log-in
let logindata = async()=>{

const email = document.querySelector("#logmail").value;
const password = document.querySelector("#logpass").value;

const payload = {
    email,
    password
}

const fetchedData = await fetch("https://localhost:4300/user/login", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
})

const data = await fetchedData.json();
if (fetchedData.ok) {
    alert("Log-In Sucessfully")
    window.location.href = "index.html"
}else{
    alert("wrong credentials")
}
sessionStorage.setItem("token", data.token);

}