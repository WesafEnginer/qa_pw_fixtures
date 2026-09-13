import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, articleData) {
  await test.step(`Create a new article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillTitleField(articleData.title);
    await createArticlePage.fillDescriptionField(articleData.description);
    await createArticlePage.fillTextField(articleData.text);
     if (articleData.tags && articleData.tags.length > 0) {
      await createArticlePage.fillTagsField(articleData.tags);
    }
    await createArticlePage.clickPublishArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(articleData.title);
    await viewArticlePage.assertArticleTextIsVisible(articleData.text);
  });
}