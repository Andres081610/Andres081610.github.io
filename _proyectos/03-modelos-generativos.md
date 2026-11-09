---
numero: 3
titulo: "Laboratorio de modelos generativos: VAE, GAN y flujos normalizados"
resumen: "Comparé tres familias de IA generativa: un VAE en JAX, una DCGAN y un flujo normalizado autoregresivo que genera figuras geométricas."
date: 2026-06-01
categoria: "Inteligencia artificial"
estado: "Terminado"
tags: [JAX, PyTorch, VAE, GAN, Normalizing Flows]
portada: /assets/img/generativos/generated_showcase.png
herramientas: [Python, JAX / Optax, PyTorch, Google Colab]
galeria:
  - { imagen: /assets/img/generativos/generated_showcase.png, pie: "Figuras generadas por el flujo normalizado" }
  - { imagen: /assets/img/generativos/real_vs_gen.png, pie: "Datos reales (arriba) vs. generados (abajo)" }
  - { imagen: /assets/img/generativos/loss.png, pie: "Curva de entrenamiento" }
---
## Qué hice

Antes de llegar a los modelos de difusión, implementé y comparé otras tres familias de modelos generativos:

| Modelo | Herramienta | Idea clave |
|---|---|---|
| **VAE** (autoencoder variacional) | JAX + Optax en Colab | Comprime cada imagen a un espacio latente y genera muestreando de él |
| **DCGAN** | PyTorch | Un generador y un discriminador compiten entre sí |
| **Flujo normalizado** | PyTorch | Transformaciones invertibles con verosimilitud exacta |

## Flujo normalizado autoregresivo

Reimplementé un flujo con parámetros compartidos (basado en el repositorio abierto *TinyVolt/normalizing-flows*) con una interfaz de línea de comandos para entrenar, generar o ambas cosas:

```bash
python flujo_normalizado.py --accion ambos --epocas 20
python flujo_normalizado.py --accion generar --pesos trained_weights.pt
```

La generación es autoregresiva: son 400 pasos secuenciales para cada imagen de 20 × 20. Lo entrené con figuras geométricas (círculos, triángulos, cuadrados, estrellas), y el modelo genera figuras nuevas y creíbles.

## Lo que aprendí

- Las ventajas y desventajas de cada familia: los VAE son estables pero borrosos, las GAN son nítidas pero inestables, y los flujos son exactos pero lentos al generar.
- A escribir el mismo modelo en JAX y en PyTorch.
- A comunicar resultados: preparé presentaciones técnicas de cada modelo.
