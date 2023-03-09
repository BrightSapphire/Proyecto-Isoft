<?php
require_once 'conexion.php';

class ModelRetroalimentacion
{
    static public function getAll()
    {
        try {
            $statement = Conexion::connect()->prepare("SELECT * FROM retroalimentacion");
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_CLASS);
        } catch (PDOException $e) {
            $json = array(
                "status"  => 404,
                "msg" => $e->getMessage()
            );
            return $json;
        }
    }

    static public function insert($data)
    {
        try {
            $statement = Conexion::connect()->prepare("INSERT INTO retroalimentacion (courseID, studentID, teacherID, activityID, fortaleza, falencia) VALUES (:courseID, :studentID, :teacherID, :activityID, :fortaleza, :falencia)");

            $statement->execute([':courseID' => $data['courseID'], ':studentID' => $data['studentID'], ':teacherID' => $data['teacherID'], ':activityID' => $data['activityID'], ':fortaleza' => $data['fortaleza'], ':falencia' => $data['falencia']]);

            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}
