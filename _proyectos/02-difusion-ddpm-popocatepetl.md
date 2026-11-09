---
numero: 2
titulo: "Modelo de difusión (DDPM) desde cero: volcán Popocatépetl"
resumen: "Implementé y entrené un modelo de difusión con U-Net propia, sin pesos preentrenados, para generar imágenes del Popocatépetl en una GPU de laptop."
date: 2026-05-27
categoria: "Inteligencia artificial"
estado: "Terminado"
tags: [PyTorch, DDPM, U-Net, IA generativa]
portada: /assets/img/ddpm/forward_process.png
componentes:
  - { cant: 1, nombre: "GPU RTX 4060 Laptop (8 GB)" }
  - { cant: 1, nombre: "Dataset: imágenes de webcam del volcán (1 por minuto)" }
herramientas: [Python, PyTorch, Jupyter, VS Code]
galeria:
  - { imagen: /assets/img/ddpm/forward_process.png, pie: "Proceso forward: el modelo aprende a revertir este ruido" }
  - { imagen: /assets/img/ddpm/noise_schedule.png, pie: "Schedule de ruido coseno" }
  - { imagen: /assets/img/ddpm/samples_epoch_0025.png, pie: "Muestras generadas en la época 25" }
  - { imagen: /assets/img/ddpm/samples_epoch_0175.png, pie: "Muestras generadas en la época 175" }
---
## La idea

Los modelos de difusión son la base de generadores de imágenes como Stable Diffusion. Quise entenderlos de verdad, así que **los implementé desde cero**: sin librerías de difusión y sin pesos preexistentes, y los entrené con imágenes del volcán Popocatépetl tomadas por una webcam.

## Pipeline

1. Exploración y preprocesamiento del dataset, con su DataLoader.
2. **Schedule de ruido coseno** con 1000 pasos.
3. **U-Net propia** con *embeddings* de tiempo.
4. Entrenamiento con *checkpoints* en una GPU de laptop de 8 GB.
5. Cuatro aplicaciones con el mismo modelo: **generación**, **eliminación de ruido**, **super-resolución** e **img2img**.
6. Métricas de evaluación.

## Cómo funciona, en una frase

El proceso *forward* le añade ruido a una imagen poco a poco hasta volverla estática pura. La red aprende a predecir ese ruido en cada paso, y para generar se arranca del ruido y se le resta paso a paso.

```python
# Muestra ruidosa en el paso t (forma cerrada del proceso forward)
def q_sample(x0, t, noise):
    a = alphas_cumprod[t].sqrt().view(-1, 1, 1, 1)
    s = (1 - alphas_cumprod[t]).sqrt().view(-1, 1, 1, 1)
    return a * x0 + s * noise

loss = F.mse_loss(model(q_sample(x0, t, noise), t), noise)
```

## Resultados

Con más épocas las muestras pasan de manchas a siluetas con cielo y horizonte. Con más datos y más tiempo de entrenamiento, el siguiente paso es mejorar el detalle de la fumarola.

## Lo que aprendí

- A diseñar una U-Net y a depurar un entrenamiento largo con GPU limitada.
- Que la elección del *schedule* de ruido cambia mucho la calidad.

> Hay un tutorial con la explicación paso a paso: [Modelos de difusión explicados]({{ '/tutoriales/2026-06-15-modelos-de-difusion-explicados/' | relative_url }}).
