//const API = 'http://192.168.1.34:3000'
const API = 'http://localhost:3000'

export const checkLogin = async (email,passwd) => {
    return fetch(API + '/usuario/check/' + email, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contraseña: passwd
        })
    });
}

export const getInfoTask = async (user) => {
    const url = API+'/tarea/list/' + user
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getPermisosUsuario = async (correo_electronico) => {
  const url = API+'/usuario/' + correo_electronico + '/permisos'
  return fetch(url,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

/*
  Map<String, dynamic> toJson() => {
    'nombre': nombre,
    'valueEstadistica': valueEstadistica,
    'tipoObjeto': tipoObjeto,
  };

  Objeto.fromJson(Map<String, dynamic> json): 
        nombre = json['nombre'],
        valueEstadistica = json['valueEstadistica'],
        tipoObjeto = json['tipoObjeto'];

  static Future<Objeto> getObjeto(String nombre) async {
    final response = await http.get(Uri.https(_baseAddress, _applicationName),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        });

    if (response.statusCode == 200)
      return Objeto.fromJson(jsonDecode(response.body));
    else
      throw Exception('Fallo al obtener el objeto');
  }
  */

  /*Objeto(String n, double val, bool tipo) {
    nombre = n;
    valueEstadistica = val;
    tipoObjeto = tipo;
  }*/