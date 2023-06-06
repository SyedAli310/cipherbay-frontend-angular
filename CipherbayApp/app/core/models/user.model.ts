export class User {
    _id: string;
    displayName: string;
    firstName: string;
    lastName:string;
    email: string;
    image: string;
    friendsList: string[];
    pendingFriendRequests: string[];
    createdAt: string;

    constructor(args: any)
    {
        this._id = args._id;
        this.displayName = args.displayName || '';
        this.firstName = args.firstName  || '';
        this.lastName = args.lastName || '';
        this.email = args.email || '';
        this.image = args.image || '';
        this.friendsList = args.friendsList || [];
        this.pendingFriendRequests = args.pendingFriendRequests || [];
        this.createdAt = args.createdAt || '';
    }

}