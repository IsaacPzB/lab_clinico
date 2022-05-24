
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'laboratorio'
mysql = MySQL(app)

app.secret_key = "mysecretkey"


class trabajador:
    user = ""
    contraseña = ""

# Ruta para el login


@ cross_origin()
@app.route('/login', methods=["POST"])
def create_login():
    usu = request.json.get("usuario", None)
    con = request.json.get("contraseña", None)
    cur = mysql.connection.cursor()
    cur.execute(
        'select usuario, email, contraseña from login where usuario = %s or email = %s', (usu, usu,))
    rv = cur.fetchall()
    cur.close()
    for result in rv:

        if usu == result[0] or usu == result[1]:
            if con == result[2]:
                response = {"msg": "Access"}
                trabajador.user = usu
                return response

        return {"msg": "Usuario o contraseña equivocada"}, 401

    return {"msg": "Error, no hay coincidencia en la base de datos"}, 500


@ cross_origin()
@app.route('/guard', methods=["GET"])
def guard():
    usu = trabajador.user
    cur = mysql.connection.cursor()
    cur.execute(
        'select nombre from login where usuario = %s or email = %s', (usu, usu,))
    rv = cur.fetchall()
    cur.close()
    payload = []
    content = {}
    for result in rv:
        content = {'nombre': result[0]}
        payload.append(content)
        content = {}
    return jsonify(payload)


# Ruta para filtrar solicitudes por identificacion

@ cross_origin()
@app.route('/solicitud/<id>', methods=['GET'])
def solicitud(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('select s.id_solicitud, p.nombre, p.numero_identificacion, sd.sede, t_s.servicio, s.fecha_solicitud from solicitudes s inner join pacientes p on p.id_paciente = s.paciente  inner join sedes sd on sd.id_sede = s.sede inner join tipo_servicio t_s on t_s.id_tipo_servicio = s.tipo_servicio where p.numero_identificacion = %s and s.estado=1', (id,))

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_solicitud': result[0], 'nombre': result[1],
                       'numero_identificacion': result[2], 'sede': result[3], 'servicio': result[4], 'fecha': result[5]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})


# Ruta para obtener respuestas
@ cross_origin()
@app.route('/resultados', methods=['GET'])
def resultados():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT rh.wbc, rh.neu, rh.lym, rh.mon, rh.rbc, rh.hgb, rh.hct, rh.pit, p.numero_identificacion as paciente, l.nombre as bacteriologo, rh.id_solicitud as "num. solicitud" , rh.fecha_respuesta  FROM resultado_hemograma rh inner join pacientes p on p.id_paciente = rh.paciente  inner join login l on rh.bacteriologo = l.id_user where rh.estado=1')

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'wbc': result[0], 'neu': result[1], 'lym': result[2],
                       'mon': result[3], 'rbc': result[4], 'hgb': result[5],
                       'hct': result[6], 'pit': result[7], 'paciente': result[8], 'bacteriologo': result[9],
                       'num_solicitud': result[10], 'fecha_respuesta': result[11]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": e})

# Ruta para registrar resultados y actualizar solicitudes


@ cross_origin()
@app.route('/insertarResultados', methods=['POST', 'PUT'])
def insertarResultados():
    if request.method == 'POST':
        try:
            wbc = request.json['wbc']
            neu = request.json['neu']
            lym = request.json['lym']
            mon = request.json['mon']
            rbc = request.json['rbc']
            hgb = request.json['hgb']
            hct = request.json['hct']
            pit = request.json['pit']
            paciente = request.json['paciente']
            bacteriologo = request.json['bacteriologo']
            id_solicitud = request.json['id_solicitud']

            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO resultado_hemograma ( wbc, neu, lym, mon, rbc, hgb, hct, pit, paciente, bacteriologo, id_solicitud, fecha_respuesta)  VALUES (%s, %s, %s, %s, %s, %s, %s, %s, (select p.id_paciente from pacientes p where p.numero_identificacion = %s), (select l.id_user from login l where l.numero_identificacion = %s), (select s.id_solicitud from solicitudes s where s.id_solicitud = %s and s.estado = 1), now())",
                        (wbc, neu, lym, mon, rbc, hgb, hct, pit, paciente, bacteriologo, id_solicitud))
            mysql.connection.commit()
            return jsonify({"Informacion": "Registro exitoso!!"})
        except Exception as e:
            e = "Fallo al insertar, verifique la solicitud"
            return jsonify({"informacion": e})

    elif request.method == 'PUT':
        id_solicitud = request.json['id_solicitud']
        cur = mysql.connection.cursor()
        cur.execute("""UPDATE solicitudes
                SET estado = b'0'
                WHERE id_solicitud = %s
                """, (id_solicitud,))
        mysql.connection.commit()
        return jsonify({"Informacion": ""})


