/**
 * Created by zhangyumou on 16/11/5.
 */

module.exports = {
  checkLoginTimeOut : function (sessionInfo) {
    if (!sessionInfo || sessionInfo.split("-").length < 2) {
      return false;
    }
    const state = sessionInfo.split("-")[0];
    const loginTime = sessionInfo.split("-")[1];
    const currentTime = new Date().valueOf();
    //if ((currentTime - loginTime) > 1000 * 60 * 1 ) {
    //  return false;
    //} else {
      return true;
    //}
  }
};