import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { AuthService } from '../../services/auth.service';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { Meal } from '../../models/meal';
import { DatePipe } from '@angular/common';
import { FormGroupDirective, FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-meals',
  imports: [
    ReactiveFormsModule, DatePipe, MatCardModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatListModule, FormsModule, MatProgressBarModule
  ],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent implements OnInit {
  private mealService = inject(MealService);
  private authService = inject(AuthService);
  private foodService = inject(FoodService);

  foods = signal<Food[]>([]);
  meals = signal<Meal[]>([]);

  fechaResumen = signal<string>(this.hoy());

  resumenDiario = computed(() => {
    const comidasDelDia = this.meals().filter(m => m.date === this.fechaResumen());

    const alimentos = comidasDelDia
      .flatMap(m => m.foodIds)
      .map(id => this.foods().find(f => f.id === id))
      .filter((f): f is Food => f !== undefined);

    const suma = (campo: 'calories' | 'protein' | 'carbs' | 'fat') =>
      Math.round(alimentos.reduce((total, f) => total + f[campo], 0) * 10) / 10;

    const calorias = suma('calories');
    const objetivo = this.authService.usuario()?.dailyCalorieGoal ?? 0;
    const porcentaje = objetivo > 0 ? Math.round((calorias / objetivo) * 100) : 0;

    return {
      comidas: comidasDelDia.length,
      calorias,
      proteina: suma('protein'),
      carbs: suma('carbs'),
      grasa: suma('fat'),
      objetivo,
      restantes: objetivo - calorias,
      barra: Math.min(porcentaje, 100),
      excedido: calorias > objetivo
    };
  });

  private hoy(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }


  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    date: ['', Validators.required],
    type: ['breakfast' as Meal['type'], Validators.required],
    foodIds: [[] as number[], Validators.required]
  });

  guardar(formDir: FormGroupDirective): void {
    if (this.form.invalid) return;

    const userId = this.authService.usuario()?.id;
    if (userId === undefined) return;

    const nuevaComida: Partial<Meal> = { ...this.form.getRawValue(), userId };

    this.mealService.createMeal(nuevaComida).subscribe({
      next: (creada) => {
        this.meals.update(lista => [...lista, creada]);
        formDir.resetForm();
      },
      error: (err) => console.error('Error guardando la comida:', err)
    });
  }

  tipos: { valor: Meal['type']; etiqueta: string }[] = [
    { valor: 'breakfast', etiqueta: 'Desayuno' },
    { valor: 'lunch', etiqueta: 'Comida' },
    { valor: 'dinner', etiqueta: 'Cena' },
    { valor: 'snack', etiqueta: 'Snack' }
  ];

  etiquetaTipo(tipo: Meal['type']): string {
    return this.tipos.find(t => t.valor === tipo)?.etiqueta ?? tipo;
  }

  comidasConNombres = computed(() =>
    this.meals().map(meal => ({
      ...meal,
      alimentos: meal.foodIds
        .map(id => this.foods().find(f => f.id === id)?.name)
        .filter(nombre => !!nombre)
        .join(', ')
    }))
  );

  ngOnInit(): void {
    this.foodService.getFoods().subscribe({
      next: (data) => this.foods.set(data.map(f => ({ ...f, id: Number(f.id) }))),
      error: (err) => console.error('Error cargando los alimentos:', err)
    });

    const userId = this.authService.usuario()?.id;
    if (userId === undefined) return;

    this.mealService.getMealsbyUser(userId).subscribe({
      next: (data) => this.meals.set(data),
      error: (err) => console.error('Error cargando las comidas:', err)
    });
  }
}