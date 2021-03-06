﻿var login = require("login");
var exitwithlogic = require("exitwithlogic");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");

function checkLocalPath(loginUserName, loginPassword) {    
    let indel = Project.Variables.indel,
        localPathBox = indel.DlgOptionClass.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox;
        
    launchwithlogic.launchWithLogic();
    login.login(loginUserName, loginPassword);
    
    indel.PatientManagementWidget.groupBox.frame.pushButton_SystemSetting.ClickButton();

    aqObject.CheckProperty(localPathBox.label, "VisibleOnScreen", cmpEqual, true);
    aqObject.CheckProperty(localPathBox.label_2, "VisibleOnScreen", cmpEqual, true);
    aqObject.CheckProperty(localPathBox.label_13, "VisibleOnScreen", cmpEqual, true);
    
    indel.DlgOptionClass.pushButton_Cancel.ClickButton();
    
    logout.logout();
    exitwithlogic.exitWithLogic()
}
