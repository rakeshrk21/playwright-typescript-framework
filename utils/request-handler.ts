import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class RequestHandler {
    private request: APIRequestContext;
    private baseUrl: string;
    private apiPath = '';
    private apiHeaders: Record<string, string> = {};
    private apiBody: object = {};
    private queryParams: Record<string, string> = {};

    constructor(request: APIRequestContext, url: string) {
        this.baseUrl = url;
        this.request = request;
    }

    url(url: string) {
        this.baseUrl = url;
        return this;
    }

    path(path: string) {
        this.apiPath = path;
        return this;
    }

    body(body: object) {
        this.apiBody = body;
        return this;
    }

    headers(headers: Record<string, string>) {
        this.apiHeaders = headers;
        return this;
    }

    params(params: Record<string, string>) {
        this.queryParams = params;
        return this;
    }

    private getUrl(): string {
        const url = new URL(`${this.baseUrl}${this.apiPath}`);

        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.set(key, value);
        }

        return url.toString();
    }

    async getRequest() {
        const response = await this.request.get(this.getUrl(), { headers: this.apiHeaders });
        expect(response.status()).toBe(200)
        return response.json();
    }

    async postRequest(status: number){
        const response = await this.request.post(this.getUrl(),
            {
                headers: this.apiHeaders,
                data: this.apiBody
            });
        expect(response.status()).toBe(status);
        return response.json()
    }

    async putRequest(status: number){
        const response = await this.request.put(this.getUrl(),
            {
                headers: this.apiHeaders,
                data: this.apiBody
            });
        expect(response.status()).toBe(status);
        return response.json()
    }

    async deleteRequest() {
        const response = await this.request.delete(this.getUrl(), { headers: this.apiHeaders });
        expect(response.status()).toBe(200)
    }

}

