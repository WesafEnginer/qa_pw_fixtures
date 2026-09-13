import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let article;
let newDescription;

test.beforeEach(async ({ page, user, homePage }) => {
  article = generateNewArticleData();
  newDescription = generateNewArticleData().description;

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('Edit the description of an existing article', async ({page, viewArticlePage, editArticlePage, homePage}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillDescriptionField(newDescription);
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForLoadState('networkidle');
  await homePage.clickHomePageLink();
  await page.waitForLoadState('networkidle');
  await page.reload();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticleDescriptionIsVisible(newDescription);
});
