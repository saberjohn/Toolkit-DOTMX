(function(){
	'use strict';
	angular.module('angularHideHeader',[]).directive('hideHeader',['$timeout','$window',function($timeout,$window){
		return{
			restrict:'A',
		  	link: function (scope, element, attrs) {
				var scrollposition = 0,scroll_time;
				var hideOffset = attrs.hideOffset;
				angular.element($window).bind("scroll", function() {
					var body = angular.element(document.getElementsByTagName('body'));
					var current_scroll = body[0].scrollTop;
					var hheight = element[0].scrollHeight;
					var pxOffset = parseInt(hideOffset);
					$timeout.cancel(scroll_time);
					console.log(current_scroll);
					console.log(hheight);
					console.log(scrollposition);
					if(current_scroll >= hheight+pxOffset){
						if (current_scroll < scrollposition) {
							element.css({'top':"0px"});
						}
						else if (current_scroll > scrollposition) {
							element.css({
								'top':-hheight+"px",
								'transition':'top 0.25s',
								'-webkit-transition': 'top 0.25s',
								'-moz-transition': 'top 0.25s',
								'-ms-transition': 'top 0.25s',
								'-o-transition': 'top 0.25s',
							});
						}
					}

					scroll_time = $timeout(function(){
						scrollposition = body[0].scrollTop;
					},60);
				});
			}
		}		
	}]);
}());