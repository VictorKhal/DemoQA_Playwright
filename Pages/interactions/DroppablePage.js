import { BasePage } from "../BasePage";

export class DroppablePage extends BasePage {

    get simpleTab () {
        return this.page.locator(`#droppableExample-tab-simple`);
    }

    get acceptTab () {
        return this.page.locator(`#droppableExample-tab-accept`);
    }

    get preventPropogationTab () {
        return this.page.locator(`#droppableExample-tab-preventPropogation`);
    }

    get revertableTab () {
        return this.page.locator(`#droppableExample-tab-revertable`);
    }

    // Simple elements
    get draggable () {
        return this.page.locator(`#draggable`);
    }

    get droppable () {
        return this.page.locator(`#simpleDropContainer #droppable`);
    }

    // Accept elements
    get acceptable () {
        return this.page.locator(`#acceptable`);
    }

    get notAcceptable() {
    return this.page.locator('#acceptDropContainer>div>div:last-child');
    }

    get acceptDroppable() {
        return this.page.locator('#acceptDropContainer>div:last-child');
    }

    // Prevent Propagation elements
    get dragBox() {
        return this.page.locator('#dragBox');
    }

    get notGreedyOuter() {
        return this.page.locator('#notGreedyDropBox');
    }

    get notGreedyInner() {
        return this.page.locator('#notGreedyInnerDropBox');
    }

    get greedyOuter() {
        return this.page.locator('#greedyDropBox');
    }

    get greedyInner() {
        return this.page.locator('#greedyDropBoxInner');
    }
   
    // Revert elements
    get revertable() {
        return this.page.locator('#revertable');
    }

    get notRevertable() {
        return this.page.locator('#notRevertable');
    }

    get revertDroppable() {
        return this.page.locator('#revertableDropContainer #droppable');
    }


    async open() {
        await this.navigate('/droppable');
    }

    //Open tabs
    async openSimpleTab() {
        await this.simpleTab.isVisible();
        await this.simpleTab.click();
        await this.page.waitForTimeout(1000);
    }

    async openAcceptTab() {
        await this.acceptTab.isVisible();
        await this.acceptTab.click();
        await this.page.waitForTimeout(1000);
    }

    async openPreventPropogationTab() {
        await this.preventPropogationTab.isVisible();
        await this.preventPropogationTab.click();
        await this.page.waitForTimeout(1000);
    }

    async openRevertableTab() {
        await this.revertableTab.isVisible();
        await this.revertableTab.click();
        await this.page.waitForTimeout(1000);
    }

}