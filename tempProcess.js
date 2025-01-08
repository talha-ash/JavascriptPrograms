const { StyleUtils } = require("./tempData");

function showutils() {
  console.log(StyleUtils.alignItemsCenter);
  return StyleUtils;
}

module.exports = { showutils: showutils };
