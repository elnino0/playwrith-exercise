import { test, expect } from '@playwright/test';
import { GameDiscricption, MainPage } from './main_page';
import { after, afterEach, before, beforeEach } from 'node:test';
import { createGame, deleteGames, getGames } from './api';

const describe = test.describe;

describe('Edit Mode', () => {

  describe('Edit Mode add game', ()  => {

    const gamedetail = {developer:"developer",publisher:"putin",platform:"Nintendo Wii",title:"propagenda2323",description:"100 charts dont mean a god damn thing",releaseDate: "2021-09-14T00:00:00.000Z"}
    test.beforeAll(async ()=>{
      const games:any = await getGames()  
      for (const x of games){
          if (x.title === gamedetail.title){
             await deleteGames(x.id)
          }
      }
    })

    test("Edit mode then add game", async ({ page }) =>{
      const mainpage = new MainPage(page)
      await mainpage.goto()
  
      await mainpage.clickEdit()
      await mainpage.clickAdd()

      await expect(mainpage.addGame_view.add).toBeVisible()
      await expect(mainpage.addGame_view.cancel).toBeVisible()
      await expect(mainpage.addGame_view.communityStarRating).toBeVisible()
      await expect(mainpage.addGame_view.communityStarRatingTotalVotes).toBeVisible()
      await expect(mainpage.addGame_view.description).toBeVisible()
      await expect(mainpage.addGame_view.developer).toBeVisible()
      await expect(mainpage.addGame_view.platform).toBeVisible()
      await expect(mainpage.addGame_view.add).toBeVisible()


      await mainpage.addGame(gamedetail)
      //NOTE:  tried but not work no avoid from timeout - never use timeout can be sub with pulling - out of this scope 
      // for some reason done button still Visible after blure no buildtin solution 
      // await expect(mainpage.done).toBeVisible({timeout:10000})
      // await expect(mainpage.done).toBeEnabled({timeout:10000})
      // await expect(mainpage.done).not.toBeDisabled({timeout:10000})
      // await expect(mainpage.done).not.toBeHidden({timeout:10000})
      await page.waitForTimeout(10000)
      const gamedetailView = new GameDiscricption(page)

      await expect(gamedetailView.Developer).toBeVisible()
      await expect(gamedetailView.Platform).toBeVisible()
      await expect(gamedetailView.Publisher).toBeVisible()
      await expect(gamedetailView.ReleaseDate).toBeVisible()
      await expect(gamedetailView.cancelBotton).toBeVisible()

      await gamedetailView.cancelBotton.click()
      await mainpage.done.click()
      await expect(mainpage.collection).toBeVisible()
      await expect(mainpage.collection.getByAltText(gamedetail.title)).toBeVisible()
    } )

    test("Edit mode button click then cancel add game", async ({ page }) =>{
      const mainpage = new MainPage(page)
      await mainpage.goto()
  
      await mainpage.clickEdit()
      await mainpage.clickAdd()
      
      await expect(mainpage.addGame_view.add).toBeVisible()
      await expect(mainpage.addGame_view.cancel).toBeVisible()
      await expect(mainpage.addGame_view.communityStarRating).toBeVisible()
      await expect(mainpage.addGame_view.communityStarRatingTotalVotes).toBeVisible()
      await expect(mainpage.addGame_view.description).toBeVisible()
      await expect(mainpage.addGame_view.developer).toBeVisible()
      await expect(mainpage.addGame_view.platform).toBeVisible()

      await mainpage.cancelAddGame()
      await mainpage.done.click()
      await expect(mainpage.collection).toBeVisible()
      

    } )

});
  
  
  describe('Deleting a game',  () => {
    
    const gameTodelete = {developer:"hackerman",publisher:"putin",platform:"MS-DOS",title:"space space",releaseDate: "2021-09-14T00:00:00.000Z",description:"100 charts dont mean a god damn thing"}
    test.beforeEach(async ()=>{
      const games = await getGames()  
      for (const x of games){
          if (x.title === gameTodelete.title){
              await deleteGames(x.id)
          }
      }
      await createGame(gameTodelete)
    })
  
    test("select game then find delete button and click", async ({ page }) =>{
      const mainpage = new MainPage(page)
      await mainpage.goto()
  
      await mainpage.clickEdit()

      await mainpage.deleteGame(gameTodelete.title)

      await mainpage.done.click()
      await expect(mainpage.collection).toBeVisible()
      await expect(mainpage.collection.getByAltText(gameTodelete.title)).not.toBeVisible()
    } )


  });

  describe('Game Details Modal', () => {
    test.beforeEach(async ()=>{
      const games = await getGames()  
      for (const x of games){
          if (x.title === visiableGame.title){
              await deleteGames(x.id)
          }
      }
      await createGame(visiableGame)
    })

    const visiableGame = {developer:"hackerman",publisher:"putin",platform:"MS-DOS",title:"space space",releaseDate: "2021-09-14T00:00:00.000Z",description:"100 charts dont mean a god damn thing"}

    test(" select game then verify details ", async ({ page }) =>{
      const mainpage = new MainPage(page)
      await mainpage.goto()
  
      await expect(mainpage.collection).toBeVisible()
      const game = mainpage.collection.getByText(visiableGame.title)
      await game.scrollIntoViewIfNeeded()
      await expect(game).toBeVisible()
      await game.click()
      const gamedetail = new GameDiscricption(page)

      await expect(gamedetail.Developer).toBeVisible()
      await expect(gamedetail.Platform).toBeVisible()
      await expect(gamedetail.Publisher).toBeVisible()
      await expect(gamedetail.ReleaseDate).toBeVisible()
      await expect(gamedetail.cancelBotton).toBeVisible()

    
      await expect(gamedetail.details.getByText(visiableGame.developer)).toBeVisible()
      await expect(gamedetail.details.getByText(visiableGame.platform)).toBeVisible()
      await expect(gamedetail.details.getByText(visiableGame.publisher)).toBeVisible()
      await expect(gamedetail.details.getByText(visiableGame.title)).toBeVisible()
  } )

  });

});

