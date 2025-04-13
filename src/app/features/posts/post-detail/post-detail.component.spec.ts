import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostService } from 'app/core/services/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// Sample mock post
const mockPost = {
  id: '123',
  title: 'Test Post Title',
  content: 'This is the content of the test post.'
};

// Mock ActivatedRoute with paramMap returning '123'
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jest.fn().mockReturnValue('123')
    }
  }
};

// Mock PostService with getPostById returning an observable of mockPost
const mockPostService = {
  getPostById: jest.fn().mockReturnValue(of(mockPost))
};

describe('PostDetailComponent (Jest)', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PostService, useValue: mockPostService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit and subscription
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the post based on route ID', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockPostService.getPostById).toHaveBeenCalledWith('123');
    expect(component.post).toEqual(mockPost);
  });

  it('should display the post title and content when loaded', () => {
    const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
    const contentEl = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(titleEl.textContent).toContain('Test Post Title');
    expect(contentEl.textContent).toContain('This is the content of the test post.');
  });

  it('should not display loading message once post is loaded', () => {
    const loadingEl = fixture.debugElement.query(By.css('.text-center'));
    expect(loadingEl).toBeNull();
  });
});
