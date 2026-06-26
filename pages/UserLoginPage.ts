import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class UserLoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private userloginname: string = "#username";
    private userloginpassword: string = "#password";
    private userloginbutton: string = "#login";
    private userlogoutbutton: string = "#logout";
    private companylogo: string = "#compLogo";

    async userLogin(user: string, pass: string) {
        await this.type(this.userloginname, user);
        await this.type(this.userloginpassword, pass);
        await this.click(this.userloginbutton);
        Logger.info('User login button clicked');
        await this.page.waitForLoadState('load');
    }



    async validateUserLoginURL() {

        const currentURL = this.page.url();
        console.log('Current URL:', currentURL);
        Logger.info('Current URL: ' + currentURL);

        if (currentURL.includes('https://www.alfadock-pack.com/userlogin.html')) {
            Logger.pass("Successfully navigated to userlogin page");
        } else {
            Logger.error(`Navigation failed. Current URL: ${currentURL}`);
        }

    }

    async validateUserTitle() {

        const title = await this.page.title();
        console.log('Page Title:', title);
        Logger.info('Page Title: ' + title);
        await expect(this.page).toHaveTitle('UserLogin');
    }

    async validateUserElements() {
        Logger.info('Validating elements on the login page');

        Logger.info('Checking if username field is visible');
        await expect(this.page.locator(this.userloginname)).toBeVisible();
        Logger.info('Username field is visible');

        Logger.info('Checking if password field is visible');
        await expect(this.page.locator(this.userloginpassword)).toBeVisible();
        Logger.info('Password field is visible');

        Logger.info('Checking if login button is visible');
        await expect(this.page.locator(this.userloginbutton)).toBeVisible();
        Logger.info('Login button is visible');
    }



    async validateUserLoginButtonVisible() {
        Logger.info('Validating login button visibility');
        await expect(this.page.locator(this.userloginbutton)).toBeVisible();
        Logger.pass('Login button is visible');
    }

    async validateUserLogoutButtonVisible() {
        Logger.info('Validating logout button visibility');
        await expect(this.page.locator(this.userlogoutbutton)).toBeVisible();
        Logger.pass('Logout button is visible');
    }

    async validateUserLoginButtonCSS() {
        Logger.info('Validating login button CSS');
        let loginbuttoncolor: string = "rgb(6, 32, 99)";
        await expect(this.page.locator(this.userloginbutton))
            .toHaveCSS("background-color", loginbuttoncolor);
        Logger.info('Login button CSS is valid');
    }

    async validateUserLogoutButtonCSS() {
        Logger.info('Validating logout button CSS');
        let logoutbuttoncolor: string = "rgb(6, 32, 99)";
        await expect(this.page.locator(this.userlogoutbutton))
            .toHaveCSS("background-color", logoutbuttoncolor);
        Logger.info('Logout button CSS is valid');
    }

    async validateCompanyLogoIsVisible() {
        Logger.info('Validating company logo visibility');
        const companyLocator = this.page.locator(this.companylogo);
        await expect(companyLocator).toBeVisible();
        Logger.pass('Company logo is visible');
    }

}