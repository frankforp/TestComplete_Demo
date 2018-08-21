﻿var utilsfunction = require("utilsfunction");
var findItemInList = require("findItemInList");

function openImages(treatPart, field, imageList) {
    let rowIndex = findItemInList.isItemExistReturnIndex(treatPart, field, imageList);
    let parent = imageList.witems.item(rowIndex);
    parent.Expand();
    //default only one depth, open first child directly
    if (parent.items.item(0)) {
        parent.items.item(0).DblClick();
        utilsfunction.delay(30000);
    }else {
        Log.Error('Can not find first child image under ' + treatPart);
        Runner.Stop(true);
    }
}

module.exports.openImages = openImages;