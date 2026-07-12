import { PermissionManager } from "./PermissionManager";
import { UserAuth } from "./UserAuth";


export class SecurityManager {


private permissions:
PermissionManager;


private auth:
UserAuth;



constructor(
admins:string[]
){


this.permissions =
new PermissionManager(
admins
);



this.auth =
new UserAuth();


}



checkPermission(
user:string
){


return this.permissions.canUse(
user
);


}



login(
user:string,
token:string
){


this.auth.register(
user,
token
);


}



verify(
user:string,
token:string
){

return this.auth.verify(
user,
token
);


}



}