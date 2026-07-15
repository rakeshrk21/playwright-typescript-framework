import { expect, test } from "../../utils/fixtures";
import { faker } from "@faker-js/faker"
import { BASE_URL_CONDUIT, CONDUIT_ENDPOINTS } from "../../config/env";
import { Login } from "../../services/login";


test.describe('call the conduit api', () => {
  let token: string = ''
  let headers: Record<string, string> = {'Accept': 'application/json', 'Content-Type': 'application/json'};

  test.beforeAll(async({ apiClient }) =>{
    const login = new Login(apiClient);
    token = await login.authenticate()
    headers.Authorization = `Token ${token}`
  })


  test('playwright - gets the articles', async ({ apiClient }) => {
    const articleT = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      body: faker.lorem.paragraph(),
      tagList: [faker.lorem.word()]
    }

    const jsonResponseArticle = await apiClient
        .url(BASE_URL_CONDUIT)
        .path(CONDUIT_ENDPOINTS.articles)
        .headers(headers)
        .body({
          article: articleT
        }).postRequest(201)

    expect(jsonResponseArticle.article.title).toContain(articleT.title);
    expect(jsonResponseArticle.article.description).toBe(articleT.description);
    const tagList = await jsonResponseArticle.article.tagList;
    expect(tagList.some((tag: string) => {
      return tag.includes(articleT.tagList[0])})).toBe(true);

    expect(jsonResponseArticle.article.author.username).toBe("raks_rk")


    const jsonResponseArticles = await apiClient
        .url(BASE_URL_CONDUIT)
        .path(CONDUIT_ENDPOINTS.articles)
        .headers(headers)
        .getRequest()
    const articles = jsonResponseArticles.articles
    const article = articles.find( (article: any) => {
      return article.title === articleT.title;
    })
    expect(article.title).toContain(articleT.title);
  });

  test('playwright - creates the article', async ({ apiClient }, testInfo) => {
    const uniqueId = `${testInfo.project.name}-${Date.now()}`;
    const body  = {
      article: {
        title: `test test1 ${uniqueId}`,
            description: `test test1 ${uniqueId}`,
            body: `test test1 ${uniqueId}`,
            tagList: [`tester1-${uniqueId}`]
      }
    }

    const jsonResponseArticle = await apiClient
        .url(BASE_URL_CONDUIT)
        .path(CONDUIT_ENDPOINTS.articles)
        .body(body)
        .headers(headers)
        .postRequest(201)

    expect(jsonResponseArticle.article.title).toContain(`test test1 ${uniqueId}`);
    expect(jsonResponseArticle.article.description).toBe(`test test1 ${uniqueId}`);
    const tagList = await jsonResponseArticle.article.tagList;
    expect(tagList.some((tag: string) => {
      return tag.includes(`tester1-${uniqueId}`)})).toBe(true);
    expect(jsonResponseArticle.article.author.username).toBe("raks_rk")
  });

  test('playwright - params', async ({ apiClient }) => {
    const jsonResponseArticle = await apiClient.url(`${BASE_URL_CONDUIT}`)
        .path(`${CONDUIT_ENDPOINTS.articles}`)
        .params({
          limit: "10",
          offset: "20"
        }).getRequest()

    console.log(JSON.stringify(jsonResponseArticle, null, 2))
  });
});
