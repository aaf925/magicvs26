import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleService } from '../../../core/services/battle.service';
import { BattleEngineService } from '../../../core/services/battle-engine.service';
import { GameState, GamePhase } from '../../../models/game.model';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-battleboard',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './battleboard.component.html',
  styleUrls: ['./battleboard.component.scss']
})
export class BattleboardComponent implements OnInit, OnDestroy {
  gameState: GameState | null = null;
  private subscription: Subscription | null = null;
  protected readonly Math = Math;
  showVictoryModal = false;
  matchId: string | null = null;
  me: any = null;
  opponent: any = null;
  hoveredCard: any = null;

  onHoverCard(card: any): void {
    this.hoveredCard = card;
  }

  onClearHover(): void {
    this.hoveredCard = null;
  }

  getLands(cards: any[]): any[] {
    return cards?.filter(c => {
      const type = (c.type || '').toLowerCase();
      const name = (c.name || '').toLowerCase();
      // Bolder land detection
      return type.includes('land') || type.includes('tierra') || name.includes('tierra') || 
             name.includes('isla') || name.includes('pantano') || name.includes('montaña') || 
             name.includes('bosque') || name.includes('llanura') || name.includes('templo');
    }) || [];
  }

  getNonLands(cards: any[]): any[] {
    const lands = this.getLands(cards);
    return cards?.filter(c => !lands.find(l => l.id === c.id)) || [];
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly battleService: BattleService,
    public readonly engine: BattleEngineService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.matchId = this.route.snapshot.paramMap.get('id');
    if (this.matchId) {
      this.battleService.getBattleState(this.matchId).subscribe({
        next: (initialState) => {
          this.engine.initialize(initialState);
          this.subscription = this.engine.gameState$.subscribe(state => {
            this.gameState = state;
            this.me = this.engine.me();
            this.opponent = this.engine.opponent();
            this.cdr.detectChanges();
          });
          this.engine.startGame();
        }
      });
    }
  }

  onPassPhase(): void {
    this.engine.nextPhase();
  }

  onPlayCard(cardId: string): void {
    this.onClearHover();
    const me = this.engine.me();
    if (this.gameState?.currentPhase === GamePhase.MULLIGAN) {
      this.engine.dropCardToBottom(cardId);
    } else if (this.gameState?.currentPhase === GamePhase.END && me && me.hand.length > 7) {
      this.engine.discardCard(cardId);
    } else {
      this.engine.playCard(cardId);
    }
  }

  onMulligan(): void {
    this.engine.takeMulligan();
  }

  onKeep(): void {
    this.engine.keepHand();
  }

  onTapCard(cardId: string): void {
    this.engine.tapCard(cardId);
  }

  ngOnDestroy(): void {
    this.engine.stopPolling();
    this.subscription?.unsubscribe();
  }

  onConcede(): void {
    this.showVictoryModal = true;
  }

  getColorCode(color: string): string {
    const map: any = { W: '#fcd34d', U: '#3b82f6', B: '#a855f7', R: '#ef4444', G: '#22c55e', C: '#94a3b8' };
    return map[color.toUpperCase()] || '#94a3b8';
  }

  getColorIcon(color: string): string {
    const map: any = { W: 'sunny', U: 'water_drop', B: 'skull', R: 'local_fire_department', G: 'forest', C: 'blur_on' };
    return map[color.toUpperCase()] || 'help';
  }

  getColorName(color: string): string {
    const map: any = { W: 'Blanco', U: 'Azul', B: 'Negro', R: 'Rojo', G: 'Verde', C: 'Incoloro' };
    return map[color.toUpperCase()] || 'Desconocido';
  }

  goToMenu(): void {
    this.router.navigate(['/home']);
  }
}
