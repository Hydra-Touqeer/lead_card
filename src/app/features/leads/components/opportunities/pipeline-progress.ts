import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

// Tick width (3.75px) + gap (2px), matching the design's tick pitch. The
// segment count is derived from the track's measured width (not a fixed
// count) so the bar stays visually consistent whether the card is narrow or
// wide, rather than a fixed number of ticks stretching or squeezing.
const TICK_PITCH_PX = 5.75;
const MIN_SEGMENTS = 10;

@Component({
  selector: 'app-pipeline-progress',
  styleUrl: './pipeline-progress.scss',
  template: `
    <div class="pipeline-progress" #track>
      @for (segment of segments(); track $index) {
        <span
          class="tick"
          [class.filled]="$index < filledCount()"
          [class.marker]="$index === filledCount() - 1"
        ></span>
      }
    </div>
  `,
})
export class PipelineProgress {
  readonly stages = input.required<string[]>();
  readonly currentStage = input.required<string>();

  private readonly trackRef = viewChild.required<ElementRef<HTMLElement>>('track');
  protected readonly segmentCount = signal(MIN_SEGMENTS);

  protected readonly segments = computed(() => Array.from({ length: this.segmentCount() }));

  private readonly stageIndex = computed(() => {
    const index = this.stages().indexOf(this.currentStage());
    return index === -1 ? 0 : index;
  });

  protected readonly filledCount = computed(() => {
    const totalStages = this.stages().length || 1;
    const fraction = (this.stageIndex() + 1) / totalStages;
    return Math.round(this.segmentCount() * fraction);
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const element = this.trackRef().nativeElement;
      const measure = (width: number) =>
        this.segmentCount.set(Math.max(MIN_SEGMENTS, Math.floor(width / TICK_PITCH_PX)));

      measure(element.clientWidth);

      const observer = new ResizeObserver((entries) =>
        measure(entries[0]?.contentRect.width ?? element.clientWidth),
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
