import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatChipsModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.scss'
})
export class FoodDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private foodService = inject(FoodService);

  food = signal<Food | null>(null);

  macros = computed(() => {
    const f = this.food();
    if (!f) return [];

    const total = f.protein + f.carbs + f.fat;
    const porcentaje = (gramos: number) =>
      total === 0 ? 0 : Math.round((gramos / total) * 100);

    return [
      { nombre: 'Proteína', gramos: f.protein, porcentaje: porcentaje(f.protein) },
      { nombre: 'Carbohidratos', gramos: f.carbs, porcentaje: porcentaje(f.carbs) },
      { nombre: 'Grasa', gramos: f.fat, porcentaje: porcentaje(f.fat) }
    ];
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.foodService.getFoodbyId(id).subscribe({
      next: (data) => this.food.set(data),
      error: (err) => console.error('Error cargando el alimento:', err)
    });
  }
}