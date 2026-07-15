import { RequestHandler } from "../utils/request-handler";
import { CONDUIT_ENDPOINTS } from "../config/env";
import { config } from "../config/api-test.config";

export class Login {

    private requestHandler : RequestHandler

    constructor(request : RequestHandler) {
        this.requestHandler = request
    }

    async authenticate() {
        const jsonResponse = await this.requestHandler
            .path(CONDUIT_ENDPOINTS.login)
            .body({user: { email: config.EMAIL, password: config.PASSWORD,},},)
            .postRequest(200)

        return jsonResponse.user.token
    }
}
