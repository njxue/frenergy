export default async function getAllInfo(year) {
  const GROUP_BY_FACULTIES = {};
  const MODULES = [];
  await fetch(`https://api.nusmods.com/v2/${year}-${year + 1}/moduleInfo.json`)
    .then((response) => response.json())
    .then((data) => {
      for (const key in data) {
        const faculty = data[key].faculty;
        const department = data[key].department;
        const moduleCode = data[key].moduleCode;
        const moduleCredit = data[key].moduleCredit;
        const title = data[key].title;

        MODULES.push(moduleCode);

        if (!GROUP_BY_FACULTIES[faculty]) {
          GROUP_BY_FACULTIES[faculty] = {};
        }

        if (!GROUP_BY_FACULTIES[faculty][department]) {
          GROUP_BY_FACULTIES[faculty][department] = {};
        }

        if (!GROUP_BY_FACULTIES[faculty][department][moduleCode]) {
          GROUP_BY_FACULTIES[faculty][department][moduleCode] = {
            title: title,
            moduleCredit: moduleCredit,
          };
        }
      }
    });

  const FAC_ARR = Object.keys(GROUP_BY_FACULTIES);
  FAC_ARR.sort();

  const INFO = {
    faculties: FAC_ARR,
    modules: MODULES,
    groupByFaculties: GROUP_BY_FACULTIES,
  };
  return INFO;
}

export function transformToMenuItems(itemArr) {
  const items = [];
  for (const item in itemArr) {
    items.push({
      value: itemArr[item],
      label: itemArr[item],
    });
  }
  return items;
}

export async function getAllFaculties(year) {
  const faculties = {};
  await fetch(`https://api.nusmods.com/v2/${year}-${year + 1}/moduleInfo.json`)
    .then((response) => response.json())
    .then((data) => {
      for (const k in data) {
        if (!faculties[data[k].faculty]) {
          faculties[data[k].faculty] = true;
        }
      }
    });

  const res = Object.keys(faculties);
  res.sort();
  return res;
}

export async function getDepartmentsInFaculty(year, faculty) {
  const departments = {};
  await fetch(`https://api.nusmods.com/v2/${year}-${year + 1}/moduleInfo.json`)
    .then((response) => response.json())
    .then((data) => {
      for (const k in data) {
        if (data[k].faculty == faculty) {
          departments[data[k].department] = true;
        }
      }
    });
  const res = Object.keys(departments);
  res.sort();
  return res;
}

export async function getModulesInDepartment(year, faculty, department) {
  const modules = [];
  await fetch(`https://api.nusmods.com/v2/${year}-${year + 1}/moduleInfo.json`)
    .then((response) => response.json())
    .then((data) => {
      for (const k in data) {
        if (data[k].department == department && data[k].faculty == faculty) {
          modules.push(data[k].moduleCode);
        }
      }
    });
  modules.sort();
  return modules;
}

export async function getModulesInFaculty(year, faculty) {
  const modules = [];
  await fetch(`https://api.nusmods.com/v2/${year}-${year + 1}/moduleInfo.json`)
    .then((response) => response.json())
    .then((data) => {
      for (const k in data) {
        if (data[k].faculty == faculty) {
          modules.push(data[k].moduleCode);
        }
      }
    });
  modules.sort();
  return modules;
}

export async function getAllModules(year) {
  const modules = [];
  await fetch(`https://api.nusmods.com/v2/${year}-${year + 1}/moduleInfo.json`)
    .then((response) => response.json())
    .then((data) => {
      for (const k in data) {
        modules.push(data[k].moduleCode);
      }
    });
  modules.sort();

  return modules;
}

export async function checkModuleExists(year, module) {
  var ok = false;
  await fetch(
    `https://api.nusmods.com/v2/${year}-${year + 1}/modules/${module}.json`
  ).then((r) => {
    ok = r.ok;
  });
  return ok;
}
