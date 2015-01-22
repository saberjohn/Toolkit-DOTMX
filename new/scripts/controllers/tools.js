'use strict';

angular.module('dotmxApp')
  .controller('ToolsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.first = {
      isFirstOpen: true
    };
  });
