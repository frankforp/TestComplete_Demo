﻿var login = require("login");
var exitwithlogic = require("exitwithlogic");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");
var userutils = require("userutils");
var globalconstant = require("globalconstant");
var finditeminlist = require("finditeminlist");

function defaultEditFirstUser(loginUserName, loginPassword) {    
    let indel = Project.Variables.indel,
        userManagemant = indel.user_management,
        userList = userManagemant.userList,
        newUser = indel.new_user;
    
    launchwithlogic.launchWithLogic();
    login.login(loginUserName, loginPassword);
    
    indel.PatientManagementWidget.groupBox.frame.pushButton_UserManage.ClickButton();
    
    if (userList.wRowCount > 0) {
        let userName = finditeminlist.getFieldValue(0, globalconstant.obj.userNameColumn, userList);
        userManagemant.pushButton_EditUser.ClickButton();
        aqObject.CheckProperty(newUser.lineEdit_UserName, "wText", cmpEqual, userName);
        newUser.pushButton_Cancel.ClickButton();
    } else {
        Log.Error(`${Project.TestItems.Current.Name} there is no any user to edit`);
    }
    userManagemant.pushButton_Exit.ClickButton();
    
    logout.logout();
    exitwithlogic.exitWithLogic()
}