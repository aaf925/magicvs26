import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ProfileResponse {
  id: number;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  country: string | null;
  bio: string | null;
  eloRating: number | null;
  gamesPlayed: number | null;
  gamesWon: number | null;
  gamesLost: number | null;
  friendTag: string | null;
  friendsCount: number | null;
  decksCount: number | null;
  email?: string | null;
  createdAt?: string | null;
  role?: string | null;
}

export interface ProfileDeckSummary {
  id: number;
  name: string;
  description: string | null;
  formatName: string | null;
  totalCards: number | null;
  isPublic: boolean | null;
  updatedAt: string | null;
  createdAt?: string | null;
  colors?: string[];
}

interface ApiDeckSummary {
  id: number;
  name: string;
  description?: string | null;
  formatName?: string | null;
  totalCards?: number | null;
  isPublic?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  colors?: string[] | string | null;
  colorIdentity?: string[] | string | null;
  mainColors?: string[] | string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/profile';

  getProfile(userId: string = 'me'): Observable<ProfileResponse> {
    return this.http
      .get<ProfileResponse>(this.buildUrl(userId), { headers: this.authHeaders() })
      .pipe(map((profile) => this.normalizeProfile(profile)));
  }

  getDecks(userId: string = 'me'): Observable<ProfileDeckSummary[]> {
    return this.http
      .get<ApiDeckSummary[]>(`${this.buildUrl(userId)}/decks`, { headers: this.authHeaders() })
      .pipe(map((decks) => decks.map((deck) => this.normalizeDeck(deck))));
  }

  private buildUrl(userId: string): string {
    return userId === 'me' ? `${this.apiUrl}/me` : `${this.apiUrl}/${userId}`;
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  private normalizeProfile(profile: ProfileResponse): ProfileResponse {
    return {
      ...profile,
      decksCount: profile.decksCount ?? 0,
    };
  }

  private normalizeDeck(deck: ApiDeckSummary): ProfileDeckSummary {
    return {
      id: deck.id,
      name: deck.name,
      description: deck.description ?? null,
      formatName: deck.formatName ?? null,
      totalCards: deck.totalCards ?? null,
      isPublic: deck.isPublic ?? null,
      updatedAt: deck.updatedAt ?? null,
      createdAt: deck.createdAt ?? null,
      colors: this.normalizeColors(deck.colors ?? deck.colorIdentity ?? deck.mainColors),
    };
  }

  private normalizeColors(value: string[] | string | null | undefined): string[] {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean).map((item) => item.toUpperCase());
    }

    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => item.toUpperCase());
  }
}
