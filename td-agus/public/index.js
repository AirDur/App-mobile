var Listeafaire = angular.module('ListeaFaire', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //Obtenir la liste (appel à la fonction get dans server.js)
    $http.get('/api/laliste')
        .success(function(data) {
            $scope.laliste = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error : ' + data);
        });

    //rajout d'une donnée (appel à la fonction post dans server.js)
    $scope.createTodo = function() {
        $http.post('/api/laliste', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    };

    //rajout d'une donnée (appel à la fonction delete dans server.js)
    $scope.deleteTodo = function(id) {
        $http.delete('/api/laliste/' + id)
            .success(function(data) {
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    };
}