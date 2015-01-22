'use strict';

  angular.module('dotmxApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap'
  ])
	.run(["$rootScope", "$state", "$stateParams",function ($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		return $rootScope.$stateParams = $stateParams;
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
	//delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	  .state('index', {
		url: '/',
		templateUrl: 'views/main.html',
		controller:'MainCtrl'
	  })
	  .state('/diagnostic', {
		url: '/diagnostico',
		templateUrl: 'views/diagnostic.html',
		controller: 'DiagnosticCtrl'
	  })
	  .state('/tools', {
		url: '/herramientas',
		templateUrl: 'views/tools.html',
		controller: 'ToolsCtrl'
	  })
	  .state('/strategies', {
		url: '/estrategias',
		templateUrl: 'views/strategies.html',
		controller: 'StrategiesCtrl'
	  })
	  .state('/model', {
		url: '/modelo',
		templateUrl: 'views/model.html',
		controller: 'ModelCtrl'
	  })
	  .state('/about', {
		url: '/acerca',
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl'
	  })
  });