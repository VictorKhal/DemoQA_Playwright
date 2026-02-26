import { test as base } from '@playwright/test';
import { DraggablePage } from '../Pages/interactions/DraggablePage';
import { DroppablePage } from '../Pages/interactions/DroppablePage';

export const test = base.extend({
  draggablePage: async ({ page }, use) => {
    const draggablePage = new DraggablePage(page);

    await draggablePage.open();

    await use(draggablePage);
  },
  droppablePage: async ({ page }, use) => {
    const droppablePage = new DroppablePage(page);

    await droppablePage.open();

    await use(droppablePage);
  },
});

export const expect = test.expect;