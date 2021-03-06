﻿var login = require("login");
var exitwithlogic = require("exitwithlogic");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");

function checkDatabase(loginUserName, loginPassword) {    
    let indel = Project.Variables.indel,
        databaseBox = indel.DlgOptionClass.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox_3;

    launchwithlogic.launchWithLogic();
    login.login(loginUserName, loginPassword);
    
    indel.PatientManagementWidget.groupBox.frame.pushButton_SystemSetting.ClickButton();

    aqObject.CheckProperty(databaseBox.label_4, "VisibleOnScreen", cmpEqual, true);
    aqObject.CheckProperty(databaseBox.label_6, "VisibleOnScreen", cmpEqual, true);
    aqObject.CheckProperty(databaseBox.label_12, "VisibleOnScreen", cmpEqual, true);
    
    indel.DlgOptionClass.pushButton_Cancel.ClickButton();
    
    logout.logout();
    exitwithlogic.exitWithLogic()
}
