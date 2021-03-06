﻿var utilsfunction = require("utilsfunction");
var finditeminlist = require("finditeminlist");
var globalconstant = require("globalconstant");
var filefunction = require("filefunction");
var patientutils = require("patientutils");

//Add Machine
//DO not consider TMR and OAR
function addMachine(indel, newConfigName) {
    __addMachineOrCancel(indel, true, false, newConfigName);
}

function addMachineFromEdit(indel, newConfigName) {
    __addMachineOrCancel(indel, true, true, newConfigName);
}

function addMachineThenCancel(indel, newConfigName) {
    __addMachineOrCancel(indel, false, false, newConfigName);
}

function __addMachineOrCancel(indel, isAdd, isFromEdit, newConfigName) {
    if(!utilsfunction.checkParamNull(newConfigName)) {
        Log.Error(`Please input valid newConfigName=${newConfigName}`);
        //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
        Runner.Stop(true);
    }
    
    if (!isFromEdit) {
        indel.machine_management.pushButton.ClickButton();
    }

    indel.InputMachineDialog.LineEdit.SetText(newConfigName);
    indel.InputMachineDialog.DialogButtonBox.buttonOk.ClickButton();
    
    if (isAdd) {
        indel.machine_physical_configs.pushButton.ClickButton();
        if (indel.machine_TMR_popup.Exists) {
            indel.machine_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
        }
        if (indel.machine_OAR_popup.Exists) {
            indel.machine_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
        }
        indel.machine_confirm_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
        
        if (isFromEdit) {
            indel.PhyDataChangeViewerClass.pushButton_Ok.ClickButton();
        }
        
        indel.dirtyData.set(globalconstant.obj.machine, newConfigName);
        //for refresh
        utilsfunction.delay(5000);
    } else {
        indel.machine_physical_configs.pushButton_2.ClickButton();
    }
}

//Now only support some prooerties in General Information tab
//MachineSN、HalfTime、SourceRotateRate、FocusDoseRate、GammaRaysAverageEnergy、Max Treatment Time is not same as UI
function editMachine(indel, isEdit, editConfigName, editMachineTab = '0', editMachineProperty, editMachinePropertyValue) {
    let configList = indel.machine_management.ConfigList,
        machinePhysicalConfigs = indel.machine_physical_configs,
        tabWidget = machinePhysicalConfigs.tabWidget,
        machineConfigNameColumn = globalconstant.obj.machineConfigNameColumn,
        objectName = globalconstant.obj.objectName,
        inputPrefix = globalconstant.obj.inputPrefix,
        itemColumn = globalconstant.obj.itemColumn,
        currentColumn = globalconstant.obj.currentColumn,
        phyDataChangeViewList = indel.PhyDataChangeViewerClass.treeWidget_PhyDataChangeView;
        
    if (!utilsfunction.checkParamNull(editConfigName, editMachineProperty)) {
        Log.Error(`Please input valid editConfigName=${editConfigName} or editProperty=${editMachineProperty}`);
        //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
        Runner.Stop(true);
    }

    let ret =  finditeminlist.isItemInListReturnIndex(editConfigName, machineConfigNameColumn, configList);
    
    //Will continue excute if does not pass
    //so need to hanle below code
    if (!strictEqual(ret, -1)) {
        configList.ClickCell(ret, machineConfigNameColumn);
        indel.machine_management.pushButton_2.ClickButton();
        
        //handle edit default config
        if (indel.machine_edit_default_popup.Exists) {
            indel.machine_edit_default_popup.qt_msgbox_buttonbox.buttonNo.ClickButton();
        }
        //handle popup does not display
        if (!machinePhysicalConfigs.Exists) {
            return globalconstant.obj.emptyStr;
        }       
        if (!utilsfunction.checkParamRange(Number(editMachineTab), 0, tabWidget.wTabCount - 1)) {
            Log.Error(`Please input valid editMachineTab=${editMachineTab}`);
            //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
            Runner.Stop(true);
        }
        tabWidget.setCurrentIndex(editMachineTab);
        
        let child = utilsfunction.findChildObject(__getMacineTab(indel, editMachineTab), objectName, inputPrefix+editMachineProperty);
        // return if not find
        if (child == null) return globalconstant.obj.emptyStr;
        child.SetText(editMachinePropertyValue)
        
        machinePhysicalConfigs.pushButton.ClickButton();
        if (indel.machine_TMR_popup.Exists) {
            indel.machine_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
        }
        if (indel.machine_OAR_popup.Exists) {
            indel.machine_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
        }
        indel.machine_confirm_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
        aqObject.CheckProperty(indel.PhyDataChangeViewerClass, "Exists", cmpEqual, true);
        if (isEdit) {
            indel.PhyDataChangeViewerClass.pushButton_Ok.ClickButton();
            utilsfunction.delay(10000);
        } else {
            indel.PhyDataChangeViewerClass.pushButton_Cancel.ClickButton();         
        }
    } else {
        Log.Error(`can not find machine to edit editConfigName=${editConfigName}`);
    }
}

