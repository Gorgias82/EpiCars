import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../Models/menu-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'Clientes',
      icon: 'person',
      link : '/clientes',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Coches',
      icon: 'directions_car',
      link : '/vehiculos',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Ventas',
      icon: 'euro_symbol',
      link : '',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Gastos generales',
      icon: 'shop',
      link : '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Balance',
      icon: 'account_balance',
      link : '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navegar(ruta){
    console.log(ruta)
    this.router.navigateByUrl(ruta);
  }

}
