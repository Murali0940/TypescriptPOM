import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../utils/Logger";

export class Homepage extends BasePage {

    readonly alfaDOCKLogo: Locator;
    readonly qrCodeIcon: Locator;
    searchBox: Locator;
    readonly searchIcon: Locator;
    readonly hyperlinkIcon: Locator;
    readonly alfaOfficeIcon: Locator;
    readonly settingsicon: Locator;
    readonly file: Locator;


    //locators



    //constructors
    constructor(page: Page) {
        super(page);


        this.alfaDOCKLogo = this.page.locator("//img[@src='assets/icons/logo.png']");
        this.qrCodeIcon = this.page.locator("//img[@src='assets/qr-code.png']");
        this.searchBox = page.locator("input[placeholder='Search'], input[placeholder='検索']");
        this.searchIcon = this.page.locator("//img[@src='assets/ai-search.png']");
        this.hyperlinkIcon = this.page.locator("//input[@src='assets/icons/hyperLink.png']");
        this.alfaOfficeIcon = this.page.locator("//input[@src='assets/icons/alfa Office.png']");
        this.settingsicon = this.page.locator("//input[@src='assets/icons/Setting Icon.png']");
        this.file = this.page.locator("div.imageDiv");
    }

    //validate



    async validatealfaDOCKLogo() {
        Logger.info('Validating alfaDOCK logo visibility');

        await expect(this.alfaDOCKLogo).toBeVisible({ timeout: 10000 });

        Logger.pass('alfaDOCK logo is visible');
    }

    async validateQRCodeIcon() {
        Logger.info('Validating QR code icon visibility');
        await expect(this.qrCodeIcon).toBeVisible({ timeout: 10000 });
        Logger.pass('QR code icon is visible');
    }


    async validateSearchBox() {
        Logger.info('Validating search box visibility');
        await expect(this.searchBox).toBeVisible({ timeout: 10000 });
        Logger.pass('Search box is visible');
    }

    async validateSearchIcon() {
        Logger.info('Validating search icon visibility');
        await expect(this.searchIcon).toBeVisible({ timeout: 10000 });
        Logger.pass('Search icon is visible');
    }

    async validateHyperlinkIcon() {
        Logger.info('Validating hyperlink icon visibility');
        await expect(this.hyperlinkIcon).toBeVisible({ timeout: 10000 });
        Logger.pass('Hyperlink icon is visible');
    }

    async validateAlfaOfficeIcon() {
        Logger.info('Validating alfaOffice icon visibility');
        await expect(this.alfaOfficeIcon).toBeVisible({ timeout: 10000 });
        Logger.pass('alfaOffice icon is visible');
    }

    async validateSettingsIcon() {
        Logger.info('Validating settings icon visibility');
        await expect(this.settingsicon).toBeVisible({ timeout: 10000 });
        Logger.pass('Settings icon is visible');
    }



    async validateHomepageURL() {

        const currentURL = this.page.url();
        console.log('Current URL:', currentURL);
        Logger.info('Current URL: ' + currentURL);

        if (currentURL.includes('https://www.alfadock-pack.com/userlogin.html')) {
            Logger.pass("Successfully navigated to userlogin page");
        } else {
            Logger.error(`Navigation failed. Current URL: ${currentURL}`);
        }

    }

    //Actionmethods

    async searchFile(searchText: string) {
        Logger.info('Searching for: ' + searchText);
        await this.searchBox.click();
        await this.searchBox.clear();
        await this.searchBox.fill(searchText);
        await this.searchBox.press('Enter');
        Logger.info('Search completed for: ' + searchText);
        await this.page.waitForLoadState('networkidle');
    }

    async selectAndDoubleClickFirstFile() {

        const firstImage = this.file.first();
        firstImage.click();
        Logger.info("First file selected");
        await this.page.waitForTimeout(3000);

        // Capture the parent page explicitly
        const parentPage = this.page;

        // Wait for new tab to open after double-click
        const [childPage] = await Promise.all([
            parentPage.context().waitForEvent("page"),
            firstImage.dblclick()
        ]);

        await this.page.waitForTimeout(5000);

        Logger.info("First file double-clicked");

        // Wait until the new tab is loaded
        await childPage.waitForLoadState("domcontentloaded");
        Logger.info("Successfully switched to the new tab..");

        await this.page.waitForLoadState('load');

        console.log("Parent URL :", parentPage.url());
        console.log("Child URL  :", childPage.url());

        // Validate the viewer
        const url = childPage.url().toLowerCase();

        if (url.includes("pdfviewer")) {
            Logger.pass("File opened in PDF Viewer");
        } else if (url.includes("a3dviewer")) {
            Logger.pass("File opened in A3D Viewer");
        } else if (url.includes("drawing")) {
            Logger.pass("File opened in Drawing Viewer");
        } else if (url.includes("csvviewer")) {
            Logger.pass("File opened in CSV Viewer");
        } else {
            Logger.error(`Unknown viewer opened: ${url}`);
        }

        await this.page.waitForLoadState('domcontentloaded');


        // Close the new tab
        await childPage.close();
        Logger.info("Child tab closed");

        // Bring the parent tab to the front
        await parentPage.bringToFront();
        Logger.info("Returned to parent tab");

        await this.page.waitForLoadState('load');
    }

    async alfaDOCKLogoClick() {

        await this.alfaDOCKLogo.click();
        Logger.info("Clicked on alfaDOCK logo");
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');

    }




}