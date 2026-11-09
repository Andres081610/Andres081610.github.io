---
numero: 6
titulo: "Foco: gestor de tareas con Pomodoro para PC y celular"
resumen: "App propia de productividad con temporizador Pomodoro, proyectos, calendario semanal e informes. Funciona sin internet y sin cuenta, en Windows y Android, y se sincroniza por la red de la casa."
date: 2026-10-19
categoria: "Software"
estado: "Terminado"
tags: [Next.js, React, TypeScript, Electron, Android]
portada: /assets/img/foco/inicio.jpg
herramientas: [Next.js 15, React 19, TypeScript, Tailwind CSS, Electron, Capacitor, Prisma, PostgreSQL, Vitest]
galeria:
  - { imagen: /assets/img/foco/inicio.jpg, pie: "Pantalla de inicio en Windows: metas del día, tareas y temporizador" }
  - { imagen: /assets/img/foco/temporizador.jpg, pie: "Temporizador Pomodoro con descansos, sonidos ambientales y modo estricto" }
  - { imagen: /assets/img/foco/informes.jpg, pie: "Informes: puntuación de productividad, evolución semanal y calendario de actividad (datos de demostración)" }
  - { imagen: /assets/img/foco/movil.jpg, pie: "La misma app en Android" }
---
## El reto

Quería una app para organizar mis tareas con la **técnica Pomodoro** (bloques de 25 minutos de foco y descansos cortos) que fuera mía de punta a punta: sin suscripción, que funcionara **sin internet** y que tuviera los mismos datos en el **PC y en el celular**. Tomé como referencia la organización de apps como Focus To-Do, pero el código, el nombre, los iconos y el diseño son propios.

## Qué hace

- **Tareas y proyectos** con prioridades, subtareas, notas, recordatorios, repeticiones y estimación de pomodoros por tarea.
- **Temporizador Pomodoro** configurable, con descansos corto y largo, aviso antes de terminar, sonidos ambientales y **modo estricto** que registra las distracciones.
- **Calendario semanal de rutina**: actividades fijas por día y hora (gimnasio, estudio…), que se marcan cada semana y se pueden imprimir en un PDF A4 con casillas para llenar a mano.
- **Informes**: puntuación de productividad de 0 a 100, diagrama de Gantt del día, mejores horas y días, precisión de las estimaciones, calendario anual y exportación a CSV y PDF.

## Tres plataformas, un solo código

| Versión | Cómo se hizo | Detalles |
|---|---|---|
| Windows | Electron | Instalador y versión portátil; progreso del temporizador en la barra de tareas |
| Android | Capacitor | APK de 5,7 MB; avisa al terminar cada pomodoro aunque la app esté cerrada |
| Web | Next.js | Con cuenta opcional y sincronización en PostgreSQL |

## La parte interesante: sincronizar sin la nube

La app es *local-first*: todo se guarda primero en el dispositivo, así que funciona igual con o sin conexión. Para tener los mismos datos en el PC y el celular **sin pagar un servidor**, la app de escritorio hace de centro dentro de la red Wi-Fi de la casa:

1. En el PC se activa la sincronización y aparece una dirección y un código de enlace.
2. En el celular se escriben esa dirección y ese código.
3. Desde ahí, lo que agregas en uno aparece en el otro en segundos. Si estás fuera de casa, el celular sigue funcionando y envía los cambios al volver a la misma red. Si hay conflicto, gana el cambio más reciente.

## Calidad

Pruebas unitarias y de integración con Vitest, y pruebas de extremo a extremo de las versiones de escritorio y móvil (las capturas de esta página salen de esas pruebas).

## ¿Te interesa?

Si quieres usar Foco, adaptarlo a tu equipo de trabajo o necesitas una app parecida para tu negocio, **escríbeme a [{{ site.email }}](mailto:{{ site.email }}?subject=Me%20interesa%20Foco)** o desde la página de [contacto]({{ '/contacto/' | relative_url }}).
