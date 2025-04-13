import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostService } from 'app/core/services/post.service';
import { NgFor } from '@angular/common';
import { LogoutComponent } from 'app/common/logout/logout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, LogoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private postService = inject(PostService);
  posts = this.postService.allPosts;

  ngOnInit() {
    this.postService.loadPosts();
  }
}
