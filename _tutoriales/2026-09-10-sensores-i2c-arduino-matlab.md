---
titulo: "Lee sensores I²C con Arduino y grafícalos en MATLAB"
resumen: "Conecta un MPU6050 y un MLX90614 al mismo bus I²C, aprende el protocolo serie y arma un dashboard de telemetría y análisis de vibración FFT en tiempo real con MATLAB."
date: 2026-09-10
layout: tutorial
nivel: "Básico"
duracion: "25 min"
tags: [Arduino, MATLAB, Sensores, I2C, MPU6050, MLX90614, Telemetría]
requisitos:
  - Arduino Mega 2560 o UNO
  - MPU6050 (acelerómetro / giroscopio de 6 grados de libertad)
  - MLX90614 (termómetro infrarrojo óptico sin contacto)
  - MATLAB con MATLAB Support Package for Arduino Hardware
---

<style>
  .entry-grid .prose {
    max-width: 100% !important;
  }
  .i2c-embed {
    margin: 20px 0 32px 0;
    border: 1px solid var(--line);
    border-radius: var(--r);
    background: var(--surface);
    overflow: hidden;
    box-shadow: 0 0 24px rgba(103, 232, 249, 0.08);
  }
  .i2c-embed iframe {
    border: none;
    display: block;
    width: 100%;
    background: var(--bg);
  }
  .pin-table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-family: var(--mono);
    font-size: 0.88rem;
  }
  .pin-table th, .pin-table td {
    padding: 10px 12px;
    border: 1px solid var(--line);
    text-align: center;
  }
  .pin-table th {
    background: var(--surface);
    color: var(--cyan);
    font-weight: 600;
  }
  .pin-table tr:nth-child(even) {
    background: rgba(22, 27, 34, 0.4);
  }
  .i2c-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin: 20px 0;
  }
  .i2c-card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--r);
    padding: 16px;
  }
  .i2c-card h4 {
    margin: 0 0 8px 0;
    font-family: var(--disp);
    font-size: 0.95rem;
    color: var(--cyan);
    text-transform: uppercase;
  }
  .i2c-card p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.5;
  }
</style>

## 01. Video Explicativo Audiovisual: Bus I²C y MATLAB

Aprende los fundamentos del protocolo I²C mediante la masterclass audiovisual a continuación. Incluye narración guiada en español con voz didáctica, animación de señales de reloj y datos, conexionado de pines y flujo de adquisición en MATLAB. Puedes cambiar de capítulo o ajustar la velocidad de reproducción libremente.

<div class="i2c-embed">
  <iframe src="/tutoriales/ley-de-ohm/?tutorial=i2c&view=video&embed=true" height="690px" title="Video Explicativo de Sensores I2C con Arduino y MATLAB" allow="autoplay" loading="lazy"></iframe>
</div>

---

## 02. Laboratorio Virtual: Banco de Pruebas I²C y Analizador Lógico

Experimenta en tiempo real con la unidad inercial **MPU6050** y el termómetro óptico **MLX90614**. Ajusta los ángulos de balanceo (Roll) y cabeceo (Pitch) para ver la descomposición del vector de gravedad terrestre ($a_x, a_y, a_z$), simula la temperatura de superficies infrarrojas y observa la trama de 9 bits en el osciloscopio digital:

<div class="i2c-embed">
  <iframe src="/tutoriales/ley-de-ohm/?tutorial=i2c&view=lab&embed=true" height="1140px" title="Laboratorio Virtual de Sensores I2C" loading="lazy"></iframe>
</div>

---

## 03. Mapeo de Pines y Conexiones del Hardware

Ambos módulos son esclavos I²C y comparten exactamente las dos mismas líneas de comunicación. En el Arduino Mega 2560 los pines dedicados son el **20 (SDA)** y el **21 (SCL)**:

<table class="pin-table">
  <thead>
    <tr>
      <th>Señal</th>
      <th>Arduino Mega 2560</th>
      <th>Arduino UNO / Nano</th>
      <th>MPU6050 (0x68)</th>
      <th>MLX90614 (0x5A)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong style="color: var(--ok);">SDA (Datos)</strong></td>
      <td>Pin 20</td>
      <td>Pin A4</td>
      <td>SDA</td>
      <td>SDA</td>
    </tr>
    <tr>
      <td><strong style="color: var(--cyan);">SCL (Reloj)</strong></td>
      <td>Pin 21</td>
      <td>Pin A5</td>
      <td>SCL</td>
      <td>SCL</td>
    </tr>
    <tr>
      <td><strong>GND (Tierra)</strong></td>
      <td>GND</td>
      <td>GND</td>
      <td>GND</td>
      <td>GND</td>
    </tr>
    <tr>
      <td><strong style="color: #f43f5e;">VCC (+5V / +3.3V)</strong></td>
      <td>5V / 3.3V</td>
      <td>5V / 3.3V</td>
      <td>VCC</td>
      <td>VCC</td>
    </tr>
  </tbody>
