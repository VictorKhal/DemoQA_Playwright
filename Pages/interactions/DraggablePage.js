import { BasePage } from "../BasePage.js";
import { expect } from '@playwright/test';


export class DraggablePage extends BasePage {

    get simpleTab () {
        return this.page.locator(`#draggableExample-tab-simple`);
    }

    get axisRestrictionTab () {
        return this.page.locator(`#draggableExample-tab-axisRestriction`);
    }

    get containerRestrictionTab () {
        return this.page.locator(`#draggableExample-tab-containerRestriction`);
    }

    get cursorStyleTab () {
        return this.page.locator(`#draggableExample-tab-cursorStyle`);
    }

    // Simple elements
    get dragBoxSimple () {
        return this.page.locator(`#dragBox`);
    }

    // Axis restricted elements
    get restrictedOnlyX () {
        return this.page.locator(`#restrictedX`);
    }
    get restrictedOnlyY () {
        return this.page.locator(`#restrictedY`);
    }
    
    // Container restricted elements
    get containerWithBox () {
        return this.page.locator(`#containmentWrapper`);
    }
    get boxInContainer () {
        return this.page.locator(`#containmentWrapper>div`);
    }
    get containerWithText () {
        return this.page.locator(`//div[@class="draggable ui-widget-content m-3"]`);
    }
    get textInContainer () {
        return this.page.locator(`//div[@class="draggable ui-widget-content m-3"]/span`);
    }
    
    // Cursor style elements
    get cursorCenter () {
        return this.page.locator(`#cursorCenter`);
    }
    get cursorTopLeft () {
        return this.page.locator(`#cursorTopLeft`);
    }
    get cursorBottom () {
        return this.page.locator(`#cursorBottom`);
    }

    async open() {
        await this.navigate('/dragabble');
    }

    async selectSimpleTab() {
        await expect(this.simpleTab).toBeVisible();
        await this.simpleTab.click();
    }

    async selectAxisRestrictionTab() {
        await this.axisRestrictionTab.isVisible();
        await this.axisRestrictionTab.click();

    }

    async selectContainerRestrictionTab() {
        await this.containerRestrictionTab.isVisible();
        await this.containerRestrictionTab.click();
    }

    async selectCursorStyleTab() {
        await this.cursorStyleTab.isVisible();
        await this.cursorStyleTab.click();
    }

    async cursorCheck(element) {
        const sourceCenter = await this.centerElement(element);

        await this.page.evaluate(() => {
            window.mousePos = { x: 0, y: 0 };
            window.addEventListener('mousemove', (e) => {
                window.mousePos = { x: e.clientX, y: e.clientY };
            });
        });

        await this.page.mouse.move(sourceCenter.x, sourceCenter.y, {steps: 10});
        await element.hover();

        await this.page.mouse.down();
        await this.page.mouse.move(600, 350, {steps: 15});

        const finalPositionMouse = await this.page.evaluate(() => window.mousePos);

        const finalPositionElement = await element;
        const finalSourceBox = await finalPositionElement.boundingBox();
        const centerElement = {
            x: Math.round(finalSourceBox.x + finalSourceBox.width / 2),
            y: Math.round(finalSourceBox.y + finalSourceBox.height / 2)
        };

        const epsilon = 10;
        const equalX = Math.abs(centerElement.x - finalPositionMouse.x) < epsilon;
        const equalY = Math.abs(centerElement.y - finalPositionMouse.y) < epsilon;

        if(equalX === true && equalY === true) {
            return "Center";
        };

        if(equalX === false && equalY === false) {
            return "Top left";
        }

        if(equalX === true && equalY === false) {
            return "Bottom";
        }
    }
}