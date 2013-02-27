var miniExcludes = {
		"lightDb/README.md": 1,
		"lightDb/package": 1
	},
	isTestRe = /\/test\//;

var profile = {
	resourceTags: {
		test: function(filename, mid) {
			return isTestRe.test(filename);
		},

		miniExclude: function(filename, mid){
			return isTestRe.test(filename) || mid in miniExcludes;
		},

		amd: function(filename, mid){
			return /\.js$/.test(filename);
		}
	}
};