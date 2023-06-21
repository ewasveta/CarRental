// Client Side!!!
// [{"id":1,"brand":"BMW"},{"id":2,"brand":"Audi"},{"id":3,"brand":"Tesla"},{"id":4,"brand":"Toyota"},{"id":5,"brand":"Skoda"},{"id":7,"brand":"Volvo"},{"id":8,"brand":"Lamborghini"},{"id":9,"brand":"Renault"},{"id":9,"brand":"Peugeot"},{"id":10,"brand":"Honda"}]
//Reventón

// console.log("From the frontend")
// alert("From the frontend")

//const carsList = document.querySelector("ul#cars-list")
const carsCards = document.querySelector("#crds")

function showCars(){
    fetch("https://ewasveta.github.io/CarRental/cars.json")//("http://localhost:3000/api/cars")
    .then(res => res.json())
    .then(data => {

        // data.forEach(car => {
        //     carsList.innerHTML += `
        //     <li>${car.brand}</li>
        //  
        
        data.forEach(car => {
            carsCards.innerHTML += `
            <div class="col-sm-6 mb-3">
            <div class="card">
              <img id="i${car.id}" class="card-img-top" src="${car.photo}" alt="${car.brand} image">
              <div class="card-body">
                <h5 id="h${car.id}" class="card-title">${car.brand} ${car.model} ${car.edition}</h5>
                <p id="p${car.id}" class="card-text">Daily rent = ${car.rent} &#8362;</p>
                <a href="#" onclick="del(${car.id})" class="btn btn-outline-secondary">Delete</a>
                <a href="#" onclick="upd(${car.id})" class="btn btn-outline-secondary">Update</a>
              </div>
            </div>
          </div>
            `
        });
    })
}
showCars()

function handleSubmit(e)
{
    e.preventDefault()
    console.log("sending...")
     
    const brand   = e.target[0].value 
    const model   = e.target[1].value 
    const photo   = e.target[2].value 
    const edition = e.target[3].value 
    const rent    = e.target[4].value 

    const data = {brand, model, photo, edition, rent}

    fetch("http://localhost:3000/api/cars",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resData => 
        {
        if(resData.errors?.length > 0)
        {
            const alert = document.querySelector("#alert")
            
            alert.className = "alert alert-danger"
            alert.role = "alert"

            for (const err of resData.errors) {
                alert.innerHTML +=  err+ "<br/>"
            }
        }
    })

    console.log("here submit")
    
    toggle(false)
    // fetch("http://localhost:3000/api/cars/7",{
    //     method: "PUT",
    //     data: JSON.stringify({brand: "Tesla"})
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
}

function del(id)
{
    console.log("deleting...")
    fetch("http://localhost:3000/api/cars/" + id,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(res => res.json())
    .then(resData => {
        if(resData.errors?.length > 0)
        {
            const alert = document.querySelector("#alert")
            
            alert.className = "alert alert-danger"
            alert.role = "alert"

            for (const err of resData.errors) {
                alert.innerHTML +=  err+ "<br/>"
            }
        }
    })    
}

function upd(id)
{
    console.log("updating...")

    toggle(true)

    let h = document.querySelector(`#h${id}`).innerText.split(' ')   
    document.querySelector("#BN").value = h[0]
    document.querySelector("#MN").value = h[1]
    document.querySelector("#MY").value = h[2]

    let p = document.querySelector(`#p${id}`).innerText.split(" = ")[1].split(' ')[0]
    document.querySelector("#DR").value = p

    let i = document.querySelector(`#i${id}`).src
    document.querySelector("#PL").value = i

    del(id)
}

function toggle(bool)
{    
    document.querySelector("form").style.display = 
                        bool  ?  "block" : "none"
}
