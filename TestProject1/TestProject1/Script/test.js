﻿var indelplanUI = require("indelplanUI");
var utilsfunction = require("utilsfunction");

function changepatientdetailtab(tabName) {
    let indel = indelplanUI.initUI();
  
    if(!utilsfunction.paramCheck(tabName) || !checkTabNameExists(tabName, indel.tabWidget)) {
        Log.Error("Please input valid tabName");
        Runner.Stop(true);
    }
    
    if (canSwitch(tabName, indel.tabWidget.wFocusedTab)) {
        indel.tabWidget.ClickTab(tabName);
        utilsfunction.delay(10000);
    }
    
    if (strictEqual(tabName, 'Contour')) {
        if (indel.contour_to_plan_popup.Exists) {
            indel.contour_to_plan_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
        }
        aqObject.CheckProperty(indel.contourGUIClass.groupBox_4.AddToLib, "Visible", cmpEqual, true);
    } else  if (strictEqual(tabName, 'PlanDesign')) {
        if (indel.contour_to_plan_popup.Exists) {
            indel.contour_to_plan_popup.qt_msgbox_buttonbox.buttonYes.ClickButton();
        }
        aqObject.CheckProperty(indel.planListClass, "Visible", cmpEqual, true);
    } else {
        aqObject.CheckProperty(indel.patientDataClass.groupBox_7.pushButton_GamaReg, "Visible", cmpEqual, true);
    }
}

function checkTabNameExists(tabName, tabWidget) {
    let tabs = [];
    for (let i = 0; i < tabWidget.wTabCount; i++) {
        tabs[i] = tabWidget.wTabCaption(i);
    }
    return tabs.includes(tabName) ? true : false;
}

function canSwitch(tabName, currentIndex) {
    return !strictEqual(getTabIndex(tabName), currentIndex) ? true : false;
}

function getTabIndex(tabName) {
    let tabMapping = {
        'PatientManagement' : 0,
        'Contour' : 1,
        'PlanDesign' : 2,
    }
    return tabMapping[tabName];
}

function testDICOMImages() {
    let obj = Aliases.INDELP.IntergratedGamaClass.centralWidget.stackedWidget.ContourGUIClass.canvas.C2DViewer;
    Log.Message(obj.m_BgStudy);
    Log.Message(obj.m_FgStudy);
    Log.Message(obj.m_DrawImage);
    Log.Message(obj.m_FgStudy);
    
    Log.Message(obj.Clear2DViewer());
    Log.Message(obj.GetBgStudy());
    Log.Message(obj.GetDrawImage());
    Log.Message(obj.GetFGStudy());
    Log.Message(obj.GetFusionDisplay());
    Log.Message(obj.GetMovingImage());
    Log.Message(obj.GetOrient());
    Log.Message(obj.metaObject());
    //Log.Message(obj.zC2DViewer());
    
    //Log.Message(obj.repaint());
    Log.Message(obj.InitializeTempContourLayer());
}

function testSys() {
    let a = Sys.Process("IndelPlanV2.0").Refresh()
    Log.Message(a);
}

function testImages() {
    let a = Aliases.INDELP.GamaImporterClass.wdMainView;
    //Log.Message(a.JumpAssignedSlice(2));
    Log.Message(a.GetSliceSize());
    Log.Message(a.GetSliceIndex());
    Log.Message(a.StartRegistrationAction());
    
}