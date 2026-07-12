export class PermissionManager {


constructor(
private admins:string[]
){}



isAdmin(
username:string
){

return this.admins.includes(
username
);


}



canUse(
username:string
){


return this.isAdmin(
username
);


}



}