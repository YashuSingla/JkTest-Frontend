import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'app/core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock global google object
const mockGoogle = {
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn()
    }
  }
};

// Mock AuthService
const authServiceMock = {
  isLoggedIn: jest.fn().mockReturnValue(false),
  loginWithGoogle: jest.fn().mockResolvedValue(true)
};

// Mock Router
const routerMock = {
  navigate: jest.fn()
};

describe('LoginComponent (Jest)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    // Inject mock google into global scope
    (globalThis as any).google = mockGoogle;

    await TestBed.configureTestingModule({
      imports: [LoginComponent,HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize Google Sign-In on init', () => {
    expect(mockGoogle.accounts.id.initialize).toHaveBeenCalled();
    expect(mockGoogle.accounts.id.renderButton).toHaveBeenCalledWith(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
  });

  it('should not navigate if user is not logged in', () => {
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should render Google Sign-In button container', () => {
    const buttonElement = fixture.nativeElement.querySelector('#google-button');
    expect(buttonElement).toBeTruthy();
  });
  
  
});
