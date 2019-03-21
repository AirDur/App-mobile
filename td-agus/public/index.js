var Listeafaire = angular.module('ListeaFaire', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //Obtenir la liste (appel à la fonction get dans server.js)
    $http.get('/api/laliste')
        .success(function(data) {
            $scope.laliste = data;
            for(var i = 0; i < $scope.laliste.length; i++) {
                $scope.laliste[i].date = new Date($scope.laliste[i].date).toLocaleString();
            }
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
                for(var i = 0; i < $scope.laliste.length; i++) {
                    $scope.laliste[i].date = new Date($scope.laliste[i].date).toLocaleString();
                }
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
                for(var i = 0; i < $scope.laliste.length; i++) {
                    $scope.laliste[i].date = new Date($scope.laliste[i].date).toLocaleString();
                }
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    };

    $scope.checkTodo = function(id, done) {
        $http.post('/api/laliste/' + id + "/" + done)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
                for(var i = 0; i < $scope.laliste.length; i++) {
                    $scope.laliste[i].date = new Date($scope.laliste[i].date).toLocaleString();
                }
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    }

    //Supprime les tâches "finies"
    $scope.delCheckedTask = function() {
        for(i in $scope.laliste) {
            if($scope.laliste[i].done) {
                $http.post('/api/laliste/' + $scope.laliste[i]._id)
                    .success(function(data) {
                        $scope.laliste = data;
                        for(var i = 0; i < $scope.laliste.length; i++) {
                            $scope.laliste[i].date = new Date($scope.laliste[i].date).toLocaleString();
                        }
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error : ' + data);
                    }); 
            }
        }
    }

    //déclare une tâche faite
    $scope.doneTodo = function(id) {

    }
}