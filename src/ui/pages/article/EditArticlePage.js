import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.removeTagButton = page.locator('form i').first();
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field with '${title}'`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field with '${description}'`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field with '${text}'`, async () => {
      await this.textField.fill(text);
    });
  }

 async fillTagsField(tags) {
    await test.step(`Fill the 'Article Tags' field with '${tags}'`, async () => {
      for (const tag of tags) {
        await this.articleTagsField.fill(tag);
        await this.page.keyboard.press('Enter'); 
      }
    });
  }

  async clearTagsField() {
    await test.step(`Clear the 'Article Tags' field`, async () => {
      await this.removeTagButton.click();
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.fill('');
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.fill('');
    });
  } 

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.fill('');
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertTagIsNotVisible(tag) {
    await test.step(`Assert the tag '${tag}' is not visible`, async () => {
      await expect(this.page.getByRole('listitem').filter({ hasText: tag })).not.toBeVisible();
    });
  }
}
