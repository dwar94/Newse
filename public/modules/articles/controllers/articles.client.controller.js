'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;
        $scope.comment = '';
        $scope.articleIndex = 0;
        $scope.nextFlag = false;
        $scope.previousFlag = false;
		$scope.create = function() {
             
             //window.open($scope.linker);
              console.log($scope.linker);
  			//$scope.pageTitle = $($scope.linker).filter('title').text();
  			if($scope.linker.indexOf('http://')!==-1)
           $scope.linker = $scope.linker.substring(7,$scope.linker.length);
        if($scope.linker.indexOf('https://')!==-1)
           $scope.linker = $scope.linker.substring(8,$scope.linker.length);
			var article = new Articles({
				title: '',
				link: $scope.linker,
				content:'',
				like:[],
				comments:[]
			});

			article.$save(function(response) {
				$location.path('#!/');

				$scope.title = '';
				$scope.content = '';
				$scope.comments = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.addComment = function(){
             $scope.commentObj = {};
             $scope.commentObj.creator = $scope.authentication.user.displayName;
             $scope.commentObj.comment = $scope.comment;
             $scope.article.comments.push($scope.commentObj);
             $scope.update();
		};
		$scope.toggleLike = function(){ 
           console.log($scope.article);
           if($scope.article.like.indexOf($scope.authentication.user._id) !== -1)
       	   {
       	 		//console.log("Not liked it");
       	 		$scope.article.like.splice($scope.authentication.user._id);
       	   }
       	   else
       	   {
       	   	    //console.log("liked it");
       	 		$scope.article.like.push($scope.authentication.user._id);
       	   }
       	   $scope.update();
       
		};
        $scope.fetchNext = function(){
        	$scope.articleIndex = $scope.articleIndex + 1;
        	if($scope.articleIndex === $scope.articles.length - 1)
        	{
                $scope.nextFlag = false;
        	}
        	$scope.previousFlag = true;		
            $scope.article = $scope.articles[$scope.articleIndex];

        };
        $scope.fetchBack = function(){

            $scope.articleIndex = $scope.articleIndex - 1;
            if($scope.articleIndex === 0)
            {
            	$scope.previousFlag = false;

            }
            else
            {
                $scope.previousFlag = true;	
                
            }
            $scope.nextFlag = true; 
            $scope.article = $scope.articles[$scope.articleIndex];	
        };
		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('#!/');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				//$location.path('articles/' + article._id);
				$scope.comment = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			
		   Articles.query(function(articles){
                   if(articles)
                   {
                   	 $scope.articles = articles;
                     $scope.articleIndex = 0;
                   	 $scope.article = $scope.articles[0];
                   	 console.log($scope.article);
                   	 if($scope.articles.length === 1)
                   	 	 $scope.nextFlag = false;
                   	 else
                   	     $scope.nextFlag = true;
                   	 console.log($scope.nextFlag);    	
                   }
			});
			
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);