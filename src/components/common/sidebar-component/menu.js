import { Home, Users, FileText } from 'react-feather';
import SweetAlert from 'sweetalert2';
const menuT=[];
let hasMatch1="";
const UserType=localStorage.UserType == undefined && localStorage.UserType ==null? "" : localStorage.getItem('UserType');
const UserGroupDetails=localStorage.UserGroups == undefined && localStorage.UserGroups ==null? "" : JSON.parse(localStorage.getItem('UserGroups'));

 if(UserGroupDetails!=null && UserGroupDetails!= undefined && UserGroupDetails!="" &&UserType!='' &&UserGroupDetails.length>0)
 {
    const pathnameHit = window.location.pathname;

    if(pathnameHit=='/dashboard' )
    {
       if (UserType=== "0" ||UserType=== "2" ||UserType=== "1") {
        window.location.assign(`${process.env.PUBLIC_URL}/admin/dashboard`);  }
           else if (UserType=== "3") {
           window.location.assign(`${process.env.PUBLIC_URL}/user/dashboard`);
        }
        else{
          window.location.assign(`${process.env.PUBLIC_URL}/login`); 
        }
    }
      if(pathnameHit!='/' && pathnameHit!='/dashboard' && pathnameHit!='/accessDenied')
      {
        const hasMatch=UserGroupDetails.some(function (d) {
          return d.PageURL ==pathnameHit 
       });
       hasMatch1=hasMatch;
        // if(hasMatch1==false)
        // {
        //   window.location.assign(`${process.env.PUBLIC_URL}/accessDenied`);
        // }
        
        // else{
        //     if (UserType=== "0" ||UserType=== "2" ||UserType=== "1") {

        //         window.location.assign(`${process.env.PUBLIC_URL}/admin/dashboard`);
    
        //     }
        //     else if (UserType=== "3") {
        //         window.location.assign(`${process.env.PUBLIC_URL}/user/dashboard`);
        //     }
        // }
       
      }
      
     
     let i=0;
    UserGroupDetails.map((item)=>{
        let menurow=
        {
            title:'', 
            icon: Users,
             type:'' , 
             active:false,
             PageId:'',
             Level:'', 
             children:[] 
        }
        
    if(item.Level=="1")
    {
    
      menurow=
        {
            title: item.PageName, 
            icon: Users,
             type:item.PageURL==''?'sub':'link', 
             active:i=='0'?true:false,
             path:item.PageURL==''?'':item.PageURL, 
             PageId:item.PageId,
             Level:item.Level, 
             children:[] 
        }
        menuT.push(menurow);
    }
     i++;
    });

  ////********SubChild**************//
  menuT.map((item1)=>{
    let Childrow=
    {
        title:'', 
         type:'' , 
         active:false,
         PageId:'',
         Level:'',  
         path: '' 
    }
   let ChildArr=[];
UserGroupDetails.map((val)=>{

     if(val.ParentId==item1["PageId"])
    {
        Childrow=
            {
                title:val.PageName, 
                 type:val.PageURL==''?'sub':'link', 
                 active:false,
                 PageId:val.PageId,
                 Level:val.Level,   
                 path:val.PageURL 
            }
            ChildArr.push(Childrow);
            item1["children"]= ChildArr;
        }   
}); 

  });
 }
 
 export const MENUITEMS = menuT;
