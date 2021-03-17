/* global cy */

describe('My First Test', () => {
	it('Does not do much!', () => {
		// 1. Go to app main page.
		cy.visit('http://localhost:3000/');

		// 2. Query an element.
		cy.get('#image-staging');

		expect(true).to.equal(true)
	})
})