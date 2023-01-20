import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newMusica } from '../Common/factores';
import { IMusica } from '../Interfaces/IMusica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.obterMusicaAtual();
  }

  async obterMusicaAtual(){
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);

    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    },3000)
  }

  definirMusicaAtual(musica: IMusica){
    this.musicaAtual.next(musica);
  }
}
