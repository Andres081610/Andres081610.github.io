---
titulo: "Modelos de difusión (DDPM) explicados paso a paso"
resumen: "Entiende cómo una red aprende a convertir ruido en imágenes, con el código mínimo en PyTorch."
date: 2026-06-15
nivel: "Avanzado"
duracion: "30 min"
tags: [IA, PyTorch, Python]
requisitos: ["Python y PyTorch básicos", "Nociones de redes neuronales", "GPU recomendada (no obligatoria)"]
---
## La intuición

Imagina que tomas una foto y le agregas un poco de ruido, y luego otro poco, mil veces, hasta que solo queda estática. Un modelo de difusión aprende a **hacer el camino inverso**: a partir de estática, quitar el ruido poco a poco hasta que aparece una imagen nueva.

## El proceso forward (añadir ruido)

No hace falta aplicar el ruido mil veces. Existe una forma cerrada para saltar directamente al paso `t`:

```python
betas = cosine_schedule(T=1000)            # cuánto ruido se añade en cada paso
alphas_cumprod = torch.cumprod(1 - betas, dim=0)

def q_sample(x0, t, noise):
    a = alphas_cumprod[t].sqrt().view(-1, 1, 1, 1)
    s = (1 - alphas_cumprod[t]).sqrt().view(-1, 1, 1, 1)
    return a * x0 + s * noise
```

El *schedule* coseno añade ruido más despacio al principio, y eso conserva mejor la información de la imagen.

## Qué aprende la red

Una **U-Net** recibe la imagen ruidosa y el número de paso `t`, y predice **el ruido** que se le añadió. La pérdida es un simple error cuadrático:

```python
t = torch.randint(0, T, (x0.size(0),), device=x0.device)
noise = torch.randn_like(x0)
loss = F.mse_loss(model(q_sample(x0, t, noise), t), noise)
```

## Generar una imagen

Se empieza con ruido puro y, durante `T` pasos, se le resta el ruido que predice la red:

```python
x = torch.randn(n, 3, 64, 64)
for t in reversed(range(T)):
    x = p_sample(model, x, t)   # quita un poco de ruido
```

## Más allá de generar

El mismo modelo sirve para **eliminar ruido**, para **super-resolución** (generar condicionado a una imagen pequeña) y para **img2img** (partir de una imagen con ruido parcial en lugar de ruido puro).

## Consejos prácticos

- Empieza con imágenes de 64 × 64 para iterar rápido.
- Guarda *checkpoints* y muestras cada pocas épocas para ver el progreso.
- Con 8 GB de VRAM, ajusta el tamaño del lote y usa precisión mixta.

Mira el resultado real en el proyecto [DDPM del Popocatépetl]({{ '/proyectos/02-difusion-ddpm-popocatepetl/' | relative_url }}).
