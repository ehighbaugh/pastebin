import { PastebinComponent } from './pastebin.component';
import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Pastebin, Languages } from '../pastebin/pastebin';
import { By } from '@angular/platform-browser';
import { PastebinService } from '../pastebin.service';



describe('PastebinComponent', () => {

  // TS declarations
  let comp: PastebinComponent;
  let fixture: ComponentFixture<PastebinComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let mockPaste: Pastebin[];
  let spy: jasmine.Spy;

  // beforeEach is called once before every 'it' block in a test.
  // use this to config component, inject services, etc.

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PastebinComponent ], // declare test component
      imports: [ HttpModule ],
    });
    fixture = TestBed.createComponent(PastebinComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.pastebin'));
    element = de.nativeElement;
  });

  beforeEach(async(() => { // async before is used for compiling external templates
  TestBed.configureTestingModule({
    declarations: [PastebinComponent ],
    imports: [ HttpModule ],
  })
  .compileComponents(); // compile template and css
  }));

  beforeEach(() => { // here is the synchronous async function

    fixture = TestBed.createComponent(PastebinComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.pastebin'));
    element = de.nativeElement;
  });

  it('should have a component', () => {
    expect(comp).toBeTruthy();
  });

  it('should have a title', () => {
    comp.title = 'Pastebin Application';
    fixture.detectChanges();
    expect(element.textContent).toContain(comp.title);
  });

  it('should have a table to display the pastes', () => {
    expect(element.innerHTML).toContain('thead');
    expect(element.innerHTML).toContain('tbody');
  });

  TestBed.configureTestingModule({
    declarations: [],
    providers: [ PastebinService ],
  });

  // real PastebinService is injected into component
  // tslint:disable-next-line:prefer-const
  let pastebinService = fixture.debugElement.injector.get(PastebinService);
    mockPaste = [
      { id: 1, title: 'Hello world', language: 'Ruby', paste: 'puts "Hello"'}];

    spy = spyOn(pastebinService, 'getPastebin')
      .and.returnValue(Promise.resolve(mockPaste));

  it('should not show the pastebin before OnInit', () => {
    this.tbody = element.querySelector('tbody');

    // try this without the 'replace(\s\s+/g,'')' method and see what happens
    expect(this.tbody.innerHTML.replace(/\s\s+/g, '')).toBe('', 'tbody should be empty');
      expect(spy.calls.any()).toBe(false, 'Spy shouldnt be called yet');
  });

  it('should still not show pastebin after compo initialized', () => {
    fixture.detectChanges();
    // getPastebin service is async, but the test is not
    expect(this.tbody.innerHTML.replace(/\s\s+/g, '')).toBe('', 'tbody should still be empty');
    expect(spy.calls.any()).toBe(true, 'getPastebin should be called');
  });

  it('should show the pastebin after getPastebin promise resolves', async() => {
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      expect(comp.pastebin).toEqual(jasmine.objectContaining(mockPaste));
      expect(element.innerHTML.replace(/\s\s+/g, ' ')).toContain(mockPaste[0].title);
    });
  });
});
