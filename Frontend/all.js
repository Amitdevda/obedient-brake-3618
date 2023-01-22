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

let user_name = JSON.parse(sessionStorage.getItem("name"))

document.querySelector("#username").innerText = user_name || "Welcome";
// -----------------------------------------------------------------------

let bag
const displaydata = async () => {

    fetch("https://nice-blue-basket-clam-gown.cyclic.app/pro/all", {
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
    document.querySelector("#all_container").innerHTML = "";

    data.forEach(element => {

        let div = document.createElement("div");

        let butt = document.createElement("button");
        butt.innerText = "QUICK SHOP";
        butt.setAttribute("class", "add_to_cart");
        butt.addEventListener("click", () => {
            detailing(element)
        })

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


        div.append(butt, image, title, category, price);

        document.querySelector("#all_container").append(div);

    });
}

displaydata()

// ----------------go to detail page--------------------------------------------

function detailing(element) {
    localStorage.setItem("detaildata", JSON.stringify(element))
    location.href = "detail.html"
}

// --------search------------------------------------------------------------------

document.querySelector(".search").addEventListener("input", () => {
    let q = document.querySelector(".search").value;
    let newdata = bag.filter((elem) => {
        return elem.title.toLowerCase().includes(q.toLowerCase());
    })
    show(newdata)
})


// ----------filter by category---------------------------------------------

document.querySelector("#subcate").addEventListener("change", () => {
    let q = document.querySelector("#subcate").value;
    let newdata = bag.filter((elem) => {
        return elem.title.toLowerCase().includes(q.toLowerCase());
    })
    show(newdata)
})

// -----------price sorting-------------------------------------------------------


let sor = document.querySelector("#sorting")

sor.addEventListener("change", () => {
    changer(sor.value)
})

function changer(sor) {
    let temp = bag.slice(0)

    temp = temp.sort((a, b) => {
        if (sor == "asc") {
            return Number(a.price) - Number(b.price)
        }
        if (sor == "dsc") {
            return Number(b.price) - Number(a.price)
        }
        if (sor == "") {
            return temp;
        }
    })
    show(temp)
}
