import * as AV from '../../libs/av-core-min.js';
const getDataForRenderPlatform = platform => ({
  name: platform.get('name'),
  showname: platform.get('showname')
});
const getDataForRenderRecommendObject = recommendObject => ({
  name: recommendObject.get('name'),
  showname: recommendObject.get('showname'),
  kind: recommendObject.get('kind'),
  platform: recommendObject.get('platform'),
  subject: recommendObject.get('subject'),
  introduction: recommendObject.get('introduction'),
  photo: recommendObject.get('photo'),
});
Page({
  data: {
    platform: {},
    recommendObject: {},
    chooseplatform: "none",
    chooseRecommendObject: "none",
    photo: [],
  },
  onReady() {
    new AV.Query('Platform')
      .find()
      .then(platform => this.setData({
        platform: platform.map(getDataForRenderPlatform)
      }))
      .catch(console.error);
  },
  choosePlatform: function (event) {
    this.setData({
      chooseplatform: event.target.id
    });
    console.log("choosePlatform:" + this.data.chooseplatform);
    new AV.Query('Recommend')
      .equalTo('platform', this.data.chooseplatform)
      .find()
      .then(recommendObject => this.setData({
        recommendObject: recommendObject.map(getDataForRenderRecommendObject)
      }))
      .catch(console.error);
  },
  chooserecommendObject: function (event) {
    this.setData({
      chooseRecommendObject: event.target.id
    });
    console.log("chooseRecommendObject:" + this.data.chooseRecommendObject);
    new AV.Query('Recommend')
      .equalTo('name', this.data.chooseRecommendObject)
      .find()
      .then(recommendObject => this.setData({
        recommendObject: recommendObject.map(getDataForRenderRecommendObject)
      }))
      .catch(console.error);
    for (var i = 0; i < this.data.recommendObject.length; i++) {
      var query = new AV.Query('_File')
      for (var j = 0; j < this.data.recommendObject[i].photo.length; j++) {
        query.get(this.data.recommendObject[i].photo[j].toString()).then((photo) => {
          var url = photo.get('url');
          this.data.photo.push(url);
          this.setData({
            photo: this.data.photo
          });
        }).catch(console.error);
      }
    }
  },
  comeback: function (event) {
    console.log("comeback");
    if (this.data.chooseRecommendObject != "none") {
      this.setData({
        chooseRecommendObject: "none"
      });
    } else if (this.data.chooseplatform != "none") {
      this.setData({
        chooseplatform: "none"
      });
    }
  }
});