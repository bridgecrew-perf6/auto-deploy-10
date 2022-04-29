/**
 * Created by JackCui on 2022/4/28
 */

const {browserOptions} = require('./browser-options');
const {urlLogin} = require('./static');
const {config: {accountConfig}} = require('./config')
const puppeteer = require('puppeteer-core');
let gitLabPage
let jenkinsPage

const sleep = function (time) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, time);
  });
};

const type = function (page, id, value, idx = 0) {
  return new Promise((resolve, reject) => {
    page.waitForSelector(id, {timeout: 4000})
      .then(() => page.$$(id))
      .then(domArr => domArr[idx].click())
      .then(() =>
        page.evaluate((id, value, index) => {
          document.querySelectorAll(id)[index].value = value;
        }, id, value, idx))
      .then(domArr => page.type(id, ' '))
      .then(() => page.keyboard.press('Backspace'))
      .then(() => sleep(200))
      .then(() => resolve())
      .catch(err => console.log(err));
  });
}

const gotoLogin = async () => {
  const browser = await puppeteer.launch(browserOptions);
  gitLabPage = await browser.newPage();
  jenkinsPage = await browser.newPage();
  await gitLabPage.goto(urlLogin.gitlab);
  await jenkinsPage.goto(urlLogin.jenkins);
}

const loginGitLabHandle = async () => {
  await type(gitLabPage, '#username', accountConfig.gitlab.userName)
  await type(gitLabPage, '#password', accountConfig.gitlab.password)
  const inputElement = await gitLabPage.$('.qa-sign-in-button');
  await inputElement.click();
}

const loginJenkinsHandle = async () => {
  await type(jenkinsPage, '#j_username', accountConfig.jenkins.userName)
  await type(jenkinsPage, 'input[name="j_password"]', accountConfig.jenkins.password)
  const inputElement = await jenkinsPage.$('.submit-button');
  await inputElement.click();
}

exports.build = async function () {
  await gotoLogin()
  await Promise.all([loginGitLabHandle(), loginJenkinsHandle()])
}