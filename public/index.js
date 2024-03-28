// async function searchByLocation() {
//     const location = document.getElementById("location").value;
//     console.log(`Location ${location}`);

//const { cache } = require("ejs");

//     //const result = asinc fetch(`/location/${location}`)
//     fetch(`/accommodation/${location}`)
//         .then(res => res.json())
//         .then(data => {      
//             const map = L.map("map");
//             const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
//             L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{ attribution: attrib }).addTo(map);

//             const coordinates = data[0];
//             const pinOnMap = [coordinates.latitude,coordinates.longitude];

//             map.setView(pinOnMap,9);
//             data.forEach(result => {
//             if(result.availability > 0){
//             L.marker([result.latitude, result.longitude])
//             .addTo(map)
//             .bindPopup(`<b>${result.name}</b><br>Type: ${result.type}<br>Location: ${result.location}<br>Description: ${result.description}<br><br><center><button onclick = "reserveAcomodation(${result.type})" id="book">Book</button>`);
//             }else{}
            
//             });
//             bookAccommodation(result.type)
            
         
//         })

// }
// ///location/:name/type/:type


// async function bookAccommodation(type){
//     const location = document.getElementById("location").value;
//     const typetype = document.getElementById("type").value;
//     console.log(`Location ${location}`);

//     await fetch(`/accommodation/${location}/type/${typetype}`)
//         .then(res => res.json())
//         .then(data =>{
//             console.log(data);
//             reserveAcomodation(acc_type);
//         });
//     }

// async function reserveAcomodation(acc_type) {
//     document.getElementById("searchAccommodResoults").innerHTML = "";
//     acc_type.forEach(acomod => {
//         const div = document.createElement("div");

//         const newTitle = {
//             "location": document.getElementById(`${acomod.location}`),
//             "type": document.getElementById(`${acomod.type}`),
//             "thedate": document.getElementById(`${acomod.thedate}`),
//             "npeople": document.getElementById("people")
//         };

//         console.log(`add new title: ${JSON.stringify(newTitle)}`);

//         const textNode1 = document.createTextNode(`Location: ${acomod.location}`)
//         const textNode2 = document.createTextNode(`Type: ${acomod.type}`)
//         const textNode3 = document.createTextNode(`Boobking date: ${acomod.thedate}`)

//         // const accommodationFormLocation = document.createElement("input");
//         // accommodationFormLocation.setAttribute("type", "text");
//         // accommodationFormLocation.setAttribute("value", `${acomod.location}`);

//         // const accommodationFormType = document.createElement("input");
//         // accommodationFormType.setAttribute("type", "text");
//         // accommodationFormType.setAttribute("value", `${acomod.type}`);

//         const accommodationFormPeople = document.createElement("input");
//         accommodationFormPeople.setAttribute("type", "text");
//         accommodationFormPeople.setAttribute("name", "people");




//         div.appendChild(textNode1)
//         div.appendChild(document.createElement("br"))
//         div.appendChild(textNode2)
//         div.appendChild(document.createElement("br"))
//         div.appendChild(textNode3)
//         div.appendChild(document.createElement("br"))
        
//         //div.appendChild(document.createElement(" "))
//         //div.appendChild(accommodationFormType)
//         //div.appendChild(document.createElement(" "))
//         div.appendChild(accommodationFormPeople)
//         div.appendChild(document.createElement("br"))
//         div.appendChild(document.createElement("br"))
//         //div.appendChild(document.createElement(" "))
//         document.getElementById("searchAccommodResoults").appendChild(div);
//     })
// }

// }
// //function printLocationInEJS(data) {
//     // NEW SOLUTION: Text + Button to buy (using DOM)
//  //function bookAccommodation(data) {
//   // Blank out the results <div>
// //   document.getElementById("searchAccommodResoults").innerHTML = "";

// //   // Loop through each song in the JSON
// //   data.forEach(acomod => {
// //       // Create a <div> for the current song
// //       const div = document.createElement("div");

// //       // Create a text node to hold the song details
// //       const textNode = document.createTextNode(`${acomod.type} ${acomod.name}: Feedback: ${acomod.description}`);

// //       // Append the text node to the <div>
// //       div.appendChild(textNode);

// //       // Create a button, allowing the user to buy the song
// //       const bookBtn = document.createElement("input");
// //       bookBtn.setAttribute("type", "button");
// //       bookBtn.setAttribute("value", "Book!");

// //       // Add an event listener to the button
// //       bookBtn.addEventListener("click", async () => {
// //           try {
// //               // Send a POST request to the 'buy' route
// //               const response = await fetch(`/location/${acomod.name}/type/${acomod.type}`, {
// //                   method: 'POST'
// //               });

// //               // Check the status code, was it successful or not?
// //               if (response.status == 200) {
// //                   //alert('Successfully bought!');
// //                   alert(`Song ${acomod.name} by ${acomod.type} successfully bought!`);
// //               } else {
// //                   // If there was an error, the JSON returned from the server 
// //                   // will contain an "error" field.
// //                   const jsonData = await response.json();
// //                   alert(jsonData.error);
// //               }
// //           } catch (e) {
// //               alert(`Error with song ID ${acomod.id}: ${e}`);
// //           }
// //       });

// //       // Add the buy button to the <div>
// //       div.appendChild(bookBtn);

// //       // Add the <div> to the overall results <div>
// //       document.getElementById("searchAccommodResoults").appendChild(div);
// //   });
// // }

//############################################################################

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
}

async function bookAccommodation(type) {
    const location = document.getElementById("location").value;
    console.log(`Location ${location}`);

    try {
        const response = await fetch(`/accommodation/${location}/type/${type}`);
        const data = await response.json();
        reserveAccommodation(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function reserveAccommodation(data) {
    document.getElementById("searchAccommodResoults").innerHTML = "";
    data.forEach(accommodation => {
        const div = document.createElement("div");

        const textNode1 = document.createTextNode(`<b>Location: ${accommodation.location}`);
        const textNode2 = document.createTextNode(`Type: ${accommodation.type}`);
        const textNode3 = document.createTextNode(`Booking date: ${accommodation.thedate}`);

        const accommodationFormPeople = document.createElement("input");
        accommodationFormPeople.setAttribute("type", "number");
        accommodationFormPeople.setAttribute("id", "people");
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
                    "npeople":document.getElementById("people").value,
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
             console.log("Success:" , result)
            
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
}
