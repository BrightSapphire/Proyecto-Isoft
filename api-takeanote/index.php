<?php 

require_once "lib/config.php";

//controllers
require_once "controllers/routes.controller.php";
require_once "controllers/retroalimentacion.controller.php";

//modelos
require_once "models/retroalimentacion.model.php";

$route = new  ControllerRoutes;
$route->index();