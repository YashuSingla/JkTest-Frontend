import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'app/core/services/post.service';
import { Router } from '@angular/router';
import { LogoutComponent } from 'app/common/logout/logout.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoutComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  form = this.fb.group({
    title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    content: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit() {
    if (this.form.valid) {
      const post = this.form.getRawValue();
      if(post.content.trim() != '' && post.title.trim() != '')
        this.postService.createPost(post).subscribe(() => {
          this.router.navigate(['/posts']);
        });
    }
  }
}
