# ARGUS · Sitio comercial de ATLAS

Sitio estático en HTML, CSS y JavaScript para presentar ATLAS, sus planes y servicios complementarios. No es la aplicación operativa ni procesa pacientes, reservas o pagos reales.

- Sitio: https://www.argus.cl/
- Repositorio: https://github.com/ARGUS-SpA/sitio-argus
- Producto: agentes de WhatsApp con calendario y panel propios.
- Desarrollo aprobado en conversación antes de la publicación.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Presentación y contacto |
| `atlas.html` | Funciones, alcance y preguntas frecuentes |
| `planes.html` | Precios, consumo, descuentos y condiciones |
| `implementacion.html` | Contratación, configuración, entrega y salida |
| `nosotros.html` | Equipo ARGUS |
| `web.html` | Web opcional y evaluación de automatizaciones |
| `demo.html` | Simulación interactiva con datos ficticios |
| `privacidad.html`, `terminos.html`, `eliminacion-datos.html` | Textos públicos |
| `licencias/` | Atribuciones y licencias conservadas |

Los estilos comerciales están en `assets/site.css` y su navegación en `assets/site.js`. La demostración conserva la lógica del sitio anterior, adaptada en `assets/demo.js` y `assets/demo-fixes.css`. `styles.css` se conserva para la página existente de licencias. `assets/argus-app-icon-1024.png` se conserva desde la versión anterior.

## Desarrollo local

No hay instalación de paquetes ni proceso de compilación.

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8765/. Usar un servidor para que los enlaces desde la raíz funcionen correctamente. No usar datos reales en la demo.

## Comprobaciones

```sh
python check_site.py
node --check assets/site.js
node --check assets/demo.js
```

Opcionalmente, `python check_site.py --base-url http://127.0.0.1:8765` verifica también las rutas servidas. El script utiliza únicamente la biblioteca estándar de Python. No ejecuta acciones sobre WhatsApp, correo o ATLAS.

## Continuidad

- [Decisiones comerciales y alcance](DECISIONES.md)
- [Pendientes priorizados](CONTINUIDAD.md)
- [Proceso comercial y uso del registro](PROCESO-COMERCIAL.md)
- [Especificación futura de LYNX](LYNX-COMERCIAL.md)
- [Plantilla vacía de seguimiento comercial](ARGUS-registro-comercial.xlsx)
- [Medición, Search Console y próximos controles](MEDICION.md)
- [Publicación y recuperación](PUBLICACION.md)
- [Validación realizada](VALIDACION.md)

La configuración de ATLAS, sus contratos privados y las evidencias sanitarias se mantienen en sus sistemas y repositorios correspondientes. Este repositorio público no debe contener credenciales, contratos de clientes ni datos de pacientes.
