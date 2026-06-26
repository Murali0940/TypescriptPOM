import dotenv from 'dotenv';

dotenv.config();

export const Config = {
    appUrl: process.env.APP_URL!,
    companyUsername: process.env.COMPANY_USERNAME!,
    companyPassword: process.env.COMPANY_PASSWORD!,
    userUsername: process.env.USER_USERNAME!,
    userPassword: process.env.USER_PASSWORD!,
};

console.log("APP_URL =", Config.appUrl);
console.log("COMPANY_USERNAME =", Config.companyUsername);
console.log("COMPANY_PASSWORD =", Config.companyPassword);
console.log("USER_USERNAME =", Config.userUsername);
console.log("USER_PASSWORD =", Config.userPassword);