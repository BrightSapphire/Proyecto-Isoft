<?php


//CORS para aceptar peticiones de otro dominio
//********************************************/
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization, PHP_AUTH_USER, PHP_AUTH_PW");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}



$arrayRoutes = explode('/', $_SERVER['REQUEST_URI']);



/****************************************************************
 * EL SIGUIENTE CONDICIONAL ES PARA CUANDO NO HAY NIGÚN ENDPOINT
 ********************************************************************/

if (count(array_filter($arrayRoutes)) == 0) {
    $json = array(
        "msg" => "No se encontro la ruta",
    );

    echo json_encode($json, true);

    return;
} else {
    if (count(array_filter($arrayRoutes)) == 1) {
        //si existe la ruta
        if (array_filter($arrayRoutes)[1] == 'retroalimentacion') {
            if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'GET') {
                $retro = new ControllerRetroalimentacion();
                $retro->getAll();
                return;
            }

            if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
                $data = json_decode(file_get_contents("php://input"), true);
                
                $compra = new ControllerRetroalimentacion();
                $compra->insertRetroalimentacion($data);
                
                return;
            }
        }
        
    } else {
        /****************************************************************
         * LOS SIGUIENTES CONDICIONALES SON PARA CUANDO EXISTAN MAS DE 1 INDICE
         ********************************************************************/
        
    }
}
