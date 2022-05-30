export interface UpdateOfficer
{
    Officer_id:string;
    Cellphone_number: string;
    Email: string;
    Password: string;
}

export interface User
{
    User_id:string;
    Camp_id:string;
    First_name:string;
    Last_name:string;
    gender:string;
    Type:string;
    Cellphone_number:string;
    Email:string;
    Password:string;
    profile_pic:string;
    vaccination_card:string;
}
export interface Officer
{
    Officer_id:string;
    Campus_id:string
    First_name:string;
    Last_name:string;
    Gender:string;
    Cellphone_number:string;
    Email:string;
    Password:string;
}

export interface UpdatePassword{
    Password:string;
}

export interface UpdateUser {
    Cellphone_number: string;
    Email: string;
    Password: string;
    User_id:string;
    
    //vaccination_card:string;

}

export interface UserLogin
{
    message: string;
    User_id: string;
    Password: string;
    token:string;
}
export interface AdminLogin {
    message: string;
    User_id: string;
    Password: string;
    token: string;
}
export interface OfficerLogin
{
    message: string;
    User_id:string;
    Password:string;
}
export interface VisitorLogin
{
    message: string;
    User_id:string;
    Password:string;
}

export interface Record
{
    message: any;
    Officer_id:string;
    User_id:string;
    Form_check:string;
    Date:string;
    Tempareture:Number;
    isAllowedEntrence:Number;
    Health_status_reason:string;
}

export interface PendingRecord
{
    Officer_id:string;
    User_id:string;
    Form_check:string;
    Date:string;
    Tempareture:Number;
    isAllowedEntrence:Number;
    Health_status_reason:string;
}
export interface GetAllRecords
{
    Officer_id:string;
    User_id:string;
    Form_check:string;
    Date:string;
    Tempareture:Number;
    isAllowedEntrence:Number;
    Health_status_reason:string;
}

export interface GetAllOfficers
{
    Officer_id:string;
    Campus_id:string
    First_name:string;
    Last_name:string;
    Gender:string;
    Cellphone_number:string;
    Email:string;
    Password:string;
}
export interface Officer
{
    Officer_id:string;
    Campus_id:string
    First_name:string;
    Last_name:string;
    Gender:string;
    Cellphone_number:string;
    Email:string;
    Password:string;
}
export interface UpdateRecord
{
    Tempareture:Number;
    Health_status_reason:string;
    //Record_id:number;
}

export interface Comments
{
    Comment:string;
    username:string;
    Feed_id:number;
    Date:string;

}

export interface RegisterVisitor
{
    Cellphone_number: string;
    Visitor_id: string;
    First_name: string;
    Campus_id: number;
    Gender: string;
    type: number;
    Email: string;
    Password: string;
    Last_name: string;
}

export interface RegisterUser
{
    cellphone:string;
    userId:string;
    lastName:string;
    campId:number;
    gender:string;
    type:number;
    email:string;
    password:string;
    firstNames:string;
}

export interface Images
{
    pic_path:string;
    image_id:number;
    pictureName:string;
}
export interface FormData
{
    User_id:string;
    vstatus:string;
    covid19:string;
    recentCough:string;
    difficultyBreathing:string;
    lossOfTaste:string;
    heavyHeadache:string;
    infectedPerson:string;
 
}

//Marinkie Changes
export interface getImage {
    image_id: Number;
    pictureName: string;
}
export interface addImage {
    image_id: Number;
    pictureName: string;
}

export interface updatetheUser {
    User_id: string;
    Camp_id: string;
    First_name: string;
    Last_name: string;
    gender: string;
    Type: string;
    Cellphone_number: string;
    Email: string;
    Password: string;
    vaccination_card:string;

}
export interface getTheUser {
    User_id: string;
    Camp_id: string;
    First_name: string;
    Last_name: string;
    Gender: string;
    Type: string;
    Cellphone_number: string;
    Email: string;
    Password: string;
}


//Wisan
export interface statsData{
    Students:Number;
    
    
 }
  export interface flueData{
        Total:Number;
 }
 export interface visitorData{
            Total:Number;
         }
//end of Wisan

export interface addProfile {
            image_id: Number;
            pictureName: string;
        }
            