---
titulo: "Lee sensores I²C con Arduino y grafícalos en MATLAB"
resumen: "Conecta un MPU6050 y un MLX90614 al mismo bus I²C y arma un dashboard en tiempo real con MATLAB."
date: 2026-09-10
nivel: "Básico"
duracion: "25 min"
tags: [Arduino, MATLAB, Sensores]
requisitos: ["Arduino Mega 2560 o UNO", "MPU6050 (acelerómetro/giroscopio)", "MLX90614 (termómetro IR)", "MATLAB con el paquete de soporte para Arduino"]
---
## Conexiones

Los dos sensores comparten el bus I²C. En el Arduino Mega:

| Señal | Arduino Mega | MPU6050 | MLX90614 |
|---|---|---|---|
| SDA | pin 20 | SDA | SDA |
| SCL | pin 21 | SCL | SCL |
| GND | GND | GND | GND |
| VCC | según tu módulo | VCC | VCC |

> Revisa la serigrafía de tu módulo antes de alimentarlo: no todos aceptan 5 V. Todos los dispositivos deben compartir GND.

## Comprobar la conexión

```matlab
a = arduino();                 % detecta el puerto automáticamente
scanI2CBus(a)                  % debe mostrar 0x68 (MPU6050) y 0x5A (MLX90614)
```

Si `serialportlist("available")` sale vacío, el problema está en el USB o en el controlador, no en los sensores.

## Leer el MPU6050

```matlab
imu = mpu6050(a);
acc = readAcceleration(imu);   % m/s²
roll  = atan2d(acc(2), acc(3));
pitch = atan2d(-acc(1), hypot(acc(2), acc(3)));
```

Calcular roll y pitch solo con el acelerómetro funciona bien cuando el sensor está casi quieto.

## Leer el MLX90614

```matlab
mlx = device(a, 'I2CAddress', 0x5A);
raw = read(mlx, 1, 'uint16');  % lectura simple (registro de objeto 0x07)
```

## Dashboard en vivo

Adquiere en bloques (por ejemplo, 50 muestras/s en grupos de 5), actualiza las gráficas con `animatedline` y guarda todo en CSV al final. Una **métrica de vibración RMS** sobre una ventana móvil sirve para comparar condiciones de funcionamiento.

## Siguiente nivel

- Calibra el acelerómetro y valida la frecuencia de muestreo real.
- Para diagnóstico de vibraciones serio, usa análisis espectral (FFT).
