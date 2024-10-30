import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFeatureComponent } from './characters-feature.component';

describe('CharactersFeatureComponent', () => {
  let component: CharactersFeatureComponent;
  let fixture: ComponentFixture<CharactersFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
