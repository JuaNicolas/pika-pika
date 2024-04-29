import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [
        provideRouter([
          {
            path: '',
            pathMatch: 'full',
            component: HomeComponent,
          },
          {
            path: 'pokemon/:name',
            component: DetailComponent,
          },
        ]),
        provideLocationMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
