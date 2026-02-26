import { test, expect } from '../../fixtures/fixtures.js';

test.describe('Dragabble tests', () => {
  
  test('Should drag simple box', async ({draggablePage}) => {
    await draggablePage.selectSimpleTab();

    const draggable = draggablePage.dragBoxSimple;
    const startPosition = await draggablePage.getElementPosition(draggable);

    await draggablePage.dragAndDropCoordinates(200, 50, draggable);

    const finalPosition = await draggablePage.getElementPosition(draggable);
     
    expect(startPosition.x).not.toEqual(finalPosition.x);
    expect(startPosition.y).not.toEqual(finalPosition.y);
  });

  test('Should replace to X axis', async ({draggablePage }) => {
    await draggablePage.selectAxisRestrictionTab();

    const draggable = draggablePage.restrictedOnlyX;
    const startPosition = await draggablePage.getElementPosition(draggable);

    await draggablePage.dragAndDropCoordinates(200, 0, draggable);
    await draggablePage.page.waitForTimeout(5000);
    
    
    const finalPosition = await draggablePage.getElementPosition(draggable);

    expect(Math.abs(finalPosition.y - startPosition.y)).toBeLessThan(2);
    expect(finalPosition.x - startPosition.x).toBeGreaterThan(50);
  });

  test('Should replace to Y axis', async ({draggablePage}) => {
    await draggablePage.selectAxisRestrictionTab();

    const draggable = draggablePage.restrictedOnlyY;
    const startPosition = await draggablePage.getElementPosition(draggable);

    await draggablePage.dragAndDropCoordinates(200, 300, draggable);

    const finalPosition = await draggablePage.getElementPosition(draggable);

    expect(Math.abs(finalPosition.x - startPosition.x)).toBeLessThan(2);
    expect(finalPosition.y - startPosition.y).toBeGreaterThan(50);
  });

  test('Box should stay in container', async ({draggablePage}) => {
    await draggablePage.selectContainerRestrictionTab();

    const draggable = draggablePage.boxInContainer;
    const startPosition = await draggablePage.getElementPosition(draggable);
    const includes = draggablePage.containerWithBox;

    await draggablePage.dragAndDropCoordinates(500, 400, draggable);

    const finalPosition = await draggablePage.getElementPosition(draggable);

    await test.step('Element moved', async () => {
      expect(finalPosition.x - startPosition.x).toBeGreaterThan(10);
      expect(finalPosition.y - startPosition.y).toBeGreaterThan(10);
    });

    await test.step('Element stayed in container', async () => {
      await expect.poll(() =>
        draggablePage.isInsideContainer(draggable, includes)
      ).toBe(true);
    });

  });

  test('Text should stay in container', async ({draggablePage}) => {
    await draggablePage.selectContainerRestrictionTab();

    const draggable = draggablePage.textInContainer;
    const startPosition = await draggablePage.getElementPosition(draggable);
    const includes = draggablePage.containerWithText;

    await draggablePage.dragAndDropCoordinates(500, 400, draggable);

    const finalPosition = await draggablePage.getElementPosition(draggable);

    await test.step('Element moved', async () => {
      expect(finalPosition.x - startPosition.x).toBeGreaterThan(5);
      expect(Math.abs(finalPosition.y - startPosition.y)).toBeGreaterThan(5);
    });

    await test.step('Element stayed in container', async () => {
      await expect.poll(() =>
        draggablePage.isInsideContainer(draggable, includes)
      ).toBe(true);
    });

  });


  test('Check cursor which stay in the center', async ({draggablePage}) => {
    await draggablePage.selectCursorStyleTab();

    const element = draggablePage.cursorCenter;
    const result = await draggablePage.cursorCheck(element);

    expect(result).toEqual("Center")
  });
  test('Check cursor which stay in the left top', async ({draggablePage}) => {
    await draggablePage.selectCursorStyleTab();

    const element = draggablePage.cursorTopLeft;
    const result = await draggablePage.cursorCheck(element);
    expect(result).toEqual("Top left")
  });

  test('Check cursor which stay in the bottom', async ({draggablePage}) => {
    await draggablePage.selectCursorStyleTab();

    const element = draggablePage.cursorBottom;
    const result = await draggablePage.cursorCheck(element);

    expect(result).toEqual("Bottom")
  });
});



