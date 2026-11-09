---
titulo: "Cómo calcular la autonomía de un dispositivo IoT con batería"
resumen: "Haz el presupuesto energético de tu dispositivo antes de diseñar la PCB y descubre cuántos días durará la batería."
date: 2026-08-20
nivel: "Intermedio"
duracion: "20 min"
tags: [IoT, Energía, Embebidos]
requisitos: ["Hojas de datos de tus componentes", "Hoja de cálculo o calculadora"]
---
## Por qué empezar por la energía

En un dispositivo con batería, el consumo define el tamaño de la batería, que a su vez define la carcasa, el peso y el costo. Si no haces este cálculo al principio, vas a rediseñar todo después.

## Paso 1: lista los estados de operación

Un dispositivo IoT casi nunca está "encendido" todo el tiempo. Pasa por estados:

| Estado | Corriente típica | Tiempo por hora |
|---|---|---|
| Sueño profundo | 5 µA | casi todo el tiempo |
| Lectura de sensores | 1 mA | 10 s |
| GNSS buscando posición | 25 mA | 30 s |
| Transmisión LoRa | 45 mA | 1 s |

*(Valores de ejemplo: usa los de tus hojas de datos.)*

## Paso 2: calcula la corriente promedio

```text
I_prom = Σ (I_estado × t_estado) / t_total
```

Con la tabla anterior, para una hora (3600 s):

```text
(25 mA × 30 s + 45 mA × 1 s + 1 mA × 10 s + 0,005 mA × 3559 s) / 3600 s
≈ 0,23 mA
```

## Paso 3: calcula la autonomía

```text
Autonomía (h) = Capacidad útil (mAh) / I_prom (mA)
```

Usa solo el **70–80 % de la capacidad nominal**, para cubrir temperatura, envejecimiento y autodescarga. Con una batería de 3000 mAh: 3000 × 0,75 / 0,23 mA ≈ 9800 h, más de un año en teoría.

## Paso 4: mide, no supongas

El cálculo es un punto de partida. Mide la corriente real con un medidor de perfil de energía o con una resistencia shunt y un osciloscopio. El GNSS con mala señal o los reintentos de radio pueden multiplicar el consumo.

## Trucos para bajar el consumo

- Apaga físicamente los periféricos que no usas (con un *load switch*).
- Ajusta la frecuencia de muestreo según el contexto: menos datos cuando no pasa nada.
- Procesa en el microcontrolador y transmite resultados, no datos crudos.
- Elige reguladores con corriente quiescente baja.

Este enfoque lo apliqué en el [sistema de monitoreo bovino]({{ '/proyectos/01-collar-monitoreo-bovino/' | relative_url }}).
