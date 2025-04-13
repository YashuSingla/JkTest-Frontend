import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'app/core/services/post.service';
import { Post } from 'app/core/models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  private postService = inject(PostService);
  private route = inject(ActivatedRoute);
  post!: Post;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.postService.getPostById(id).subscribe(data => {
      this.post = data;
      console.log('Post fetched:', this.post);
    });
    
  }


}
