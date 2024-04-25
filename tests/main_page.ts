import { Locator, Page,expect } from "@playwright/test"


class AddGame{
    details:Locator
    title_label:Locator
    title:Locator
    communityStarRating_label:Locator
    communityStarRating:Locator
    communityStarRatingTotalVotes_label:Locator
    communityStarRatingTotalVotes:Locator
    platform_label:Locator
    platform:Locator
    releaseDate_label:Locator
    releaseDate:Locator
    developer_label:Locator
    developer:Locator
    publisher_label:Locator
    publisher:Locator
    description_label:Locator
    description:Locator
    page:Page
    add:Locator
    cancel:Locator

    constructor(page: Page) {
        this.page = page;
        this.details =  page.locator('.kb-game-details');
        this.title_label = this.details.locator('div.flex:nth-child(1) > label:nth-child(1)', { hasText: 'title' });
        this.communityStarRating_label = this.details.locator('div.flex:nth-child(2) > label:nth-child(1)', { hasText: 'communityStarRating' });
        this.communityStarRatingTotalVotes_label = this.details.locator('div.flex:nth-child(3) > label:nth-child(1)', { hasText: 'communityStarRatingTotalVotes' });
        this.platform_label = this.details.locator('div.flex:nth-child(4) > label:nth-child(1)', { hasText: 'platform' });
        this.releaseDate_label = this.details.locator('div.flex:nth-child(5) > label:nth-child(1)', { hasText: 'releaseDate' });
        this.developer_label = this.details.locator('div.flex:nth-child(6) > label:nth-child(1)', { hasText: 'developer' });
        this.publisher_label = this.details.locator('form.ng-pristine', { hasText: 'publisher' });
        this.description_label = this.details.locator('div.flex:nth-child(8) > label:nth-child(1)', { hasText: 'description' });
        
        this.title = this.details.locator('#title');
        this.communityStarRating = this.details.locator('.p-rating');
        this.communityStarRatingTotalVotes = this.details.locator('#communityStarRatingTotalVotes');
        this.platform = this.details.locator('.p-dropdown-trigger-icon > path:nth-child(1)');
        this.releaseDate = this.details.locator('#releaseDate');
        this.developer = this.details.locator('#developer');
        this.publisher = this.details.locator('#publisher');
        this.description = this.details.locator('#description');
        this.add = this.details.locator('p-button.p-element:nth-child(1)');
        this.cancel = this.details.locator('.p-button-secondary > span:nth-child(1)', { hasText: 'Cancel' });


    }

}

export class GameDiscricption{
    details:Locator
    Developer:Locator
    ReleaseDate:Locator
    Publisher:Locator
    Platform:Locator
    cancelBotton:Locator
    page:Page
    constructor(page: Page) {
        this.page = page;
        this.details = page.locator('.kb-game-details');
        this.Developer =this.details.getByText("Developer");
        this.ReleaseDate = this.details.getByText('Release Date');
        this.Publisher = this.details.getByText('Publisher');
        this.Platform = this.details.locator('.game-description > div:nth-child(3) > strong:nth-child(1)');
        this.cancelBotton = this.details.getByText('close');
      }
}

export class MainPage{
    edit:Locator
    add:Locator
    collection:Locator
    done:Locator
    page:Page
    addGame_view:AddGame


    constructor(page: Page) {
        this.page = page;
        this.edit = page.locator('.edit-collection > span:nth-child(1)', { hasText: 'edit' });
        this.collection = page.locator('.kb-playlist-collection');
    }

    async clickEdit(){
        await this.edit.click()
        this.done = this.page.locator(".edit-collection > span:nth-child(1)", { hasText: 'done' })
        this.add = this.page.locator('.add-game > span:nth-child(1)', { hasText: 'add' });
        await expect(this.done).toBeVisible
        await expect(this.done).toBeEnabled
        await expect(this.add).toBeVisible
        await expect(this.add).toBeEnabled

    }

    async clickAdd(){
        this.add.click()
        this.addGame_view = new AddGame(this.page)

        await expect(this.addGame_view.developer).toBeVisible
        await expect(this.addGame_view.developer).toBeEnabled
        await expect(this.addGame_view.publisher).toBeVisible
        await expect(this.addGame_view.publisher).toBeEnabled
        await expect(this.addGame_view.title).toBeVisible
        await expect(this.addGame_view.title).toBeEnabled

    }

    async addGame(details:{developer:any,publisher:any,platform:string,title:any,description:any,releaseDate:any}){
        
       await this.addGame_view.developer.fill(details.developer)

       await this.addGame_view.platform.click()
       await this.addGame_view.details.locator("#platform_list > p-dropdownitem:nth-child(2)").click()
       await this.addGame_view.platform.click()

       await this.addGame_view.publisher.fill(details.publisher)
       await this.addGame_view.title.fill(details.title)
       await this.addGame_view.description.fill(details.description)
       await this.addGame_view.releaseDate.fill(details.releaseDate)

       await this.addGame_view.add.click()
    }

    async cancelAddGame(){
        await this.addGame_view.cancel.click()
    }

    async deleteGame(gameName:string){
        const game = await this.collection.getByText(gameName)
        await game.scrollIntoViewIfNeeded()
        await expect(game).toBeVisible({timeout:10000})
        await expect(game).toBeEnabled({timeout:10000})
       
        const deleteButton = await this.page.locator("div.kb-card").filter({hasText:gameName}).getByRole("button")
        await deleteButton.click()
    }
    //Note: for urls should us config file in this mettar page should know his url not write on the test
    async goto() {
        await this.page.goto('http://ec2-13-49-145-115.eu-north-1.compute.amazonaws.com:3000');
        await expect(this.collection).toBeVisible()
        await expect(this.collection).toBeEnabled()
        await expect(this.edit).toBeVisible()
        await expect(this.edit).toBeEnabled()
      }
    

}
