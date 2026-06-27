import { test, expect } from '@playwright/test';
import { CompLoginPage } from '../pages/CompLoginPage';
import { Logger } from '../utils/Logger';
import { UserLoginPage } from '../pages/UserLoginPage';
import { Config } from '../config/ConfigReader';
import { Homepage } from '../pages/Homepage';

test('Verify Company Login with Valid Credentials', async ({ page }) => {

    Logger.info('==========CompanyLoginPage==========');

    const login = new CompLoginPage(page);

    await test.step('Perform Company Login', async () => {
        await login.openURL(Config.appUrl);
        await login.languageSelection('English');
        await login.login(Config.companyUsername, Config.companyPassword);
        await page.waitForLoadState('load');
    });

    await test.step('CompanyLoginPageValidations', async () => {

        await login.validateelements();
        Logger.info('Elements Validated');
        await login.validateLoginButtonCSS();
        Logger.info('Login Button CSS Validated');
        await login.validatetitle();
        Logger.info('Title Validated');
        Logger.info('Validating login success');
        await login.validateLoginSuccess();
    });


    Logger.info('==========UserLoginPage==========');

    const userlogin = new UserLoginPage(page);

    await test.step('Enter user credentials', async () => {
        Logger.info('Entering user username credentials');

        const userusername = Config.userUsername;
        Logger.info('User username entered');
        const userpassword = Config.userPassword;
        Logger.info('User password entered');
        await userlogin.userLogin(userusername, userpassword);
    });

    await test.step('UserLoginPageValidations', async () => {

        await userlogin.validateUserTitle();
        Logger.info('Title Validated');
        await userlogin.validateUserElements();
        Logger.info('Elements Validated');
        await userlogin.validateUserLoginButtonVisible();
        Logger.info('Login Button Visibility Validated');
        await userlogin.validateUserLogoutButtonVisible();
        Logger.info('Logout Button Visibility Validated');
        await userlogin.validateUserLoginButtonCSS();
        Logger.info('Login Button CSS Validated');
        await userlogin.validateUserLogoutButtonCSS();
        Logger.info('Logout Button CSS Validated');
        await userlogin.validateCompanyLogoIsVisible();
        Logger.info('Company Logo Visibility Validated');

        Logger.info('Validating login success');
        await userlogin.validateUserLoginURL();
    });


    Logger.info('==========Homepage==========');

    const homepage = new Homepage(page);

    await test.step('HomepageValidations', async () => {
        await page.waitForLoadState('load');
        await homepage.validatealfaDOCKLogo();
        await homepage.validateQRCodeIcon();
        await homepage.validateSearchBox();
        await homepage.validateSearchIcon();
        await homepage.validateHyperlinkIcon();
        await homepage.validateAlfaOfficeIcon();
        await homepage.validateSettingsIcon();
        await page.waitForLoadState('load');

    });

    await test.step('search_pdf_file_in_searchbar', async () => {
        await homepage.searchFile(".pdf");
        await homepage.selectAndDoubleClickFirstFile();
        await page.waitForLoadState('load');
        await homepage.alfaDOCKLogoClick();

    });

    await test.step('search_a3dasm_file_in_searchbar', async () => {
        await homepage.searchFile(".a3dasm");
        await homepage.selectAndDoubleClickFirstFile();
        await page.waitForLoadState('load');
        await homepage.alfaDOCKLogoClick();

    });

    await test.step('search_bmf_file_in_searchbar', async () => {
        await homepage.searchFile(".bmf");
        await homepage.selectAndDoubleClickFirstFile();
        await page.waitForLoadState('load');
        await homepage.alfaDOCKLogoClick();

    });





});