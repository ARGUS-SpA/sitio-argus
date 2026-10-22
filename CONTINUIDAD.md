# Pendientes y siguiente trabajo

Leer primero README.md y DECISIONES.md. Este archivo es el punto de continuidad para otro desarrollador o una nueva conversación. No interpretar una tarea pendiente como implementada.

## P0 · Coherencia de contratación y operación

| Pendiente | Responsable sugerido | Condición de cierre |
| --- | --- | --- |
| Homologar contrato y orden con WhatsApp incluido | Socios y revisión contractual | Documentos privados coinciden con precios y alcance publicados |
| Comprobar contador de respuestas en ATLAS | Desarrollo ATLAS | Cada respuesta se cuenta según la definición comercial; período y reinicio claros |
| Precisar alertas y ampliaciones | Socios + desarrollo | Umbrales, autorización y costos registrados, sin cargos no acordados |
| Definir festivos y contacto para incidentes | Operaciones | Orden y procedimientos tienen cobertura y responsables reales |
| Verificar puesta en servicio sanitaria | Equipo ATLAS | Evidencias y acta por cliente; demo sigue usando datos ficticios |
| Probar salida de clientes | Equipo ATLAS | Exportación segura, reservas pendientes, revocación y supresión verificadas |

El acceso al repositorio privado `ARGUS-SpA/Plataforma-Digital-Ventas` no estuvo disponible mediante la conexión utilizada para esta auditoría. No se verificaron implementación, contratos de proveedores, exportación, supresión ni SENTINEL. El usuario sí facilitó documentación para revisar su coherencia con la web.

## P1 · Medición y posicionamiento

1. Cloudflare Web Analytics: propiedad independiente para www.argus.cl creada; código restringido a producción. Consultar MEDICION.md para estado y verificación.
2. Search Console: dominio argus.cl verificado por TXT y sitemap enviado. Consultar MEDICION.md; el procesamiento e indexación dependen de Google.
3. Revisar URLs indexadas, cobertura y consulta de marca; no inferir desindexación solo por una búsqueda.
4. Decisión de Javier: integrar medición de clics de contacto a LYNX en una etapa posterior. `assets/site.js` emite `argus:contact` con canal, ubicación y ruta, sin mensaje ni datos de pacientes. El evento local no guarda estadísticas por sí solo.
5. Separar clics, contactos calificados, demos, propuestas y ventas. No etiquetar un clic de WhatsApp como cliente conseguido.
6. Medir rendimiento y Core Web Vitals en producción. No se ha obtenido una puntuación de Lighthouse ni se garantiza una posición en buscadores.

## P1 · Seguimiento comercial / LYNX

Preparados PROCESO-COMERCIAL.md, la plantilla vacía ARGUS-registro-comercial.xlsx y la especificación LYNX-COMERCIAL.md. La plantilla tiene 200 filas, filtros, responsables y alertas visuales. No contiene prospectos reales, no envía avisos y no está conectada a LYNX.

Siguiente acción de los socios: guardar una copia única en una ubicación privada compartida, asignar responsable por oportunidad y registrar próxima acción y fecha. Confirmar la cadencia interna sugerida. Nunca subir la copia con contactos reales al repositorio público.

Pendiente de desarrollo: revisar arquitectura y acceso de LYNX para implementar oportunidades, actividades, historial de etapas y futura medición de clics. No se modificó esa plataforma.

## P2 · Contenido con evidencia

- Obtener resultados de los primeros clientes con período y metodología documentados.
- Solicitar autorización antes de publicar nombres, logotipos, testimonios o casos.
- Medir cupos ofrecidos, aceptados y atenciones realizadas por separado.
- Validar palabras clave y publicar páginas de especialidades solo si aportan contenido propio y demanda.
- Incorporar fotografías y experiencia del equipo cuando exista material autorizado.
- Desarrollar la oferta de automatizaciones después de definir soluciones repetibles y capacidad de soporte.

## Mantenimiento temporal

Al terminar octubre de 2026, archivar la promoción y verificar el precio mostrado. Al cambiar el estado operativo de ATLAS o habilitar una clínica, revisar coherencia de avisos, contratos y páginas; no sustituir desarrollo por producción sin evidencia.

## Límites de este cambio

Sitio comercial y documentación técnica. En la etapa de medición se añadió un TXT de verificación de Google sin modificar los registros de tráfico o correo. No se cambió código de ATLAS, SENTINEL, LYNX, facturación ni datos de clientes. No hay formulario con recepción en servidor: el contacto utiliza enlaces a WhatsApp y correo.
