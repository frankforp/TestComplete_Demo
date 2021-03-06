﻿var utilsfunction = require("utilsfunction");
var exitwithlogic = require("exitwithlogic");

function launchWithLogic() {
    let indel = Project.Variables.indel;
    //Exists: true if the object exist in the system
    //Visible: specifies whether an onscreen object is visible to user
    if(!indel.logonClass.Exists) {
        TestedApps.IndelPlanV2_0.Run();
    } else {
        exitwithlogic.exitWithLogic();
        //better to wait a while
        utilsfunction.delay(5000);
        TestedApps.IndelPlanV2_0.Run();
    }
}

module.exports.launchWithLogic = launchWithLogic;