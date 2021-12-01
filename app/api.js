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

export const getInfoTask = async (email) => {
    const url = API+'/tarea/list/'+email;
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getTask = async () => {
  const url = API+'/tarea/distinct'
  return fetch(url,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

export const asignTaskAlum = async (tipo_tarea, nombre_usuario) => {
  const url = API+'/tarea/asignar'
  return fetch(url,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreUsuario: nombre_usuario,
        tipoTarea: tipo_tarea
      })
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


export const createProfesor = async (username,passwd,email) => {
  return fetch(API + '/profesor', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre_usuario: username,
        contraseña: passwd,
        correo_electronico: email
      })
  });
}

export const createAlumno = async (username,passwd,email, email_teacher) => {
  return fetch(API + '/alumno', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre_usuario: username,
        contraseña: passwd,
        correo_electronico: email,
        correo_electronico_profesor: email_teacher
      })
  });
}

export const getInfoAlumno = async () => {
  const url = API+'/alumno'
  return fetch(url,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

export const getDetailsTask = async (id_task) => {
  const url = API+'/tarea/' + id_task
  return fetch(url,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
}

export const getMultimediaTarea = async (id_task, pasoMultimedia) => {
    const url = API+'/multimedia/' + id_task 
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            paso: pasoMultimedia,
        })
    })
}

export const getPasosTarea = async(id_task) => {
    const url = API+'/multimedia/pasos/' + id_task
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export const getListaAlumnos = async() => {
    const url = API+'/alumno'
    return fetch(url,{
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getInventario= async () => {
    const url = API+'/inventario'
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
  }


  export const setCantidadObjeto = async (id_objeto, cantidad) => {
    return fetch( API + '/inventario/' + id_objeto , {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cantidad: cantidad
        })
    });
}

