import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../core/services/card.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail.html',
  styleUrl: './card-detail.scss'
})
export class CardDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cardService = inject(CardService);
  private location = inject(Location);

  card?: Card;
  isLoading = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCard(id);
    }
  }

  loadCard(id: string): void {
    this.isLoading = true;
    this.cardService.getCardById(id).subscribe({
      next: (data) => {
        this.card = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading card:', err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
