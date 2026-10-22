# Medición y posicionamiento · etapa 1

Actualización: 21 de octubre de 2026, hora de Chile.

## Configuración realizada

- Google Search Console: propiedad de dominio `argus.cl` verificada mediante un TXT adicional en DNS. Conservar ese TXT mientras se utilice la propiedad. No se eliminaron verificaciones anteriores ni se cambió el destino del sitio o del correo. No se autorizó a Google a administrar Cloudflare.
- Sitemap enviado: https://www.argus.cl/sitemap.xml. Search Console confirmó **El sitemap se ha procesado correctamente**, última lectura 21/10/26 y **10 páginas descubiertas**. El primer estado transitorio de descarga fallida desapareció al procesarlo.
- Portada https://www.argus.cl/: Search Console confirmó **La página está indexada**; último rastreo 20/10/2026 16:32:20 (anterior al rediseño), rastreo e indexación permitidos y obtención correcta. Se solicitó una actualización de indexación una vez y Google confirmó su ingreso en cola. No implica que ya haya actualizado el contenido del índice.
- Descubierta no significa indexada. Los informes de rendimiento, indexación y experiencia estaban procesándose al crear la propiedad.
- Cloudflare Web Analytics: sitio independiente `www.argus.cl`, instalación manual desde `assets/site.js`. La propiedad anterior de `argus.cl` recibe tráfico de subdominios operativos y no debe utilizarse como si fuera el embudo comercial.
- El beacon se carga solo sobre HTTPS y el hostname exacto `www.argus.cl`. No se carga en localhost, previews de Vercel, app.argus.cl ni si el navegador indica Do Not Track=1. Su token público no es una credencial de administración.
- Se actualizó la explicación de medición en privacidad.html. No se añadió Google Analytics ni publicidad.

## Contactos: decisión del propietario

Javier eligió integrar la medición de contactos a LYNX más adelante. `argus:contact` sigue siendo un evento local del navegador: **no existe almacenamiento persistente de clics ni leads en esta etapa**. Cloudflare Web Analytics no admite eventos personalizados. No presentar visitas o clics como ventas.

Para LYNX: acordar un receptor y su control de abuso; enviar únicamente canal, ubicación y ruta; evitar texto de mensajes, correo del visitante, teléfono o información clínica. Separar el agregado de clics de un registro comercial consentido e identificable. Definir deduplicación, retención, acceso y responsables antes de producción. No se modificó LYNX en este trabajo.

## Comprobaciones

- Comprobación estática: 12 HTML y 215 referencias locales sin errores. Sintaxis JavaScript validada.
- Se probaron 6 escenarios de hostname/protocolo/Do Not Track con resultado correcto; solo HTTPS + www.argus.cl + DNT desactivado carga el beacon.
- Comprobar en producción que se inserta el script oficial con el token configurado y que Cloudflare comienza a mostrar páginas del host www. Bloqueadores y Do Not Track pueden reducir el conteo.
- Core Web Vitals de campo requiere tráfico suficiente; no hay puntuación garantizada ni auditoría Lighthouse en esta etapa.

## Próxima revisión manual

1. En Search Console, revisar Páginas y luego Rendimiento; filtrar por URL de www para no mezclar subdominios. Si faltan datos, esperar su procesamiento; no reenviar repetidamente el sitemap.
2. Revisar portada, ATLAS y planes con Inspección de URLs. Investigar exclusiones y canónica elegida cuando haya resultados; solicitar indexación solo si corresponde.
3. En Cloudflare, seleccionar explícitamente www.argus.cl: visitas, páginas, referentes y rendimiento. Excluir interpretaciones basadas en las visitas internas de prueba.
4. Semanalmente registrar visitas, consultas orgánicas, contactos calificados, demos, propuestas y contratos. Las cuatro últimas requieren registro comercial, no se deducen del beacon.
5. Priorizar contenido de especialidades con demanda y experiencia real; no crear páginas duplicadas ni testimonios inventados.

No se creó una automatización de seguimiento. La promoción sigue requiriendo revisión al finalizar octubre de 2026.

## Fuentes de configuración

- https://developers.cloudflare.com/web-analytics/get-started/
- https://developers.cloudflare.com/web-analytics/faq/
- https://developers.cloudflare.com/web-analytics/about/
- https://support.google.com/webmasters/answer/9008080

## Recuperación

Revertir el commit de esta etapa retira el loader y la actualización de privacidad. Mantener el TXT conserva Search Console; no eliminar otros registros DNS. La propiedad antigua de analítica sigue disponible. No hay cambios en precios, diseño ni la aplicación ATLAS.
