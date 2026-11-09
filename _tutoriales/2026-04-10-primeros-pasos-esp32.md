---
titulo: "Primeros pasos con el ESP32"
resumen: "Instala el entorno, carga tu primer programa y conéctate a WiFi."
date: 2026-04-10
nivel: "Básico"
duracion: "20 min"
tags: [ESP32, Arduino]
requisitos: ["Placa ESP32", "Cable USB de datos", "Arduino IDE 2"]
---
## Instalar el soporte de placas

En Arduino IDE ve a *Preferencias* y agrega la URL del gestor de placas de Espressif. Luego instala **esp32** desde el Gestor de placas.

## Tu primer programa

```cpp
void setup() { pinMode(2, OUTPUT); }
void loop() { digitalWrite(2, !digitalRead(2)); delay(500); }
```

## Conectarse a WiFi

```cpp
#include <WiFi.h>
void setup() {
  Serial.begin(115200);
  WiFi.begin("MiRed", "clave");
  while (WiFi.status() != WL_CONNECTED) delay(300);
  Serial.println(WiFi.localIP());
}
void loop() {}
```

## Siguientes pasos

Prueba leer un sensor y mostrarlo en una página web servida por el propio ESP32.
