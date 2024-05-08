import { Component, OnInit, inject } from '@angular/core';
import { IHamburger } from '../../Interfaces/IHamburger';
import { HamburgerService } from '../../services/hamburgers/hamburger.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/client/navbar/navbar.component';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.css'
})
export class HamburgerComponent implements OnInit {
  hamburgers: IHamburger[] = [];
  filter!: IHamburger[];

  constructor(
    private toastr: ToastrService,
    private hamburgerService: HamburgerService
  ) { }

  ngOnInit(): void {
    this.loadHamburgers();
  }

  loadHamburgers() {
    this.hamburgerService.getAllHamburgers().subscribe(hamburgers => {
      this.hamburgers = hamburgers;
      this.filter = hamburgers;
    });
  }

  deleteHamburger(hamburger: IHamburger) {
    this.hamburgerService.deleteHamburger(hamburger.id).pipe(
      catchError(() => {
        this.toastr.error('Hamburger is being used! Cannot be deleted!');
        return [];
      })
    ).subscribe(() => {
      this.loadHamburgers();
      this.toastr.success('Hamburger deleted!');
    })
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.hamburgers = this.filter.filter((hamburger) => {
      return hamburger.name?.toUpperCase().includes(target.value.toUpperCase()) || hamburger.id?.toString().includes(target.value.toUpperCase());
    });
  }
}
