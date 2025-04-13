import { TestBed } from '@angular/core/testing';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let isLoggedInMock: jest.Mock;
  let navigateMock: jest.Mock;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const executeGuard: CanActivateFn = (...guardParams) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParams));

  beforeEach(() => {
    isLoggedInMock = jest.fn();
    navigateMock = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: isLoggedInMock } },
        { provide: Router, useValue: { navigate: navigateMock } }
      ]
    });
  });

  it('should allow navigation if user is logged in', () => {
    isLoggedInMock.mockReturnValue(true);

    const result = executeGuard(mockRoute, mockState);

    expect(result).toBe(true);
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('should block navigation and redirect if user is not logged in', () => {
    isLoggedInMock.mockReturnValue(false);

    const result = executeGuard(mockRoute, mockState);

    expect(result).toBe(false);
    expect(navigateMock).toHaveBeenCalledWith(['/']);
  });
});
