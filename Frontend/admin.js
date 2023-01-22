let account = document.querySelector("#account")
let ss = 1;
account.addEventListener("click", () => {
    if (ss == 1) {
        ss = 0;
        document.querySelector("#acc").style.display = "block"
    } else {
        ss = 1;
        document.querySelector("#acc").style.display = "none"
    }
})

let user_name = JSON.parse(sessionStorage.getItem("name"))

document.querySelector("#username").innerText = "ADMIN";
// -----------------------------------------------------------------------

async function adddata() {
    const image = document.querySelector("#adm_img").value;
    const title = document.querySelector("#adm_title").value;
    const category = document.querySelector("#adm_cate").value;
    const price = document.querySelector("#adm_price").value;

    const payload = {
        image,
        title,
        category,
        price
    }

    await fetch("https://nice-blue-basket-clam-gown.cyclic.app/pro/add", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload)
    })
        .then(result => {
            result.json()
            if (result.ok) { alert("Product live on Website") }
        })
        .then(data => {
        })
        .catch(err => {
            console.log(err);
        })

}


function output(data) {
    document.querySelector("#cont").innerHTML = "";

    if (data.length != 0) {

        data.forEach(element => {

            let div = document.createElement("div");

            let title = document.createElement("h3");
            title.innerText = `Title : ${element.title}`

            let body = document.createElement("p");
            body.innerText = `Notes : ${element.body}`;

            let device = document.createElement("p");
            device.innerText = `Category : ${element.device}`;

            let edit = document.createElement("button");
            edit.innerText = `Edit`;
            edit.addEventListener("click", () => {
                update(element._id);
            })

            let btn = document.createElement("button");
            btn.innerText = `Delete`;

            btn.addEventListener("click", () => {
                deleting(element._id);
            });

            div.append(title, body, device, edit, btn);

            document.querySelector("#cont").append(div);

        });

    } else {
        document.querySelector("#cont").innerHTML = `<h2>No any Social Medial Appended, Please Append.</h2>`
    }
}


// -----------------Renove by Admin---------------------------------------------


const displaydata = async () => {

    await fetch("https://nice-blue-basket-clam-gown.cyclic.app/pro/all", {
        headers: {
            "Authorization": sessionStorage.getItem("token")
        }
    }).then(result => result.json()).then(data => {
        bag = data
        show(data);
    })
        .catch(err => {
            console.log(err);
        })
}


function show(data) {
    document.querySelector("#adm_data").innerHTML = "";
    // console.log(data)

    data.forEach(element => {

        let div = document.createElement("div");

        let image = document.createElement("img");
        image.setAttribute("src", element.image)

        let child = document.createElement("div");

        let title = document.createElement("h3");
        title.innerText = element.title

        let category = document.createElement("p");
        category.innerText = `Category : ${element.category}`;

        let price = document.createElement("p");
        price.innerText = `Price : ₹ ${element.price}`;
        price.setAttribute("class", "rs")

        let edit = document.createElement("button")
        edit.innerText = "EDIT"

        let dele = document.createElement("button")
        dele.innerText = "DELETE"
        dele.addEventListener("click", () => {
            adm_delepro(element)
        })


        child.append(title, category, price, edit, dele);
        div.append(image, child);

        document.querySelector("#adm_data").append(div);

    });
}


displaydata()



async function adm_delepro(element) {

    let id = element._id;

    await fetch(`https://nice-blue-basket-clam-gown.cyclic.app/pro/delete/${id}`, {
        method: "DELETE",
    }).then(result => {
        result.json();
        if (result.ok) {
            displaydata()
        }
    }).catch(err => {
        console.log(err);
    })

}


let stat = document.querySelector("#adm_1")
let add = document.querySelector("#adm_2")

stat.addEventListener("click",()=>{
    document.querySelector("#stat").style.display="block"
    document.querySelector("#form").style.display="none"
})

add.addEventListener("click",()=>{
    document.querySelector("#stat").style.display="none"
    document.querySelector("#form").style.display="block"
})