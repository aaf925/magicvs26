import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardService } from '../../core/services/card.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class CatalogComponent implements OnInit {
  private cardService = inject(CardService);
  
  cards: Card[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.isLoading = true;
    this.cardService.getCards().subscribe({
      next: (data) => {
        this.cards = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cards:', err);
        this.isLoading = false;
      }
    });
  }

  getManaCostString(manaCost: string[]): string {
    return manaCost.join('');
  }
}
