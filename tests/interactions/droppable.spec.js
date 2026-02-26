import { test, expect } from '../../fixtures/fixtures.js';
import { DROPPED, DROP_HERE, OUTER_WRAPPER, NOT_GREEDY_INNER, GREEDY_INNER, } from '../../utils/testData.js';

test.describe('Droppable tests', () => {
  test('Perform drag and drop on Simple tab', async ({droppablePage}) => {
    await droppablePage.openSimpleTab();

    const droppable = droppablePage.droppable;
    const draggable = droppablePage.draggable;
    await droppablePage.dragAndDrop_v1(draggable, droppable);

    const paragraph = await droppable.locator('p').textContent();
    expect(paragraph).toBe(DROPPED);      
  });

  test('Simple drag and drop', async ({droppablePage}) => {
    await droppablePage.openSimpleTab();
  
    const draggable = droppablePage.draggable; 
    const droppable = droppablePage.droppable;

    await droppablePage.dragAndDrop_v2(draggable, droppable);

    const paragraph = await droppable.locator('p').textContent();
    expect(paragraph).toBe(DROPPED);
    
  });

  test('Acceptable element should be dropped', async ({droppablePage}) => {
    await test.step('Drag acceptable element to drop zone', async () => {
    await droppablePage.openAcceptTab();

    const acceptable = droppablePage.acceptable; 
    const acceptDroppable = droppablePage.acceptDroppable;

    await droppablePage.dragAndDrop_v1(acceptable, acceptDroppable);

    const paragraph = await acceptDroppable.locator('p').textContent();
    expect(paragraph).toBe(DROPPED);

    });
  });

  test('Not acceptable element should not be dropped', async ({droppablePage}) => {
    await droppablePage.openAcceptTab();

    const notAcceptable = droppablePage.notAcceptable;
    const acceptDroppable = droppablePage.acceptDroppable;

    await droppablePage.dragAndDrop_v2(notAcceptable, acceptDroppable);

    const paragraph = await acceptDroppable.locator('p').textContent();
    expect(paragraph).toBe(DROP_HERE);
  });

  test('Drop into Not Greedy Outer', async ({droppablePage}) => {
    await droppablePage.openPreventPropogationTab();

    const draggable = droppablePage.dragBox; 
    const notGreedyOuter = droppablePage.notGreedyOuter;
    const notGreedyInner = droppablePage.notGreedyInner; 
 
    await droppablePage.dragAndDropCoordinates(120, 30, draggable, notGreedyOuter);

    const paragraph_1 = await notGreedyOuter.locator('>p').textContent();
    expect(paragraph_1).toBe(DROPPED);
    const paragraph_2 = await notGreedyInner.locator('p').textContent();
    expect(paragraph_2).toBe(NOT_GREEDY_INNER);
  });

  test('Drop into Not Greedy Inner', async ({droppablePage}) => {
    await droppablePage.openPreventPropogationTab();

    const draggable = droppablePage.dragBox; 
    const notGreedyOuter = droppablePage.notGreedyOuter;
    const notGreedyInner = droppablePage.notGreedyInner; 
 
    await droppablePage.dragAndDrop_v2(draggable, notGreedyInner);

    const paragraph_1 = await notGreedyOuter.locator('>p').textContent();
    expect(paragraph_1).toBe(DROPPED);
    const paragraph_2 = await notGreedyInner.locator('p').textContent();
    expect(paragraph_2).toBe(DROPPED);
  });

  test('Drop into Greedy Inner, outer should not change', async ({droppablePage}) => {
    await droppablePage.openPreventPropogationTab();

    const draggable = droppablePage.dragBox;
    const greedyOuter = droppablePage.greedyOuter; 
    const greedyInner = droppablePage.greedyInner; 


    await droppablePage.dragAndDrop_v1(draggable, greedyInner);

    const paragraph_1 = await greedyInner.locator('p').textContent();
    expect(paragraph_1).toBe(DROPPED);
    const paragraph_2 = await greedyOuter.locator('>p').textContent();
    expect(paragraph_2).toBe(OUTER_WRAPPER);
  });

  test('Drop into Greedy Outer', async ({droppablePage}) => {
    await droppablePage.openPreventPropogationTab();

    const draggable = droppablePage.dragBox; 
    const notGreedyOuter = droppablePage.notGreedyOuter;
    const notGreedyInner = droppablePage.notGreedyInner; 
    const greedyOuter = droppablePage.greedyOuter; 
    const greedyInner = droppablePage.greedyInner; 


    await droppablePage.dragAndDropCoordinates(120, 30, draggable, greedyOuter);

    const paragraph_1 = await greedyOuter.locator('>p').textContent();
    expect(paragraph_1).toBe(DROPPED);
    const paragraph_2 = await greedyInner.locator('p').textContent();
    expect(paragraph_2).toBe(GREEDY_INNER);
  });

  test('Revertable element should return to original position', async ({droppablePage}) => {
    await droppablePage.openRevertableTab();
    const revertable = droppablePage.revertable; 
    const revertDroppable = droppablePage.revertDroppable;
    const startPosition = await droppablePage.getElementPosition(revertable);

    await test.step('Drag revertable element and verify it returns', async () => {
      await droppablePage.dragAndDrop_v1(revertable, revertDroppable);
      const paragraph = await revertDroppable.locator('p').textContent();
      expect(paragraph).toBe(DROPPED);
    });
      
    await test.step('Verify element reverted to original position', async () => {
      await expect.poll(
        async () => {
          const { x, y } = await droppablePage.getElementPosition(revertable);
          return [Math.round(x), Math.round(y)];
         },
          { timeout: 5000 }
      ).toEqual([
        Math.round(startPosition.x),
        Math.round(startPosition.y),
      ]);
    });
  });

  test('Not Revertable element should stay in drop zone', async ({droppablePage}) => {
    await droppablePage.openRevertableTab();

    const notRevertable = droppablePage.notRevertable;
    const revertDroppable = droppablePage.revertDroppable;
    
    await test.step('Drag not revertable element to drop zone', async () => {
      await droppablePage.dragAndDrop_v1(notRevertable, revertDroppable);  
      const paragraph = await revertDroppable.locator('p').textContent();
      expect(paragraph).toBe(DROPPED);
    });

    await test.step('Verify element stayed in drop zone', async () => {
      await expect.poll(() =>
        droppablePage.isInsideContainer(notRevertable, revertDroppable)
      ).toBe(true);
    });
  });
});