// import Mock from 'mockjs'
const Mock = require('mockjs');
// Error:(2, 1) ESLint: Parsing error: The keyword 'const' is reserved
import {
  commonConfig
} from '@/config/commonConfig'
// import commonConfig from "@/common/common.js"
//  commonConfig =  require ("src/config/commonConfig.js")
// import  commonConfig from "src/config/commonConfig.js"
// console.log("Mock")
// console.log(Mock)
// mock 多个
// https://blog.csdn.net/smile14174/article/details/115752287?spm=1000.2123.3001.4430

Mock.mock(commonConfig.rootUrl + commonConfig.UserLogin, (req, res) => {
  return {
    Token: "da",
    UserID: "1",
  }
});

Mock.mock(commonConfig.rootUrl + commonConfig.GetAccessPlatformRegulation, (req, res) => {
  return {
    //   AccessPlatTotal:27,
    // TYPE2CNT:27,
    //   TYPE3CNT:0,

    // AccessPlatTotal:27,
    // TYPE2CNT:13,
    //   TYPE3CNT:14,

    AccessPlatTotal: 100,
    TYPE2CNT: 60,
    TYPE3CNT: 40,

  }
});


Mock.mock(commonConfig.rootUrl + commonConfig.GetCarOnLine, (req, res) => {
  return {
    CarOnlineNumber: [1, 2, 3],
    VideoNumber: [1, 2, 3],
    CarTotal: [1, 2, 3],


  }
});

Mock.mock(commonConfig.rootUrl + commonConfig.GetVehicleSpreadData, (req, res) => {

  var VehicleSpreadData1 = {
    ZoneName: "ZoneName",
    VehicleCnt: "1",
    CBusTotalCount: "3",
    TourTotalCount: 4,
    LineTotalCount: 5,
    DTotalCount: 6,
    HeavyTotalCount: 8,
    TractorTotalCount: 9
  };
  var VehicleSpreadData2 = {
    ZoneName: "ZoneName",
    VehicleCnt: "1",
    CBusTotalCount: "3",
    TourTotalCount: 4,
    LineTotalCount: 5,
    DTotalCount: 6,
    HeavyTotalCount: 8,
    TractorTotalCount: 9
  };

  return [VehicleSpreadData1, VehicleSpreadData2];


});

/**
 * HandleCount
 :
 0
 InnetCount
 :
 5928
 IsEmployed
 :
 1
 OnlinePlatTime
 :
 155
 OnlineTime
 :
 0
 StatDate
 :
 20180118
 SupervisedCount
 :
 0
 VehicleCount
 :
 6043
 ZoneID
 :
 43010000
 ZoneName
 :
 "长沙市"
 */
Mock.mock(commonConfig.rootUrl + commonConfig.GetLevelPlatDataDetail, (req, res) => {

  var LevelPlatDataDetail = {
    HandleCount: "0",
    InnetCount: "5928",
    IsEmployed: "1",
    OnlinePlatTime: 155,
    OnlineTime: 0,
    StatDate: 20180118,
    SupervisedCount: 0,
    VehicleCount: 6043,
    ZoneID:43010000,
    ZoneName: "长沙市"
  };


  return  LevelPlatDataDetail;


});




// console.log("Mock")
// console.log(Mock)
// 这里有 export default啊 为什么不行
export default Mock;
// export default Mock.mock(commonConfig.rootUrl + commonConfig.UserLogin, (req, res) => {
//   return {
//     Token: "da",
//     UserID: "1",
//   }
// })
