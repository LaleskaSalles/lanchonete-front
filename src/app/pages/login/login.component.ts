import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  authServive = inject(AuthService);

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {
    
  }

  login(event: Event) {
    event?.preventDefault();

    if (!this.email || !this.password) {
      this.toastr.error('Email and password are required');
      return
    }

    if (!this.email.includes('@')) {
      this.toastr.error('Email is not valid');
    }

    this.authServive.login({ email: this.email, password: this.password }).subscribe(() =>{
     this.router.navigate(['/drinks']);
      this.toastr.success('Welcome');
    }, (error) => {
      this.toastr.error('Invalid email or password. Please try again.');
    }
  );
  }

}
