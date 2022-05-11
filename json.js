const fs = require('fs');

//write json file using data variable
const writeJson = (filePath, data, encoding = 'utf-8') => {
  const promiseCallback = (resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), encoding, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  };
  return new Promise(promiseCallback);
};

//read json file using a filepath variable
const readJson = (filePath, encoding = 'utf-8') => {
  const promiseCallback = (resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const object = JSON.parse(data);
        resolve(object);
      } catch (e) {
        reject(e);
      }
    });
  };
  return new Promise(promiseCallback);
};

//update json file using filepath and newData variable
const updateJson = (filePath, newData, encoding = 'utf-8') => {
  const promiseCallback = async (resolve, reject) => {
    try {
      const data = await JSONRead(filePath, encoding);
      const result = { ...data, ...newData };
      await JSONWrite(filePath, result, encoding);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  };
  return new Promise(promiseCallback);
};

//delete json file using filepath variable
const deleteJson = (filePath) => {
  const promiseCallback = (resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  };
  return new Promise(promiseCallback);
};

module.exports = { writeJson, readJson, updateJson, deleteJson };
