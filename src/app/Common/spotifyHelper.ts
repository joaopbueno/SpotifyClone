import { IArtista } from "../Interfaces/IArtista";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUsuario } from "../Interfaces/IUsuario";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
  return {
    id: user.id,
    nome: user.display_name,
    imagemUrl: user.images.pop().url
  }
}

export function SpotifyPlaylisParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  return {
    id: playlist.id,
    nome: playlist.name,
    imagemUrl: playlist.images.pop().url
  };
}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista{
  return {
    id: spotifyArtista.id,
    imagemUrl: spotifyArtista.images.sort((a,b) => a.width -b.width).pop().url,
    nome: spotifyArtista.name
  }
}
