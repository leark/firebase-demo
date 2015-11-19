'use strict';

describe('Twitter login form', function() {

    var emailInput = element(by.model('email'));
    var passwordInput = element(by.model('password'));
    var signInButton = element(by.buttonText('Sign-in'));

    beforeEach(function() {
        browser.get('http://localhost:8000/');

        browser.getTitle().then(function(response) {
            console.log(response);
        })

        browser.getTitle().then(console.log);
    })

    it('should have a page title of "Twitter"', function() {
        expect(browser.getTitle()).toEqual('Twitter');

    });

    // it('should let the user sign in to an account', function() {
    //     emailInput.sendKeys('test@example.com');

    //     passwordInput.sendKeys('password');

    //     var signInButton = element(by.buttonText('Sign-in'));
    //     signInButton.click();
    // });

    it('sign in button should be disabled without valid input', function() {
        expect(signInButton.isEnabled()).toBe(false);

        emailInput.sendKeys('test');

        expect(signInButton.isEnabled()).toBe(false);

        passwordInput.sendKeys('password');

        expect(signInButton.isEnabled()).toBe(false);

        emailInput.sendKeys('@test.com');

        expect(signInButton.isEnabled()).toBe(true);
        browser.pause();
    });

});