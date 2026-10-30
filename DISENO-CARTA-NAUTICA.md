# ARGUS · Carta náutica

Actualización visual del 22 de octubre de 2026 a partir de prompt-argus-sistema-diseno.md.

- Tokens de azul noche, hueso, latón y colores semánticos en assets/carta.css.
- Newsreader para títulos, Instrument Sans para interfaz e IBM Plex Mono para datos.
- Apariencia Oscuro (predeterminado), Claro y Sistema, con preferencia local al navegador.
- Botones, tarjetas y mensajes con radio de 2 px; bordes finos y foco visible.
- Confirmación verde, cancelación gris y atención pendiente naranja en la demo.
- Gráficos con tres series fijas, navegación por teclado y tabla de valores.
- Se conservaron precios, contactos, enlaces comerciales, analítica y textos legales.

Verificación: 12 páginas, 237 referencias locales correctas; sintaxis JavaScript válida.
Revisión visual en escritorio, tema claro y tres páginas en iframe de 390 px (375 px útiles por la barra de desplazamiento), sin desbordamiento del documento.

## Portada orientada a conversión · 30 de octubre de 2026

A partir de la auditoría UX/UI de la portada:

- Apariencia Claro como predeterminado (Oscuro y Sistema siguen disponibles; se respeta la preferencia guardada).
- Titular explícito, precio de entrada, WhatsApp incluido y plazo de implementación visibles en el hero.
- Franja de confianza con hechos verificables en lugar de la franja de beneficios repetida. No hay clientes publicados: no se muestran logos, testimonios ni cifras de clientes.
- Sección "El producto" con el video demostrativo (assets/media/atlas-demo-clinica.mp4, 1:10, datos ficticios) y cuatro capturas del panel con datos ficticios.
- Cuatro tareas de ATLAS (agenda, recordatorios y lista de espera, bandeja, panel), resumen de los planes vigentes, bloque "Primeras implementaciones" y preguntas frecuentes con schema FAQPage. Las respuestas siguen DECISIONES.md (24/7 no es soporte humano 24/7; sin integraciones estándar con agendas externas).
- CTA único "Coordinar demo" por WhatsApp a Javier; Camilo se mantiene como alternativa identificada. Se eliminaron "Inicio" y "Contacto" del menú y se agregó "Producto".
- Barra de acción fija en móvil, lema del logo fuera del encabezado y microtexto mínimo de 11–12 px.
- Imagen social og:image 1200×630 (assets/media/og-argus-atlas.jpg) y etiquetas Twitter en las páginas comerciales.

## Hero y demo guiada · 30 de octubre de 2026 (tarde)

- Hero de la portada: la ilustración muestra la promesa del titular (WhatsApp a las 23:41 con la clínica cerrada, cita nueva en la agenda y confirmación). Estilos en assets/home.css (bloque "Hero v3").
- Demo: el bloque principal de demo.html es ahora una demo guiada de cinco situaciones (agendar, recordatorio, cancelación, lista de espera, pasa al equipo) en assets/demo-tour.js y assets/demo-tour.css. Abre con la primera situación completa, conecta cada conversación con lo que registra el panel y termina con un llamado a coordinar demo. Datos ficticios.
- assets/demo.js conserva el simulador del sitio web de ejemplo; su panel anterior solo se inicializa si existe #adm.

## Recorrido del panel, tareas, primeras implementaciones y planes · 30 de octubre de 2026

- Portada · El producto: selector de cuatro pantallas con marcadores numerados sobre la captura y leyenda explicativa.
- Portada · Cómo trabaja: cada tarea muestra una mini interfaz y enlaza a su situación en la demo (demo.html#agendar, #lista-de-espera, #equipo).
- Portada · Primeras implementaciones: bloque oscuro con beneficios y proceso en tres pasos; sin descuentos ni cupos no publicados.
- Planes: funciones comunes en una sola franja, volumen comparado con barras y ejemplo de qué cuenta como respuesta. Textos de consumo y excedentes conservan las condiciones de DECISIONES.md.
- Estilos en assets/secciones.css.
