import { test } from '../_fixtures/fixtures';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let article;
let newText;

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  article = articleWithoutTags;
  newText = articleWithoutTags.text;

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('Edit the text of an existing article', async ({ viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillTextField(newText);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTextIsVisible(newText);
});
