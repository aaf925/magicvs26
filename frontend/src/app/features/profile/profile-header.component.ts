import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProfileResponse } from './profile.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  @Input({ required: true }) profile!: ProfileResponse;
  @Input() email: string | null = null;
  @Input() registrationDate: string | null = null;
  @Input() role: string | null = null;
  @Input() isOwnProfile = false;

  initials(name: string | null | undefined): string {
    const source = name?.trim() || 'UV';
    return source
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }

  formatDate(value: string | null | undefined): string {
    if (!value) {
      return 'No disponible';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return 'No disponible';
    }

    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'medium',
    }).format(date);
  }
}
