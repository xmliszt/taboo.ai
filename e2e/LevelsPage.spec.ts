import { test, expect } from '@playwright/test';

const levelCount = 15;
test('test levels page', async ({ page }) => {
  await page.goto('/levels');
  await page.getByTestId('levels-heading-title').waitFor();
  await expect(page.getByTestId('levels-heading-title')).toHaveText(
    'Choose A Category'
  );
  await expect(page.getByTestId(/level-link-.*/)).toHaveCount(levelCount);
});
