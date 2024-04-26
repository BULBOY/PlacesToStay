async function searchByLocation() {
   
    const location = document.getElementById("location").value;
    console.log(`Location ${location}`);

    try {
        
        const response = await fetch(`/accommodation/${location}`);
        const data = await response.json();
        
        const map = L.map("map");
        const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib }).addTo(map);
             
        const coordinates = data[0];
        const pinOnMap = [coordinates.latitude, coordinates.longitude];

        map.setView(pinOnMap, 9);
        data.forEach(result => {
            if (result.availability > 0) {
                L.marker([result.latitude, result.longitude])
                    .addTo(map)
                    .bindPopup(`<b>${result.name}</b><br>Type: ${result.type}<br>Location: ${result.location}<br>Description: ${result.description}<br><br><center><button onclick="bookAccommodation('${result.type}')">Book</button>`);
            }
        });
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
//#################################################################################################


async function bookAccommodation(type) {
    

    const location = document.getElementById("location").value;
    console.log(`Location ${location}`);

    try {
        if (sessionStorage.getItem('loginIn') === 'true'){
            //
        const response = await fetch(`/accommodation/${location}/type/${type}`);
        const data = await response.json();
        reserveAccommodation(data);
    }else{
        alert("Please Login if you want to book accommodation")
    }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//##################################################################################################


function reserveAccommodation(data) {
    document.getElementById("searchAccommodResoults").innerHTML = "";
    data.forEach(accommodation => {
        const div = document.createElement("div");

        const textNode1 = document.createTextNode(`Location: ${accommodation.location}`);
        const textNode2 = document.createTextNode(`Type: ${accommodation.type}`);
        const textNode3 = document.createTextNode(`Booking date: ${accommodation.thedate}`);

        const accommodationFormPeople = document.createElement("input");
        accommodationFormPeople.setAttribute("type", "number");
        accommodationFormPeople.setAttribute("id", `${accommodation.thedate}`);
        accommodationFormPeople.setAttribute("value", "1"); // Default value for number of people

        const label = document.createElement("label");
        label.textContent = "Number of People: "; // Set the label text
        label.setAttribute("for", "accommodationFormPeople");

        const bookBtn = document.createElement("button");
        bookBtn.setAttribute("type","button");
        bookBtn.textContent = "Book";
        bookBtn.addEventListener("click",()=>booking());
        
        async function booking(){
            try{

                const newText = {
                    "id":`${accommodation.ID}`,
                    "npeople":document.getElementById(`${accommodation.thedate}`).value,
                    "thedate":`${accommodation.thedate}`
                    }
        
                    console.log(`add new title: ${JSON.stringify(newText)}`);

                const response = await fetch("/booking/add", {
                method: 'POST',
                body: accommodation,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newText)
             });
             const result = await response.json();
             alert("Your booking was successful ")
             console.log("Success:" , result)
             window.location.href = "/";
            
            }catch (error){
            console.error("Error",error)
            }
        }
        

        div.appendChild(textNode1);
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(textNode2);
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(textNode3);
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(label);
        div.appendChild(accommodationFormPeople);
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(bookBtn)
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
    

        document.getElementById("searchAccommodResoults").appendChild(div);
    });
};

//#######################################################################################################

async function userAuthentication() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {"username":`${username}`,"password":`${password}`}
    console.log(data); // For debugging purposes
      
    try {
        const response = await fetch('/user_login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        });
        console.log(response)

        if (!response.ok) {
            alert("User name or password not valid ")
        }else{
      
        const result = await response.json();
        console.log("Success:", result.username);
        console.log(result)
        sessionStorage.setItem("loginIn",true);
        sessionStorage.setItem("loginResult",result.username);
        window.location.href = "/";
        }         
    // Handle successful login (e.g., redirect, display success message)
    } catch (error) {
       // console.error("Error:", error.message);
       console.error("Error",error)
        alert("User name or password not valid ")
    // Handle login errors (e.g., display error message to user)
    };
       
};