</table>

> **Nota de seguridad:** Revisa la serigrafía de tu módulo antes de alimentarlo: no todos los módulos MLX90614 o MPU6050 incluyen regulador LDO para 5 V. Es imprescindible unir todas las masas a un **GND común** para evitar diferencias de potencial en el bus.

---

## 04. Escaneo del Bus y Terminal Interactivo MATLAB

Comprueba la conectividad del hardware desde MATLAB. Ejecuta el escáner para verificar que ambos sensores responden con el bit de reconocimiento (ACK) en sus direcciones fijas de 7 bits:

<div class="i2c-embed">
  <iframe src="/tutoriales/ley-de-ohm/?tutorial=i2c&view=scanner&embed=true" height="660px" title="Escáner de Direcciones I2C y Terminal MATLAB" loading="lazy"></iframe>
</div>

### Código de comprobación en MATLAB:

```matlab
% 1. Detección automática del puerto y enlace con el microcontrolador
a = arduino();

% 2. Escaneo del bus I2C (debe listar '0x5A' y '0x68')
scanI2CBus(a)
```

*Si `serialportlist("available")` sale vacío, el inconveniente reside en el cable USB o en el controlador del puerto COM, no en los sensores.*

---

## 05. Algoritmos de Lectura: MPU6050 y MLX90614

<div class="i2c-card-grid">
  <div class="i2c-card">
    <h4>MPU6050: Inclinación 3D</h4>
    <p>Lee el vector de aceleración lineal y calcula los ángulos de balanceo y cabeceo mediante trigonometría inversa:</p>
  </div>
  <div class="i2c-card">
    <h4>MLX90614: Termometría IR</h4>
    <p>Accede al registro RAM 0x07 (temperatura de objeto) con resolución de 0.02 Kelvin por LSB:</p>
  </div>
</div>

```matlab
% === LECTURA DEL MPU6050 ===
imu = mpu6050(a);
acc = readAcceleration(imu);  % Devuelve [ax, ay, az] en m/s²

% Ángulos de inclinación en grados
roll  = atan2d(acc(2), acc(3));
pitch = atan2d(-acc(1), hypot(acc(2), acc(3)));

% === LECTURA DEL MLX90614 ===
mlx = device(a, 'I2CAddress', 0x5A);
raw = readRegister(mlx, 0x07, 'uint16');  % Registro 0x07: temperatura del objeto

% Conversión de escala: 0.02 K/LSB a grados Celsius
temp_celsius = (double(raw) * 0.02) - 273.15;
```

---

## 06. Telemetría en Tiempo Real y Análisis Espectral FFT

Para evitar que la interfaz de MATLAB se congele al graficar datos de alta velocidad, adquiere en bloques de muestras y utiliza el objeto `animatedline` junto con `drawnow limitrate`:

<div class="i2c-embed">
  <iframe src="/tutoriales/ley-de-ohm/?tutorial=i2c&view=telemetry&embed=true" height="740px" title="Dashboard de Telemetría y Análisis FFT" loading="lazy"></iframe>
</div>

```matlab
% Inicialización de la curva rápida en GPU
hFig = figure('Name', 'Telemetria I2C en Vivo', 'Color', [0.05 0.07 0.09]);
hLineAcc = animatedline('Color', [0.4 0.9 0.98], 'LineWidth', 1.5);
xlabel('Muestras'); ylabel('Aceleración (m/s²)'); grid on;

% Bucle de adquisición continua a 50 Hz
for k = 1:500
    acc = readAcceleration(imu);
    addpoints(hLineAcc, k, acc(1));
    
    % Actualización gráfica a velocidad controlada
    drawnow limitrate;
end
```

---

## 07. Desafío Práctico: Quiz de Ingeniería

Pon a prueba tu comprensión sobre diseño de buses I²C, cálculo de resistencias pull-up y análisis de vibraciones mecánicas:

<div class="i2c-embed">
  <iframe src="/tutoriales/ley-de-ohm/?tutorial=i2c&view=quiz&embed=true" height="720px" title="Quiz Técnico de Sensores I2C" loading="lazy"></iframe>
</div>

---

<p style="margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 14px; align-items: center;">
  <a class="btn" href="/tutoriales/ley-de-ohm/?tutorial=i2c" target="_blank">🚀 Abrir Laboratorio I²C en Pantalla Completa →</a>
  <a class="btn" href="/tutoriales/" style="background: transparent; border-color: var(--line);">← Volver a Tutoriales</a>
</p>
