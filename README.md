# BytaNutricion

## ENUNCIADO Práctica:

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

# BYTA Nutrición

Mini-app de seguimiento nutricional para practicar Angular 19 (proyecto de aprendizaje).

**Stack:** Angular 19 (standalone, Signals), Angular Material, ngx-translate, json-server.

## Arrancar

```bash
npm install
npx json-server --watch db.json --port 3000   # terminal 1
ng serve                                       # terminal 2
```

App en http://localhost:4200

## Usuarios de prueba

| Email | Contraseña |
|---|---|
| juan@mail.com | demo1234 |
| ana@mail.com | demo1234 |
| david@mail.com | demo1234 |

## Incluye
Login con guard, catálogo de alimentos con filtros, detalle, registro de comidas (Reactive Forms), resumen diario y selector ES/EN.

## Pendiente
Terminar i18n, tests, interceptor, pipe `kcal`, Docker.