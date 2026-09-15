import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let article;
let newTitle;

test.beforeEach(async ({ page, user, homePage, articleWithoutTags }) => {
  article = articleWithoutTags;
  newTitle = generateNewArticleData().title;

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('Edit the title of an existing article', async ({ page, viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTitleField(newTitle);
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForLoadState('networkidle');
  await page.reload();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
