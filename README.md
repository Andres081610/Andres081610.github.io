# Andrés · Lab — sitio de ingeniería

Sitio estático hecho con **Jekyll**, listo para publicar gratis en **GitHub Pages**.
Todo el contenido se escribe en archivos **Markdown** (`.md`): no necesitas tocar HTML.

## Estructura

| Carpeta / archivo | Qué contiene |
|---|---|
| `_config.yml` | Tu nombre, correo, redes y nombre del sitio. **Edítalo primero.** |
| `_proyectos/` | Un archivo `.md` por proyecto |
| `_tutoriales/` | Un archivo `.md` por tutorial |
| `assets/img/` | Fotos y diagramas (crea una subcarpeta por proyecto) |
| `sobre.md`, `contacto.md` | Páginas "Sobre mí" y "Contacto" |
| `PLANTILLA-proyecto.md`, `PLANTILLA-tutorial.md` | Copias base para contenido nuevo |

## Agregar un proyecto

1. Copia `PLANTILLA-proyecto.md` a `_proyectos/04-mi-proyecto.md` (el número ordena el índice).
2. Llena los datos de arriba (título, resumen, categoría, estado, componentes, galería…).
3. Sube las fotos a `assets/img/mi-proyecto/`.
4. Escribe la explicación debajo de los `---` en Markdown: títulos con `##`, código con tres comillas invertidas, imágenes con `![texto](/assets/img/...)`.
5. Guarda y sube el cambio a GitHub: el sitio se actualiza solo en uno o dos minutos.

## Agregar un tutorial

Copia `PLANTILLA-tutorial.md` a `_tutoriales/AAAA-MM-DD-titulo.md`. Cada `##` se vuelve un paso en el índice lateral automático.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `Andres081610.github.io` (así la dirección será `https://Andres081610.github.io`).
2. Sube todos estos archivos a la rama `main`.
3. En el repositorio: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. Si usas otro nombre de repositorio (ej. `mi-sitio`), pon `baseurl: "/mi-sitio"` en `_config.yml`.

## Verlo en tu computador (opcional)

```bash
bundle install
bundle exec jekyll serve
# abre http://localhost:4000
```

## Funciones incluidas

- Índice numerado de proyectos y tira de miniaturas en la portada.
- Ficha por proyecto: estado, área, fecha, lista de materiales, herramientas, enlace al código, video de YouTube y galería con visor (flechas ← → y Esc).
- Navegación "Siguiente proyecto".
- Tutoriales con nivel, duración, buscador, filtros por etiqueta e índice automático.
- Resaltado de código, modo claro/oscuro, diseño adaptado a celular.
