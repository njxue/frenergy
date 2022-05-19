import api from "./nusmodsapi.js";
import fs from "fs";

const KEY_BY_FACULTY = {};
const KEY_BY_MODULE = {};
const FACULTIES = [];
const MODULECODES = [];
const MODULECODESDROPDOWN = [];

function keyByFaculty() {
  api.map((m) => {
    if (!KEY_BY_FACULTY[m.faculty]) {
      KEY_BY_FACULTY[m.faculty] = {};
      FACULTIES.push(m.faculty);
    }
  });

  api.map((m) => {
    if (!KEY_BY_FACULTY[m.faculty][m.department]) {
      KEY_BY_FACULTY[m.faculty][m.department] = {};
    }
  });

  api.map((m) => {
    if (!KEY_BY_FACULTY[m.faculty][m.department][m.moduleCode]) {
      KEY_BY_FACULTY[m.faculty][m.department][m.moduleCode] = {
        title: m.title,
        moduleCredit: m.moduleCredit,
      };
    }
  });
}

function keyByModule() {
  api.map((m) => {
    if (!KEY_BY_MODULE[m.moduleCode]) {
      KEY_BY_MODULE[m.moduleCode] = {
        title: m.title,
        moduleCredit: m.moduleCredit,
        faculty: m.faculty,
        department: m.department,
      };
    }
  });
}

function moduleCodes() {
  api.forEach((m) => {
    MODULECODES.push(m.moduleCode);
  });
  MODULECODES.sort();
}

function moduleCodesDropdown() {
  api.forEach((m) => {
    MODULECODESDROPDOWN.push({ value: m.moduleCode, label: m.moduleCode });
  });
  MODULECODES.sort();
}

function writeModuleCodesDropdown() {
  moduleCodesDropdown();
  fs.writeFile(
    "moduleCodesDropdown.json",
    JSON.stringify(MODULECODESDROPDOWN),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

function writeKeyByModule() {
  keyByModule();
  fs.writeFile(
    "keybymodule.json",
    JSON.stringify(KEY_BY_MODULE),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

function writeKeyByFaculty() {
  keyByFaculty();
  fs.writeFile(
    "keybyfaculty.json",
    JSON.stringify(KEY_BY_FACULTY),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

function writeFaculties() {
  keyByFaculty();
  FACULTIES.sort();
  fs.writeFile("faculties.json", JSON.stringify(FACULTIES), function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

function writeModuleCodes() {
  moduleCodes();
  fs.writeFile("modulecodes.json", JSON.stringify(MODULECODES), function (err) {
    if (err) {
      return console.log(err);
    }
  });
}
//writeKeyByFaculty();
//writeKeyByModule();
//writeModuleCodes();
writeModuleCodesDropdown();
function calcWorkload() {
  let total = 0;
  let project = 0;
  let count = 0;
  api.forEach((m) => {
    if (m["workload"] && m["workload"] instanceof Array) {
      total += m["workload"].reduce((x, y) => x + y, 0);
      project += m["workload"][3];
      count++;
    }
  });
  console.log("Total: " + total);
  console.log("Project: " + project);
  console.log("Average % workload is project: " + project / total);
  console.log("Average project: " + project / count);
}
