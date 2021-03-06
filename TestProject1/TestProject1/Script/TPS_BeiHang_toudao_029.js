﻿var login = require("login");
var exitwithlogic = require("exitwithlogic");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");
var filefunction = require("filefunction");
var globalconstant = require("globalconstant");
var utilsfunction = require("utilsfunction");
var settingutils = require("settingutils");

//check SystemConfig.ini to verify
function changeDatabase(loginUserName, loginPassword) {    
    let indel = Project.Variables.indel,
        databaseBox = indel.DlgOptionClass.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox_3,
        settingBtn = indel.PatientManagementWidget.groupBox.frame.pushButton_SystemSetting,
        databaseIP = '192.168.1.1',
        databaseUserName = 'test',
        databasePassword = 'test123',
        indelPath = globalconstant.obj.indelPath,
        systemConfigFile = globalconstant.obj.systemConfigFile,
        doubleBackslashes = globalconstant.obj.doubleBackslashes,
        backslash = globalconstant.obj.backslash;
        
    launchwithlogic.launchWithLogic();
    login.login(loginUserName, loginPassword);
    
    settingBtn.ClickButton();

    let oginalSQLServerIP = databaseBox.lineEdit_SQLServerIP.wText;
    let oginalSQLServerUser = databaseBox.lineEdit_SQLServerUser.wText;
    let oginalSQLServerKey = databaseBox.lineEdit_SQLServerKey.wText;

    let content = utilsfunction.strReplace(filefunction.readFile(indelPath, systemConfigFile), doubleBackslashes, backslash);
    settingutils.checkSystemConfigFile(content, false, databaseIP, databaseUserName, databasePassword);
    
    databaseBox.lineEdit_SQLServerIP.SetText(databaseIP);
    databaseBox.lineEdit_SQLServerUser.SetText(databaseUserName);
    databaseBox.lineEdit_SQLServerKey.SetText(databasePassword);
    
    indel.DlgOptionClass.pushButton_Ok.ClickButton();
    aqObject.CheckProperty(indel.settings_update_popup, "Exists", cmpEqual, true);
    indel.settings_update_popup.qt_msgbox_buttonbox.buttonNo.ClickButton();
    //in case IO too slow
    utilsfunction.delay(1000);

    content = utilsfunction.strReplace(filefunction.readFile(indelPath, systemConfigFile), doubleBackslashes, backslash);
    settingutils.checkSystemConfigFile(content, true, databaseIP, databaseUserName, databasePassword);  
    
    //clear dirty data
    settingBtn.ClickButton();
    databaseBox.lineEdit_SQLServerIP.SetText(oginalSQLServerIP);
    databaseBox.lineEdit_SQLServerUser.SetText(oginalSQLServerUser);
    databaseBox.lineEdit_SQLServerKey.SetText(oginalSQLServerKey);
    indel.DlgOptionClass.pushButton_Ok.ClickButton();
    indel.settings_update_popup.qt_msgbox_buttonbox.buttonNo.ClickButton();
    
    logout.logout();
    exitwithlogic.exitWithLogic()
}