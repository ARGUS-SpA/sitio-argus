# LYNX: especificación de seguimiento comercial

21 de octubre de 2026. Documento para una implementación posterior. **LYNX no fue modificado ni conectado en esta etapa.** No se auditó su código o esquema. Validar estas decisiones contra la arquitectura existente antes de crear migraciones.

## Objetivo y alcance inicial

Sustituir la planilla privada por un registro compartido de oportunidades, responsables, actividades y próximas acciones. Mantener separados el contacto identificado, la oportunidad comercial y el clic anónimo del sitio. La versión inicial no necesita copiar chats completos ni automatizar mensajes comerciales.

## Modelo funcional propuesto

| Entidad | Campos mínimos | Reglas |
| --- | --- | --- |
| Empresa | ID, nombre comercial | Evitar duplicados por revisión de empresa y contacto. No pedir RUT por defecto |
| Contacto | ID, empresa, nombre, medio comercial, preferencia de canal, no contactar | Acceso limitado a socios y personal autorizado |
| Oportunidad | ID, empresa, contacto, servicio, origen declarado, etapa, responsable, ingreso, contrato, entrega, motivo descarte | Un alcance independiente por oportunidad; ID estable |
| Actividad | ID, oportunidad, tipo, fecha realizada, autor, resultado breve | Demo realizada y propuesta enviada registran hechos; no confundir con actividades planificadas |
| Próxima acción | ID, oportunidad, responsable, descripción, vencimiento, estado | Al menos una pendiente por oportunidad activa; completar no debe borrar el historial |
| Cambio de etapa | ID, oportunidad, etapa anterior/nueva, fecha, autor, motivo | Historial inmutable para medir avance y correcciones auditables |
| Clic de contacto | Canal, ubicación, ruta permitida, hora de recepción | Agregado independiente. No crea contacto ni oportunidad automáticamente |

Reutilizar la gestión de usuarios existente. No crear usuarios, credenciales o accesos públicos por esta especificación. Si hay varias empresas usuarias de LYNX, aislar los registros comerciales internos de ARGUS respecto de otros clientes.

Etapas: Nuevo, Calificado, Demo realizada, Levantamiento, Propuesta enviada, Negociación, Contratado, Implementación, Entregado y Descartado. Aplicar las condiciones de `PROCESO-COMERCIAL.md`, permitiendo correcciones con historial y motivo.

## Pantallas y acciones

1. Bandeja con filtros por responsable, etapa, próximas acciones vencidas y de hoy.
2. Alta breve con empresa, contacto, servicio, origen y responsable. No convertir el alta en un levantamiento largo.
3. Ficha de oportunidad con actividad, documentos privados, próximo compromiso y cambios de etapa.
4. Cambio de etapa con validación: firma para Contratado; condiciones de inicio verificadas para Implementación; aceptación y fecha para Entregado; motivo para Descartado.
5. Detección de duplicados antes de crear y fusión revisada que conserve trazabilidad.
6. Informe agregado de oportunidades, demos efectivamente realizadas, propuestas enviadas y contratos firmados por período.

## Contrato propuesto para eventos de la web

El sitio ya emite localmente `argus:contact` desde `assets/site.js`. Solo incluye `channel`, `placement` y `page`. Por decisión de Javier, el almacenamiento persistente se implementará más adelante con LYNX.

Ejemplo sintético, sin datos personales:

```json
{"channel":"whatsapp","placement":"navegacion","page":"/planes.html"}
```

El futuro adaptador validará valores permitidos, normalizará la ruta sin consulta ni fragmento y omitirá texto de mensajes, correo, teléfono, identificadores de pacientes y URL de destino completa. Confirmar los valores existentes de `data-contact` y `data-placement` antes de definir enumeraciones.

La solicitud de medición no debe bloquear ni retrasar la apertura de WhatsApp o correo. No poner secretos en JavaScript público. El receptor debe limitar tamaño, frecuencia y campos, rechazar valores desconocidos y no depender solo de CORS como control de abuso. La hora de recepción del servidor es la referencia para agregación. Acordar con los socios retención, permisos y tratamiento de registros técnicos antes de publicar.

Los contadores de clics pueden tener bloqueos, duplicados y tráfico automatizado. No prometer unicidad de personas, ni vincular identidad por dirección IP o huella del navegador. Si se necesitan identificadores efímeros para deduplicación, definir su necesidad y privacidad antes de implementarlos. Ningún evento equivale a mensaje enviado, consulta recibida o venta.

## Indicadores y definiciones

| Indicador | Fuente y definición |
| --- | --- |
| Visitas web | Cloudflare, propiedad www.argus.cl. Medida distinta de personas o leads |
| Clics de contacto | Receptor de eventos futuro. Interacciones, no interesados identificados |
| Oportunidades nuevas | Altas únicas por fecha de ingreso |
| Calificadas | Primera transición a Calificado con interés confirmado |
| Demos realizadas | Actividad de demo efectivamente completada, excluyendo canceladas |
| Propuestas enviadas | Actividad con versión y fecha; distinguir oportunidades únicas de revisiones de la misma propuesta |
| Contratos firmados | Primera firma completa por oportunidad. No equivale a cobro |
| Entregas aceptadas | Fecha y aceptación registradas |
| Gestiones vencidas | Próximas acciones pendientes cuyo vencimiento ya ocurrió |

Mostrar período y zona America/Santiago. Para conversiones, usar la misma cohorte de oportunidades y ventana de observación; no dividir los contratos de una semana por los interesados de esa semana como si fueran el mismo grupo. Con denominador cero, mostrar Sin base en vez de una tasa inventada. No calcular ingresos desde la etapa o multiplicando planes sin pagos reales.

## Importación de la planilla

Importar solo la copia privada autorizada. Validar encabezados, IDs únicos, fechas, etapas y responsables. Mostrar una previsualización de altas, actualizaciones y rechazos antes de confirmar. Repetir la importación por el mismo ID debe actualizar o avisar, sin duplicar. Conservar el origen del registro y no inventar actividades históricas a partir de su etapa actual. El archivo del repositorio público está vacío y solo sirve de plantilla.

## Criterios de aceptación de la futura implementación

- Ambos socios ven el mismo registro y quedan identificados los autores de cambios.
- Una oportunidad activa sin responsable o próxima acción es visible como incompleta.
- Las fechas de hoy y vencidas se evalúan en America/Santiago, incluyendo el cambio de día.
- Entregado y Descartado no generan seguimientos activos por defecto.
- Importar dos veces no crea oportunidades duplicadas; una fila inválida se rechaza con motivo visible.
- Una demo cancelada no suma a demos realizadas. Revisar una propuesta no crea otra oportunidad.
- Usuarios sin permiso no pueden leer o modificar contactos, exportaciones ni documentos.
- El sitio sigue abriendo el contacto aunque el receptor de eventos no esté disponible.
- Un clic anónimo no crea automáticamente una empresa o persona, ni dispara mensajes.
- Se verifica el borrado/conservación de contactos y actividades según la política acordada.

## Decisiones pendientes antes de desarrollar

Revisar repositorio y arquitectura de LYNX, modelo de usuarios, almacenamiento de documentos, ubicación del receptor, retención y acceso. Confirmar cadencia comercial propuesta y si se desean avisos internos. Cualquier automatización de mensajes o integración con WhatsApp requiere un alcance y autorización propios.
