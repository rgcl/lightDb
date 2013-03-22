(function(define) {

	define([], function() {

		var ls = window.localStorage;					

		var volatiles = {};

		var Volatile = function(collectionName) {
			this.collectionName = collectionName;
			this.size = 0;
			volatiles[collectionName] = this._index = {};			
		};
		Volatile.prototype = {
			get : function(key) {
				return this._index[key];
			},
			set : function(key, data) {
				if(!this.has(key))
					this.size++;  
				this._index[key] = data;
			},
			remove : function(key) {
				if(this.has(key))
					this.size--;
				delete this._index[key];
			},
			has: function() {
				return !! this._index[key];
			},
			forEach : function(iterator) {
				for (var key in this._index) {
					iterator(this._index[key], key);
				};
			},
			size : function() {
				return this._index.length;
			},
			_destroy : function() {				
				delete volatiles[this.collectionName];
			}
		};

		var Persistent = function(collectionName) {
			this.collectionName = collectionName;
			this._prefix = '__' + collectionName + '__';
			this._countKey = '__' + collectionName + '-count__';
			this._prefixRegExp = new RegExp('^' + this._prefix);			
			ls.getItem(this._countKey) || ls.setItem(this._countKey, 0);		
		};
		Persistent.prototype = {			
			get : function(key) {
				return JSON.parse(ls.getItem(this._prefix + key));
			},
			set : function(key, data) {
				if (!ls.getItem(key))
					ls.setItem(this._countKey, parseInt(ls.getItem(this._countKey)) + 1);
				ls.setItem(this._prefix + key, JSON.stringify(data));
			},
			remove : function(key) {
				if (ls.getItem(this._prefix + key))
					ls.setItem(this._countKey, parseInt(ls.getItem(this._countKey)) - 1);
				ls.removeItem(this._prefix + key);
			},
			has: function(key) {
				return !!ls.getItem(this._prefix + key);
			},
			forEach : function(iterator) {
				for (var i = 0; i < ls.length; i++) {
					var keyCollection = ls.key(i), key;
					if (this._prefixRegExp.test(keyCollection)) {
						key = keyCollection.replace(this._prefixRegExp, '');				
						iterator(this.get(key), key);
					}
				}
			},
			size : function() {
				return parseInt(ls.getItem(this._countKey));
			},
			_destroy : function() {
				ls.removeItem(this._countKey);
				for (var i = 0; i < ls.length; i++) {
					var key = ls.key(i);
					if (this._prefixRegExp.test(key)) {
						ls.removeItem(key);
					}
				}
			}
		};

		return {
			Volatile : Volatile,
			Persistent : Persistent,
			get : function(collectionName) {
				return new (!!ls ? Persistent : Volatile)(collectionName);
			},
			remove : function(collectionName) {
				this.get(collectionName)._destroy();
			},
			setJsonUtil : function(JSONUtil) {
				JSON = JSONUtil;
			}
		};

	});

})( typeof define == "undefined" || !define.amd ? function(deps, factory) {
	lightDb = factory();
} : define);
