
const AV = require('./libs/av-core-min.js');
const adapters = require('./libs/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);
AV.init({
  appId: 'LpfPI9gHz8L4HC18O6Gc3BWp-9Nh9j0Va',
  appKey: 'Mo6TkLxqlCcmarFhtSDQwPaU',
  serverURLs: "https://jitools.wznmickey.com",
});
App({});