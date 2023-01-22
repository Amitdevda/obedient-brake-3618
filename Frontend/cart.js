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

document.querySelector("#username").innerText = user_name || "Welcome";
// // -----------------------------------------------------------------------

let user_id = JSON.parse(localStorage.getItem("user"))
let bag = []

const cartdata = async (user_id) => {

    await fetch(`http://localhost:4300/cart/showcart?userID=${user_id}`, {
        headers: {
            "Authorization": sessionStorage.getItem("token")
        }
    }).then(result => result.json()).then(data => {
        bag = data
        showcart(data);
        pricing(data)
    })
        .catch(err => {
            console.log(err);
        })
}


function showcart(data) {
    document.querySelector("#cart_cont").innerHTML = "";

    data.forEach(element => {

        let div = document.createElement("div");

        let image = document.createElement("img");
        image.setAttribute("src", element.image)
        image.setAttribute("id", "size")

        let title = document.createElement("h3");
        title.innerText = element.title

        let category = document.createElement("p");
        category.innerText = `Category : ${element.category}`;

        let price = document.createElement("p");
        price.innerText = `Price : ₹ ${element.price}`;
        price.setAttribute("class", "rs")

        let rem_div = document.createElement("div")
        rem_div.innerText = "REMOVE"
        rem_div.setAttribute("class", "rm_cart")
        rem_div.addEventListener("click", () => {
            remove_cart(element)
        })


        div.append(image, title, category, price, rem_div);

        document.querySelector("#cart_cont").append(div);

    });
}


cartdata(user_id)


async function remove_cart(element) {
    let id = element._id;

    await fetch(`http://localhost:4300/cart/deletecart/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": sessionStorage.getItem("token")
        }
    }).then(result => {
        result.json();
        if (result.ok) {
            cartdata(user_id)
        }
    }).catch(err => {
        console.log(err);
    })

}

// console.log(bag)

async function pricing(myarr){
    let count = 0;
    let sum = 0;

    for(let i=0;i<myarr.length;i++){
        sum += myarr[i].price;
        count++;
    }
    
    document.querySelector("#amt").innerText = `Total Amount : ₹ ${sum}`;
    localStorage.setItem("amo",JSON.stringify(sum))
    document.querySelector("#num").innerText = `No. of Products in Cart : ₹ ${count}`;
}