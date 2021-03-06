crypto.hash.baseHash = function(data) {
  if (data instanceof Array) {
    data = crypto.fromByteArray(data);
  }
  this.data = data || "";
}

crypto.hash.baseHash.prototype = {
  type : '',

  update : function(data) {
    if (data instanceof Array) {
      data = crypto.fromByteArray(data);
    }
    this.data = this.data + data;
  },

  digest : function() {
    var hashData = [];
    for (var x = 0; x < this.data.length; ++x) {
      hashData.push(this.data.charCodeAt(x));
    }

    var hashComp = Components.classes["@mozilla.org/security/hash;1"].createInstance(Components.interfaces.nsICryptoHash);
    hashComp.initWithString(this.type);
    hashComp.update(hashData, hashData.length);
    var result = hashComp.finish(false);

    return result;
  }
};
