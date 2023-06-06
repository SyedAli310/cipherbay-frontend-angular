import { User } from "./user.model";

export class LoginStatus {
    success: boolean;
    auth: boolean;
    user: User;

    constructor(args: any) {
        this.success = args.success || false;
        this.auth = args.success || false;
        this.user = args.user || {};
    }
}