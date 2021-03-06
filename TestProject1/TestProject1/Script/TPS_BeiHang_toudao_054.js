﻿var login = require("login");
var exitwithlogic = require("exitwithlogic");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");
var inputrelated = require("inputrelated");
var globalconstant = require("globalconstant");
var userutils = require("userutils");
var finditeminlist = require("finditeminlist");

//app only has original our account can run this case successful 
function deleteDefaultFirstUser(loginUserName, loginPassword) {    
    let indel = Project.Variables.indel,
        userManagemant = indel.user_management,
        userList = userManagemant.userList;

    launchwithlogic.launchWithLogic();
    login.login(loginUserName, loginPassword);
    
    indel.PatientManagementWidget.groupBox.frame.pushButton_UserManage.ClickButton();
    
    if (userList.wRowCount > 0) {
        userManagemant.pushButton_DelUser.ClickButton();
        let userName = finditeminlist.getFieldValue(0, globalconstant.obj.userNameColumn, userList);
        if (strictEqual(userName, loginUserName)) {
            aqObject.CheckProperty(indel.user_delete_current_pop, "Exists", cmpEqual, true);
            indel.user_delete_current_pop.qt_msgbox_buttonbox.buttonOk.ClickButton();
        } else {
            Log.Error(`${Project.TestItems.Current.Name} Please login use our account`);
        }
    } else {
        Log.Error(`${Project.TestItems.Current.Name} there is no default user for deleting`);
    }

    userManagemant.pushButton_Exit.ClickButton();
    
    logout.logout();
    exitwithlogic.exitWithLogic()

}
