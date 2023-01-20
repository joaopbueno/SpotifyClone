import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward, faSubscript } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factores';
import { IMusica } from 'src/app/Interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();

  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;

  subs : Subscription[]= []

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub =>{
      sub.unsubscribe();
    });
  }

  obterMusicaTocando(){
    const sub = this.playerService.musicaAtual.subscribe(musica =>{
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  voltarMusica(){
    this.playerService.voltarMusica();
  }

  proximaMusica(){
    this.playerService.proximaMusica();
  }
}
