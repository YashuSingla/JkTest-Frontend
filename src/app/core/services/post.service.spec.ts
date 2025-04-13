import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'environments/environment';
import { Post } from '../models/post.model';

describe('PostService (Jest)', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const mockPosts: Post[] = [
    { id: '1', title: 'Post 1', content: 'Content 1' },
    { id: '2', title: 'Post 2', content: 'Content 2' }
  ];

  const newPost: Partial<Post> = {
    title: 'New Post',
    content: 'New content'
  };

  const createdPost: Post = {
    id: '3',
    title: 'New Post',
    content: 'New content'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchPosts() should call GET /posts and return an array of posts', () => {
    service.fetchPosts().subscribe((data) => {
      expect(data).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('loadPosts() should set the posts signal with the fetched posts', () => {
    service.loadPosts();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/posts`);
    req.flush(mockPosts);

    expect(service.allPosts()).toEqual(mockPosts);
  });

  it('getPostById() should call GET /posts/:id and return a single post', () => {
    service.getPostById('1').subscribe((post) => {
      expect(post).toEqual(mockPosts[0]);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts[0]);
  });

  it('createPost() should call POST /posts and return the created post', () => {
    service.createPost(newPost).subscribe((post) => {
      expect(post).toEqual(createdPost);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush(createdPost);
  });
});
