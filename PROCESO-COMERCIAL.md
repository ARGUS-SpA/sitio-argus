# Seguimiento comercial de ARGUS

Versión inicial, 21 de octubre de 2026. Aplicable a Javier y Camilo. Procedimiento propuesto para empezar a operar; las cadencias internas no constituyen un SLA ofrecido a clientes.

## Empezar ahora

1. Descargar `ARGUS-registro-comercial.xlsx` y guardar una única copia de trabajo en una ubicación privada a la que ambos socios tengan acceso. El archivo de este repositorio es una plantilla vacía. **Nunca subir la copia con contactos reales al repositorio público.**
2. Registrar la primera consulta real con ID `ARG-0001`. Usar IDs estables y correlativos, sin recalcularlos al ordenar filas.
3. Asignar un responsable entre Javier y Camilo. Quien recibe la consulta la registra y confirma quién la atenderá. El otro socio puede cubrir ausencias, sin duplicar mensajes.
4. Completar próxima acción y fecha. Revisar cada día las filas Vencido, Hoy y los avisos de información faltante.
5. Al finalizar cada gestión, actualizar etapa, última gestión, próxima acción y fecha. Si se descarta, registrar motivo y detener el seguimiento salvo nuevo acuerdo.

La plantilla tiene 200 filas preparadas, filtros, listas de etapas y responsables y alertas visuales. Al ampliar filas, extender también fórmulas, listas, tabla y rangos de conteo. No envía notificaciones, no sincroniza WhatsApp y no está conectada a LYNX.

## Qué se registra

Una fila representa una oportunidad concreta de una empresa para un alcance de servicio. Un contacto puede participar en más de una oportunidad independiente. Una consulta repetida sobre la misma propuesta actualiza la fila existente.

| Campo | Criterio |
| --- | --- |
| ID | Identificador estable único, por ejemplo ARG-0001 |
| Ingreso | Fecha de primera consulta real de esta oportunidad |
| Empresa | Nombre comercial para identificar al interesado |
| Contacto / medio | Persona y correo o teléfono comercial necesario para responder |
| Canal | WhatsApp, correo, referido u otro |
| Origen | Cómo conoció ARGUS. Preguntar y usar Desconocido cuando no se sabe |
| Servicio | ATLAS, ATLAS + web, automatización o por definir |
| Etapa | Estado actual conforme a los criterios siguientes |
| Responsable | Javier o Camilo, uno por oportunidad |
| Última gestión | Fecha de la última acción efectivamente realizada |
| Próxima acción | Acción concreta, por ejemplo Confirmar demo, no solo Seguimiento |
| Fecha próxima | Fecha acordada o fecha de revisión interna |
| Seguimiento | Cálculo visual. No editar esta columna |
| Fecha contrato | Fecha en que el contrato quedó firmado por ambas partes |
| Fecha entrega | Fecha de entrega aceptada, no la fecha estimada |
| Motivo descarte | Razón breve: sin encaje, sin presupuesto, sin respuesta, postergado u otra razón real |
| Notas comerciales | Necesidad, bloqueos y acuerdos mínimos. Enlaces privados a propuesta o minuta cuando corresponda |

Guardar volúmenes, cantidad de agendas y necesidades en notas sin datos de pacientes. El detalle de requisitos y documentos va en una carpeta privada del proyecto. No copiar conversaciones completas, claves, credenciales de Meta, RUT de pacientes ni antecedentes clínicos en esta planilla.

## Etapas y condiciones

| Etapa | Evidencia necesaria | Para avanzar |
| --- | --- | --- |
| Nuevo | Consulta real y canal de respuesta | Asignar responsable y comprobar interés |
| Calificado | Problema administrativo identificable e interés en evaluar una solución | Confirmar demo con el interesado |
| Demo realizada | Demostración efectivamente realizada | Acordar levantamiento y contraparte del cliente |
| Levantamiento | Requisitos en recopilación | Confirmar alcance, calendario propio, volumen y dependencias |
| Propuesta enviada | Propuesta identificada por versión y fecha, efectivamente enviada | Acordar fecha para revisión |
| Negociación | Interesado revisando condiciones o cambios | Consolidar versión final sin compromisos contradictorios |
| Contratado | Contrato firmado por ambas partes | Comprobar anticipo y antecedentes necesarios antes de iniciar |
| Implementación | Trabajo iniciado con las condiciones de inicio cumplidas | Ejecutar pruebas y acordar entrega |
| Entregado | Entrega aceptada y puesta en servicio autorizada según el alcance | Registrar fecha y traspasar a soporte |
| Descartado | Oportunidad que no continuará por ahora | Registrar motivo y cerrar seguimiento |

Una demo agendada sigue como Calificado con la fecha en Próxima acción. Una propuesta redactada sigue en Levantamiento hasta que se envía. Un contrato enviado sin firma sigue en Negociación. Una firma no acredita anticipo pagado, entrega ni ingreso cobrado. La aceptación comercial no sustituye los requisitos para habilitar una implementación sanitaria.

