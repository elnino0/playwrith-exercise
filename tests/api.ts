const url = "http://ec2-13-49-145-115.eu-north-1.compute.amazonaws.com:3000/api/games"
//Note: usallay using fluent api but the is no log in or seestion managment so out of scope 
//Note: i used defaute instade of factory design for simplefaction 



export async function createGame({
  title,
  description,
  platform,
  developer,
  publisher,
  releaseDate,
  playMode= "Single Player",
  maxPlayers= 2,
  language = "en",
  communityStarRating= 4,
  communityStarRatingTotalVotes = 1,
  cover = "Goblins%20Quest%203-01.jpg",
  back ="Goblins Quest 3-01.jpg",
  spine = "Goblins Quest 3-01.jpg",
  box3D = "goblins-quest-3.png",
  boxColor = "#b4463a",
  frontWidth = 842,
  frontHeight = 960,
  spineWidth = 245,
  spineHeight = 1600,
  videoUrl= "https://www.youtube.com/watch?v=Hj_c7k7pNks",
  video = "Goblins%20Quest%203.5243d576-4859-4f67-b04a-8e23e49beb7a-01.mp4"
}:{
    title: string,
    description: string,
    platform: string,
    developer: string,
    publisher: string,
    releaseDate: string,
    playMode?: string,
    maxPlayers?: number,
    language?: string,
    communityStarRating?: number,
    communityStarRatingTotalVotes?: number,
    cover?: string,
    back?: string,
    spine?: string,
    box3D?: string,
    boxColor?: string,
    frontWidth?: number,
    frontHeight?: number,
    spineWidth?: number,
    spineHeight?: number,
    videoUrl?: string,
    video?: string
  }) {

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(  {title,
          description,
          platform,
          developer,
          publisher,
          releaseDate,
          playMode,
          maxPlayers,
          language,
          communityStarRating,
          communityStarRatingTotalVotes,
          cover,
          back ,
          spine,
          box3D,
          boxColor,
          frontWidth,
          frontHeight,
          spineWidth,
          spineHeight,
          videoUrl,
          video
        }),
        headers: {'Content-Type': 'application/json; charset=UTF-8'} });
        if (!response.ok) { throw response.statusText }

      return response.json()

}

export async function deleteGames(id:string) {

    const response = await fetch(url+'/'+id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json; charset=UTF-8'} });
      
      if (!response.ok) { throw response.statusText }
      
      

}


export async function getGames() {

  const response = await fetch(url, {
      method: 'get',
      headers: {'Content-Type': 'application/json; charset=UTF-8'} });
    
    if (!response.ok) { throw response.statusText }

    return response.json()

}




