﻿var utilsfunction = require("utilsfunction");
var globalconstant = require("globalconstant");
var finditeminlist = require("finditeminlist");

function addContourLib(indel, contourLibType, contourLibName) {
    __addContourOrLibCancel(indel, true, contourLibType, contourLibName);
}

function addContourLibThenCancel(indel, contourLibType, contourLibName) {
    __addContourOrLibCancel(indel, false, contourLibType, contourLibName);
}

function __addContourOrLibCancel(indel, isAdd, contourLibType, contourLibName) {
    if(!utilsfunction.checkParamNull(contourLibName) || !__checkContourTypeExists(contourLibType, indel.DlgContourItemClass.ContourType)) {
        Log.Error(`Please input valid contourLibName=${contourLibName} or contourLibType=${contourLibType}`);
        Runner.Stop(true);
    }
    
    indel.ContourGUIClass.groupBox_4.AddToLib.ClickButton();
    indel.DlgContourItemClass.ContourType.setCurrentIndex(__getTypeIndex(contourLibType));
    indel.DlgContourItemClass.ContourName.SetText(contourLibName);
    
    if (isAdd) {
        indel.DlgContourItemClass.OperationDone.ClickButton();
        if (indel.contour_exist_popup.Exists) {
            indel.contour_exist_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
            indel.DlgContourItemClass.OperationCancel.ClickButton();
            Log.Error(`${Project.TestItems.Current.Name} __addContourLibCancel fail contourLibName=${contourLibName}`);
            Runner.Stop(true);
        }
        indel.dirtyData.set(globalconstant.obj.contourLib, contourLibName);
    } else {
        indel.DlgContourItemClass.OperationCancel.ClickButton();
    }
}

function editContourLib(indel, contourLibName, newContourLibName, newContourLibType) {
    __editContourLibOrCancel(indel, true, contourLibName, newContourLibName, newContourLibType);
}

function editContourLibThenCancel(indel, contourLibName, newContourLibName, newContourLibType) {
    __editContourLibOrCancel(indel, false, contourLibName, newContourLibName, newContourLibType);
}

function __editContourLibOrCancel(indel, isEdit, contourLibName, newContourLibName, newContourLibType) {
    if(!utilsfunction.checkParamNull(contourLibName, newContourLibName) || !__checkContourTypeExists(newContourLibType, indel.DlgContourItemClass.ContourType)) {
        Log.Error(`Please input valid contourLibName=${contourLibName} or newContourLibType=${newContourLibType}`);
        Runner.Stop(true);
    }
    
    let contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib;
    
    let ret =  finditeminlist.isItemExist(contourLibName, globalconstant.obj.contourLibName, contourLibList);
  
    if (ret) {
        contourLibList.ClickItem(contourLibName);
        indel.ContourGUIClass.groupBox_4.EditContourLib.ClickButton();
        indel.DlgContourItemClass.ContourType.setCurrentIndex(__getTypeIndex(newContourLibType));
        indel.DlgContourItemClass.ContourName.SetText(newContourLibName);
        isEdit ? indel.DlgContourItemClass.OperationDone.ClickButton() : indel.DlgContourItemClass.OperationCancel.ClickButton();
    } else {
        Log.Warning(`can not find contourLib to update, contourLibName=${contourLibName}`);
    }
}


//contourLibName can not be same even type is different, so only pass contourLibName
function deleteContourLib(indel, contourLibName) {    
    if(!utilsfunction.checkParamNull(contourLibName)) {
        Log.Error(`Please input valid contourLibName=${contourLibName}`);
        //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
        Runner.Stop(true);
    }
    
    let contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib;

    let ret =  finditeminlist.isItemExist(contourLibName, globalconstant.obj.contourLibName, contourLibList);
  
    if (ret) {
        contourLibList.ClickItem(contourLibName);
        indel.ContourGUIClass.groupBox_4.DeleteFromContourLib.ClickButton();
        indel.dirtyData.delete(globalconstant.obj.contourLib, contourLibName);
    } else {
        Log.Warning(`can not find contourLib to delete, contourLibName=${contourLibName}`);
    }
}

function loadContourLib(indel, contourLibName) {
    if(!utilsfunction.checkParamNull(contourLibName)) {
        Log.Error(`Please input valid contourLibName=${contourLibName}`);
        //Runner.Stop(true) do not pass globle param (like indel), after cases all fail
        Runner.Stop(true);
    }
    
    let contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib;

    let ret =  finditeminlist.isItemExist(contourLibName, globalconstant.obj.contourLibName, contourLibList);
  
    if (ret) {
        contourLibList.ClickItem(contourLibName);
        indel.ContourGUIClass.groupBox_4.LoadToPlanLib.ClickButton();
    } else {
        Log.Warning(`can not find contourLib to load contourLibName=${contourLibName}`);
    }
}

function __searchContour() {
    
}

function __getHandler() {
    let handler = {
        'edit' : () => {
          
        },
        'delete' : () => {
          
        },
        'load' : () => {
          
        }
    }
}

function __checkContourTypeExists(contourLibType, contourType) {
    for (let i = 0; i < contourType.wItemCount; i++) {
        if (contourLibType === contourType.wItem(i)) return true;
    }
    return false;
}

function __getTypeIndex(contourLibType) {
    let types = {
        'TARGET' : 0,
        'OAR' : 1,
        'SKIN' : 2,
    }
    return types[contourLibType];
}

function __changeContourName(indel) {
    indel.DlgContourItemClass.ContourName.SetText('CTV' + parseInt(Math.random() * 1000000));
    indel.DlgContourItemClass.OperationDone.ClickButton();
}

module.exports.addContourLib = addContourLib;
module.exports.addContourLibThenCancel = addContourLibThenCancel;
module.exports.editContourLib = editContourLib;
module.exports.editContourLibThenCancel = editContourLibThenCancel;
module.exports.deleteContourLib = deleteContourLib;
module.exports.loadContourLib = loadContourLib;