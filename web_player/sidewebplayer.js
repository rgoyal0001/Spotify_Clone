// storinjson()
async function storinjson()
{
   
    
   try {
//   let playlist_cont=document.getElementById("palylist_container")
//     playlist_cont.innerHTML=""
   
  
    let res=await fetch(`http://localhost:3000/playlist`)
    let dataa=await res.json()
    console.log(dataa)
    dataa.forEach(ele => {
        // let playlist=document.createElement("a")
        // playlist.className=`playlistadd`
    
    // playlist.textContent=ele.Number_of_play_list+ele.id
    // playlist_cont.append(playlist)

    });


   } catch (error) {
       console.log(error)
   }

}
async function addplaylist(){
    let playlist_cont=document.getElementById("palylist_container")
    playlist_cont.innerHTML=""
    
    let pp=`My Playlist #`
     try {
     
    let body={
        "Number_of_play_list":pp
    }
    // console.log(body)
     let res=await fetch(`http://localhost:3000/playlist`,{
         method:"POST",
        body:JSON.stringify(body),
     headers:{
             "Content-Type":"application/json"
        }
        
    })
    // console.log(res)
    let data=await res.json()
    console.log(data)
    storinjson()

     }
      catch (error) {
         console.log("error")
     }
  

}

