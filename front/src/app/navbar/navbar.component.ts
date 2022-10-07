import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../Models/menu-item.model';

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
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Coches',
      icon: 'directions_car',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Ventas',
      icon: 'euro_symbol',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Gastos generales',
      icon: 'shop',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Balance',
      icon: 'account_balance',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
