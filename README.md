# BytaNutricion

## ENUNCIADO Práctica: BYTA Nutrición

Crear una mini-aplicación de seguimiento nutricional, con backend simulado mediante json-server, aplicando todo lo visto en el curso hasta ahora.

### Entidades (db.json):

users: id, name, email, password, dailyCalorieGoal
foods: id, name, category, calories, protein, carbs, fat
meals: id, userId, date, type (breakfast/lunch/dinner/snack), foodIds

### Funcionalidades:

Autenticación (Guards): login contra json-server (sin contraseñas cifradas, es una práctica). Ruta /perfil protegida con CanActivate. Navbar mostrando estado de sesión.
Catálogo de alimentos: tabla con filtro por nombre y por categoría (Signals + computed(), como ya hiciste con usuarios). Detalle de cada alimento en su propia ruta.
Registro de comidas: formulario para añadir una comida (fecha, tipo, alimentos), guardado real vía POST a json-server.
Resumen diario: computed() que sume calorías/macros de las comidas del día, comparado con el objetivo (dailyCalorieGoal) del usuario.
Estilo: Angular Material en formularios, tablas y tarjetas de resumen.
Idioma: selector ES/EN con ngx-translate para textos fijos (categorías, etiquetas de la UI) — no para los datos de la API.

Extra (cuando lleguéis a esos temas): interceptor que loguee todas las peticiones a json-server en consola; pipe personalizado kcal para formatear calorías.

#### =============================

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.27.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
