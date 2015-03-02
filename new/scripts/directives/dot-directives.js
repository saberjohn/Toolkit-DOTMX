'use strict';

angular.module('dotmxApp')
.directive('dotHeader', function () {
	return {
		templateUrl: 'views/dot-header.html',
		restrict: 'E',
	};
})
.directive('dotFooter', function () {
	return {
		templateUrl: 'views/dot-footer.html',
		restrict: 'E',
	};
})
.directive('mainSection', function () {
	return {
		templateUrl: 'views/main_section.html',
		restrict: 'E',
	};
})
.directive('projectSection', function () {
	return {
		templateUrl: 'views/project_section.html',
		restrict: 'E',
	};
})
.directive('toolsSection', function () {
	return {
		templateUrl: 'views/tools_section.html',
		restrict: 'E',
	};
})
.directive('guideSection', function () {
	return {
		templateUrl: 'views/guide_section.html',
		restrict: 'E',
	};
})
.directive('strategiesSection', function () {
	return {
		templateUrl: 'views/strategies_section.html',
		restrict: 'E',
	};
})
.directive('modelSection', function () {
	return {
		templateUrl: 'views/model_section.html',
		restrict: 'E',
	};
});