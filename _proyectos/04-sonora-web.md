---
numero: 4
titulo: "Sonora Web: reproductor de música con costo cero"
resumen: "App web tipo Spotify que combina catálogos abiertos y un proxy en Cloudflare Workers para reproducir música sin servidor propio ni costo mensual."
date: 2026-10-15
categoria: "Software"
estado: "Terminado"
tags: [React, TypeScript, Cloudflare Workers, IndexedDB]
portada: /assets/img/sonora/portada.svg
herramientas: [Vite, React, TypeScript, Cloudflare Workers, IndexedDB]
galeria:
  - { imagen: /assets/img/sonora/portada.svg, pie: "Concepto de la interfaz" }
---
## El reto

Quería un reproductor de música propio, con búsqueda, playlists y "me gusta", que **no costara nada mantener en línea**.

## Arquitectura

| Pieza | Qué hace |
|---|---|
| Deezer + iTunes | Catálogo, búsqueda, portadas y listas de éxitos |
| MusicBrainz | Duración y año oficiales (por ISRC) para elegir la versión correcta |
| Reproductor oficial de YouTube | Reproducción de canciones del catálogo comercial |
| Internet Archive y Jamendo | Audio completo de música de dominio público y con licencia Creative Commons |
| IndexedDB | Playlists, favoritos y recientes guardados en el navegador |
| Cloudflare Worker | Proxy con lista de dominios permitidos; guarda las claves como secretos |

## La parte interesante: elegir la versión correcta

Cada video candidato recibe un **puntaje**: suma puntos si la duración coincide con la oficial (±3 s) y si viene de un canal oficial, y resta si es *cover*, karaoke, *live* o *remix* (salvo que lo hayas pedido). Si un video falla, la app prueba el siguiente de forma automática.

## Detalles de experiencia de uso

- Atajos de teclado: espacio, Ctrl + ← / →, Ctrl + K para buscar.
- Caché de 30 días en el Worker para ahorrar cuota de API.
- Despliegue gratuito en Cloudflare Pages.
