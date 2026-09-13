import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let article;
let newTags;

test.beforeEach(async ({ page, user, homePage }) => {
  article = generateNewArticleData();
  newTags = generateNewArticleData(undefined, 2).tags;

  await signUpUser(page, user);
  await createNewArticle(page, article);
});

test('Edit the tags of an existing article without tags', async ({page, viewArticlePage, editArticlePage}) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTagsField(newTags);
  await editArticlePage.clickUpdateArticleButton();
  await page.waitForLoadState('networkidle');
  await page.reload();
  await viewArticlePage.assertArticleTagsAreVisible(newTags);
});