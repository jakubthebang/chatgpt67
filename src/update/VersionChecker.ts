export class VersionChecker {


constructor(
private current:string
){}



check(
latest:string
){


return {


currentVersion:
this.current,


latestVersion:
latest,


updateAvailable:
this.current !== latest



};


}



}