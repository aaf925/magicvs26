import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaDeck } from '../../models/meta-deck.model';

@Component({
  selector: 'app-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meta.html',
  styleUrls: ['./meta.scss']
})
export class MetaComponent {
  filters: string[] = ['Últimos 7 días', 'Últimos 14 días', 'Últimos 30 días', 'Últimos 90 días', 'Últimos 365 días'];
  selectedFilter: string = 'Últimos 14 días';

  decks: MetaDeck[] = [
    {
      id: 'esper-midrange',
      tier: 1,
      name: 'Esper Midrange',
      player: '@jugador_pro',
      colors: ['w', 'u', 'b'],
      keyCardsString: 'Sheoldred, the Apocalypse, Raffine, Scheming Seer...',
      presence: '15%',
      winrate: '58%',
      creaturesCount: 15,
      spellsCount: 21,
      landsCount: 24,
      isExpanded: true,
      showFullList: false,
      gallery: [
        { name: 'Sheoldred', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcwDtIfQV41lcgJExtI6QZvfRHY2Chxp06JyKNSqNi_NjlYappoavNAKRGZQUIvtyE5MgDzBuNgIW4oda85ERaSA9qsESerECsuY0hrY4-x056bNrTExcFD3MtwTsbG4-qxwbcav6EeMnux7v9ttw1mR3mFK5o0IyH_H2PoifoX3XJMQ15pwvBs-Ij0HsGHi_rDljgyrfUrm5v1-zqII7Y2isGhhxSecpQaEzzuqktWJN7GaeJkBn-Jt95bLuiV-uVy4sTD-dPRI1H' },
        { name: 'Raffine', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhOH033lALe6Relajc8FB2MzCVEBroGt_hqfpTadPhqRr130LNHGUIeu3ksJgzlgTDqx7QH_-_9nDYL3_5293wEI6eqwCdn2kwfqC8SqbtipAEkpcGmw3FxpsnXjjalslcHY5dgFX1RbcUskAq-L585YY4shO1H1gyZ1qI-sBmcCRc0-PAa05o0xeCngPNa4t4nyC6YAm0172FxPFHWlVWvejHkopJ10XqsTXKpfFsZSM8UaJ66GF1PucrlKXkBlEWE8_eMpN6zdIG' },
        { name: 'Emperor', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASMcEYebiUPo6lNWoOt0lisXCJFjZkJpGl4iuqYEXI9KQ8heGStXQbm9qSR2yzA1sxXUW4TQ1Iz0F9HM1f1zsR0zSYWG-lLlfcy6c2UA2VE-dhZfhdoDY7AKDX0XfljS1JBGeUG1PR0mpp6prXgCkmVUYmbGJGOD9hIyIvZ8Vy19BPWzkfBf6Ap_j-DaapeEq9XcLncNhcLBDT8eYNk1SmmTAx2zGDcqdV8gIrtXQ00nQT7K2Msd-uREeYFuYneoMRO_B7_upCBgMi' }
      ],
      fullList: {
        creatures: [
          { name: 'Raffine, Scheming Seer', quantity: 4 },
          { name: 'Sheoldred, the Apocalypse', quantity: 3 },
          { name: 'Deep-Cavern Bat', quantity: 4 },
          { name: 'Dennick, Pious Apprentice', quantity: 4 }
        ],
        spells: [
          { name: 'The Wandering Emperor', quantity: 3 },
          { name: 'Make Disappear', quantity: 4 },
          { name: 'Go for the Throat', quantity: 4 },
          { name: 'Cut Down', quantity: 3 },
          { name: 'Wedding Announcement', quantity: 4 },
          { name: 'No More Lies', quantity: 3 }
        ],
        lands: [
          { name: "Raffine's Tower", quantity: 4 },
          { name: 'Caves of Koilos', quantity: 4 },
          { name: 'Adarkar Wastes', quantity: 4 },
          { name: 'Shipwreck Marsh', quantity: 4 },
          { name: 'Basic Lands', quantity: 8 }
        ],
        sideboard: [
          { name: 'Duress', quantity: 3 },
          { name: 'Negate', quantity: 2 },
          { name: 'Rest in Peace', quantity: 2 },
          { name: 'Knockout Blow', quantity: 2 },
          { name: 'Disdainful Stroke', quantity: 2 },
          { name: 'Get Lost', quantity: 2 },
          { name: 'Temporary Lockdown', quantity: 2 }
        ]
      }
    },
    {
      id: 'mono-red',
      tier: 1,
      name: 'Mono Red Aggro',
      colors: ['r'],
      keyCardsString: 'Kumano Faces Kakkazan, Monastery Swiftspear...',
      presence: '12%',
      winrate: '54%',
      creaturesCount: 22,
      spellsCount: 16,
      landsCount: 22,
      isExpanded: false,
      showFullList: false,
      gallery: [
        { name: 'Kumano', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcwDtIfQV41lcgJExtI6QZvfRHY2Chxp06JyKNSqNi_NjlYappoavNAKRGZQUIvtyE5MgDzBuNgIW4oda85ERaSA9qsESerECsuY0hrY4-x056bNrTExcFD3MtwTsbG4-qxwbcav6EeMnux7v9ttw1mR3mFK5o0IyH_H2PoifoX3XJMQ15pwvBs-Ij0HsGHi_rDljgyrfUrm5v1-zqII7Y2isGhhxSecpQaEzzuqktWJN7GaeJkBn-Jt95bLuiV-uVy4sTD-dPRI1H' }
      ],
      fullList: {
        creatures: [{ name: 'Monastery Swiftspear', quantity: 4 }],
        spells: [{ name: 'Lightning Strike', quantity: 4 }],
        lands: [{ name: 'Mountains', quantity: 22 }],
        sideboard: [{ name: 'Rending Flame', quantity: 2 }]
      }
    },
    {
      id: 'azorius-control',
      tier: 2,
      name: 'Azorius Control',
      colors: ['w', 'u'],
      keyCardsString: 'Sunfall, Farewell...',
      presence: '10%',
      winrate: '52%',
      creaturesCount: 0,
      spellsCount: 34,
      landsCount: 26,
      isExpanded: false,
      showFullList: false,
      gallery: [
        { name: 'Sunfall', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASMcEYebiUPo6lNWoOt0lisXCJFjZkJpGl4iuqYEXI9KQ8heGStXQbm9qSR2yzA1sxXUW4TQ1Iz0F9HM1f1zsR0zSYWG-lLlfcy6c2UA2VE-dhZfhdoDY7AKDX0XfljS1JBGeUG1PR0mpp6prXgCkmVUYmbGJGOD9hIyIvZ8Vy19BPWzkfBf6Ap_j-DaapeEq9XcLncNhcLBDT8eYNk1SmmTAx2zGDcqdV8gIrtXQ00nQT7K2Msd-uREeYFuYneoMRO_B7_upCBgMi' }
      ],
      fullList: {
        creatures: [],
        spells: [{ name: 'Sunfall', quantity: 4 }],
        lands: [{ name: 'Islands', quantity: 13 }, { name: 'Plains', quantity: 13 }],
        sideboard: [{ name: 'Negate', quantity: 2 }]
      }
    }
  ];

  toggleExpand(deck: MetaDeck): void {
    deck.isExpanded = !deck.isExpanded;
    if (!deck.isExpanded) {
      deck.showFullList = false;
    }
  }

  toggleViewMode(deck: MetaDeck, event: Event): void {
    event.stopPropagation();
    deck.showFullList = !deck.showFullList;
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }
}
