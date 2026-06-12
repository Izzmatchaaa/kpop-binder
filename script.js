let photocards = JSON.parse(localStorage.getItem("pcs")) || [
{
    id: 1,
    idol: "Sunghoon",
    group: "Enhypen",
    era: "Daydream",
    price: 15,
    image: "images/Sunghoon.jpg"
}
];

const binder = document.getElementById("binder");
const search = document.getElementById("search");

function save(){
    localStorage.setItem("pcs", JSON.stringify(photocards));
}

function render(data){

    binder.innerHTML = "";

    data.forEach(pc => {

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

                    <button class="delete-btn" onclick="deleteCard(event, ${pc.id})">
                        Delete
                    </button>

                </div>

            </div>

        </div>
        `;
    });

    save();
}

function flipCard(card){
    card.classList.toggle("flipped");
}

/* ADD CARD */
function addCard(){

    const file = document.getElementById("imageFile").files[0];

    if(!file){
        alert("Choose image dulu");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(){

        photocards.push({
            id: Date.now(),
            idol: document.getElementById("idol").value,
            group: document.getElementById("group").value,
            era: document.getElementById("era").value,
            price: document.getElementById("price").value,
            image: reader.result
        });

        render(photocards);
    }

    reader.readAsDataURL(file);
}

/* SEARCH */
search.addEventListener("input", () => {

    const val = search.value.toLowerCase();

    const filtered = photocards.filter(pc =>
        pc.idol.toLowerCase().includes(val)
    );

    render(filtered);
});

/* DELETE */
function deleteCard(e, id){
    e.stopPropagation();

    photocards = photocards.filter(pc => pc.id !== id);

    render(photocards);
}

/* STATS */
function showStats(){

    let total = 0;
    let mostExpensive = photocards[0];
    let idolCount = {};

    photocards.forEach(pc => {

        total += Number(pc.price);

        // MOST EXPENSIVE
        if(Number(pc.price) > Number(mostExpensive.price)){
            mostExpensive = pc;
        }

        // COUNT PER IDOL
        if(idolCount[pc.idol]){
            idolCount[pc.idol]++;
        } else {
            idolCount[pc.idol] = 1;
        }
    });

    // build idol stats text
    let idolText = "";
    for(let idol in idolCount){
        idolText += `${idol}: ${idolCount[idol]} cards<br>`;
    }

    document.getElementById("statsText").innerHTML = `
        📦 Total Cards: ${photocards.length}<br>
        💰 Total Spent: RM ${total}<br><br>

        👑 Most Expensive:<br>
        ${mostExpensive.idol} (${mostExpensive.group}) - RM ${mostExpensive.price}<br><br>

        👤 Cards per Idol:<br>
        ${idolText}
    `;

    document.getElementById("popup").classList.remove("hidden");
}

function closeStats(){
    document.getElementById("popup").classList.add("hidden");
}

render(photocards);
