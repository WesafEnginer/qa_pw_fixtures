import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, user, logger, articleWithoutTags }) => {
  article = articleWithoutTags;

  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({ homePage, createArticlePage, viewArticlePage }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
});
