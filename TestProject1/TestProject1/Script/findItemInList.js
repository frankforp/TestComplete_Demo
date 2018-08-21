﻿//for user_manager list
function isItemInList(fieldValue, field, list) {
    let rows = list.wRowCount - 1;
    while (rows >= 0) {
      let val = list.wValue(rows, field);
      if (strictEqual(val, fieldValue)) {
          return true;
      }
      rows--;
    }
    return false;
}

//for user_manager list
function isItemInListReturnIndex(fieldValue, field, list) {
    let ret = -1;
    let rows = list.wRowCount - 1;
    while (rows >= 0) {
      let val = list.wValue(rows, field);
      if (strictEqual(val, fieldValue)) {
          ret = rows;
          return ret;
      }
      rows--;
    }
    return ret;
}

//for user_manager list
function findFieldValue(row, wantField, list) {
    return list.wValue(row, wantField);
}

//for patient/images/contour list
function isItemExist(val, field, list) {
  let rows = list.witems.count - 1;
  for (let i = 0; i <= rows; i++) {
    if (strictEqual(list.witems.item(i).Text(field), val)) {
      return true;
    }
  }
  return false;
}

//for patient/images/contour list
function isItemExistReturnIndex(val, field, list) {
    let ret = -1;
    let rows = list.witems.count - 1;
    for (let i = 0; i <= rows; i++) {
        if (strictEqual(list.witems.item(i).Text(field), val)) {
            ret = i;
            return ret;
        }
    }
    return ret;
}

//for patient/images/contour list
function findFieldValueForList(patientId, getField, wantField, list) {
    let rows = list.witems.count - 1;
    for (let i = 0; i <= rows; i++) {
        if (strictEqual(list.witems.item(i).Text(getField), patientId)) {
          return list.witems.item(i).Text(wantField);
        }
    }
    return '';
}

//for patient/images/contour list
function findPatientReturnObject(id, patientList) {
  let ret = {};
  let rows = patientList.witems.count - 1;
  for (let i = 0; i <= rows; i++) {
    let findId = patientList.witems.item(i).Text('ID');
    if (strictEqual(findId, id)) {
      ret.id = patientList.witems.item(i).Text('ID');
      ret.name = patientList.witems.item(i).Text('Name');
      ret.gender = patientList.witems.item(i).Text('Gender');
      ret.age = patientList.witems.item(i).Text('Age');
      ret.height = patientList.witems.item(i).Text('Height');
      ret.weight = patientList.witems.item(i).Text('Weight');
      ret.phone = patientList.witems.item(i).Text('Phone');
      ret.address = patientList.witems.item(i).Text('Address');
      ret.createTime = patientList.witems.item(i).Text('Create Time');
      return ret;
    }
  }
  return ret;
}

module.exports.isItemInListReturnIndex = isItemInListReturnIndex;
module.exports.findFieldValue = findFieldValue;
module.exports.isItemExist = isItemExist;
module.exports.isItemExistReturnIndex = isItemExistReturnIndex;
module.exports.findFieldValueForList = findFieldValueForList;