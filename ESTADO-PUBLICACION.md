# Estado de publicación y continuidad

Verificado el 21 de octubre de 2026, aproximadamente a las 21:45, hora de Chile (America/Santiago).

## Resultado

Implementación aprobada integrada en `main` y comprobada en https://www.argus.cl/.

- Pull request: https://github.com/ARGUS-SpA/sitio-argus/pull/6 — integrado.
- Commit de integración: `5e22f4b9d87997549f495b7abd2520839605cf16`.
- Último commit de la rama implementada: `fb077cd5e072aaecd71d0fdcd0f23c924b6ec4e8`.
- Publicación Vercel del commit de integración: estado `success`, contexto `Vercel`.
- Evidencia del alojamiento: https://vercel.com/javierdonoso-6427/sitio-argus/H7ffMbM2ygWXWPySEjBvgSfnfdVm.
- Punto anterior para recuperación: `caeb39a6fa0184782c8f612e2448b7b69299cda6`.

La integración API de GitHub permitió leer, pero rechazó crear una rama con 403. La herramienta CLI tenía una credencial inválida. Se completó la carga, creación del pull request e integración mediante la sesión autenticada del navegador, sin cambiar credenciales ni permisos. Queda pendiente reparar esas conexiones para futuras tareas automatizadas.

## Verificación en el dominio real

- Portada nueva visible, con estilo y navegación correctos.
- Planes con 2.000, 7.000 y 19.000 respuestas; precios y promoción confirmados.
- WhatsApp incluido y mensualidad posterior a la entrega presentes en la oferta.
- URL canónica de planes correcta; no hay etiqueta meta robots de bloqueo en esa página. No se inspeccionaron todas las cabeceras HTTP.
- Demo inicializada y escenario de lista de espera completado: la conversación confirma y el panel registra el cupo recuperado.
- Sin errores JavaScript registrados durante la comprobación de esa demo en producción.
- robots.txt accesible, permite rastreo de páginas públicas y referencia el sitemap.
- sitemap.xml accesible con las diez URLs previstas.
- No se enviaron mensajes reales ni correos al realizar las comprobaciones.

## Pendientes

Consultar CONTINUIDAD.md. Prioridad: confirmar analítica Cloudflare, configurar Search Console, conectar medición persistente de contactos, ordenar seguimiento comercial y verificar coherencia del contador y contratos privados de ATLAS.

La web comercial publicada no acredita que el backend esté habilitado para pacientes reales. Los límites y pruebas del producto operativo siguen documentados como pendientes en sus instrumentos y repositorios correspondientes.

Esta actualización documental posterior registra la evidencia del commit que publicó el sitio; no modifica el diseño ni los precios aprobados.