@ cross_origin()
@app.route('/actualizarResultados', methods=['PUT'])
def actualizarResultados():
    try:
        wbc = request.json['wbc']
        neu = request.json['neu']
        lym = request.json['lym']
        mon = request.json['mon']
        rbc = request.json['rbc']
        hgb = request.json['hgb']
        hct = request.json['hct']
        pit = request.json['pit']
        id_solicitud = request.json['id_solicitud']
        cur = mysql.connection.cursor()
        cur.execute("""update resultado_hemograma set  wbc=%s, neu=%s, lym=%s, mon=%s, rbc=%s, hgb=%s,hct=%s, pit=%s, fecha_respuesta=now() 
        where id_solicitud=%s
                """, (wbc, neu, lym, mon, rbc, hgb, hct, pit, id_solicitud))
        mysql.connection.commit()
        return jsonify({"Informacion": "Registro actualizado!!"})

    except Exception as e:
        e = "Fallo al actualizar, verifique la solicitud"
        return jsonify({"informacion": e})


@ cross_origin()
@app.route('/eliminarResultados/<data>', methods=['DELETE'])
def eliminarResultados(data):
    try:
        cur = mysql.connection.cursor()
        cur.execute(
            "update resultado_hemograma set estado=0 where id_solicitud=%s", (data,))
        mysql.connection.commit()
        return jsonify({"Informacion": "Registro eliminado!!"})

    except Exception as e:
        e = "Error al eliminar"
        return jsonify({"informacion": e})


# Consultas
@ cross_origin()
@app.route('/inner', methods=['GET'])
def inner():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select s.id_solicitud, p.nombre, sd.sede, t_s.servicio, date_format(s.fecha_solicitud, "%D-%M-%Y") as fecha
        from solicitudes s
        inner join  pacientes p on p.id_paciente = s.paciente
        inner join sedes sd on sd.id_sede = s.sede
        inner join tipo_servicio t_s on t_s.id_tipo_servicio = s.tipo_servicio
        where s.estado = 1
        order by s.id_solicitud asc
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_solicitud': result[0], 'nombre': result[1], 'sede': result[2], 'servicio': result[3], 'fecha': result[4]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})


@ cross_origin()
@app.route('/left', methods=['GET'])
def left():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select  s.id_solicitud, p.nombre, sd.sede, t_s.servicio, date_format(s.fecha_solicitud, "%D-%M-%Y") as "Fecha solicitud", r.id_resultado,
        l.numero_identificacion as bacteriologo, date_format(r.fecha_respuesta, "%D-%M-%Y") as "Fecha respuesta"
        from solicitudes s
        left join resultado_hemograma r on r.id_solicitud = s.id_solicitud
        inner join  pacientes p on p.id_paciente = s.paciente
        inner join sedes sd on sd.id_sede = s.sede
        inner join tipo_servicio t_s on t_s.id_tipo_servicio = s.tipo_servicio
        left join login l on l.id_user = r.bacteriologo
        group by s.id_solicitud
        order by s.id_solicitud asc;
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id_solicitud': result[0], 'nombre': result[1], 'sede': result[2], 'servicio': result[3], 
            'fecha_solicitud': result[4],'respuesta_No': result[5],
            'bacteriologo': result[6], 'fecha_respuesta': result[7]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})

@ cross_origin()
@app.route('/avg', methods=['GET'])
def avg():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select avg(edad) as "Edad media"
        from pacientes
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'edad_media': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})

@ cross_origin()
@app.route('/max', methods=['GET'])
def max():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select max(edad) as "Edad maxima"
        from pacientes
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'edad_max': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})

@ cross_origin()
@app.route('/min', methods=['GET'])
def min():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select min(edad) as "Edad minima"
        from pacientes
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'edad_min': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})

@ cross_origin()
@app.route('/count', methods=['GET'])
def count():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select count(*) as "Pacientes registrados"
        from pacientes
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'count_paciente': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})

@ cross_origin()
@app.route('/sum', methods=['GET'])
def sum():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
        select sum(edad) as "Total"
        from pacientes
        """)

        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'edad_total': result[0]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        e = "Error"
        return jsonify({"informacion": e})

# RUN
if __name__ == "__main__":
    app.run(port=3000, debug=True)
