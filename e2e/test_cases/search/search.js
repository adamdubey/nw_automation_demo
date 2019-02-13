module.exports = {
  '@tags': ['critical'],
  '@disabled': false,
  before: browser => {
    browser
      .url(`${browser.launchUrl}`)
      .assert.title('SmugMug: Protect, Share, Store, and Sell Your Photos')
      .waitForURLEquals(`${browser.launchUrl}`)
  },

  after: browser => {
    browser.customSauceEnd()
  },

  'Validate homePage is loaded': browser => {
    const homePage = browser.page.homePage()

    homePage.assert.visible('@logo')
    homePage.assert.visible('@searchBar')
  },

  'Search for an image': browser => {
    const homePage = browser.page.homePage()
    const searchPage = browser.page.searchPage()
    const searchQuery = 'dog'

    homePage.search(searchQuery)
    
    searchPage.waitForURLEquals('https://www.smugmug.com/search/?q=dog&c=photos')
    searchPage.expect.element('@searchResults').to.be.present
  }
}
