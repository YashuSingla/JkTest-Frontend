import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthService } from 'app/core/services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

// Mocks
const mockAuthService = {
  logout: jest.fn().mockResolvedValue(undefined) // async logout
};

const mockRouter = {
  navigate: jest.fn()
};

describe('LogoutComponent (Jest)', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutComponent], // since it's standalone
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout and navigate to /login when button is clicked', async () => {
    // Click the button
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    // Wait for async logout
    await fixture.whenStable();

    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
