import { UserRole } from "../user-role/user-role.enum";

export class User {
    username: string;
    password: string;
    uEmail: string;
    firstname: string;
    lastname: string;
    birthday: Date;
    address: string;
    roleOfUser: UserRole;
    userImage?: string;
    nameOfTeam?: string;

    constructor(username: string, password: string, email: string, firstName: string,
                lastName: string, date: Date, address: string, userRole: UserRole, 
                userImg: string = "../../../assets/img/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg", nameOfTeam?: string){
        this.username = username;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.uEmail = email;
        this.birthday = date;
        this.address = address;
        this.roleOfUser = userRole;
        this.userImage = userImg;
        this.nameOfTeam = nameOfTeam;
    }
}
