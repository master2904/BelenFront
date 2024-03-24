import { Component } from '@angular/core';
import { faSignIn,faHome,faInfoCircle, faUser,faUsers,faIndustry,faDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  faSignIn = faSignIn
  faHome = faHome
  faInfoCircle = faInfoCircle
  faUser=faUser
  faUsers=faUsers
  faIndustry=faIndustry
  faDollar=faDollar
}
