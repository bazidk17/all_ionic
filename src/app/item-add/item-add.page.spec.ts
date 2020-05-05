import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemAddPage } from './item-add.page';

describe('ItemAddPage', () => {
  let component: ItemAddPage;
  let fixture: ComponentFixture<ItemAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
