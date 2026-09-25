export interface Meal {
  id: number;
  userId: number;
  date: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodIds: number[];
}