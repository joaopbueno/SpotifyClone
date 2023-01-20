import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factores';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  playIcone = faPlay;
  musicas: IMusica [] = [];
  musicaAtual: IMusica = newMusica();

  subs: Subscription[] = [];

  constructor(private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(subs => subs.unsubscribe());
  }

  obterMusicaAtual(){
    const sub =this.playerService.musicaAtual.subscribe( musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas();
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

}
