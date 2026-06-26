import { Locator, Page } from "@playwright/test";
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


    //locators



    //constructors
    constructor(page: Page) {
        super(page);


        this.alfaDOCKLogo = this.page.locator("img[src*='logo']");
        this.qrCodeIcon = this.page.locator("//img[@src='assets/qr-code.png']");
        this.searchBox = this.page.locator("input[placeholder='Search'], input[placeholder='検索']");
        this.searchIcon = this.page.locator("//img[@src='assets/search.png']");
        this.hyperlinkIcon = this.page.locator("//img[contains(@src,'hyperLink')]");
        this.alfaOfficeIcon = this.page.locator("//img[contains(@src,'alfa')]");
        this.settingsicon = this.page.locator("//img[contains(@src,'Setting')]");
    }

    //validate

    async validatealfaDOCKLogo() {
        Logger.info('Validating alfaDOCK logo visibility');
        if (await this.alfaDOCKLogo.isVisible()) {
            Logger.pass('alfaDOCK logo is visible');
        } else {
            Logger.error('alfaDOCK logo is not visible');
        }
    }

    async validateQRCodeIcon() {
        Logger.info('Validating QR code icon visibility');
        if (await this.qrCodeIcon.isVisible()) {
            Logger.pass('QR code icon is visible');
        } else {
            Logger.error('QR code icon is not visible');
        }

    }

    async validateSearchBox() {
        Logger.info('Validating search box visibility');
        if (await this.searchBox.isVisible()) {
            Logger.pass('Search box is visible');
        } else {
            Logger.error('Search box is not visible');
        }
    }

    async validateSearchIcon() {
        Logger.info('Validating search icon visibility');
        if (await this.searchIcon.isVisible()) {
            Logger.pass('Search icon is visible');
        } else {
            Logger.error('Search icon is not visible');
        }
    }

    async validateHyperlinkIcon() {
        Logger.info('Validating hyperlink icon visibility');
        if (await this.hyperlinkIcon.isVisible()) {
            Logger.pass('Hyperlink icon is visible');
        } else {
            Logger.error('Hyperlink icon is not visible');
        }
    }

    async validateAlfaOfficeIcon() {
        Logger.info('Validating alfaOffice icon visibility');
        if (await this.alfaOfficeIcon.isVisible()) {
            Logger.pass('alfaOffice icon is visible');
        } else {
            Logger.error('alfaOffice icon is not visible');
        }
    }

    async validateSettingsIcon() {
        Logger.info('Validating settings icon visibility');
        await this.settingsicon.isVisible();
        if (await this.settingsicon.isVisible()) {
            Logger.pass('Settings icon is visible');
        } else {
            Logger.error('Settings icon is not visible');
        }

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
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);
        Logger.info('Search completed for: ' + searchText);
    }

    async selectAndDoubleClickFirstFile() {

        await this.page.waitForTimeout(10000);

        const firstImage = this.page.locator("div.imageDiv").first();
        Logger.info("First file selected");

        const parentPage = this.page;

        const [childPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            firstImage.dblclick()
        ]);

        Logger.info("First file double-clicked");

        // Wait until the new tab is loaded
        await childPage.waitForLoadState("load");

        Logger.info("Successfully switched to the new tab.");

        console.log("Parent URL :", parentPage.url());
        console.log("Child URL  :", childPage.url());

        console.log("Parent Title:", await parentPage.title());
        console.log("Child Title :", await childPage.title());

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

        // Close the new tab
        await childPage.close();
        Logger.info("Child tab closed");

        // Bring the parent tab to the front
        await parentPage.bringToFront();
        Logger.info("Returned to parent tab");
    }

    async validateViewerOpened(childPage: Page) {

        const url = childPage.url().toLowerCase();

        Logger.info(`Viewer URL: ${url}`);

        if (url.includes("pdfviewer")) {
            Logger.pass("PDF Viewer opened successfully.");
        }
        else if (url.includes("a3dviewer")) {
            Logger.pass("A3D Viewer opened successfully.");
        }
        else if (url.includes("drawing")) {
            Logger.pass("Drawing Viewer opened successfully.");
        }
        else if (url.includes("csvviewer")) {
            Logger.pass("CSV Viewer opened successfully.");
        }
        else {
            throw new Error(`Unknown viewer opened. URL: ${url}`);
        }
    }




}