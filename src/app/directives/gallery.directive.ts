import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Pokemon } from 'pokeapi-js-wrapper';

@Directive({
  selector: '[appGallery]',
  standalone: true,
})
export class GalleryDirective implements OnInit {
  @Input({
    required: true,
  })
  pokemon!: Pokemon;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLImageElement>
  ) {}

  ngOnInit(): void {
    const sprite = this.pokemon.sprites.other['official-artwork']
      .front_default as string;
    this.renderer.setAttribute(this.el.nativeElement, 'src', sprite);
  }
}
