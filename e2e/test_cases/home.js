module.exports = {
  "@tags": ["critical"],
  "@disabled": false,
  before: (browser) => {
    browser
      .url(`${browser.launchUrl}`)
      .assert.titleContains("adamdubey.github.io");
  },

  after: (browser) => {
    browser.end();
  },

  "Validate homePage is loaded": (browser) => {
    const homePage = browser.page.homePage();

    homePage.assert.visible("@navTitle");
    homePage.assert.visible("@navBar");
  },

  "Validate Blog Page": (browser) => {
    const homePage = browser.page.homePage();
    const blogPage = browser.page.blogPage();

    homePage.assert.visible("@navPageLink");
    homePage.assert.visible("@aboutContainer");
    homePage.clickLinkContainingText("Blog");
    blogPage.assert.visible("@body");
  },

  "Return to Home Page": (browser) => {
    const homePage = browser.page.homePage();

    homePage.assert.visible("@navBar");
    homePage.click("@navTitle");
    homePage.assert.visible("@aboutContainer");
  },

  "Validate Projects Page": (browser) => {
    const homePage = browser.page.homePage();
    const projectsPage = browser.page.projectsPage();

    homePage.assert.visible("@navPageLink");
    homePage.clickLinkContainingText("Projects");
    projectsPage.assert.visible("@projectArticle");
  },
};
