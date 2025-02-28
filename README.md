# ConsejoMágico

ConsejoMágico es un proyecto que utiliza tres instancias de **Gemini 2.0 Flash** para debatir sobre un tema hasta alcanzar un consenso. Cada instancia asume el rol de un personaje del universo de **Harry Potter**, agregando un toque mágico a la discusión.

## Características

- Utiliza la API de **Gemini 2.0 Flash** de Google Cloud.
- Tres instancias de IA discuten hasta llegar a un acuerdo.
- Implementación en **TypeScript** con **Vite** como bundler.
- Usa **Tailwind CSS** para el diseño.
- Código abierto bajo **GPL v3**.

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **Cuenta en Google Cloud** con acceso a la API de Gemini 2.0 Flash

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/Diez111/ConsejoMagico.git
   cd ConsejoMagico
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Configura la API de Gemini:
   - Crea un archivo `.env` en la raíz del proyecto y añade tu clave de API:
     ```env
     GEMINI_API_KEY=tu_clave_aqui
     ```

## Uso

Ejecuta el servidor de desarrollo:

```sh
npm run dev
```

Abre el navegador en `http://localhost:5173/` para ver la aplicación en acción.

## Estructura del Proyecto

```
ConsejoMagico/
│── src/                 # Código fuente
│── index.html           # Archivo principal
│── package.json         # Dependencias del proyecto
│── vite.config.ts       # Configuración de Vite
│── tailwind.config.js   # Configuración de Tailwind CSS
│── tsconfig.json        # Configuración de TypeScript
│── .env                 # Archivo de configuración de la API (excluido del repo)
```

## Licencia

Este proyecto está licenciado bajo la **GPL v3**. Puedes usarlo, modificarlo y distribuirlo bajo los términos de esta licencia.

## Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el código, abre un **Pull Request** o crea un **Issue** en GitHub.

## Autor

Proyecto creado por Lautaro Agustin Diez.

Repositorio en GitHub: [ConsejoMágico](https://github.com/Diez111/ConsejoMagico.git)

¡Esperamos que disfrutes de esta experiencia mágica! 🪄

