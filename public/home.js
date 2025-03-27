import haversineDistance from './haversine.js';
let ordernow = document.getElementById('order-now') ;
let remove = document.getElementById('delete');

ordernow.addEventListener('click',async (e)=>{
    e.preventDefault();

    console.log("Hello");

    const selectedCarType = document.getElementById('carType').value;
    const fromLocation = document.getElementById('fromLocation').value;
    const destinationLocation = document.getElementById('toLocation').value;
    const telephone = document.getElementById('phoneNumber').value;
    const paymethod = document.getElementById('paymethod').value;
    const userid=document.getElementById('userid').value;

    try{
        let status = await fetch(`/findride`, {method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sct: `${selectedCarType}`,
              fl: `${fromLocation}`,
              dl: `${destinationLocation}`,
              tel: `${telephone}`,
              uid: `${userid}`
            })});
        if(!status.ok)
        {
            throw new Error("Error finding matches");
        }
        let statusdata = await status.json();
        console.log(statusdata);

    }catch(err){
        console.log(err);
    }

    console.log("Button clicked");
    
    try{
        let source = await fetch(`https://nominatim.openstreetmap.org/search?q=${fromLocation}&format=json`);
        let dest = await fetch(`https://nominatim.openstreetmap.org/search?q=${destinationLocation}&format=json`);
        if(!source.ok){
            throw new Error("Error fetching results");
        }
        if(!dest.ok){
            throw new Error("Error fetching results");
        }
        let sourcedata = await source.json();
        let destdata = await dest.json();
        let lat1 = Number(sourcedata[0].lat);
        let lon1 = Number(sourcedata[0].lon);
        let lat2 = Number(destdata[0].lat);
        let lon2 = Number(destdata[0].lon);

        let distance = haversineDistance(lat1,lon1,lat2,lon2);
        console.log(distance);

    }catch(err){
        console.log(err);
    }

    localStorage.setItem('fromLocation', fromLocation);
    localStorage.setItem('destinationLocation', destinationLocation);
    localStorage.setItem('distance', distance);
    localStorage.setItem('selectedCarType', selectedCarType);
    localStorage.setItem('paymethod', paymethod);
    localStorage.setItem('totalCost', totalCost);
    
    // Redirect to the new page
    window.location.href = 'ride-details.html';
    
})


remove.addEventListener('click',async (e) => {
    e.preventDefault();

    const userIdToDelete = 1;

    try {
        let response = await fetch(`/deleteride/${userIdToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Error deleting ride");
        }

        let responseData = await response.json();
        console.log(responseData); 
        alert('Ride deleted successfully!');

    } catch (error) {
        console.error(error);
        alert('Error deleting the ride!');
    }
});

try{
    let details = await fetch('/allrides');
    if(!details.ok){
        throw new Error('Error fetching data');
    }
    let detailsdata = await details.json();
    console.log(detailsdata);
}catch(err){
    console.log(err);
}