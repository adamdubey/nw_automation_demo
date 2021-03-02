module.exports = {
  "@tags": ["critical"],
  "@disabled": false,
  before: (browser) => {
    browser
      .url(`${browser.launchUrl}`)
      .assert.titleContains("The Internet")
      .pause(1000);
  },

  after: (browser) => {
    browser.end();
  },

  "Validate homePage is loaded": (browser) => {
    const homePage = browser.page.homePage();
    const headerCopyText = "Welcome to the-internet"

    homePage.assert.visible('@header');
    homePage.assert.visible('@availableExamples');
  },

  "Perform Basic Authentication Example": (browser) => {
    const homePage = browser.page.homePage();
    const authPage = browser.page.authPage();
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    homePage.clickLinkContainingText('Form Authentication');
    authPage.assert.visible('@loginForm');
    authPage.setValue('@username', username);
    authPage.setValue('@password', password);
    authPage.click('@loginBtn');
    authPage.expect.element('@loginSuccessModal').to.be.visible;
    authPage.expect.element('@logoutBtn').contains.text('Logout');
    authPage.click('@logoutBtn');
    authPage.assert.visible('@loginForm');
  }

};
