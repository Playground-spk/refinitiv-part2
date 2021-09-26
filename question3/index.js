const target = process.argv[2];
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://codequiz.azurewebsites.net/');
  await page.waitForSelector('input[type="button"]');
  await page.click('input[type="button"]');
  await page.waitForSelector('table');
  const result = await page.$$eval(
    'tr',
    async (arrTr, target) => {
      let indexColumnFundName;
      let indexColumnNav;

      for (let tr of arrTr) {
        for (let idx = 0; idx < tr.children.length; idx++) {
          if (tr.children[idx].innerHTML.split(' ').join('') === 'FundName') {
            indexColumnFundName = idx;
          }
          if (tr.children[idx].innerHTML.split(' ').join('') === 'Nav') {
            indexColumnNav = idx;
          }
        }

        if (indexColumnFundName !== undefined && indexColumnNav !== undefined) break;
      }

      for (let tr of arrTr) {
        if (tr.children[indexColumnFundName].innerHTML.trim() === target) {
          return tr.children[indexColumnNav].innerHTML;
        }
      }
    },
    target
  );
  console.log(result);
  await browser.close()
})();
