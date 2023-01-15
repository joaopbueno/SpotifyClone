import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {
  usuarioCriado: boolean = false;

  constructor(private router: Router, private spotifyService: SpotifyService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      //adicionar timeout

      if(!token){
        this.naoAutenticado();
      }

      return new Promise(resp =>{
       this.usuarioCriado = !!this.spotifyService.iniciarlizarUsuario();
        if(this.usuarioCriado)
          resp(true);
        else
          resp(this.naoAutenticado());
      })

  }

  naoAutenticado(){
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
