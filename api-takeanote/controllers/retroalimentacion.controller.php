<?php

class ControllerRetroalimentacion
{
    public function getAll()
    {
        echo json_encode(ModelRetroalimentacion::getAll(), true);
        return;
    }

    public function insertRetroalimentacion($data){
        if(ModelRetroalimentacion::insert($data)){
            $json = array(
                "status"  => 200,
                "DETAILS" => 'Datos insertados exitosamente'
            );
        }else{
            $json = array(
                "status"  => 400,
                "DETAILS" => 'Error al insertar los datos'
            );
        }
        

        echo json_encode($json, true);

        return;
    }
}

