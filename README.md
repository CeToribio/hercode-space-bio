# HerCode Space Bio

> Plataforma web construida para el reto [Build a Space Biology Knowledge Engine](https://www.spaceappschallenge.org/2025/challenges/build-a-space-biology-knowledge-engine/) de la NASA Space Apps Challenge 2025.

Somos **HerCode**, un equipo de mujeres peruanas apasionadas por la ciencia, la tecnología y el conocimiento accesible. Nuestra misión es acercar las investigaciones de biología espacial a cualquier persona, en cualquier parte del mundo, sin importar su nivel técnico.

---

## 🚀 Problema

La NASA genera un impacto enorme en ciencia y tecnología, pero ese conocimiento suele quedarse en papers extensos y técnicos. El repositorio [SB_publications](https://github.com/jgalazka/SB_publications/tree/main) concentra **608 publicaciones** de biología espacial: experimentos sobre microgravedad, efectos en la salud humana, microbiología, plantas, materiales y mucho más. ¿Cómo lograr que esa información llegue a más personas de forma clara, amigable y atractiva?

---

## 💡 Nuestra solución

HerCode Space Bio es una web que reúne, clasifica y simplifica el contenido de esas 608 investigaciones.

- **Motor de búsqueda con IA:** basta escribir una palabra clave para obtener resúmenes comprensibles, keywords y enlace al paper completo.
- **25 categorías temáticas:** curadas junto con IA para despertar curiosidad (salud humana, plantas, materiales, microbiología, etc.).
- **Vistas detalladas por categoría:** incluyen halo animado, resumen, palabras clave destacadas y la lista de artículos relacionados.
- **Experiencia inmersiva:** diseño inspirado en el espacio (gradientes, partículas, sol flotante) y animaciones creadas con Framer Motion.
- **Deploy listo:** [hercode-space-bio.netlify.app](https://hercode-space-bio.netlify.app/)

---

## 🛠️ Stack técnico

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, Vite 7, Tailwind CSS, Framer Motion, React Router |
| Data & automatización | n8n (webhooks, limpieza, enriquecimiento y clasificación con IA) |
| Utilidades | axios, react-icons |
| Infra | Netlify (deploy), GitHub (código) |

---

## 🔄 Pipeline de datos

1. **Extracción:** consumimos el dataset público `SB_publications` y lo procesamos vía un workflow en **n8n**.
2. **Limpieza y normalización:** la IA ayuda a clasificar cada paper en una de las 25 categorías, generar keywords y resúmenes legibles.
3. **Transformación:** exportamos todo a un JSON consolidado (`public/data/categories_full.json`), que contiene categorías, metadatos y papers asociados.
4. **Consumo en el front:** las vistas usan un servicio (`src/services/dataService.js`) con delays simulados para emular la respuesta desde backend.

---

## ✨ Características clave

- Búsqueda semántica de papers con resúmenes “human friendly”.
- Navegación por categorías con carrusel animado y tarjetas planetarias.
- Página de detalle con keywords, halo pulsante, lista de artículos y enlace externo.
- Experiencia responsive, animaciones suaves, elementos flotantes.
- Delay configurable para simular latencia real de APIs (8 s carga inicial, 3.5 s búsquedas).

---

## 🖥️ Ejecutar en local

Requisitos:
- Node.js **20.19+** (o 22.12+)
- npm 10+

Pasos:
```bash
npm install
npm run dev
```
La app estará disponible en `http://localhost:5173`.

> Nota: el servicio de datos tiene una demora intencional (8 s) para simular la respuesta de un backend. Puedes ajustar `DELAY_MS` en `src/services/dataService.js` si necesitas iterar más rápido.

---

## 📦 Scripts útiles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ambiente de desarrollo con Vite |
| `npm run build` | Build optimizado (requiere Node 20+) |
| `npm run preview` | Servir el build localmente |
| `npm run lint` | Ejecutar ESLint |

---

## 🧭 Próximos pasos

- Conectar el motor de búsqueda a un backend en tiempo real (API GraphQL/REST).
- Integrar autenticación para favoritos y anotaciones.
- Agregar visualizaciones interactivas (mapas de calor, grafos de conocimiento).
- Incorporar traducciones automáticas y accesibilidad mejorada.

---

## 👩‍🚀 Equipo HerCode

- Ana Cecilia Toribio – Frontend
- Monica - Backend & Team Leader
- Angélica Valiente - Diseño

---

## 🙏 Agradecimientos

- NASA Space Apps Challenge por impulsar la innovación abierta.
- Proyecto [SB_publications](https://github.com/jgalazka/SB_publications/tree/main) por liberar el dataset.
- Comunidad n8n e IA generativa por las herramientas que hicieron posible la orquestación de datos.

---

## 📄 Licencia

MIT License — puedes usar, adaptar y mejorar este proyecto citando al equipo HerCode.