function __getMacineTab(indel, editMachineTab) {
     let temp = indel.machine_physical_configs.tabWidget.qt_tabwidget_stackedwidget;
     let tab = {
         '0' : temp.tab,
         '1' : temp.tab_2,
         '2' : temp.tab_3,
         '3' : temp.tab_4,
         '4' : temp.tab_5,
         '5' : temp.tab_6,
         '6' : temp.tab_7,
         '7' : temp.tab_8.groupBox
     }
    return tab[editMachineTab];
}

//Delete machine
function deleteMachine(indel, delConfigName) {
  __deleteMachineOrCancel(indel, true, delConfigName);
}

function deleteMachineThenCancel(indel, delConfigName) {
  __deleteMachineOrCancel(indel, false, delConfigName);
}

function __deleteMachineOrCancel(indel, isDel, delConfigName) {
    let machineManagement = indel.machine_management,
        configList = machineManagement.ConfigList;
    
    if(!utilsfunction.checkParamNull(delConfigName)) {
        Log.Error(`Please input valid delConfigName=${delConfigName}`);
        //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
        Runner.Stop(true);
    }

    let ret =  finditeminlist.isItemInListReturnIndex(delConfigName, globalconstant.obj.machineConfigNameColumn, configList);

    if (!strictEqual(ret, -1)) {
        configList.ClickCell(ret, globalconstant.obj.machineConfigNameColumn);
        machineManagement.pushButton_3.ClickButton();
        
        if (indel.machine_delete_default_config_popup.Exists) {
            indel.machine_delete_default_config_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
            Log.Error(`delete default machine`);
            Runner.Stop(true);
        }
        if (indel.machine_delete_usepan_popup.Exists) {
            indel.machine_delete_usepan_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
            Log.Error(`delete useplan machine`);
            Runner.Stop(true);
        }
        
        aqObject.CheckProperty(indel.machine_delete_popup, "Exists", cmpEqual, true);
        if (isDel) {
            indel.machine_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
            indel.dirtyData.delete(globalconstant.obj.machine, delConfigName);
            utilsfunction.delay(5000);
        } else {
            indel.machine_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton();
        }
    } else {
        Log.Warning(`can not find machine to delete, delConfigName=$delConfigName}`);
    }
}

function getAndCreateExportFolder() {
    let exportFolder = aqFileSystem.GetFileDrive(TestedApps.Items(0).Path) + globalconstant.obj.backslash + globalconstant.obj.exportFolder;
    filefunction.createFolder(exportFolder);
    return exportFolder;
}

