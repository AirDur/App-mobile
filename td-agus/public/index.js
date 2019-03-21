var Listeafaire = angular.module('ListeaFaire', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.formModify = {};
    $scope.laliste = {};

    $scope.styleDone = {
        "background-color" : "lightgray"
    }

    //Obtenir la liste (appel à la fonction get dans server.js)
    $http.get('/api/laliste')
        .success(function(data) {
            $scope.laliste = data;
        })
        .error(function(data) {
            console.log('Error index.js : ' + data);
        });

    //rajout d'une tâche (appel à la fonction post dans server.js)
    $scope.createTodo = function() {
        $http.post('/api/laliste', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error index.js     : ' + data);
            }); 
    };

    //Modification d'une tâche : 
    $scope.modifyTodo = function(task, index) {
        if (document.getElementById('btn-modify-'+index).innerHTML=='Modifier') {
            document.getElementById('xtextmodify-'+index).style.display = "block";
            document.getElementById('xtext-'+index).style.display = "none";
            document.getElementById('btn-modify-'+index).innerHTML='✔';
            $scope.formModify.text = task.text;
        }
        else {
            document.getElementById('xtextmodify-'+index).style.display = "none";
            document.getElementById('xtext-'+index).style.display = "block";
            document.getElementById('btn-modify-'+index).innerHTML = 'Modifier';
            $http.post('/api/laliste/modify/' + task._id + "/" + $scope.formModify.text)
            .success(function(data) {
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        };
};

    //suppression d'une tâche (appel à la fonction delete dans server.js)
    $scope.deleteTodo = function(id) {
        $http.delete('/api/laliste/delete/' + id)
            .success(function(data) {
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    };

    // Permet de déclarer une tâche "effectuée" : 
    $scope.checkTodo = function(id, done, index) {
        $http.post('/api/laliste/' + id + "/" + done)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    }

    $scope.taskDone = function(done) {
        if(done)
            return $scope.styleDone;
    }

    //Supprime les tâches "finies" : 
    $scope.delCheckedTask = function() {
        for(i in $scope.laliste) {
            if($scope.laliste[i].done) {
                $http.delete('/api/laliste/delete/' + $scope.laliste[i]._id)
                    .success(function(data) {
                        $scope.laliste = data;
                    })
                    .error(function(data) {
                        console.log('Error : ' + data);
                    }); 
            }
        }
    }
}