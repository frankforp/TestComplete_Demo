﻿function addtargetarea(x1, y1, x2, y2, x3, y3, indel) {
    indel.contourGUIClass.groupBox_5.pbManualSketch.ClickButton();
    clickPoint(x1, y1, x2, y2, x3, y3);
    indel.contourGUIClass.canvas.C2DViewer.ClickR();

    LLPlayer.MouseWheel(1200, 1000);
  
    clickPoint(x1, y1, x2, y2, x3, y3);
    
    indel.contourGUIClass.canvas.C2DViewer.ClickR();
    indel.contourGUIClass.groupBox_5.Interpolate.ClickButton();

    if (indel.interpolate_error_popup.Exists) {
       indel.interpolate_error_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
       Log.Error('addtargetarea failure');
       Runner.Stop(true);
    }
    
    indel.contourGUIClass.canvas.C2DViewer.ClickR();
    indel.contourGUIClass.groupBox_5.Interpolate.ClickButton();
    
    if (indel.interpolate_warning_popup.Exists) {
       indel.interpolate_warning_popup.qt_msgbox_buttonbox.buttonOk.ClickButton();
       Log.Error('addtargetarea failure');
       Runner.Stop(true);
    }
}

function clickPoint(x1, y1, x2, y2, x3, y3) {
    LLPlayer.MouseDown(MK_LBUTTON, x1, y1, 1000);
    LLPlayer.MouseDown(MK_LBUTTON, x2, y2, 1000);
    LLPlayer.MouseDown(MK_LBUTTON, x3, y3, 1000);
    LLPlayer.MouseDown(MK_LBUTTON, x1, y1, 1000);
}

module.exports.addtargetarea = addtargetarea;