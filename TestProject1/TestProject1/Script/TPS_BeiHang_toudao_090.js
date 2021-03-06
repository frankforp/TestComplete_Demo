﻿var login = require("login");
var exitwithlogic = require("exitwithlogic");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");
var globalconstant = require("globalconstant");
var physicalparameterutils = require("physicalparameterutils");
var finditeminlist = require("finditeminlist");

function deleteMachineManagementThenCancel(loginUserName, loginPassword, newConfigName) {    
    let indel = Project.Variables.indel,
        machineList = indel.machine_management.ConfigList;
        
    launchwithlogic.launchWithLogic();
    login.login(loginUserName, loginPassword);

    indel.PatientManagementWidget.groupBox.frame.pushButton_PhyData.ClickButton();
    
    //add new user first
    physicalparameterutils.addMachine(indel, newConfigName);
    
    let ret =  finditeminlist.isItemInListReturnIndex(newConfigName, globalconstant.obj.machineConfigNameColumn, machineList);
    
    if (!strictEqual(ret, -1)) {
        let count = machineList.wRowCount;
        physicalparameterutils.deleteMachineThenCancel(indel, newConfigName);
        aqObject.CompareProperty(machineList.wRowCount, cmpEqual, count, true, 3);
    } else {
        Log.Error(`${Project.TestItems.Current.Name} can not find machine to operation`);
    }
    
    //clear data
    physicalparameterutils.deleteMachine(indel, newConfigName);
    
    indel.machine_management.Close();
     
    logout.logout();
    exitwithlogic.exitWithLogic()
}
