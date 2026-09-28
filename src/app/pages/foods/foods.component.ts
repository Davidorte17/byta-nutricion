import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-foods',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatFormFieldModule,MatInputModule, MatSelectModule, MatCardModule, MatTableModule, MatChipsModule, MatProgressSpinnerModule],
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.scss'
})
export class FoodsComponent implements OnInit {
  private foodService = inject(FoodService);
  private router = inject(Router);

  foods = signal<Food[]>([]);
  loading = true;
  columnas = ['name', 'category', 'calories', 'protein', 'carbs', 'fat'];

  filtroNombre = signal<string>('');
  filtroCategoria = signal<string>('');

  alimentosFiltrados = computed(() => {
    return this.foods().filter(food =>
      food.name.toLowerCase().includes(this.filtroNombre().toLowerCase()) &&
      (this.filtroCategoria() === '' || food.category === this.filtroCategoria())
    );
  });

  ngOnInit(): void {
    this.foodService.getFoods().subscribe({
      next: (data) => {
        this.foods.set(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando alimentos:', err);
        this.loading = false;
      }
    });
  }
}