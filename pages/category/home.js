import * as AV from '../../libs/av-core-min.js';
const getDataForRenderPlatform = platform => ({
  name: platform.get('name'),
  showname: platform.get('showname')
});
const getDataForRenderKind = kind => ({
  name: kind.get('name'),
  showname: kind.get('showname')
});
const getDataForRenderRecommendObject = recommendObject => ({
  name: recommendObject.get('name'),
  showname: recommendObject.get('showname'),
  //kind: recommendObject.get('kind'),
  //platform: recommendObject.get('platform'),
  //subject: recommendObject.get('subject'),
  //introduction: recommendObject.get('introduction'),
  tag: recommendObject.get('tag'),
  photo: recommendObject.get('photo'),
});
Page({
  data: {
    platform: {},
    recommendObjectList: [],
    recommendObject: [],
    chooseplatform: "none",
    chooseRecommendObject: "none",
    choosekind: "none",
    photo: [],
    showthings: "kind",
    showhistory: ["kind"],
    showtag: ""
  },
  onReady() {
    new AV.Query('Kind')
      .find()
      .then(kind => this.setData({
        kind: kind.map(getDataForRenderKind)
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
  chooseKind: function (event) {
    this.data.showhistory.push("chooseRecommendObject");
    this.setData({
      choosekind: event.target.id,
      showthings: "chooseRecommendObject",
      showhistory: this.data.showhistory
    });
    console.log("chooseKind:" + this.data.choosekind);
    new AV.Query('Recommend')
      .equalTo('kind', this.data.choosekind)
      .find()
      .then(recommendobject => this.setData({
        recommendObjectList: recommendobject.map(getDataForRenderRecommendObject)
      }))
      .catch(console.error);
  },
  chooserecommendObject: function (event) {
    this.data.showhistory.push("RecommendObject");
    this.setData({
      chooseRecommendObject: event.target.id,
      showthings: "RecommendObject",
      showhistory: this.data.showhistory
    });
    console.log("chooseRecommendObject:" + this.data.chooseRecommendObject);
    new AV.Query('Recommend')
      .equalTo('name', this.data.chooseRecommendObject)
      .find()
      .then(recommendobject => {
        this.data.recommendObject = recommendobject;
        this.setData({
          recommendObject: recommendobject.map(getDataForRenderRecommendObject)
        });
        console.log(this.data.recommendObjectList);
        console.log(this.data.recommendObject);
        this.data.showtag = this.data.recommendObject[0].tag[0];
        for (var i = 1; i < this.data.recommendObject[0].tag.length; i++) {
          this.data.showtag = this.data.showtag + "," + this.data.recommendObject[0].tag[i];
        }
        this.setData({
          showtag: this.data.showtag
        });
        this.data.photo = [];
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
      })
      .catch(console.error);
  },
  comeback: function (event) {
    console.log("comeback");
    this.setData({
      showthings: this.data.showhistory[this.data.showhistory.length - 2]
    })
    console.log(this.data.showthings);
    this.data.showhistory.pop();
    this.setData({
      showhistory: this.data.showhistory
    })
    console.log(this.data.showhistory.length);
  }
});