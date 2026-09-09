import { Component, computed, input } from '@angular/core';
import { IconSvgObject } from '@hugeicons/angular';

interface IconElement {
  tag: string;
  attrs: Record<string, string | number | undefined>;
}

// Renders Hugeicons' raw path data directly instead of using
// @hugeicons/angular's <hugeicons-icon>, which has two problems:
// 1. Its template hardcodes every element as an SVG <path>, so icons that use
//    <circle>/<rect>/<ellipse> (e.g. Clock01Icon's clock face) silently lose
//    those parts - only <path> entries render.
// 2. It only applies stroke-width when you pass one, and applies it as a
//    fixed value relative to the icon's 24-unit viewBox. That makes smaller
//    icons look disproportionately bold, since shrinking a glyph needs a
//    thinner relative stroke to read as equally light - not the same one.
// This component fixes both: it renders each element as its real tag, and
// computes a stroke-width that keeps the same *absolute* pixel thickness
// (1.25px) regardless of the icon's rendered size.
@Component({
  selector: 'app-icon',
  host: {
    style: 'display: inline-flex; align-items: center; justify-content: center;',
  },
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [style.color]="color()"
    >
      @for (element of elements(); track $index) {
        @switch (element.tag) {
          @case ('circle') {
            <circle
              [attr.cx]="element.attrs['cx']"
              [attr.cy]="element.attrs['cy']"
              [attr.r]="element.attrs['r']"
              [attr.fill]="element.attrs['fill'] || 'none'"
              [attr.stroke]="element.attrs['stroke'] ? strokeColor() : null"
              [attr.stroke-width]="element.attrs['stroke'] ? strokeWidthUnits() : null"
            />
          }
          @case ('rect') {
            <rect
              [attr.x]="element.attrs['x']"
              [attr.y]="element.attrs['y']"
              [attr.width]="element.attrs['width']"
              [attr.height]="element.attrs['height']"
              [attr.rx]="element.attrs['rx']"
              [attr.fill]="element.attrs['fill'] || 'none'"
              [attr.stroke]="element.attrs['stroke'] ? strokeColor() : null"
              [attr.stroke-width]="element.attrs['stroke'] ? strokeWidthUnits() : null"
            />
          }
          @case ('ellipse') {
            <ellipse
              [attr.cx]="element.attrs['cx']"
              [attr.cy]="element.attrs['cy']"
              [attr.rx]="element.attrs['rx']"
              [attr.ry]="element.attrs['ry']"
              [attr.fill]="element.attrs['fill'] || 'none'"
              [attr.stroke]="element.attrs['stroke'] ? strokeColor() : null"
              [attr.stroke-width]="element.attrs['stroke'] ? strokeWidthUnits() : null"
            />
          }
          @default {
            <path
              [attr.d]="element.attrs['d']"
              [attr.fill-rule]="element.attrs['fillRule']"
              [attr.opacity]="element.attrs['opacity']"
              [attr.fill]="element.attrs['fill'] || 'none'"
              [attr.stroke]="element.attrs['stroke'] ? strokeColor() : null"
              [attr.stroke-width]="element.attrs['stroke'] ? strokeWidthUnits() : null"
              [attr.stroke-linecap]="element.attrs['strokeLinecap']"
              [attr.stroke-linejoin]="element.attrs['strokeLinejoin']"
            />
          }
        }
      }
    </svg>
  `,
})
export class AppIcon {
  readonly icon = input.required<IconSvgObject>();
  readonly size = input<number>(20);
  readonly color = input<string>('currentColor');

  protected readonly strokeColor = computed(() => this.color());

  // Absolute stroke thickness (px) every icon should render at, regardless of size.
  private readonly absoluteStrokeWidthPx = 1.25;
  protected readonly strokeWidthUnits = computed(() => (this.absoluteStrokeWidthPx * 24) / this.size());

  protected readonly elements = computed<IconElement[]>(() => {
    const data = this.icon();
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(([tag, attrs]) => ({ tag, attrs: attrs as Record<string, string | number | undefined> }));
  });
}
