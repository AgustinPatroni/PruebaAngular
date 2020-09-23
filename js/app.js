var app = angular.module("ListadoUsuarios", []);
app.controller("ListadoCtrl", function ($scope, $http) {
    $scope.usuarios = [];
    $scope.seleccionado;
    $scope.nombre;
    $scope.apellido;
    $scope.email;

    inicializar();

    function inicializar() {
        $http.get('https://reqres.in/api/users?page=2').then(function (data) {
            $scope.usuarios = data.data.data;
        });
    };

    $scope.eliminar = function (id) {        
        $http.delete('https://reqres.in/api/users/' + id).then(function () {
            var i = $scope.usuarios.findIndex(x => x.id == id);
            
            $scope.usuarios.splice(i, 1);
        });
    };

    $scope.seleccionar = function(x) {
        $scope.seleccionado = x;
        $scope.nombre = x.first_name;
        $scope.apellido = x.last_name;
        $scope.email = x.email;
    }
    $scope.guardar = function(){
        //ver si hay elementos seleccionados, si hay entonces es modificacion
        //si no hay se debe agregar
        if ($scope.seleccionado === null) {
            const nuevoUsuario = {
                avatar: 'https://www.trecebits.com/wp-content/uploads/2020/06/Im%C3%A1genes-de-Google.png',
                first_name:$scope.nombre,
                last_name:$scope.apellido,
                email:$scope.email
        }
        $scope.usuarios.push(nuevoUsuario);
    }
        else{
            $scope.seleccionado.first_name = $scope.nombre;
            $scope.seleccionado.last_name = $scope.apellido;
            $scope.seleccionado.email = $scope.email;
        }
        $('#exampleModal').modal('hide');
    }
});