# Crítica de diseño UX/UI y cambios aplicados

Hecha con la skill de crítica de diseño (primera impresión, usabilidad, jerarquía visual, consistencia y accesibilidad).

| Hallazgo | Gravedad | Cambio aplicado |
|---|---|---|
| La portada no mostraba proyectos con imagen hasta muy abajo | Alta | Cuadrícula "bento" con el proyecto principal grande y fotos a sangre |
| La tira de miniaturas repetía las imágenes del índice | Media | Se cambió por una banda animada con tu stack tecnológico |
| No había llamado a la acción al final ni señal de disponibilidad | Alta | Insignia "Disponible para colaborar" y bloque final "¿Tienes una idea…?" |
| No quedaba claro qué ofreces | Media | Sección "Qué hago" con 3 servicios e íconos |
| Faltaban micro-interacciones que comuniquen que todo es clicable | Media | Brillo que sigue al mouse, flecha animada "Leer tutorial →", escala en las fotos |
| Copiar el código de los tutoriales era incómodo | Media | Botón "Copiar" en cada bloque de código |
| En páginas largas no se sabía cuánto faltaba | Baja | Barra de progreso de lectura y botón "volver arriba" |
| No había foco visible al navegar con teclado | Alta (accesibilidad) | Contorno cian en `:focus-visible` |
| Botones y filtros pequeños en celular | Media (accesibilidad) | Mínimo de 44 px de alto en táctil |
| Texto mono muy pequeño (11 px) | Media (accesibilidad) | Tamaño mínimo de unos 12–13 px |
| Animaciones intensas | — | Se desactivan si el sistema pide "reducir movimiento" |

Contraste: el texto principal (#e8f1ff) y el secundario (#8a9bbb) sobre el fondo #05070d superan el nivel WCAG AA.

**Lo que más falta ahora:** fotos reales de tus proyectos y una foto tuya. Es lo que más confianza genera, más que cualquier efecto visual.

---

# Paleta de color y contraste (v2)

Basada en las pautas de color y contraste de WCAG 2.2, en la guía de tema oscuro de Material Design y en las investigaciones de Nielsen Norman Group sobre modo oscuro.

| Principio de experto | Antes | Ahora |
|---|---|---|
| Evitar negro puro de fondo (fatiga visual, "halo" en el texto) | `#05070d` | `#0d1117` gris-azulado |
| No usar blanco puro para texto largo | `#e8f1ff`, contraste de 17,7:1 | `#e6edf3`, contraste de 16:1 |
| Usar acentos desaturados en temas oscuros (los neón "vibran") | cian `#00f0ff`, magenta `#ff2bd6` | cian `#67e8f9`, fucsia `#f0abfc` |
| Que el neón sea solo para acentos, no para bloques grandes | brillos fuertes | brillos y halos de fondo reducidos ~40 % |
| Bordes de campos de formulario con contraste ≥ 3:1 (WCAG 1.4.11) | ~1,4:1 | `#5b6b82` ≥ 3:1 |
| Ofrecer modo claro para leer de día (NN/g) | solo oscuro | botón ☾/☀ que recuerda tu elección |
| Línea de lectura de 60 a 75 caracteres | 740 px | `70ch` y altura de línea de 1,7 |
| Menos movimiento que distraiga | glitch cada 3,5 s | glitch cada 7 s, apagado en modo claro y con "reducir movimiento" |

## Contrastes medidos (WCAG AA pide ≥ 4,5:1 para texto)

| Elemento | Oscuro | Claro |
|---|---|---|
| Texto principal | 16,0:1 | 14,8:1 |
| Texto secundario | 7,8:1 | 6,0:1 |
| Enlaces y acentos (cian) | 13,1:1 | 5,0:1 |
| Etiquetas (fucsia) | 10,8:1 | 5,9:1 |
| Texto de los botones principales | 10,5:1 | 5,4:1 |

Revisé las 17 páginas con **axe-core** (WCAG 2 A/AA) en los dos modos: 0 incumplimientos.
