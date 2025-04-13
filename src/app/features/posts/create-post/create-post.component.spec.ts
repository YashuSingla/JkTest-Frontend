import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostComponent } from './create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from 'app/core/services/post.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock PostService
const mockPostService = {
  createPost: jest.fn()
};

// Mock Router
const mockRouter = {
  navigate: jest.fn()
};

describe('CreatePostComponent (Jest)', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreatePostComponent,
        ReactiveFormsModule,
        HttpClientTestingModule  // ✅ Added here
      ],
      providers: [
        { provide: PostService, useValue: mockPostService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.value).toEqual({ title: '', content: '' });
    expect(component.form.valid).toBe(false);
  });

  it('should disable submit button if form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBe(true);
  });

  it('should enable submit and call service on valid form submission', () => {
    // Arrange
    component.form.setValue({ title: 'Test Title', content: 'Test Body' });
    mockPostService.createPost.mockReturnValue(of({}));

    // Act
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    fixture.detectChanges();
    button.click();

    // Assert
    expect(mockPostService.createPost).toHaveBeenCalledWith({
      title: 'Test Title',
      content: 'Test Body'
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should not call createPost if form is invalid', () => {
    // Arrange
    mockPostService.createPost.mockClear(); // ✅ ensure no prior calls
  
    component.form.get('title')?.setValue('');
    component.form.get('content')?.setValue('');
    component.form.markAllAsTouched();
    component.form.updateValueAndValidity();
    fixture.detectChanges();
  
    // Debug (optional)
    console.log('VALID?', component.form.valid);
    console.log('Form Values:', component.form.getRawValue());
  
    // Assert form invalid
    expect(component.form.valid).toBe(false);
  
    // Act
    component.submit();
  
    // Final Assert
    expect(mockPostService.createPost).not.toHaveBeenCalled();
  });
  
  
});
