---
numero: 1
titulo: "Sistema IoT de monitoreo y alerta temprana para ganado bovino"
resumen: "Collares inteligentes que ubican el ganado y detectan cambios de actividad, con una red rural de largo alcance y alertas para el ganadero."
date: 2026-08-12
categoria: "IoT"
estado: "Terminado"
tags: [IoT, Agro, Embebidos, PCB, Bajo consumo]
portada: /assets/img/bovino/arquitectura.svg
herramientas: [KiCad, Microcontroladores de bajo consumo, Redes LPWAN, GNSS, Análisis de viabilidad]
---
> 🔒 **Proyecto bajo acuerdo de confidencialidad.** Aquí comparto el enfoque, el alcance y lo que aprendí. Los esquemáticos, componentes específicos, firmware y cifras se reservan.

## El reto

En las zonas rurales, encontrar un animal perdido o notar a tiempo que uno está enfermo significa recorrer kilómetros de potrero. El objetivo fue un sistema que le diga al ganadero **dónde está cada animal y si su comportamiento cambió**, para que pueda actuar antes de que el problema crezca.

## Qué desarrollé

- **Collar electrónico** con localización satelital y sensor de movimiento, diseñado para meses de autonomía con una sola carga.
- **Comunicación rural de largo alcance**, sin depender de cobertura celular ni de una SIM por animal.
- **Firmware robusto:** guarda los datos cuando no hay señal y los envía después, sin perder información.
- **Plataforma de visualización** con mapa, historial y alertas tempranas.
- **Estudio de viabilidad** técnica y económica orientado a pequeños y medianos productores.

## Cómo lo abordé

1. **Requisitos reales de campo:** autonomía, resistencia al agua y al polvo, bienestar animal y costo por finca.
2. **Presupuesto energético antes del hardware:** cada estado de operación se dimensionó para cumplir la meta de autonomía.
3. **Prototipado por etapas:** primero con módulos para validar consumo, enlace de radio y carcasa, y después con una PCB propia optimizada.
4. **Validación con criterios medibles** en cada etapa antes de avanzar.

## Resultados

- Arquitectura completa del sistema, del collar a la plataforma.
- Prototipos validados en consumo, comunicación y localización.
- Un modelo de implementación viable para productores pequeños, basado en datos y no en suposiciones.

## Lo que aprendí

- Que el diseño de un dispositivo con batería empieza por la energía. Escribí un tutorial sobre eso: [cómo calcular la autonomía de un dispositivo IoT]({{ '/tutoriales/2026-08-20-presupuesto-energetico-iot/' | relative_url }}).
- Que separar el prototipo por etapas ahorra rediseños y dinero.
- Que un buen proyecto técnico también tiene que cerrar económicamente para quien lo usa.

¿Te interesa una solución similar para tu finca o tu proyecto? [Escríbeme]({{ '/contacto/' | relative_url }}).
