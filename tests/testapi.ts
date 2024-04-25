import { createGame, deleteGames, getGames } from "./api"

const gamedetail = {developer:"developer",publisher:"putin",platform:"Nintendo Wii",title:"space space",description:"100 charts dont mean a god damn thing",releaseDate: "2021-09-14T00:00:00.000Z"}
async function testapi(){
    const games:any = await getGames()
    for (const x of games){
        if (x.title === gamedetail.title){

            console.log("bingo")
            const  res = await deleteGames(x.id)
            console.log(res)
        }
    }
} 

const gameTodelete = {developer:"space space",publisher:"space space",platform:"MS-DOS",title:"space space",releaseDate: "2021-09-14T00:00:00.000Z",description:"100 charts dont mean a god damn thing"}
createGame(gameTodelete).then((res) => {
    return testapi()
} ).then(console.log).catch(console.error)





// function processJSON({ key1, key2 = 42 }: { key1: string, key2?: number }) {
//     console.log(key1);
//     console.log(key2);
// }

// // Using default parameters for key2
// processJSON({ key1: "custom" });