import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, user, homePage, articleWithOneTag }) => {
  article = articleWithOneTag;

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('remove the tag of an existing article with tags', async ({ viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.clearTagsField();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertTagIsNotVisible(article.tags[0]);
});
