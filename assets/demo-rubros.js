/* ARGUS · Perfiles de rubro para la demo de ATLAS. Datos ficticios; no envía mensajes.
   Se elige con ?rubro=salud|veterinaria|automotriz|retail|servicios|publico (por defecto: salud). */
(function(){
  'use strict';
  var R = {
    salud: {
      negocio: 'Sonrisas del Sur', tipo: 'Clínica dental', ciudad: 'Temuco',
      direccion: 'Los Aromos 245, Temuco · Lun–Vie 09:00–18:00 · Sáb 09:00–13:00',
      personas: 'Dra. Camila Reinoso · Dr. Ignacio Bravo', cliente: 'paciente',
      web: { kick: 'Clínica dental en Temuco', desc: 'Especialistas en odontología general, ortodoncia y endodoncia. Reserve en línea a cualquier hora: nuestro asistente responde sus dudas y agenda directo en la clínica.',
        slots: [['Control y limpieza', 'Dr. Andrés Rojas', '16:30'], ['Evaluación de ortodoncia', 'Dra. Paula Méndez', '17:15'], ['Endodoncia', 'Dr. Felipe Vera', 'Mañana 09:00']],
        appt: ['Ignacio Lagos', 'SÁB 17 · 10:00 · DRA. MÉNDEZ · SITIO WEB'] },
      tour: [
        { name: 'Agendar', hint: 'Un paciente pide hora por WhatsApp', clock: '23:41', nav: 'agenda', tone: 'br',
          story: 'Lunes 23:41, clínica cerrada. Valentina pide hora y ATLAS ofrece horarios reales de la agenda.',
          result: 'Cita agendada sin intervención del equipo',
          msgs: [['u', 'Hola, ¿tienen hora para limpieza esta semana?', '23:41'], ['a', 'Hola Valentina. Tengo el jueves 29 a las 10:00 o a las 16:30 con la Dra. Reinoso. ¿Cuál le acomoda?', '23:41'], ['u', '16:30, por favor', '23:42'], ['a', 'Listo. Quedó agendada el jueves 29 a las 16:30. Le enviaré un recordatorio el día anterior.', '23:42']],
          event: 'Nueva cita · Jueves 29 · 16:30', eventSub: 'Valentina Rojas · limpieza · origen WhatsApp', day: 'Jueves 29',
          hl: '16:30', hlPill: 'Nueva', hlWho: 'Valentina Rojas', hlWhat: 'Limpieza · Dra. Reinoso' },
        { name: 'Recordatorio', hint: 'ATLAS confirma la asistencia', clock: '09:00', nav: 'agenda', tone: 'gr',
          story: 'El día antes, ATLAS envía el recordatorio y registra la respuesta del paciente.',
          result: 'Asistencia confirmada en la agenda',
          msgs: [['a', 'Hola Tomás. Le recordamos su hora mañana martes a las 10:30 con el Dr. Bravo. ¿Confirma su asistencia?', '09:00'], ['u', 'Confirmo, gracias', '09:14'], ['a', 'Perfecto, lo esperamos. Si necesita cambiarla, escríbanos por aquí.', '09:14']],
          event: 'Asistencia confirmada · Martes 10:30', eventSub: 'Tomás Vergara · respondió al recordatorio', day: 'Martes 27',
          hl: '10:30', hlPill: 'Confirmada', hlWho: 'Tomás Vergara', hlWhat: 'Control · Dr. Bravo' },
        { name: 'Cancelación', hint: 'Se libera un horario', clock: '18:20', nav: 'agenda', tone: 'gy',
          story: 'Un paciente avisa que no podrá asistir. ATLAS cancela la hora y deja el cupo libre.',
          result: 'Cupo liberado, listo para ofrecerse',
          msgs: [['u', 'Hola, no voy a poder ir el viernes a las 11:00', '18:20'], ['a', 'Entendido, Gaspar. Cancelé su hora del viernes a las 11:00. ¿Quiere que le busque otro horario?', '18:20'], ['u', 'Más adelante, gracias', '18:21']],
          event: 'Hora cancelada · Viernes 11:00', eventSub: 'Gaspar Vidal · el cupo queda disponible', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Libre', hlWho: 'Disponible', hlWhat: 'Cancelada por Gaspar Vidal' },
        { name: 'Lista de espera', hint: 'El cupo vuelve a ocuparse', clock: '18:24', nav: 'espera', tone: 'gr',
          story: 'ATLAS ofrece el cupo liberado a quien estaba en la lista de espera.',
          result: 'Cupo recuperado en 3 minutos',
          msgs: [['a', 'Hola Javiera. Se liberó una hora el viernes 30 a las 11:00 con la Dra. Reinoso. ¿Se la reservo?', '18:24'], ['u', 'Sí, la tomo', '18:27'], ['a', 'Listo, quedó a su nombre. Le llegará la confirmación por correo.', '18:27']],
          event: 'Cupo recuperado · Viernes 11:00', eventSub: 'Javiera Pinto · desde lista de espera', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Recuperada', hlWho: 'Javiera Pinto', hlWhat: 'Evaluación · desde lista de espera' },
        { name: 'Pasa al equipo', hint: 'Un caso que necesita una persona', clock: '18:12', nav: 'bandeja', tone: 'or',
          story: 'Una urgencia queda fuera de lo que el agente resuelve: pasa a la bandeja con un resumen.',
          result: 'Su equipo recibe el caso con contexto',
          msgs: [['u', 'Me duele una muela desde ayer. ¿Me pueden ver hoy?', '18:12'], ['a', 'Lamento la molestia, Matías. Le conecto con el equipo de la clínica. ¿Me deja su teléfono?', '18:12'], ['u', '+56 9 •••• 7310', '18:13'], ['a', 'Gracias. Le responden por aquí en unos minutos.', '18:13']],
          event: 'Pasó a una persona · Urgencia', eventSub: 'Matías Fuentes · en la bandeja con resumen',
          bandeja: { who: 'Matías Fuentes', meta: 'Urgencia · hace 1 min', res: 'dolor de muela desde ayer, pide atención hoy. Dejó su teléfono.' } }
      ],
      base: [['09:00', 'Renata Campos', 'Control · Dra. Reinoso', 'Agendada'], ['10:30', 'Tomás Vergara', 'Control · Dr. Bravo', 'Agendada'], ['11:00', 'Gaspar Vidal', 'Evaluación · Dra. Reinoso', 'Agendada'], ['15:00', 'Cristóbal Ruiz', 'Evaluación · Dr. Bravo', 'Agendada'], ['16:30', 'Disponible', 'Dra. Reinoso', 'Libre'], ['17:30', 'Antonia Reyes', 'Ortodoncia · Dra. Reinoso', 'Agendada']],
      web_msgs: [['p', 'Hola, quisiera reservar una hora.'], ['a', 'Hola. Soy el asistente automatizado de Sonrisas del Sur. Gestiono citas; no evalúo síntomas. Este ejemplo usa datos ficticios. ¿Busca un horario disponible?'], ['p', 'Sí, el sábado.'], ['a', 'Hay un horario a las 10:00. ¿Desea reservarlo?'], ['p', 'Sí. Ignacio Lagos, contacto de demostración.'], ['a', 'La reserva de ejemplo quedó confirmada para el sábado a las 10:00.']]
    },
    veterinaria: {
      negocio: 'Veterinaria Los Robles', tipo: 'Veterinaria', ciudad: 'Osorno',
      direccion: 'Av. Los Robles 510, Osorno · Lun–Sáb 09:00–19:00',
      personas: 'Dra. Carolina Muñoz · Dr. Tomás Lagos', cliente: 'cliente',
      web: { kick: 'Veterinaria en Osorno', desc: 'Medicina preventiva, vacunas y cirugía de animales de compañía. Reserve su hora en línea: nuestro asistente responde sus dudas y agenda directo en la veterinaria.',
        slots: [['Control y vacunas', 'Dra. Carolina Muñoz', '16:30'], ['Cirugía menor', 'Dr. Tomás Lagos', '17:15'], ['Urgencias', 'Recepción', 'Mañana 09:00']],
        appt: ['Ignacio Lagos', 'SÁB 17 · 10:00 · DRA. MUÑOZ · SITIO WEB'] },
      tour: [
        { name: 'Agendar', hint: 'Un cliente pide hora por WhatsApp', clock: '23:41', nav: 'agenda', tone: 'br',
          story: 'Lunes 23:41, veterinaria cerrada. Valentina pide hora para su perro y ATLAS ofrece horarios reales.',
          result: 'Hora agendada sin intervención del equipo',
          msgs: [['u', 'Hola, ¿tienen hora para vacunar a mi perro esta semana?', '23:41'], ['a', 'Hola Valentina. Tengo el jueves 29 a las 10:00 o a las 16:30 con la Dra. Muñoz. ¿Cuál le acomoda?', '23:41'], ['u', '16:30, por favor', '23:42'], ['a', 'Listo. Quedó agendada el jueves 29 a las 16:30. Le enviaré un recordatorio el día anterior.', '23:42']],
          event: 'Nueva hora · Jueves 29 · 16:30', eventSub: 'Valentina Rojas · vacuna · origen WhatsApp', day: 'Jueves 29',
          hl: '16:30', hlPill: 'Nueva', hlWho: 'Valentina Rojas', hlWhat: 'Vacuna · Dra. Muñoz' },
        { name: 'Recordatorio', hint: 'ATLAS confirma la hora', clock: '09:00', nav: 'agenda', tone: 'gr',
          story: 'El día antes, ATLAS envía el recordatorio de vacuna y registra la respuesta del cliente.',
          result: 'Hora confirmada en la agenda',
          msgs: [['a', 'Hola Tomás. Le recordamos la hora de Luna mañana martes a las 10:30 con el Dr. Lagos. ¿Confirma?', '09:00'], ['u', 'Confirmo, gracias', '09:14'], ['a', 'Perfecto, la esperamos. Si necesita cambiarla, escríbanos por aquí.', '09:14']],
          event: 'Hora confirmada · Martes 10:30', eventSub: 'Tomás Vergara · respondió al recordatorio', day: 'Martes 27',
          hl: '10:30', hlPill: 'Confirmada', hlWho: 'Tomás Vergara', hlWhat: 'Control · Dr. Lagos' },
        { name: 'Cancelación', hint: 'Se libera un horario', clock: '18:20', nav: 'agenda', tone: 'gy',
          story: 'Un cliente avisa que no podrá asistir. ATLAS cancela la hora y deja el cupo libre.',
          result: 'Cupo liberado, listo para ofrecerse',
          msgs: [['u', 'Hola, no voy a poder ir el viernes a las 11:00', '18:20'], ['a', 'Entendido, Gaspar. Cancelé su hora del viernes a las 11:00. ¿Quiere que le busque otro horario?', '18:20'], ['u', 'Más adelante, gracias', '18:21']],
          event: 'Hora cancelada · Viernes 11:00', eventSub: 'Gaspar Vidal · el cupo queda disponible', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Libre', hlWho: 'Disponible', hlWhat: 'Cancelada por Gaspar Vidal' },
        { name: 'Lista de espera', hint: 'El cupo vuelve a ocuparse', clock: '18:24', nav: 'espera', tone: 'gr',
          story: 'ATLAS ofrece el cupo liberado a quien estaba en la lista de espera.',
          result: 'Cupo recuperado en 3 minutos',
          msgs: [['a', 'Hola Javiera. Se liberó una hora el viernes 30 a las 11:00 con la Dra. Muñoz. ¿Se la reservo?', '18:24'], ['u', 'Sí, la tomo', '18:27'], ['a', 'Listo, quedó a su nombre. Le llegará la confirmación por correo.', '18:27']],
          event: 'Cupo recuperado · Viernes 11:00', eventSub: 'Javiera Pinto · desde lista de espera', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Recuperada', hlWho: 'Javiera Pinto', hlWhat: 'Control · desde lista de espera' },
        { name: 'Pasa al equipo', hint: 'Un caso que necesita una persona', clock: '18:12', nav: 'bandeja', tone: 'or',
          story: 'Una urgencia queda fuera de lo que el agente resuelve: pasa a la bandeja con un resumen.',
          result: 'Su equipo recibe el caso con contexto',
          msgs: [['u', 'Mi gata no quiere comer desde ayer y está decaída. ¿La pueden ver hoy?', '18:12'], ['a', 'Lamento la preocupación, Matías. Le conecto con el equipo de la veterinaria. ¿Me deja su teléfono?', '18:12'], ['u', '+56 9 •••• 7310', '18:13'], ['a', 'Gracias. Le responden por aquí en unos minutos.', '18:13']],
          event: 'Pasó a una persona · Urgencia', eventSub: 'Matías Fuentes · en la bandeja con resumen',
          bandeja: { who: 'Matías Fuentes', meta: 'Urgencia · hace 1 min', res: 'gata sin apetito desde ayer, decaída. Pide atención hoy. Dejó su teléfono.' } }
      ],
      base: [['09:00', 'Renata Campos', 'Control · Dra. Muñoz', 'Agendada'], ['10:30', 'Tomás Vergara', 'Control · Dr. Lagos', 'Agendada'], ['11:00', 'Gaspar Vidal', 'Vacuna · Dra. Muñoz', 'Agendada'], ['15:00', 'Cristóbal Ruiz', 'Cirugía · Dr. Lagos', 'Agendada'], ['16:30', 'Disponible', 'Dra. Muñoz', 'Libre'], ['17:30', 'Antonia Reyes', 'Control · Dra. Muñoz', 'Agendada']],
      web_msgs: [['p', 'Hola, quisiera reservar hora para mi perro.'], ['a', 'Hola. Soy el asistente automatizado de Veterinaria Los Robles. Gestiono horas; no evalúo síntomas. Este ejemplo usa datos ficticios. ¿Busca un horario disponible?'], ['p', 'Sí, el sábado.'], ['a', 'Hay un horario a las 10:00. ¿Desea reservarlo?'], ['p', 'Sí. Ignacio Lagos, contacto de demostración.'], ['a', 'La reserva de ejemplo quedó confirmada para el sábado a las 10:00.']]
    },
    automotriz: {
      negocio: 'Repuestos Andes', tipo: 'Taller y repuestos', ciudad: 'Rancagua',
      direccion: 'Calle Andes 1280, Rancagua · Lun–Vie 09:00–18:30 · Sáb 09:00–13:00',
      personas: 'Jorge Herrera (técnico) · Mauricio Soto (asesor)', cliente: 'cliente',
      web: { kick: 'Taller y repuestos en Rancagua', desc: 'Repuestos por patente y servicio de frenos, mantención y revisión técnica. Pida su hora en línea: nuestro asistente identifica el repuesto y agenda directo en el taller.',
        slots: [['Revisión de frenos', 'Jorge Herrera', '16:30'], ['Mantención 10.000 km', 'Mauricio Soto', '17:15'], ['Repuestos por patente', 'Mostrador', 'Mañana 09:00']],
        appt: ['Ignacio Lagos', 'SÁB 17 · 10:00 · J. HERRERA · SITIO WEB'] },
      tour: [
        { name: 'Agendar', hint: 'Un cliente pide un repuesto por WhatsApp', clock: '23:41', nav: 'agenda', tone: 'br',
          story: 'Lunes 23:41, taller cerrado. Valentina pide pastillas de freno y ATLAS agenda la instalación.',
          result: 'Repuesto identificado y servicio agendado',
          msgs: [['u', 'Necesito pastillas de freno para mi Corolla 2019, patente KJTR45.', '23:41'], ['a', 'Hola Valentina. Para su Corolla 2019 tengo pastillas delanteras en stock. ¿Le agendo la instalación el jueves a las 10:00 o a las 16:30?', '23:41'], ['u', '16:30, por favor', '23:42'], ['a', 'Listo. Quedó agendada la instalación el jueves 29 a las 16:30 con J. Herrera.', '23:42']],
          event: 'Nueva cita · Jueves 29 · 16:30', eventSub: 'Valentina Rojas · frenos · origen WhatsApp', day: 'Jueves 29',
          hl: '16:30', hlPill: 'Nueva', hlWho: 'Valentina Rojas', hlWhat: 'Frenos · J. Herrera' },
        { name: 'Recordatorio', hint: 'ATLAS confirma la hora', clock: '09:00', nav: 'agenda', tone: 'gr',
          story: 'El día antes, ATLAS envía el recordatorio de mantención y registra la respuesta del cliente.',
          result: 'Hora confirmada en la agenda',
          msgs: [['a', 'Hola Tomás. Le recordamos su mantención mañana martes a las 10:30 con Mauricio Soto. ¿Confirma?', '09:00'], ['u', 'Confirmo, gracias', '09:14'], ['a', 'Perfecto, lo esperamos. Si necesita cambiarla, escríbanos por aquí.', '09:14']],
          event: 'Hora confirmada · Martes 10:30', eventSub: 'Tomás Vergara · respondió al recordatorio', day: 'Martes 27',
          hl: '10:30', hlPill: 'Confirmada', hlWho: 'Tomás Vergara', hlWhat: 'Mantención · M. Soto' },
        { name: 'Cancelación', hint: 'Se libera un horario', clock: '18:20', nav: 'agenda', tone: 'gy',
          story: 'Un cliente avisa que no podrá llegar. ATLAS cancela la hora y deja el cupo libre.',
          result: 'Cupo liberado, listo para ofrecerse',
          msgs: [['u', 'Hola, no voy a poder llegar el viernes a las 11:00', '18:20'], ['a', 'Entendido, Gaspar. Cancelé su hora del viernes a las 11:00. ¿Quiere que le busque otro horario?', '18:20'], ['u', 'Más adelante, gracias', '18:21']],
          event: 'Hora cancelada · Viernes 11:00', eventSub: 'Gaspar Vidal · el cupo queda disponible', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Libre', hlWho: 'Disponible', hlWhat: 'Cancelada por Gaspar Vidal' },
        { name: 'Lista de espera', hint: 'El cupo vuelve a ocuparse', clock: '18:24', nav: 'espera', tone: 'gr',
          story: 'ATLAS ofrece el cupo liberado a quien estaba en la lista de espera.',
          result: 'Cupo recuperado en 3 minutos',
          msgs: [['a', 'Hola Javiera. Se liberó una hora el viernes 30 a las 11:00 con Jorge Herrera. ¿Se la reservo?', '18:24'], ['u', 'Sí, la tomo', '18:27'], ['a', 'Listo, quedó a su nombre. Le llegará la confirmación por correo.', '18:27']],
          event: 'Cupo recuperado · Viernes 11:00', eventSub: 'Javiera Pinto · desde lista de espera', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Recuperada', hlWho: 'Javiera Pinto', hlWhat: 'Revisión · desde lista de espera' },
        { name: 'Pasa al equipo', hint: 'Un caso que necesita una persona', clock: '18:12', nav: 'bandeja', tone: 'or',
          story: 'Un vehículo con falla de frenos queda fuera de lo que el agente resuelve: pasa a la bandeja con un resumen.',
          result: 'Su equipo recibe el caso con contexto',
          msgs: [['u', 'Los frenos me hacen un ruido fuerte desde ayer. ¿Me pueden revisar hoy?', '18:12'], ['a', 'Lamento la preocupación, Matías. Le conecto con nuestro equipo del taller. ¿Me deja su teléfono?', '18:12'], ['u', '+56 9 •••• 7310', '18:13'], ['a', 'Gracias. Le responden por aquí en unos minutos.', '18:13']],
          event: 'Pasó a una persona · Urgencia', eventSub: 'Matías Fuentes · en la bandeja con resumen',
          bandeja: { who: 'Matías Fuentes', meta: 'Urgencia · hace 1 min', res: 'ruido fuerte al frenar desde ayer, pide revisión hoy. Dejó su teléfono.' } }
      ],
      base: [['09:00', 'Renata Campos', 'Mantención · J. Herrera', 'Agendada'], ['10:30', 'Tomás Vergara', 'Mantención · M. Soto', 'Agendada'], ['11:00', 'Gaspar Vidal', 'Revisión · J. Herrera', 'Agendada'], ['15:00', 'Cristóbal Ruiz', 'Frenos · M. Soto', 'Agendada'], ['16:30', 'Disponible', 'J. Herrera', 'Libre'], ['17:30', 'Antonia Reyes', 'Alineación · J. Herrera', 'Agendada']],
      web_msgs: [['p', 'Hola, necesito pastillas de freno para mi auto.'], ['a', 'Hola. Soy el asistente automatizado de Repuestos Andes. Identifico repuestos y agendo horas; no emito diagnósticos. Este ejemplo usa datos ficticios. ¿Me indica la patente?'], ['p', 'KJTR45, Corolla 2019.'], ['a', 'Tengo pastillas delanteras en stock. ¿Le agendo la instalación el sábado a las 10:00?'], ['p', 'Sí. Ignacio Lagos, contacto de demostración.'], ['a', 'La hora de ejemplo quedó confirmada para el sábado a las 10:00.']]
    },
    retail: {
      negocio: 'Tienda Nativa', tipo: 'Tienda de ropa y hogar', ciudad: 'Concepción',
      direccion: 'Caupolicán 430, Concepción · Lun–Dom 10:00–21:00',
      personas: 'Sucursal Centro · Sucursal Mall', cliente: 'cliente',
      web: { kick: 'Tienda en Concepción', desc: 'Ropa y hogar, con despacho a todo Chile. Consulte el estado de su pedido o el stock de una prenda: nuestro asistente responde al instante, a cualquier hora.',
        slots: [['Estado de pedido', 'Atención en línea', 'Inmediato'], ['Stock por sucursal', 'Sucursal Centro', 'Hoy'], ['Cambios y devoluciones', 'Sucursal Mall', 'Mañana']],
        appt: ['Ignacio Lagos', 'PEDIDO 4821 · DESPACHO MAÑANA · SITIO WEB'] },
      tour: [
        { name: 'Pedido', hint: 'Un cliente consulta su pedido por WhatsApp', clock: '23:41', nav: 'agenda', tone: 'br',
          story: 'Lunes 23:41, tienda cerrada. Valentina consulta su pedido y ATLAS responde con el estado del despacho.',
          result: 'Consulta resuelta sin intervención',
          msgs: [['u', 'Hola, ¿dónde va mi pedido 4821?', '23:41'], ['a', 'Hola Valentina. Su pedido salió hoy a las 10:15 y llega mañana entre las 10:00 y las 14:00. ¿Le aviso cuando esté en ruta?', '23:41'], ['u', 'Sí, por favor', '23:42'], ['a', 'Listo. Le enviaré el aviso de despacho por WhatsApp.', '23:42']],
          event: 'Consulta resuelta · Pedido 4821', eventSub: 'Valentina Rojas · estado de pedido · origen WhatsApp', day: 'Lunes 23',
          hl: '10:00', hlPill: 'En ruta', hlWho: 'Valentina Rojas', hlWhat: 'Pedido 4821 · despacho' },
        { name: 'Aviso', hint: 'ATLAS avisa el despacho', clock: '09:00', nav: 'agenda', tone: 'gr',
          story: 'Cuando el pedido sale a ruta, ATLAS avisa al cliente y registra la confirmación de entrega.',
          result: 'Aviso enviado y entrega confirmada',
          msgs: [['a', 'Hola Tomás. Su pedido 4821 va en ruta y llega hoy entre las 10:00 y las 14:00. ¿Confirma que estará en casa?', '09:00'], ['u', 'Sí, gracias', '09:14'], ['a', 'Perfecto. Lo esperamos. Si necesita reprogramar la entrega, escríbanos por aquí.', '09:14']],
          event: 'Entrega confirmada · Pedido 4821', eventSub: 'Tomás Vergara · respondió al aviso', day: 'Martes 24',
          hl: '10:00', hlPill: 'Confirmada', hlWho: 'Tomás Vergara', hlWhat: 'Pedido 4822 · despacho' },
        { name: 'Cambio', hint: 'Se libera un horario de retiro', clock: '18:20', nav: 'agenda', tone: 'gy',
          story: 'Un cliente pide cambiar su hora de retiro en sucursal. ATLAS reprograma y libera el cupo.',
          result: 'Horario liberado, listo para ofrecerse',
          msgs: [['u', 'Hola, no podré retirar el viernes a las 11:00', '18:20'], ['a', 'Entendido, Gaspar. Reprogramé su retiro. ¿Le sirve el sábado a las 11:00 en Sucursal Mall?', '18:20'], ['u', 'Más adelante, gracias', '18:21']],
          event: 'Retiro reprogramado · Viernes 11:00', eventSub: 'Gaspar Vidal · el horario queda disponible', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Libre', hlWho: 'Disponible', hlWhat: 'Retiro reprogramado · Gaspar Vidal' },
        { name: 'Lista de espera', hint: 'El horario vuelve a ocuparse', clock: '18:24', nav: 'espera', tone: 'gr',
          story: 'ATLAS ofrece el horario liberado a quien estaba en la lista de espera.',
          result: 'Horario recuperado en 3 minutos',
          msgs: [['a', 'Hola Javiera. Se liberó un horario el viernes 30 a las 11:00 en Sucursal Centro. ¿Se lo reservo?', '18:24'], ['u', 'Sí, lo tomo', '18:27'], ['a', 'Listo, quedó a su nombre. Le llegará la confirmación por correo.', '18:27']],
          event: 'Horario recuperado · Viernes 11:00', eventSub: 'Javiera Pinto · desde lista de espera', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Recuperada', hlWho: 'Javiera Pinto', hlWhat: 'Probador · desde lista de espera' },
        { name: 'Pasa al equipo', hint: 'Un reclamo que necesita una persona', clock: '18:12', nav: 'bandeja', tone: 'or',
          story: 'Un reclamo por un producto dañado queda fuera de lo que el agente resuelve: pasa a la bandeja con un resumen.',
          result: 'Su equipo recibe el caso con contexto',
          msgs: [['u', 'Recibí una prenda con un desgarro. Quiero hablar con alguien.', '18:12'], ['a', 'Lamento lo ocurrido, Matías. Le conecto con el equipo de atención. ¿Me deja su teléfono?', '18:12'], ['u', '+56 9 •••• 7310', '18:13'], ['a', 'Gracias. Le responden por aquí en unos minutos.', '18:13']],
          event: 'Pasó a una persona · Reclamo', eventSub: 'Matías Fuentes · en la bandeja con resumen',
          bandeja: { who: 'Matías Fuentes', meta: 'Reclamo · hace 1 min', res: 'prenda recibida con desgarro, pide hablar con una persona. Dejó su teléfono.' } }
      ],
      base: [['09:00', 'Renata Campos', 'Retiro · Sucursal Centro', 'Agendada'], ['10:30', 'Tomás Vergara', 'Cambio · Sucursal Mall', 'Agendada'], ['11:00', 'Gaspar Vidal', 'Retiro · Sucursal Centro', 'Agendada'], ['15:00', 'Cristóbal Ruiz', 'Retiro · Sucursal Mall', 'Agendada'], ['16:30', 'Disponible', 'Sucursal Centro', 'Libre'], ['17:30', 'Antonia Reyes', 'Retiro · Sucursal Mall', 'Agendada']],
      web_msgs: [['p', 'Hola, ¿dónde va mi pedido 4821?'], ['a', 'Hola. Soy el asistente automatizado de Tienda Nativa. Consulto pedidos y stock; no proceso reclamos. Este ejemplo usa datos ficticios. ¿Me indica su correo?'], ['p', 'Sí, es Ignacio Lagos, contacto de demostración.'], ['a', 'Su pedido de ejemplo salió hoy y llega mañana entre las 10:00 y las 14:00.']]
    },
    servicios: {
      negocio: 'Estudio Contable Pacífico', tipo: 'Estudio contable', ciudad: 'Valparaíso',
      direccion: 'Av. Pedro Montt 1550, Valparaíso · Lun–Vie 09:00–18:00',
      personas: 'Ana Pacheco (contadora) · Felipe Díaz (asesor tributario)', cliente: 'cliente',
      web: { kick: 'Estudio contable en Valparaíso', desc: 'Contabilidad, remuneraciones e impuestos para pymes. Cuéntenos su caso: nuestro asistente reúne los datos básicos y agenda una reunión con el profesional que corresponde.',
        slots: [['Contabilidad mensual', 'Ana Pacheco', '16:30'], ['Asesoría tributaria', 'Felipe Díaz', '17:15'], ['Primera reunión', 'Equipo comercial', 'Mañana 09:00']],
        appt: ['Ignacio Lagos', 'SÁB 17 · 10:00 · A. PACHECO · SITIO WEB'] },
      tour: [
        { name: 'Cotización', hint: 'Una pyme pide información por WhatsApp', clock: '23:41', nav: 'agenda', tone: 'br',
          story: 'Lunes 23:41, el estudio está cerrado. Valentina pide cotizar contabilidad y ATLAS reúne los datos y agenda una reunión.',
          result: 'Prospecto calificado y reunión agendada',
          msgs: [['u', 'Hola, quiero cotizar contabilidad para mi pyme.', '23:41'], ['a', 'Hola Valentina. ¿Cuántos trabajadores tiene y en qué rubro está? Con eso le agendo una reunión.', '23:41'], ['u', 'Somos 8 personas, rubro construcción.', '23:42'], ['a', 'Gracias. Le agendé una reunión el jueves 29 a las 16:30 con Ana Pacheco.', '23:42']],
          event: 'Reunión agendada · Jueves 29 · 16:30', eventSub: 'Valentina Rojas · pyme de construcción · origen WhatsApp', day: 'Jueves 29',
          hl: '16:30', hlPill: 'Nueva', hlWho: 'Valentina Rojas', hlWhat: 'Reunión · A. Pacheco' },
        { name: 'Recordatorio', hint: 'ATLAS confirma la reunión', clock: '09:00', nav: 'agenda', tone: 'gr',
          story: 'El día antes, ATLAS envía el recordatorio de la reunión y registra la confirmación.',
          result: 'Reunión confirmada en la agenda',
          msgs: [['a', 'Hola Tomás. Le recordamos su reunión mañana martes a las 10:30 con Felipe Díaz. ¿Confirma?', '09:00'], ['u', 'Confirmo, gracias', '09:14'], ['a', 'Perfecto, lo esperamos. Si necesita cambiarla, escríbanos por aquí.', '09:14']],
          event: 'Reunión confirmada · Martes 10:30', eventSub: 'Tomás Vergara · respondió al recordatorio', day: 'Martes 27',
          hl: '10:30', hlPill: 'Confirmada', hlWho: 'Tomás Vergara', hlWhat: 'Asesoría · F. Díaz' },
        { name: 'Cancelación', hint: 'Se libera un horario', clock: '18:20', nav: 'agenda', tone: 'gy',
          story: 'Un cliente avisa que no podrá asistir. ATLAS cancela la reunión y deja el horario libre.',
          result: 'Horario liberado, listo para ofrecerse',
          msgs: [['u', 'Hola, no voy a poder ir el viernes a las 11:00', '18:20'], ['a', 'Entendido, Gaspar. Cancelé su reunión del viernes a las 11:00. ¿Quiere que le busque otro horario?', '18:20'], ['u', 'Más adelante, gracias', '18:21']],
          event: 'Reunión cancelada · Viernes 11:00', eventSub: 'Gaspar Vidal · el horario queda disponible', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Libre', hlWho: 'Disponible', hlWhat: 'Cancelada por Gaspar Vidal' },
        { name: 'Lista de espera', hint: 'El horario vuelve a ocuparse', clock: '18:24', nav: 'espera', tone: 'gr',
          story: 'ATLAS ofrece el horario liberado a quien estaba en la lista de espera.',
          result: 'Horario recuperado en 3 minutos',
          msgs: [['a', 'Hola Javiera. Se liberó una hora el viernes 30 a las 11:00 con Ana Pacheco. ¿Se la reservo?', '18:24'], ['u', 'Sí, la tomo', '18:27'], ['a', 'Listo, quedó a su nombre. Le llegará la confirmación por correo.', '18:27']],
          event: 'Horario recuperado · Viernes 11:00', eventSub: 'Javiera Pinto · desde lista de espera', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Recuperada', hlWho: 'Javiera Pinto', hlWhat: 'Reunión · desde lista de espera' },
        { name: 'Pasa al equipo', hint: 'Un caso que necesita una persona', clock: '18:12', nav: 'bandeja', tone: 'or',
          story: 'Una consulta sobre una fiscalización queda fuera de lo que el agente resuelve: pasa a la bandeja con un resumen.',
          result: 'Su equipo recibe el caso con contexto',
          msgs: [['u', 'Recibí una carta del SII con plazo de hoy. ¿Me pueden ayudar?', '18:12'], ['a', 'Lamento la urgencia, Matías. Le conecto con nuestro equipo tributario. ¿Me deja su teléfono?', '18:12'], ['u', '+56 9 •••• 7310', '18:13'], ['a', 'Gracias. Le responden por aquí en unos minutos.', '18:13']],
          event: 'Pasó a una persona · Urgencia', eventSub: 'Matías Fuentes · en la bandeja con resumen',
          bandeja: { who: 'Matías Fuentes', meta: 'Urgencia · hace 1 min', res: 'carta del SII con plazo hoy, pide ayuda. Dejó su teléfono.' } }
      ],
      base: [['09:00', 'Renata Campos', 'Contabilidad · A. Pacheco', 'Agendada'], ['10:30', 'Tomás Vergara', 'Asesoría · F. Díaz', 'Agendada'], ['11:00', 'Gaspar Vidal', 'Reunión · A. Pacheco', 'Agendada'], ['15:00', 'Cristóbal Ruiz', 'Remuneraciones · F. Díaz', 'Agendada'], ['16:30', 'Disponible', 'A. Pacheco', 'Libre'], ['17:30', 'Antonia Reyes', 'Reunión · A. Pacheco', 'Agendada']],
      web_msgs: [['p', 'Hola, quisiera cotizar contabilidad para mi pyme.'], ['a', 'Hola. Soy el asistente automatizado del Estudio Contable Pacífico. Reúno datos y agendo reuniones; no emito opiniones tributarias. Este ejemplo usa datos ficticios. ¿Cuántos trabajadores tiene?'], ['p', 'Somos 8, rubro construcción. Ignacio Lagos, contacto de demostración.'], ['a', 'La reunión de ejemplo quedó agendada para el sábado a las 10:00 con Ana Pacheco.']]
    },
    publico: {
      negocio: 'Municipalidad de Ejemplo', tipo: 'Municipalidad', ciudad: 'Ejemplo',
      direccion: 'Plaza de Armas 100 · Lun–Vie 08:30–13:30',
      personas: 'Oficina de Licencias · Atención Ciudadana', cliente: 'vecino',
      web: { kick: 'Municipalidad de ejemplo', desc: 'Trámites, licencias y certificados. Consulte requisitos y reserve hora en línea: nuestro asistente orienta a cualquier hora y agenda en la oficina que corresponde.',
        slots: [['Renovación de licencia', 'Oficina de Licencias', '16:30'], ['Certificados', 'Atención Ciudadana', '17:15'], ['Consultas generales', 'Orientación en línea', 'Inmediato']],
        appt: ['Ignacio Lagos', 'SÁB 17 · 10:00 · LICENCIAS · SITIO WEB'] },
      tour: [
        { name: 'Requisitos', hint: 'Un vecino pregunta por un trámite', clock: '23:41', nav: 'agenda', tone: 'br',
          story: 'Lunes 23:41, la oficina está cerrada. Valentina consulta qué necesita para renovar su licencia y ATLAS la orienta.',
          result: 'Trámite orientado, a cualquier hora',
          msgs: [['u', 'Hola, ¿qué necesito para renovar mi licencia?', '23:41'], ['a', 'Hola Valentina. Necesita carnet vigente y certificado de residencia. ¿Le agendo una hora el jueves a las 10:00 o a las 16:30?', '23:41'], ['u', '16:30, por favor', '23:42'], ['a', 'Listo. Quedó agendada el jueves 29 a las 16:30 en la Oficina de Licencias.', '23:42']],
          event: 'Hora agendada · Jueves 29 · 16:30', eventSub: 'Valentina Rojas · licencia · origen WhatsApp', day: 'Jueves 29',
          hl: '16:30', hlPill: 'Nueva', hlWho: 'Valentina Rojas', hlWhat: 'Licencia · Oficina de Licencias' },
        { name: 'Recordatorio', hint: 'ATLAS confirma la hora', clock: '09:00', nav: 'agenda', tone: 'gr',
          story: 'El día antes, ATLAS envía el recordatorio con los documentos necesarios y registra la confirmación.',
          result: 'Hora confirmada en la agenda',
          msgs: [['a', 'Hola Tomás. Le recordamos su hora mañana martes a las 10:30. Lleve carnet vigente. ¿Confirma?', '09:00'], ['u', 'Confirmo, gracias', '09:14'], ['a', 'Perfecto, lo esperamos. Si necesita cambiarla, escríbanos por aquí.', '09:14']],
          event: 'Hora confirmada · Martes 10:30', eventSub: 'Tomás Vergara · respondió al recordatorio', day: 'Martes 27',
          hl: '10:30', hlPill: 'Confirmada', hlWho: 'Tomás Vergara', hlWhat: 'Certificado · Atención Ciudadana' },
        { name: 'Cancelación', hint: 'Se libera un horario', clock: '18:20', nav: 'agenda', tone: 'gy',
          story: 'Un vecino avisa que no podrá asistir. ATLAS cancela la hora y deja el cupo libre.',
          result: 'Cupo liberado, listo para ofrecerse',
          msgs: [['u', 'Hola, no voy a poder ir el viernes a las 11:00', '18:20'], ['a', 'Entendido, Gaspar. Cancelé su hora del viernes a las 11:00. ¿Quiere que le busque otro horario?', '18:20'], ['u', 'Más adelante, gracias', '18:21']],
          event: 'Hora cancelada · Viernes 11:00', eventSub: 'Gaspar Vidal · el cupo queda disponible', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Libre', hlWho: 'Disponible', hlWhat: 'Cancelada por Gaspar Vidal' },
        { name: 'Lista de espera', hint: 'El cupo vuelve a ocuparse', clock: '18:24', nav: 'espera', tone: 'gr',
          story: 'ATLAS ofrece el cupo liberado a quien estaba en la lista de espera.',
          result: 'Cupo recuperado en 3 minutos',
          msgs: [['a', 'Hola Javiera. Se liberó una hora el viernes 30 a las 11:00 en la Oficina de Licencias. ¿Se la reservo?', '18:24'], ['u', 'Sí, la tomo', '18:27'], ['a', 'Listo, quedó a su nombre. Le llegará la confirmación por correo.', '18:27']],
          event: 'Cupo recuperado · Viernes 11:00', eventSub: 'Javiera Pinto · desde lista de espera', day: 'Viernes 30',
          hl: '11:00', hlPill: 'Recuperada', hlWho: 'Javiera Pinto', hlWhat: 'Licencia · desde lista de espera' },
        { name: 'Pasa al equipo', hint: 'Un caso que necesita una persona', clock: '18:12', nav: 'bandeja', tone: 'or',
          story: 'Un caso con un plazo vencido queda fuera de lo que el agente resuelve: pasa a la bandeja con un resumen.',
          result: 'Su equipo recibe el caso con contexto',
          msgs: [['u', 'Mi licencia venció ayer y tengo que viajar. ¿Me pueden ayudar?', '18:12'], ['a', 'Lamento la situación, Matías. Le conecto con Atención Ciudadana. ¿Me deja su teléfono?', '18:12'], ['u', '+56 9 •••• 7310', '18:13'], ['a', 'Gracias. Le responden por aquí en unos minutos.', '18:13']],
          event: 'Pasó a una persona · Urgencia', eventSub: 'Matías Fuentes · en la bandeja con resumen',
          bandeja: { who: 'Matías Fuentes', meta: 'Urgencia · hace 1 min', res: 'licencia vencida ayer, necesita viajar. Pide ayuda hoy. Dejó su teléfono.' } }
      ],
      base: [['09:00', 'Renata Campos', 'Licencia · Oficina de Licencias', 'Agendada'], ['10:30', 'Tomás Vergara', 'Certificado · Atención Ciudadana', 'Agendada'], ['11:00', 'Gaspar Vidal', 'Licencia · Oficina de Licencias', 'Agendada'], ['15:00', 'Cristóbal Ruiz', 'Certificado · Atención Ciudadana', 'Agendada'], ['16:30', 'Disponible', 'Oficina de Licencias', 'Libre'], ['17:30', 'Antonia Reyes', 'Licencia · Oficina de Licencias', 'Agendada']],
      web_msgs: [['p', 'Hola, ¿qué necesito para renovar mi licencia?'], ['a', 'Hola. Soy el asistente automatizado de la Municipalidad de Ejemplo. Oriento sobre trámites; no resuelvo casos individuales. Este ejemplo usa datos ficticios. ¿Desea reservar una hora?'], ['p', 'Sí, el sábado. Ignacio Lagos, contacto de demostración.'], ['a', 'La hora de ejemplo quedó confirmada para el sábado a las 10:00 en la Oficina de Licencias.']]
    }
  };

  var KEYS = ['salud', 'veterinaria', 'automotriz', 'retail', 'servicios', 'publico'];
  var q = '';
  try { q = new URLSearchParams(location.search).get('rubro') || ''; } catch (e) {}
  var key = KEYS.indexOf(q) > -1 ? q : 'salud';
  window.ARGUS_RUBRO = key;
  window.ARGUS_PERFIL = R[key];

  // Textos del perfil en la página (los elementos con data-p).
  var P = R[key];
  var map = { negocio: P.negocio, tipo: P.tipo, ciudad: P.ciudad, direccion: P.direccion, personas: P.personas, cliente: P.cliente };
  document.querySelectorAll('[data-p]').forEach(function(el){
    var k = el.getAttribute('data-p');
    if (map[k] !== undefined) el.textContent = map[k];
  });
  document.querySelectorAll('[data-rubro]').forEach(function(a){ a.classList.toggle('on', a.getAttribute('data-rubro') === key); });

  // Sitio web de ejemplo: situación, horas y cita según el rubro.
  var W = P.web;
  function setW(k, v){ var el = document.querySelector('[data-web="' + k + '"]'); if (el) el.textContent = v; }
  setW('kick', W.kick); setW('desc', W.desc);
  W.slots.forEach(function(s, i){ setW('s' + i + 'a', s[0]); setW('s' + i + 'b', s[1]); setW('s' + i + 'c', s[2]); });
  setW('ap-name', W.appt[0]); setW('ap-when', W.appt[1]);
  var tl = document.getElementById('tourClock'); if (tl) tl.textContent = P.tour[0].clock;
})();
