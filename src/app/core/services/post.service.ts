import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Post } from '../models/post.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private posts = signal<Post[]>([]);

  readonly allPosts = this.posts.asReadonly();

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/posts`);
  }

  loadPosts() {
    this.fetchPosts().subscribe(data => this.posts.set(data));
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/posts/${id}`);
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${environment.apiBaseUrl}/posts`, post);
  }
}
