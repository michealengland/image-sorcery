/* global cy */

describe('My First Test', () => {
	it('Does not do much!', () => {
		// 1. Go to app main page.
		cy.visit('http://localhost:3000/');

		// 2. Select the file input, and attach image.
		cy.get('input[type="file"]').click().attachFile('images/tobias-tullius-IiE50WMRa7I-unsplash.jpg');
	})
})