// Define an asynchronous function to search accommodations based on location input from the user.
async function searchByLocation() {
   // Retrieve location value from input field in the HTML.
    const location = document.getElementById("location").value;
    console.log(`Location ${location}`);

    try {
        // Fetch accommodation data from the server for the specified location.
        const response = await fetch(`/accommodation/${location}`);
        const data = await response.json();

        // Extract coordinates from the first item in the data array to set the map view.     
        const coordinates = data[0];
        const pinOnMap = [coordinates.latitude, coordinates.longitude];

        // Set the map view to these coordinates with a zoom level of 7.
        map.setView(pinOnMap, 7);
        // Loop through each result and add a marker to the map if the accommodation is available.
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

// Define an asynchronous function to handle accommodation booking based on type.
async function bookAccommodation(type) {
    

    const location = document.getElementById("location").value;
    console.log(`Location ${location}`);

    try {
        // Check if user is logged in before proceeding with booking.
        if (sessionStorage.getItem('loginIn') === 'true'){
        // Fetch specific accommodation data for booking.    
        const response = await fetch(`/accommodation/${location}/type/${type}`);
        const data = await response.json();
        reserveAccommodation(data);
    }else{
        // Alert the user to log in if not logged in.
        alert("Please Login if you want to book accommodation")
    }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//##################################################################################################

// Function to create HTML elements for displaying and handling accommodation booking.
function reserveAccommodation(data) {
    // Clear any previous results.
    document.getElementById("searchAccommodResoults").innerHTML = "";
    // Create a div for each accommodation result and append relevant information and inputs for booking.
    data.forEach(accommodation => {
        const div = document.createElement("div");

        const textNode1 = document.createTextNode(`Location: ${accommodation.location}`);
        const textNode2 = document.createTextNode(`Type: ${accommodation.type}`);
        const textNode3 = document.createTextNode(`Booking date: ${accommodation.thedate}`);

        // Create input for the number of people.
        const accommodationFormPeople = document.createElement("input");
        accommodationFormPeople.setAttribute("type", "number");
        accommodationFormPeople.setAttribute("id", `${accommodation.thedate}`);
        accommodationFormPeople.setAttribute("value", "1"); // Default value for number of people
        // Label for the number of people input.
        const label = document.createElement("label");
        label.textContent = "Number of People: "; // Set the label text
        label.setAttribute("for", "accommodationFormPeople");
        // Button for submitting the booking.
        const bookBtn = document.createElement("button");
        bookBtn.setAttribute("type","button");
        bookBtn.textContent = "Book";
        bookBtn.addEventListener("click",()=>booking());
        
        // Asynchronous function to handle the booking submission.
        async function booking(){
            try{
                // Store user session details.
                const storedResult = sessionStorage.getItem("loginResult");
                // Prepare new booking details for submission.
                const newText = {
                    "id":`${accomxmodation.ID}`,
                    "npeople":document.getElementById(`${accommodation.thedate}`).value,
                    "thedate":`${accommodation.thedate}`,
                    "username": storedResult
                    }
        
                    console.log(`add new title: ${JSON.stringify(newText)}`);
                 // Send booking information to the server.
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
             // Redirect to homepage after booking
             window.location.href = "/";
            
            }catch (error){
            console.error("Error",error)
            }
        }
        
        // Append all elements to the div and then to the main document.
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

// Define an asynchronous function for user authentication based on username and password.
async function userAuthentication() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {"username":`${username}`,"password":`${password}`}
      
    try {
        // Send login data to the server.
        const response = await fetch('/user_login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        });
        console.log(response)

        const result = await response.json();
        console.log("Success:", result.username);
        console.log(result)
        // Store login session details if login is successful.
        sessionStorage.setItem("loginIn",true);
        sessionStorage.setItem("loginResult",result.username);
        // Redirect to homepage after successful login.
        window.location.href = "/";
                
    // Handle successful login (e.g., redirect, display success message)
    } catch (error) {
        alert("User name or password not valid ")
    // Handle login errors (e.g., display error message to user)
    };
       
};

