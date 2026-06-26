import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/Logger';

export class CompLoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private username: string = "#username";
    private password: string = "#password";
    private loginButton: string = "#logmein";

    async openURL(url: string) {
        await this.open(url);
        Logger.info('Navigated to URL: ' + url);
    }
    

    async login(user: string, pass: string) {
        await this.type(this.username, user);
        await this.type(this.password, pass);
        await this.click(this.loginButton);
        Logger.info('Login button clicked');
    }

    async validateLoginSuccess() {
        Logger.info('Validating login success');
        await expect(this.page.locator('#logout')).toBeVisible();
        Logger.pass('Login successful');
    }

    async validatetitle() {

        const title = await this.page.title();
        console.log('Page Title:', title);
        Logger.info('Page Title: ' + title);
        await expect(this.page).toHaveTitle('Company Login');
    }

    async validateelements() {
        Logger.info('Validating elements on the login page');

        Logger.info('Checking if username field is visible');
        await expect(this.page.locator(this.username)).toBeVisible();
        Logger.info('Username field is visible');

        Logger.info('Checking if password field is visible');
        await expect(this.page.locator(this.password)).toBeVisible();
        Logger.info('Password field is visible');

        Logger.info('Checking if login button is visible');
        await expect(this.page.locator(this.loginButton)).toBeVisible();
        Logger.info('Login button is visible');
    }

    async validateLoginButtonCSS() {
        Logger.info('Validating login button CSS');
        await expect(this.page.locator(this.loginButton))
            .toHaveCSS("background-color", "rgb(6, 32, 99)");
        Logger.info('Login button CSS is valid');
    }




}

