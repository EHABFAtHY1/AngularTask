
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types';

class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    const savedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    // Simulating a mock API call
    return new Observable<User>((subscriber) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password123') {
          const user: User = { email, token: 'fake-jwt-token-' + Math.random().toString(36).substring(7) };
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
          subscriber.next(user);
          subscriber.complete();
        } else {
          subscriber.error(new Error('Invalid email or password'));
        }
      }, 800);
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}

export const authService = new AuthService();
