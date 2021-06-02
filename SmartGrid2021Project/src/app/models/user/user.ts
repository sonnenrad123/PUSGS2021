import { Team } from "../team/team";
import { UserRole } from "../user-role/user-role.enum";

export class User {
    username: string;
    password: string;
    userEmail: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    address: string;
    roleOfUser: UserRole;
    userImage?: string;
    userTeam?: Team;

    constructor(username: string, password: string, email: string, firstName: string,
                lastName: string, date: Date, address: string, userRole: UserRole, 
                userImg: string = "../../../assets/img/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg", userTeam?: Team){
        this.username = username;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.userEmail = email;
        this.birthday = date;
        this.address = address;
        this.roleOfUser = userRole;
        this.userImage = userImg;
        this.userTeam = userTeam;
    }
}
