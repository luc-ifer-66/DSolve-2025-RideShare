const go = document.querySelector('.go');

go.addEventListener('click', async()=>{
    try{
        const data = await fetch(`https://nominatim.openstreetmap.org/search?q=mumbai&format=json`);
        if(!data.ok){
            throw new Error("Data fetch failed");
        }
        let result = await data.json();
        console.log(result);
    }catch(err){data
        console.log(err)
    }
})