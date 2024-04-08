import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const user=authService.usuarioActualValue.rol
  const allowedRoles= route.data?.['allowedRoles']
  // console.log(allowedRoles.includes(user+""))
  return (allowedRoles.includes(user+"")? true:router.navigate(['/dashboard']))
  // return authService.isLogged().pipe(
  //   map((user)=>Boolean(user && allowedRoles.includes('3'))),
  //   tap((hasRole)=>{
  //     console.log(hasRole)
  //     hasRole===false && alert('acceso negado')// router.navigate(['/']):true
  //   }
  //   )
  // );
};
