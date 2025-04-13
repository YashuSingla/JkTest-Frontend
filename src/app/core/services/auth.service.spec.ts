import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const tokenMock = 'mocked-jwt-token';
  const userMock = { token: tokenMock, name: 'Test User' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify(); // Make sure no pending requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in with Google and store token', async () => {
    const promise = service.loginWithGoogle(tokenMock);

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/google`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token: tokenMock });

    req.flush(userMock);

    await promise;

    expect(localStorage.getItem('blog-token')).toBe(tokenMock);
    expect(service.currentUser()).toEqual(userMock);
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('blog-token', tokenMock);
    expect(service.token).toBe(tokenMock);
  });

  it('should return true from isLoggedIn if token exists', () => {
    localStorage.setItem('blog-token', tokenMock);
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should return false from isLoggedIn if token does not exist', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should logout and clear localStorage and user', () => {
    localStorage.setItem('blog-token', tokenMock);
    service.logout();

    expect(localStorage.getItem('blog-token')).toBeNull();
    expect(service.currentUser()).toBeNull();
  });
});
