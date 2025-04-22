import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from 'app/core/services/post.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// Create a mock PostService
const mockPostService = {
  loadPosts: jest.fn(),
  allPosts: jest.fn().mockReturnValue([
    { id: 1, title: 'Mock Post One' },
    { id: 2, title: 'Mock Post Two' }
  ])
};

describe('DashboardComponent (Jest)', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: PostService, useValue: mockPostService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // runs ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPosts on init', () => {
    expect(mockPostService.loadPosts).toHaveBeenCalled();
  });

  it('should render a title', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Your Posts');
  });

  it('should render a list of posts', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul > li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Mock Post One');
    expect(listItems[1].nativeElement.textContent).toContain('Mock Post Two');
  });

  it('should have posts defined from service', () => {
    expect(component.posts().length).toBe(2);
    expect(component.posts()[0].title).toBe('Mock Post One');    
  });  

  it('should have a router link to create a new post', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/posts/new"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('+ Create New Post');
  });
});
