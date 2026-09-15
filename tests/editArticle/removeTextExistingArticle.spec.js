import { test } from '../_fixtures/fixtures';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let article;

test.beforeEach(async ({ page, user, homePage, articleWithoutTags }) => {
  article = articleWithoutTags;

  await signUpUser(page, user);
  await createNewArticle(page, article);

});

test('remove the text of an existing article', async ({ viewArticlePage, editArticlePage }) => {
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.clearTextField();
  await editArticlePage.clickUpdateArticleButton();
  await editArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
