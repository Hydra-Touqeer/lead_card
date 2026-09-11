import { Component, ElementRef, computed, input, signal, viewChild } from '@angular/core';
import { PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';
import { AppIcon } from '../../../../shared/ui/icon/icon';

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const TRANSCRIPT_PREVIEW_LENGTH = 180;

@Component({
  selector: 'app-call-activity-body',
  imports: [AppIcon],
  styleUrl: './call-activity-body.scss',
  template: `
    <div class="call-body">
      @if (recordingUrl(); as url) {
        <div class="player">
          <button
            type="button"
            class="play-button"
            [attr.aria-label]="isPlaying() ? 'Pause recording' : 'Play recording'"
            (click)="togglePlay()"
          >
            <app-icon [icon]="isPlaying() ? pauseIcon : playIcon" [size]="14" color="white" />
          </button>

          <div class="scrubber">
            <div class="scrubber-track">
              <div class="scrubber-fill" [style.width.%]="progressPercent()"></div>
            </div>
            <div class="time-row">
              <span>{{ formattedCurrentTime() }}</span>
              <span>{{ formattedDuration() }}</span>
            </div>
          </div>

          <audio
            #audioEl
            [src]="url"
            (timeupdate)="onTimeUpdate()"
            (ended)="onEnded()"
            (loadedmetadata)="onLoadedMetadata()"
          ></audio>
        </div>
      } @else {
        <p class="no-recording">No recording available</p>
      }

      @if (transcript(); as text) {
        <div class="transcript">
          <p class="transcript-text" [class.truncated]="isLong() && !expanded()">{{ text }}</p>
          @if (isLong()) {
            <button type="button" class="show-more" (click)="expanded.set(!expanded())">
              {{ expanded() ? 'Show less' : 'Show more' }}
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class CallActivityBody {
  readonly durationSeconds = input.required<number>();
  readonly recordingUrl = input<string>();
  readonly transcript = input<string>();

  private readonly audioRef = viewChild<ElementRef<HTMLAudioElement>>('audioEl');

  protected readonly isPlaying = signal(false);
  protected readonly currentTime = signal(0);
  protected readonly duration = signal(0);
  protected readonly expanded = signal(false);

  protected readonly playIcon = PlayIcon;
  protected readonly pauseIcon = PauseIcon;

  protected readonly isLong = computed(() => (this.transcript()?.length ?? 0) > TRANSCRIPT_PREVIEW_LENGTH);

  protected readonly progressPercent = computed(() => {
    const total = this.duration() || this.durationSeconds();
    return total > 0 ? (this.currentTime() / total) * 100 : 0;
  });

  protected readonly formattedCurrentTime = computed(() => formatDuration(Math.floor(this.currentTime())));
  protected readonly formattedDuration = computed(() => formatDuration(this.duration() || this.durationSeconds()));

  protected togglePlay(): void {
    const audio = this.audioRef()?.nativeElement;
    if (!audio) {
      return;
    }
    if (audio.paused) {
      audio.play();
      this.isPlaying.set(true);
    } else {
      audio.pause();
      this.isPlaying.set(false);
    }
  }

  protected onTimeUpdate(): void {
    const audio = this.audioRef()?.nativeElement;
    if (audio) {
      this.currentTime.set(audio.currentTime);
    }
  }

  protected onEnded(): void {
    this.isPlaying.set(false);
  }

  protected onLoadedMetadata(): void {
    const audio = this.audioRef()?.nativeElement;
    if (audio) {
      this.duration.set(audio.duration);
    }
  }
}
