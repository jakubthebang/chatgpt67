export class UserAuth {


private users =
new Map<string,string>();



register(
username:string,
token:string
){

this.users.set(
username,
token
);

}



verify(
username:string,
token:string
){


return (
this.users.get(username)
===
token
);


}



remove(
username:string
){

this.users.delete(
username
);

}



}