<?php

require_once 'vendor/autoload.php';

use Firebase\JWT\ExpiredException;
use \Firebase\JWT\JWT;

define('FIRST_KEY', 'zDWSMzXoE/ulqdVxDAs4W5cN5R+K5RVsIxawL19NBTc=');
define('SECOND_KEY', 'IPrTyGphmGxzjXF1ry0Gh0XSdx7uqHFl9aCsNWVWEKOdVvt0vrLpfkojTKpvCZDvL4krT1lXz3Nv4kXeOjh2Ag==');
define('ENCRYPT', ['HS256']);

function signIn($data)
{
    $time = time();

    $token = array(
        'exp' => $time + (60 * 60 * 24),
        'aud' => aud(),
        'data' => $data
    );

    return JWT::encode($token, SECOND_KEY);
}

function check($token)
    {
        if(empty($token))
        {
            return 2;
        }

        try {
            $decode = JWT::decode(
                $token,
                SECOND_KEY,
                ENCRYPT
            );
            if($decode->aud !== aud()){
                return 3;
            }
        } catch (ExpiredException $th) {
            return 4;
        }

        return true;
    }

function getData($token)
    {
        return JWT::decode(
            $token,
            SECOND_KEY,
            ENCRYPT
        )->data;
    }

    function aud()
    {
        $aud = '';

        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }

        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();

        return sha1($aud);
    }

    /*******************************************************************
 * ENCRIPTA LAS CREDENCIALES DEL CLIENTE
 *******************************************************************/
function secured_encrypt($data)
{
    $first_key = base64_decode(FIRST_KEY);
    $second_key = base64_decode(SECOND_KEY);

    $method = "aes-256-cbc";
    $iv_length = openssl_cipher_iv_length($method);
    $iv = openssl_random_pseudo_bytes($iv_length);

    $first_encrypted = openssl_encrypt($data, $method, $first_key, OPENSSL_RAW_DATA, $iv);
    $second_encrypted = hash_hmac('sha3-512', $first_encrypted, $second_key, TRUE);

    $output = base64_encode($iv . $second_encrypted . $first_encrypted);
    return $output;
}


/*******************************************************************
 * DESENCRIPTA LAS CREDENCIALES DEL CLIENTE
 *******************************************************************/
function secured_decrypt($input)
{
    $first_key = base64_decode(FIRST_KEY);
    $second_key = base64_decode(SECOND_KEY);
    $mix = base64_decode($input);

    $method = "aes-256-cbc";
    $iv_length = openssl_cipher_iv_length($method);

    $iv = substr($mix, 0, $iv_length);
    $second_encrypted = substr($mix, $iv_length, 64);
    $first_encrypted = substr($mix, $iv_length + 64);

    $data = openssl_decrypt($first_encrypted, $method, $first_key, OPENSSL_RAW_DATA, $iv);
    $second_encrypted_new = hash_hmac('sha3-512', $first_encrypted, $second_key, TRUE);

    if (hash_equals($second_encrypted, $second_encrypted_new))
        return $data;

    return false;
}

function url($titulo)
{
    $titulo = strtolower($titulo);
    $titulo = trim($titulo);
    $titulo = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        'a',
        $titulo
    );
    $titulo = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        'e',
        $titulo
    );
    $titulo = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        'i',
        $titulo
    );
    $titulo = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        'o',
        $titulo
    );
    $titulo = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        'u',
        $titulo
    );
    $titulo = str_replace(
        array('ñ', 'Ñ', 'ç', 'Ç'),
        array('n', 'N', 'c', 'C',),
        $titulo
    );
    $titulo = str_replace(
        array(
            "\\", "¨", "º", "-", "~",
            "#", "@", "|", "!", "\"",
            "·", "$", "%", "&",
            "(", ")", "?", "'", "¡",
            "¿", "[", "^", "`", "]",
            "+", "}", "{", "¨", "´",
            ">", "< ", ";", ",",
            "."
        ),
        '-',
        $titulo
    );
    $titulo = str_replace("/", "/", $titulo);
    $titulo = str_replace("-", " ", $titulo);
    return $titulo;
}

function urltotitle($titulo)
{
    $titulo = strtolower($titulo);
    $titulo = trim($titulo);
    $titulo = str_replace(
        array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
        'a',
        $titulo
    );
    $titulo = str_replace(
        array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
        'e',
        $titulo
    );
    $titulo = str_replace(
        array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
        'i',
        $titulo
    );
    $titulo = str_replace(
        array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
        'o',
        $titulo
    );
    $titulo = str_replace(
        array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
        'u',
        $titulo
    );
    $titulo = str_replace(
        array('ñ', 'Ñ', 'ç', 'Ç'),
        array('n', 'N', 'c', 'C',),
        $titulo
    );
    $titulo = str_replace(
        array(
            "\\", "¨", "º", "-", "~",
            "#", "@", "|", "!", "\"",
            "·", "$", "%", "&",
            "(", ")", "?", "'", "¡",
            "¿", "[", "^", "`", "]",
            "+", "}", "{", "¨", "´",
            ">", "< ", ";", ",",
            "."
        ),
        '-',
        $titulo
    );
    $titulo = str_replace("/", "/", $titulo);
    $titulo = str_replace(" ", "-", $titulo);
    return $titulo;
}

function urlApos($titulo)
{
    $titulo = str_replace("'", ".1", $titulo);
    $titulo = str_replace(" ", "-", $titulo);
    $titulo = str_replace(":", ".2", $titulo);
    return $titulo;
}

function urlAposInverse($titulo)
{
    $titulo = str_replace(".1", "'", $titulo);
    $titulo = str_replace("-", " ", $titulo);
    $titulo = str_replace(".2", ":", $titulo);
    return $titulo;
}
