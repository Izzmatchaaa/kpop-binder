let photocards = JSON.parse(localStorage.getItem("pcs")) || [
{
    id: 1,
    idol: "Sunghoon",
    group: "Enhypen",
    era: "Daydream",
    price: 15,
    image: "images/Sunghoon.jpg",
    wishlist: false
}
];

const binder = document.getElementById("binder");
const search = document.getElementById("search");
const totalText = document.getElementById("total");

function save(){
    localStorage.setItem("pcs", JSON.stringify(photocards));
}

function render(data){

    binder.innerHTML = "";

    let total = 0;

    data.forEach(pc => {

        total += Number(pc.price);

        binder.innerHTML += `
        <div class="card" onclick="flipCard(this)">

            <div class="card-inner">

                <div class="card-front">
                    <img src="${pc.image}">
                </div>

                <div class="card-back">

                    <h3>${pc.idol}</h3>
                    <p>${pc.group}</p>
                    <p>${pc.era}</p>
                    <p>RM ${pc.price}</p>

                    <div class="heart" onclick="toggleWish(event, ${pc.id})">
                        ${pc.wishlist ? "❤️" : "🤍"}
                    </div>

                    <button onclick="deleteCard(event, ${pc.id})">Delete</button>

                </div>

            </div>

        </div>
        `;
    });

    totalText.innerText = `Total Value: RM ${total}`;

    save();
}

function flipCard(card){
    card.classList.toggle("flipped");
}

function toggleWish(e, id){
    e.stopPropagation();

    const pc = photocards.find(p => p.id === id);
    pc.wishlist = !pc.wishlist;

    render(photocards);
}

function deleteCard(e, id){
    e.stopPropagation();

    photocards = photocards.filter(pc => pc.id !== id);

    render(photocards);
}

function addCard(){

    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];

    if(!file){
        alert("Sila pilih gambar dulu!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(){

        const newCard = {
            id: Date.now(),
            idol: document.getElementById("idol").value,
            group: document.getElementById("group").value,
            era: document.getElementById("era").value,
            price: document.getElementById("price").value,
            image: reader.result,
            wishlist: false
        };

        photocards.push(newCard);

        render(photocards);
    }

    reader.readAsDataURL(file);
}

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    const filtered = photocards.filter(pc =>
        pc.idol.toLowerCase().includes(value)
    );

    render(filtered);
});

render(photocards);