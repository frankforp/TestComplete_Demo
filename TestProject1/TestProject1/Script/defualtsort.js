﻿var login = require("login");
var exit = require("exit");
var logout = require("logout");
var launchwithlogic = require("launchwithlogic");
var indelplanUI = require("indelplanUI");

function defualtsort(username, password) {
    launchwithlogic.launchWithLogic();
    login.login(username, password);
    
    let indel = Project.Variables.indel;

    aqObject.CheckProperty(indel.patientManagementWidget.groupBox.groupBox_2.radioButton_AllDate, "checked", cmpEqual, true);
    
    logout.logout();
    exit.exit();
}


