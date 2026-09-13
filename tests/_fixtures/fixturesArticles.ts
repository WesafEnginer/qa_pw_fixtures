import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { Logger } from '../../src/common/logger/Logger';


export const test = base.extend<{
  createArticlePage: CreateArticlePage;
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  logger: Logger;
  articleWithoutTags : ReturnType<typeof generateNewArticleData>;
  articleWithOneTag : ReturnType<typeof generateNewArticleData>;
  articleWithTwoTags : ReturnType<typeof generateNewArticleData>;
}>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 0 );
    await use(article);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const articleWithOneTag = generateNewArticleData(logger, 1);

    await use(articleWithOneTag);
  },
  articleWithTwoTags: async ({ logger }, use) => {
    const articleWithTwoTags = generateNewArticleData(logger, 2);

    await use(articleWithTwoTags);
  }
});
