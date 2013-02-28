(function(define) {

	define([], function() {

		var ls = window.localStorage;

		var hasLocalStorage = !!ls;

		var volatiles = {};

		var Volatile = function(collectionName) {
			this.collectionName = collectionName;
			volatiles[collectionName] = this.index = {};
		};
		Volatile.prototype = {
			get : function(key) {
				return this.index[key];
			},
			set : function(key, data) {
				this.index[key] = data;
			},
			remove : function(key) {
				delete this.index[key];
			},
			forEach : function(iterator) {
				for (var key in this.index) {
					iterator(this.index[key], key);
				};
			},
			size : function() {
				return this.index.length;
			},
			destroy : function() {
				delete volatiles[this.collectionName];
			}
		};

		var Persistent = function(collectionName) {
			this.collectionName = collectionName;
			this.prefix = '__' + collectionName + '__';
			this.countKey = '__' + collectionName + '-count__';
			this.prefixRegExp = new RegExp('^' + this.prefix);
			ls.getItem(this.countKey) || ls.setItem(this.countKey, 0);
		};
		Persistent.prototype = {
			JSON : JSON,
			get : function(key) {
				return this.JSON.parse(ls.getItem[this.prefix + key]);
			},
			set : function(key, data) {
				if (!ls.getItem(key))
					ls.setItem(this.countKey, ls.getItem(this.countKey) + 1);
				ls.setItem(this.prefix + key, this.JSON.stringify(data));
			},
			remove : function(key) {
				if (ls.getItem(this.prefix + key))
					ls.setItem(this.countKey, ls.getItem(this.countKey) - 1);
				ls.removeItem(this.prefix + key);
			},
			forEach : function(iterator) {
				for (var i = 0; i < ls.length; i++) {
					var key = ls.key(i);
					if (this.prefixRegExp.test(key)) {
						iterator(ls.getItem(key), key);
					}
				}
			},
			size : function() {
				return ls.getItem(this.countKey);
			},
			destroy : function() {
				ls.removeItem(this.countKey);
				for (var i = 0; i < ls.length; i++) {
					var key = ls.key(i);
					if (this.prefixRegExp.test(key)) {
						ls.removeItem(key);
					}
				}
			}
		};

		return {
			Volatile : Volatile,
			Persistent : Persistent,
			get : function(collectionName) {
				return new (hasLocalStorage ? Persistent : Volatile)(collectionName);
			},
			remove : function(collectionName) {
				this.get(collectionName).destroy();
			},
			setJsonUtil : function(JSON) {
				Persistent.prototye.JSON = JSON;
			}
		};

	});

})( typeof define == "undefined" ? function(deps, factory) {
	lightDb = factory();
} : define);
