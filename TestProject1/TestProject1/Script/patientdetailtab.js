﻿var utilsfunction = require("utilsfunction");
var globalconstant = require("globalconstant");

function changePatientDetailTab(indel, tabName, isSave = false, isFinish = false) {
  
    if(!utilsfunction.checkParamNull(tabName) || !__checkTabExists(indel.tabWidget, tabName)) {
        Log.Error(`Please input valid tabName=${tabName}`);
        Runner.Stop(true);
    }
    
    let currentTabName = getTabName(indel);
    if (currentTabName === tabName) return;
    
    indel.tabWidget.ClickTab(tabName);
    //in case
    utilsfunction.delay(5000);
    
    __handlePopup(indel, tabName, currentTabName, isSave, isFinish);
    
    //check if switch successfully
    //if fail, stop script
    if (getTabName(indel) !== tabName) {
        Log.Error(`${Project.TestItems.Current.Name} changePatientDetailTab to ${tabName} fail`);
        Runner.Stop(true);
    }
}

function __checkTabExists(tabWidget, tabName) {
    let tabs = [];
    for (let i = 0; i < tabWidget.wTabCount; i++) {
        if (tabName === tabWidget.wTabCaption(i)) return true;
    }
    return false;
}

function getTabIndex(tabName) {
    let tabMapping = {
        [globalconstant.obj.patientManagement] : 0,
        [globalconstant.obj.contour] : 1,
        [globalconstant.obj.planDesign] : 2,
    }
    return tabMapping[tabName];
}

function getTabName(indel) {
    return indel.tabWidget.wTabCaption(indel.tabWidget.wFocusedTab);
}

//tabName is where app switch to
//currentTabName is where app locate
function __handlePopup(indel, tabName, currentTabName, isSave, isFinish) {
    //handler[currentTabName][tabName]
    let handler = {
        [globalconstant.obj.patientManagement]: {
            [globalconstant.obj.contour]: () => {
                if (indel.contour_choose_patient_popup.Exists) {
                    indel.contour_choose_patient_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
                    return;
                }
                //just close the popup
                if (indel.contour_switchtab_nostudy_popup.Exists) {
                    indel.contour_switchtab_nostudy_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
                }
            },
            [globalconstant.obj.planDesign]: () => {
                if (indel.plan_nomodule_popup.Exists) {
                    indel.plan_nomodule_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
                }
            }
        },
        [globalconstant.obj.contour]: {
            [tabName]: () => {
                if (indel.contour_no_skin_popup.Exists) {
                    indel.contour_no_skin_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
                    return;
                }
                //in case multi slices
                while (indel.contour_skin_incomplete_popup.Exists) {
                    indel.contour_skin_incomplete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
                } 
            }
        },
        [globalconstant.obj.planDesign]: {
            [tabName]: () => {
                if (indel.plan_want_save_popup.Exists) {
                    isSave ? __saveAction(indel, isFinish) : __unSaveAction(indel);
                }      
            }
        }
    }
    
    handler[currentTabName][tabName]();
}

function __saveAction(indel, isFinish) {
    let btnBox = indel.plan_finished_popup.qt_msgbox_buttonbox;
    indel.plan_want_save_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
    
    if (indel.plan_finished_popup.Exists) {
        isFinish ? btnBox.buttonYes.ClickButton() : btnBox.buttonNo.ClickButton();
    }
    
    indel.plan_save_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
}

function __unSaveAction(indel) {
    indel.plan_want_save_popup.qt_msgbox_buttonbox.buttonNo.ClickButton();
}

module.exports.changePatientDetailTab = changePatientDetailTab;
module.exports.getTabIndex = getTabIndex;
module.exports.getTabName = getTabName;