export class BasePage {
    constructor(page, baseURL = 'https://demoqa.com') {
        this.page = page;
        this.baseURL = baseURL;
    };
    
    async navigate(path = '/') {
        await this.page.goto(this.baseURL + path);
    };

    async centerElement(elementLocator) {
        const element = await elementLocator;
        const elementCoordinates = await element.boundingBox(); // Находит координаты верхнего левого угла
        const center = {
            x: elementCoordinates.x + elementCoordinates.width / 2,
            y: elementCoordinates.y + elementCoordinates.height / 2
        };
        return center;
    }

    async dragAndDrop_v1(drag, drop) {
        const sourceCenter = await this.centerElement(drag);
        const targetCenter = await this.centerElement(drop);

        await this.page.mouse.move(sourceCenter.x, sourceCenter.y);
        await this.page.mouse.down();
        await this.page.mouse.move(targetCenter.x, targetCenter.y); 
        await this.page.mouse.up();
    }

    async dragAndDrop_v2(drag, drop) {
        const draggable = await drag; 
        const droppable = await drop;
        await draggable.dragTo(droppable);
    }

    async dragAndDropCoordinates(xAxis, yAxis, drag, drop = null) {
        const sourceCenter = await this.centerElement(drag);

        let targetX;
        let targetY;

        if (drop) {
            const droppable = await drop;
            const targetBox = await droppable.boundingBox();

            targetX = targetBox.x + xAxis,
            targetY = targetBox.y + yAxis
        } else {
            targetX = sourceCenter.x + xAxis;
            targetY = sourceCenter.y + yAxis;
        };
        await this.page.mouse.move(sourceCenter.x, sourceCenter.y, {steps: 10});
        await drag.hover();
        await this.page.waitForTimeout(2000);
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, targetY, {steps: 10}); 
        await this.page.mouse.up();
        await this.page.waitForTimeout(1000);
        
    }

    async getBoundingBox(element) {
        const box = await element.boundingBox();
        if (!box) throw new Error('Element not visible');
        return box;
    }

    async getElementPosition(element) {
        const box = await this.getBoundingBox(element);
        return { x: box.x, y: box.y };
    }

    async isInsideContainer(element, container) {
        const elementBox = await this.getBoundingBox(element);
        const containerBox = await this.getBoundingBox(container);
        return (
            elementBox.x >= containerBox.x &&
            elementBox.y >= containerBox.y &&
            elementBox.x + elementBox.width <= containerBox.x + containerBox.width &&
            elementBox.y + elementBox.height <= containerBox.y + containerBox.height
        );
    }
}
