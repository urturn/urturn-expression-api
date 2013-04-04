if(!window.fixtures){
  window.fixtures = {};
}

window.CollectionDataDelegate = function(){
  this.operations = [];
  this.save = function(collectionName, items) {
    this.operations.push({name: collectionName, items: items});
  };
  this.find = function(collectionName, options, callback) {
    this.operations.push({name: collectionName, options: options, callback: callback});
  };
};

window.fixtures.collectionData = {
  data: function(){
    var data = {
      name: 'default',
      public: false,
      items: [{
        _type: 'image',
        _key: 'my-image',
        _user_id: '4b78196c-d84f-4131-ae00-fcce5ac1a9cc',
        media_id: 'xxxx-aaaa-vvvv-cccc',
        url: 'http://urturn.com/logo.png'
      },{
        __type: 'literal',
        _key: 'ratio',
        value: 9.233342342
      }]
    };
    data.count = data.items.length;
    return data;
  },
  empty: function(){
    return {
      name: 'empty-collection',
      public: false,
      count: 0
    };
  },
  myCollection: function(userId){
    var otherUserId = UT.uuid();
    return {
      // name of the colleciton
      name: 'my-collection',
      count: 3,
      public: true,
      items: [{
        _type: "custom",
        _key: userId,
        _user_id: userId,
        note: 4,
        love_it: true,
        spentMoney: 98.20
      },{
        _type: "custom",
        _key: otherUserId,
        _user_id: otherUserId,
        note: 2,
        love_it: false,
        spentMoney: 9.20
      }],
      // operations on field
      operations: [
        {
          operation: "average",
          field: "note",
          average: 4.25,
          average_count: 2
        },{
          operation: "count",
          field: "note",
          count: 2
        },{
          operation: "count",
          field: "leave_it",
          count: 3
        },{
          operation: "count",
          field: "love_it",
          count: 5
        },{
          operation: "sum",
          field: "spentMoney",
          sum: 1233.30
        },{
          operation: "average",
          field: "emptyField",
          average: -1,
          average_count: 0
        },{
          operation: "sum",
          field: "emptyField",
          sum: 0
        }
      ],
      definition: {
        fields: [
          {name: 'note', type: 'number', operations: ['average', 'count']},
          {name: 'love_it', type: 'boolean', operations: ['count']},
          {name: 'leave_it', type: 'boolean', operations: ['count']},
          {name: 'comment', type: 'string'},
          {name: 'spentMoney', type: 'number', operations: ['sum']},
          {name: 'emptyField', type: 'number', operations: ['sum', 'average']}
        ]
      }
    };
  }
};