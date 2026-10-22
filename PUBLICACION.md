# Publicación y recuperación

## Flujo observado

Repositorio: ARGUS-SpA/sitio-argus. Rama principal: main. El estado de GitHub del commit anterior caeb39a6fa0184782c8f612e2448b7b69299cda6 informa una publicación Vercel exitosa, contexto Vercel. La página del repositorio referencia https://sitio-argus.vercel.app.

Usar la integración existente, verificar su resultado para el commit exacto y comprobar https://www.argus.cl/. No crear otro alojamiento ni cambiar DNS sin necesidad. Un commit en GitHub no demuestra por sí solo que el dominio público se haya actualizado.

## Preparación

Sitio sin compilación. Archivos HTML en la raíz, recursos en assets y licencias conservadas. No subir el servidor de vista local, ZIP, capturas de revisión, documentación privada ni credenciales al directorio publicado. La vista local de revisión enviaba noindex mediante su servidor; ese servidor no es parte de producción.

`.vercelignore` excluye scripts, docs y README del paquete de Vercel. Es una exclusión de publicación, no un control de confidencialidad del repositorio, que es público. Si se cambia de proveedor se debe mantener una selección explícita de archivos públicos.

## Verificación de una publicación

1. Ejecutar las comprobaciones del README.
2. Publicar mediante el flujo GitHub/Vercel existente y anotar commit y estado.
3. Comprobar portada, planes y demo en el dominio público.
4. Verificar recursos CSS/JS y al menos un flujo de la demo.
5. Comprobar sitemap y robots, ausencia de bloqueo noindex en páginas comerciales y enlaces a ambas personas y al correo.
6. Verificar la analítica dentro de la cuenta correspondiente. El acceso a esa cuenta no se presupone.

Los cambios en un CDN pueden tardar en reflejarse. Si el commit está listo en Vercel pero argus.cl conserva la versión anterior, revisar la asociación del dominio y la caché en el proveedor efectivo; no declarar éxito del dominio solo por el estado Vercel.

## Recuperación

Punto anterior a este cambio: commit caeb39a6fa0184782c8f612e2448b7b69299cda6. Preservar el historial; ante un problema, revertir el commit de implementación o promover la publicación anterior mediante el alojamiento existente. No usar force-push para reescribir main. Tras la recuperación comprobar el dominio y registrar motivo, commit y resultado.

## Enlaces antiguos

Las referencias a #beneficios, #sitio, #demo y #nosotros desde la portada anterior se redirigen en el navegador a las nuevas páginas mediante assets/site.js. El ancla #contacto se mantiene en inicio.

## Promoción

La fecha America/Santiago se evalúa en assets/site.js. El bloque de lanzamiento deja de mostrarse después de 2026-10-31; las mensualidades normales permanecen. Las condiciones de contratos elegibles no se alteran por ocultar la promoción.