## Calificación y demo

En el primer intercambio recoger únicamente lo necesario para coordinar una demo. El levantamiento completo viene después. Preguntas sugeridas:

1. ¿Qué servicio presta la empresa y qué problema quiere resolver: consultas sin respuesta, agenda, cancelaciones o espera?
2. ¿Cuántas agendas o profesionales necesita coordinar y qué volumen aproximado de atención tiene?
3. ¿Está dispuesta a gestionar las reservas desde el calendario y panel de ATLAS? Este punto es esencial: no prometer integración con el calendario actual.
4. ¿Quién responderá las derivaciones humanas y en qué horario? Fuera de ese horario quedan pendientes.
5. ¿Quién evaluará la propuesta y quién entregará los antecedentes para implementar?
6. ¿De dónde conoció ARGUS y qué fecha tiene disponible para una demostración?

No rechazar automáticamente por rubro, tamaño o presupuesto desconocido. Registrar el encaje y revisar con los socios cuando haya requisitos nuevos. La automatización de una empresa pequeña requiere alcance propio antes de cotizar.

Demo sugerida de 20 a 30 minutos, con datos ficticios: agendamiento, recordatorio, cancelación, recuperación mediante lista de espera, derivación humana y panel. Mostrar funciones disponibles y aclarar cualquier función aún no habilitada. No presentar escenarios de demo como resultados de clientes reales.

## Levantamiento, propuesta y cierre

Antes de cotizar: identificar agendas, horarios, duración de citas, reglas administrativas de cancelación/espera, datos mínimos de configuración, personal que atenderá derivaciones, contenido autorizado y criterios de aceptación. Estimar respuestas del agente; las citas y mensajes totales no son el contador comercial.

La propuesta debe contener alcance incluido y excluido, tramos de respuestas mensuales, precio con tratamiento de IVA, implementación, dependencias del cliente, criterio de entrega, soporte aplicable, alertas/ampliación de uso y vigencia. Referenciar la versión contractual privada vigente. Las condiciones publicadas en `DECISIONES.md` siguen siendo la fuente comercial; no se generan nuevos precios desde esta plantilla.

Condiciones confirmadas por Javier: WhatsApp incluido; 50% de implementación al cerrar y 50% contra entrega; primera mensualidad después de la entrega. La promoción vigente tiene fecha límite de cierre contractual el 31/10/2026 y aplica 50% a implementación y primera mensualidad. Verificar vigencia antes de ofrecerla; no extenderla automáticamente. Cualquier consumo adicional se gestiona según contrato, con aviso y acuerdo, sin inventar tarifas.

La estimación usual de unas dos semanas para un agente depende de recibir los antecedentes y confirmar capacidad. No convertirla en una fecha garantizada sin revisar disponibilidad, requisitos y alcance. Registrar compromisos en la propuesta y contrato, no solo en notas internas.

## Cadencia interna sugerida

- Responder las consultas en cuanto el socio asignado esté disponible. La intención expresada por los socios es atender en minutos; no publicar una promesa de atención humana continua.
- Si no responde: revisar en dos días hábiles y, si corresponde, hacer un último seguimiento cinco días hábiles después. Después de esos dos intentos, cerrar o dejar la revisión expresamente acordada. Si pide no ser contactado, detener los intentos.
- Después de una demo: enviar una recapitulación de acuerdos y pedir solo los antecedentes pendientes.
- Después de una propuesta: usar la fecha de revisión acordada. Si no hay fecha, proponer una revisión en tres días hábiles como criterio interno.
- Revisión diaria breve: vencidos, gestiones de hoy y registros incompletos. Revisión semanal conjunta: oportunidades activas, capacidad de implementación y motivos de descarte.

Estas cadencias son sugerencias manuales. No hay envíos, correos ni tareas programadas por este cambio.

## Cómo interpretar la planilla

Los conteos superiores muestran el estado actual de las filas. Contratos registrados cuenta oportunidades con fecha de firma, no pagos ni facturación. Entregados y Descartados son estados de cierre. Las oportunidades contratadas o en implementación permanecen activas hasta su entrega.

La columna Seguimiento avisa por datos mínimos faltantes, ID duplicado, fecha de próxima gestión inválida o cierre incompleto. Las fechas de cierre y los datos pegados deben revisarse además manualmente. TODAY() usa la fecha del equipo o aplicación al recalcular. La planilla se verificó con el motor de generación; no se probó coedición ni comportamiento en todas las versiones de Excel o Google Sheets.

La planilla no guarda un historial de cada cambio de etapa. Por eso no calcula conversiones semanales ni tiempo de avance. Para esas métricas se necesita el historial de eventos definido en `LYNX-COMERCIAL.md`.

## Puesta en uso y continuidad

Pendientes de los socios: elegir ubicación privada para la copia compartida, confirmar asignaciones y cadencia, y empezar con la primera oportunidad real. No se cargaron contactos ni se enviaron mensajes. Para LYNX, usar la especificación adjunta y revisar el repositorio y permisos de esa plataforma antes de implementar.
