'use strict';

angular.module('dotmxApp')
  .controller('MainCtrl', function ($scope,$document) {
    $scope.first = {
      isFirstOpen: true
    };
	$document.on('scroll', function() {
		var topPosition = angular.element(document.getElementById('topcontrol'));
		if($document.scrollTop() >= 65){
			topPosition.addClass('dark');
		}
		else{
			topPosition.removeClass('dark');	
		}
	});
	
	L.mapbox.accessToken = 'pk.eyJ1IjoiY2Fhcmxvc2h1Z28xIiwiYSI6IklmZGNsNmMifQ.JJksWU3hBP-Vd3S9WtjFsA';
	var map = L.mapbox.map('map-box', 'caarloshugo1.h9bggm26').setView([19.4313054168727, -99.1347885131836], 11);
	
  });