function importMachine(indel, exportFolder, exportName) {
    indel.machine_management.pushButton_4.ClickButton();
    let pathAndName = exportFolder + globalconstant.obj.backslash + exportName;
    indel.machine_dlgImportConfigs.cbx_N.ComboBox.Edit.SetText(pathAndName);
    indel.machine_dlgImportConfigs.btn_O.Click();
    indel.machine_physical_configs.pushButton.ClickButton();
    if (indel.machine_TMR_popup.Exists) {
        indel.machine_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
    }
    if (indel.machine_OAR_popup.Exists) {
        indel.machine_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
    }
    indel.machine_confirm_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
    //if data is big, need to wait a bit longer
    utilsfunction.delay(20000);
    
    //if input wrong path
    if (indel.machine_dlgImportConfigs.Import_Configs.Exists) {
        indel.machine_dlgImportConfigs.Import_Configs.CtrlNotifySink.btn_.Exists.Click();
        indel.machine_dlgImportConfigs.btn_.Click();
    }
    
    //if exist import config
    if (indel.machine_import_exist_popup.Exists) {
        indel.machine_import_exist_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
    }
}

function exportMachine(indel, row, exportFolder, exportName) {
    indel.machine_management.ConfigList.ClickCell(row, globalconstant.obj.machineConfigNameColumn);
    indel.machine_management.pushButton_6.ClickButton();
    let pathAndName = exportFolder + globalconstant.obj.backslash + exportName;
    indel.machine_dlgExportConfigs.DUIViewWndClassName.Item.FloatNotifySink.ComboBox.Edit.SetText(pathAndName);
    indel.machine_dlgExportConfigs.btn_S.Click();
    if (indel.machine_export_exist_popup.Exists) {
        indel.machine_export_exist_popup.Item.CtrlNotifySink.btn_Y.Click();
    }
}

function setCurrentMachine(indel, configName) {
    let machineManagement = indel.machine_management,
        configList = machineManagement.ConfigList,
        machineConfigNameColumn = globalconstant.obj.machineConfigNameColumn;
    let ret =  finditeminlist.isItemInListReturnIndex(configName, machineConfigNameColumn, configList);

    if (!strictEqual(ret, -1)) {
        configList.ClickCell(ret, machineConfigNameColumn);
        machineManagement.pushButton_5.ClickButton();
        utilsfunction.delay(10000);
    } else {
        Log.Error(`can not find machine to setCurrent`);
        Runner.Stop(true);
    }
}

function getCurrentMachineNameFromPatientDetail(indel, patientId) {
    patientutils.loadPatient(indel, patientId);
    
    if (indel.PatientDataClass.Exists) {
        let ret = indel.PatientDataClass.groupBox_10.label_PhydataName.QtText;
        return utilsfunction.strReplace(ret, 'Name: ', globalconstant.obj.emptyStr);
    }
    return globalconstant.obj.emptyStr;
}

function getCurrentMachine(indel) {
    let machineManagement = indel.machine_management,
        machineList = machineManagement.ConfigList,
        machineConfigNameColumn = globalconstant.obj.machineConfigNameColumn,
        count = machineList.wRowCount;
    for (let i = 0; i < count; i++) {
        machineList.ClickCell(i, machineConfigNameColumn);
        machineManagement.pushButton_3.ClickButton();
        if (indel.machine_delete_default_config_popup.Exists) {
            indel.machine_delete_default_config_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
            return finditeminlist.getFieldValue(i, machineConfigNameColumn, machineList);
        } else {
            indel.machine_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton();
        }
    }
    return globalconstant.obj.emptyStr;
}

module.exports.addMachine = addMachine;
module.exports.addMachineFromEdit = addMachineFromEdit;
module.exports.addMachineThenCancel = addMachineThenCancel;
module.exports.editMachine = editMachine;
module.exports.deleteMachine = deleteMachine;
module.exports.deleteMachineThenCancel = deleteMachineThenCancel;
module.exports.importMachine = importMachine;
module.exports.exportMachine = exportMachine;
module.exports.getAndCreateExportFolder = getAndCreateExportFolder;
module.exports.setCurrentMachine = setCurrentMachine;
module.exports.getCurrentMachineNameFromPatientDetail = getCurrentMachineNameFromPatientDetail;
module.exports.getCurrentMachine = getCurrentMachine;