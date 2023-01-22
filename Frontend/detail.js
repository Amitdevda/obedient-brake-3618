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
// -----------------------------------------------------------------------


let showdata = JSON.parse(localStorage.getItem("detaildata"));

// console.log(showdata)

function detailrender(data) {
    return document.querySelector("#detail").innerHTML =

        `
<div>
<img src=${data.image} alt="">
</div>
<div>
<h2>${data.title}</h2>
<br>
<hr>
<br>
<h3>Category : ${data.category}</h3>
<br>
<hr>
<br>
<h3>Price : $ ${data.price}</h3>
<br>
<hr>
<br>
<h2>Size</h2>
<br>
<select name="" class="detail_size">
    <option value="">Select Size</option>
    <option value="">XXS</option>
    <option value="">XS</option>
    <option value="">S</option>
    <option value="">M</option>
    <option value="">L</option>
    <option value="">XL</option>
    <option value="">XXL</option>
</select>
<br>
<br>
<hr>
<br>
<br>
<img src="images/detail_color.JPG" alt="">
<br>
<button onclick="add_to_bag(showdata)"  id="add_bag">Add To Bag</button>
</div>
`

}

detailrender(showdata)


function add_to_bag(data) {
    const image = data.image;
    const title = data.title;
    const category = data.category
    const price = data.price;

    const payload = {
        image,
        title,
        category,
        price
    }

    fetch("https://nice-blue-basket-clam-gown.cyclic.app/cart/addcart", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
        body: JSON.stringify(payload)
    })
        .then(result => {
            result.json()
            if (result.ok) {
                alert("Product Added to the Bag")
                window.location.href = "all.html"
            }
        })
        .then(data => {
        })
        .catch(err => {
            console.log(err);
        })
}