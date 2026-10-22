# Validación de la versión aprobada

## Evidencia local

- Sintaxis JavaScript validada con Node para assets/site.js y assets/demo.js.
- 215 referencias locales de enlaces y recursos comprobadas, sin destinos faltantes.
- Respuesta HTTP 200 de 17 rutas representativas en el servidor de revisión.
- Sitemap y JSON-LD con formato válido.
- Encabezado principal único en páginas comerciales y legales nuevas.
- Cuotas 2.000 / 7.000 / 19.000 y precios $159.000 / $429.000 / $1.090.000 + IVA comprobados.
- Promoción: mensualidad inicial $79.500 / $214.500 / $545.000 + IVA; implementación $150.000 / $325.000 / desde $600.000 + IVA.
- Portada y planes revisados visualmente en escritorio y móvil de 390 píxeles.
- Sin desbordamiento horizontal observado a ese ancho en producto, implementación, equipo, complementos, privacidad y demo.
- Menú móvil, preguntas desplegables y búsqueda de pacientes ficticios comprobados.
- Demo: reserva, permiso de recordatorio, confirmación, cancelación, lista de espera, derivación fuera de horario y ejemplo web comprobados.

Durante el desarrollo se corrigió una extracción incompleta del ejemplo web que causaba un error de inicialización. La versión de entrega contiene la sección completa. Se corrigieron también contraste del escenario activo y etiquetas de navegación móvil del panel.

## Lo que estas pruebas no acreditan

No se envían mensajes reales, no hay conexión con el backend ATLAS y no se procesan pacientes en esta demo. No se comprobó la facturación real, los contratos de proveedores, la exportación o supresión operativa ni una habilitación sanitaria. No se midieron posiciones, tráfico o rendimiento de producción.

## Repetición

Ejecutar `python check_site.py` y los comandos Node del README después de cambiar archivos. Si se modifica una interacción, verificar su escenario en navegador y el panel resultante. Los cambios de precios deben contrastarse con DECISIONES.md y con el instrumento comercial privado vigente.

## Resultado de producción

Consultar ESTADO-PUBLICACION.md para la evidencia del commit integrado, el alojamiento y el dominio público. Mantenerlo actualizado sin marcar como completada una comprobación no realizada.
