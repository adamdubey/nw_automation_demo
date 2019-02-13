exports.command = function (searchQuery) {
this
  .waitForElementVisible('input.sm-marketing-field-text-input')
  .setValue('input.sm-marketing-field-text-input', [searchQuery, this.Keys.ENTER])
  
return this;
this.expect.element('input.sm-marketing-field-text-input').text.to.equal(searchQuery)
};