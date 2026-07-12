import { VersionChecker } from "./VersionChecker";
import { MigrationSystem } from "./MigrationSystem";


export class UpdateManager {


private checker:VersionChecker;

private migration:MigrationSystem;



constructor(
version:string
){


this.checker =
new VersionChecker(
version
);



this.migration =
new MigrationSystem();


}



checkUpdate(
latest:string
){


return this.checker.check(
latest
);


}



migrate(
version:number
){

this.migration.run(
version
);


}



}